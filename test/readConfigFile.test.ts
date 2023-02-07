import { readConfigFile } from '../dist/index.esm'

describe('readConfigFile', () => {
  it('can call readConfigFile', () => {
    readConfigFile({
      foo: 'X',
    })

    expect(readConfigFile).toBeDefined()
  })
})
