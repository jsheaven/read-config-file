import { readConfigFile } from '../dist/index.esm'

describe('readConfigFile', () => {
  it('can read some.config.js', async () => {
    const configData = await readConfigFile({
      configFilePath: './test/some.config.js',
    })

    expect(readConfigFile).toBeDefined()
    expect(configData).toEqual({ foo: 123 })
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
    expect(configData).toEqual({ foo: 123 })
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
