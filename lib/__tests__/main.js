const module = require('../main');

describe('import2require', () => {
  describe('convertContent', () => {
    it.each([
      // input | expected
      [
        "import moduleName from 'module-name';",
        "const moduleName = require('module-name');",
      ],
      [
        "import moduleName from './module-name.js';",
        "const moduleName = require('./module-name.js');",
      ],
      [
        "import { methodA, methodB } from 'module-name';",
        "const { methodA, methodB } = require('module-name');",
      ],
      [
        dedent`
        import {
          methodA,
          methodB,
        } from 'module-name';`,
        dedent`
        const {
          methodA,
          methodB,
        } = require('module-name');`,
      ],
      ['export default function() {', 'module.exports = function() {'],
    ])('%s => %s', async (input, expected) => {
      const actual = module.convertContent(input);
      expect(actual).toEqual(expected);
    });
  });
});
