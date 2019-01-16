# node-vibrant
[![Build Status](https://travis-ci.org/akfish/node-vibrant.svg?branch=develop)](https://travis-ci.org/akfish/node-vibrant)

Extract prominent colors from an image.

- Identical API for both node.js and browser environment (with web worker)
- Support webpack

## v3.1.0-0

`node-vibrant` is now a monorepo. Building blocks of `node-vibrant` has been separated into multiple small packages under `@vibrant/*` scope. The goal is to make it more flexible, allowing alternative algorithms, additional image format support and etc to be implemented by 3rd party packages. 

The `node-vibrant` package still provides default experience out-of-box.

### Breaking Changes

* `strickNullChecks` flag is now enabled.
* Prebuilt bundle will not be provided. You should use your own `webpack` workflow.

## Install

```bash
$ npm install node-vibrant@3.1.0-0
```

## Usage

```typescript
// ES5
var Vibrant = require('node-vibrant')
// ES6
import * as Vibrant from 'node-vibrant'
// Or
const Vibrant = require('node-vibrant')
// TypeScript
import Vibrant = require('node-vibrant')

// Using builder
Vibrant.from('path/to/image').getPalette((err, palette) => console.log(palette))
// Promise
Vibrant.from('path/to/image').getPalette()
  .then((palette) => console.log(palette))

// Using constructor
let v = new Vibrant('path/to/image', opts)
v.getPalette((err, palette) => console.log(palette))
// Promise
v.getPalette().then((palette) => console.log(palette))
```

## Webpack configuration

The default browser entry for `node-vibrant` has web worker support. You should make sure that `worker-loader` is installed:

```
$ npm install --save-dev worker-loader
```

Add rules:
```js
{
  // ...
  module: {
    rules: [
      {
        test: /\.worker.js$/,
        loader: 'worker-loader',
        options: { /* ... */ }
      },
      // ...
    ]
  }
}
```

## Documentations

TODO

## Notes

### Result Consistency
The results is consistent within each user's browser instance regardelss of visible region or display size of the image, unlike the original `vibrant.js` implementation.

However, due to the very nature of HTML5 canvas element, image rendering is platform/machine-dependent. Thus the resulting swatches in browser environment varies and may not be the same as in node.js nor in another machine. See [Canvas Fingerprinting](https://en.wikipedia.org/wiki/Canvas_fingerprinting).

The test specs use CIE delta E 1994 color difference to measure inconsistencies across platforms. It compares the generated color on node.js, Chrome, Firefox and IE11. At `quality` == 1 (no downsampling) and no filters, the results are rather consistent. Color diffs between browsers are mostly not perceptible by human eyes. Downsampling _will_ cause perceptible inconsistent results across browsers due to differences in canvas implementations.