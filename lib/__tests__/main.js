const current = require('../main');

describe('import2require', () => {
  describe('convertContent', () => {
    it.each([
      // input | expected
      [
        "import currentName from 'current-name';",
        "const currentName = require('current-name');",
      ],
      [
        "import currentName from './current-name.js';",
        "const currentName = require('./current-name.js');",
      ],
      [
        "import { methodA, methodB } from 'current-name';",
        "const { methodA, methodB } = require('current-name');",
      ],
      [
        dedent`
        import {
          methodA,
          methodB,
        } from 'current-name';`,
        dedent`
        const {
          methodA,
          methodB,
        } = require('current-name');`,
      ],
      ['export default function() {', 'module.exports = function() {'],
      [
        dedent`
      import currentName from './current.js';
      import helper from './helper.js';`,
        dedent`
      const currentName = require('./current.js');
      const helper = require('./helper.js');`,
      ],
    ])('%s => %s', async (input, expected) => {
      const actual = current.convertContent(input);
      expect(actual).toEqual(expected);
    });
  });
});
