# Import2require

Command-line tool to convert `import` and `export` statements in JavaScript
files to `require` and `module.exports` instead.

This tool is meant to be used when you need to convert a codebase from one style
to the other.

## Example

```javascript
// This code...
import absalom from 'absalom';
import westcrown from './westcrown.js';
import { sandpoint, magnimar } from 'varisia';
import { nisroch, ridwan } from 'nidal';

export default {
  world: 'golarion',
};

// ...will be converted to
const absalom = require('absalom');
const westcrown = require('./westcrown.js');
const { sandpoint, magnimar } = require('varisia');
const { nisroch, ridwan } = require('nidal');

module.exports = {
  world: 'golarion',
};
```

## Usage

Install `import2require` locally or globally, then run `import2require
./path/to/files.js`. Make sure you backup your files before running it, just in
case.
