import vm from 'vm'
import { randomBytes } from 'crypto'
import { build, BuildOptions } from 'esbuild'
import { mkdtempSync } from 'fs'
import { readFile, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join, parse } from 'path'
import JSON5 from 'json5'

export interface ReadConfigFileOptions {
  configFilePath: string
}

export interface RunOptions {
  context?: unknown
  // source map to real code line offset in case code is banner-injected
  lineOffset?: number
  identifier?: string
  initializeImportMeta?: Function
}

export interface DefaultExport {
  default: () => unknown
  [fnName: string]: () => unknown
}

/** dynamic ESM module linking */
export const linker = (runContext: vm.Context) => {
  return async (specifier: string) => {
    return new Promise(async (resolveLink) => {
      let module: any
      if (!module) {
        module = await import(specifier)
      }

      const exportNames = Object.keys(module)

      // @ts-ignore
      const syntheticModule = new vm.SyntheticModule(
        exportNames,
        function () {
          exportNames.forEach((key) => {
            this.setExport(key, module[key])
          })
        },
        { context: runContext },
      )
      resolveLink(syntheticModule)
    })
  }
}

/** dynamic ESM module execution via VM */
export const run = async <Imports, Exports = DefaultExport>(
  scriptCode: string,
  contextData: Imports,
  options?: RunOptions,
): Promise<{
  exports: Exports
  global: any
}> => {
  const context = vm.createContext(contextData)

  const sourceTextModuleOptions: RunOptions = {
    ...(options || {}),
    context,
  }

  // @ts-ignore
  const mod = new vm.SourceTextModule(scriptCode, sourceTextModuleOptions)

  await mod.link(linker(context))
  await mod.evaluate()

  return {
    exports: mod.namespace,
    global: context,
  }
}

/** generates a temporary folder to use that is hard to guess */
export const makeTempDir = () => join(mkdtempSync(join(tmpdir(), `${randomBytes(8).readBigUInt64LE(0).toString()}-`)))

/** transforms the TypeScript config file config.ts in project root directory */
export const readConfigFile = async ({ configFilePath }: ReadConfigFileOptions) => {
  const configFilePathParsed = parse(configFilePath)

  if (configFilePathParsed.ext === '.json') {
    return JSON.parse(await readFile(configFilePath, { encoding: 'utf-8' }))
  }

  if (configFilePathParsed.ext === '.json5') {
    return JSON5.parse(await readFile(configFilePath, { encoding: 'utf-8' }))
  }

  const tmpDir = makeTempDir()
  const outfile = join(tmpDir, 'config.js')

  await build({
    platform: 'node',
    format: 'esm',
    jsx: 'preserve',
    target: 'es2020',
    logLevel: 'error',
    bundle: false,
    external: undefined,
    sourcemap: 'both',
    entryPoints: [configFilePath],
    outfile,
  } as BuildOptions)

  const jsCode = await readFile(outfile, { encoding: 'utf8' })

  await rm(outfile)

  // by evaluating, the config is returned including optional
  // hook function references. code can be executed "as is" to
  // pre/post default pipelines such as "build" or to fully customize
  return (await run<typeof global, { default: any }>(jsCode, global, { identifier: configFilePath })).exports.default
}
