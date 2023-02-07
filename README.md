<h1 align="center">read-config-file</h1>

> Explains what it does

<h2 align="center">User Stories</h2>

1. As a developer, I want to use ReadConfigFile for X

2. As a developer, I don't want to do Y

<h2 align="center">Features</h2>

- ✅ Does X and Y
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `136 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Example usage (CLI)</h2>

`npx read-config-file readConfigFile --foo X`

> You need at least version 18 of [Node.js](https://www.nodejs.org) installed.

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h2>

- yarn: `yarn add read-config-file`
- npm: `npm install read-config-file`

<h3 align="center">ESM</h2>

```ts
import { readConfigFile } from 'read-config-file'

const result = await readConfigFile({
  foo: 'X',
})
```

<h3 align="center">CommonJS</h2>

```ts
const { readConfigFile } = require('read-config-file')

// same API like ESM variant
```
