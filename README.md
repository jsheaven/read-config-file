<h1 align="center">@jsheaven/read-config-file</h1>

> Tiny library to read config files like `your.config.js`, `your.config.mjs`, `your.config.ts`, `your.conifg.json` or `your.config.json5` from disk.

<h2 align="center">User Stories</h2>

1. As a developer, I want to read config files for my project/library/framework
2. As a developer, I don't want to write that code again and again

<h2 align="center">Features</h2>

- ✅ Reads and evalutates config files from disk: `.js`, `.mjs`, `.ts`, `.json` and `.json5`
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `636 bytes` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (CLI)</h2>

`NODE_OPTIONS='--experimental-vm-modules' npx @jsheaven/read-config-file --config ./test/some.config.ts`

> You need at least version 18 of [Node.js](https://www.nodejs.org) installed.

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h2>

- yarn: `yarn add @jsheaven/read-config-file`
- npm: `npm install @jsheaven/read-config-file`

<h3 align="center">ESM</h2>

```ts
import { readConfigFile } from '@jsheaven/read-config-file'

const result = await readConfigFile({
  configFilePath: './test/some.config.ts',
})
```

<h3 align="center">CommonJS</h2>

```ts
const { readConfigFile } = require('@jsheaven/read-config-file')

// same API like ESM variant
```
