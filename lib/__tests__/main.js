const module = require('../main');

describe('import2require', () => {
  describe('convertImportLine', () => {
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
      const actual = module.convertImportLine(input);
      expect(actual).toEqual(expected);
    });
  });
  describe('convertExportLine', () => {
    it.each([
      // input | expected
      ['export default function() {', 'module.exports = function() {'],
    ])('%s => %s', async (input, expected) => {
      const actual = module.convertExportLine(input);
      expect(actual).toEqual(expected);
    });
  });
});
