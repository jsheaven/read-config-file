#!/usr/bin/env node
'use strict'

import * as colors from 'kleur/colors'
import yargs from 'yargs-parser'
import { readConfigFile } from './readConfigFile'
import { getOwnVersion } from './version'

export type Arguments = yargs.Arguments

export enum Commands {
  HELP = 'help',
  VERSION = 'version',
  READ_CONFIG_FILE = 'readConfigFile',
}

export type Command = 'help' | 'version' | 'readConfigFile'

export interface CLIState {
  cmd: Command
  options: {
    configFilePath?: string
  }
}

/** Determine which action the user requested */
export const resolveArgs = (flags: Arguments): CLIState => {
  const options: CLIState['options'] = {
    configFilePath: typeof flags.config === 'string' ? flags.config : undefined,
  }

  if (flags.version) {
    return { cmd: 'version', options }
  } else if (flags.help) {
    return { cmd: 'help', options }
  }

  const cmd: Command = flags._[2] as Command
  switch (cmd) {
    case 'help':
      return { cmd: 'help', options }
    case 'readConfigFile':
      return { cmd: 'readConfigFile', options }
    default:
      return { cmd: 'version', options }
  }
}

/** Display --help flag */
const printHelp = () => {
  console.error(`
  ${colors.bold('read-config-file')} - reads config files

  ${colors.bold('Commands:')}
    readConfigFile        Reads a config file.
    version               Show the program version.
    help                  Show this help message.

  ${colors.bold('Flags:')}
    --config <path>       Path to the config file to read.
    --version             Show the version number and exit.
    --help                Show this help message.

  ${colors.bold('Example(s):')}
    NODE_OPTIONS='--experimental-vm-modules' npx read-config-file --config ./test/some.config.ts
`)
}

/** display --version flag */
const printVersion = async () => {
  console.log((await getOwnVersion()).version)
}

/** The primary CLI action */
export const cli = async (args: string[]) => {
  const flags = yargs(args)
  const state = resolveArgs(flags)
  const options = { ...state.options }

  console.log(
    colors.dim('>'),
    `${colors.bold(colors.yellow('read-config-file'))} @ ${colors.dim(
      (await getOwnVersion()).version,
    )}: ${colors.magenta(colors.bold(state.cmd))}`,
    colors.gray('...'),
  )

  switch (state.cmd) {
    case 'help': {
      printHelp()
      process.exit(0)
    }
    case 'version': {
      await printVersion()
      process.exit(0)
    }
    case 'readConfigFile': {
      try {
        const configData = await readConfigFile({
          configFilePath: options.configFilePath,
        })

        console.log(colors.green('Config read:'), options.configFilePath)
        console.log(JSON.stringify(configData, null, 2))
      } catch (e) {
        throwAndExit(e)
      }
      process.exit(0)
    }
    default: {
      throw new Error(`Error running ${state.cmd}`)
    }
  }
}

const printError = (err: any) => console.error(colors.red(err.toString() || err))

/** Display error and exit */
const throwAndExit = (err: any) => {
  printError(err)
  process.exit(1)
}

try {
  cli(process.argv)
} catch (error) {
  console.error(error)
  process.exit(1)
}
