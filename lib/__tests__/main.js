const module = require('../main');

describe('import2require', () => {
  describe('convertLine', () => {
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
    ])('%s => %s', async (input, expected) => {
      const actual = module.convertLine(input);
      expect(actual).toEqual(expected);
    });
  });
});
