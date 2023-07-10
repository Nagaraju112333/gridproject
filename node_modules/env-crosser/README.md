# Env crosser [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/env-crosser/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/env-crosser)

Return a specific value depending on the environment.

[![NPM Badge](https://nodei.co/npm/env-crosser.png)](https://npmjs.com/package/env-crosser)

## Install

```sh
npm install env-crosser
```

## Usage

```js
const envCrosser = require("env-crosser");

envCrosser({
    browser: "Browser!",
    worker: "Web Worker!",
    node: "NodeJS!",
    fallback: "???"
})
//=> "NodeJS!" (When using NodeJS)
```

## API

### envCrosser(values)

#### values

Type: `object`

##### browser

Type: `any`

The value to return in a browser.

##### worker

Type: `any`

The value to return in a web worker.

##### node

Type: `any`

The value to return in NodeJS.

##### fallback

Type: `any`

The value to fall back to if all the other checks fail or a corresponding value isn't provided.
