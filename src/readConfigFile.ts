export interface ReadConfigFileOptions {
  foo: string
}

export const readConfigFile = async ({ foo }: ReadConfigFileOptions) => {
  console.log('Running readConfigFile, --foo', foo)
}
