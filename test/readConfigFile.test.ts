import { makeTempDir, readConfigFile, run } from '../dist/index.esm'

describe('readConfigFile', () => {
  it('can read some.config.js', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.js',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123, bar: 'bar' })
  })

  it('can read some.config.mjs', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.mjs',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123 })
  })

  it('can read some.config.ts', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.ts',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123, bar: 'bar' })
  })

  it('can read some.config.json', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.json',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123 })
  })

  it('can read some.config.json5', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.json5',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123 })
  })
})

describe('makeTempDir', () => {
  it('generates a hard-to-guess temporary folder', () => {
    expect(makeTempDir()).toBeDefined()
  })
})

describe('run', () => {
  it('evaluates an ESM module in a virtual machine', async () => {
    const contextData = {
      message: 'Hello, world!',
    }
    const scriptCode = `
      export const greet = () => message;
    `
    const { exports, global } = await run(scriptCode, contextData, {})

    expect(exports.greet).toBeDefined()
    expect(typeof exports.greet).toBe('function')
    expect(exports.greet()).toBe(contextData.message)
    expect(global).toEqual(contextData)
  })
})
