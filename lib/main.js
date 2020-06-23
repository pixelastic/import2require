const exists = require('firost/lib/exists');
const read = require('firost/lib/read');
const write = require('firost/lib/write');
const pMap = require('golgoth/lib/pMap');
const _ = require('golgoth/lib/lodash');
module.exports = {
  /**
   * Convert all import statement to require
   * @param {string} content Initial file content
   * @returns {string} Converted file content
   **/
  convertImport(content) {
    const regexp = /^import (?<variableName>(.|\n)*?) from (?<moduleName>.*);$/gm;
    return content.replace(
      regexp,
      'const $<variableName> = require($<moduleName>);'
    );
  },
  /**
   * Convert all export default statement to module.exports
   * @param {string} content Initial file content
   * @returns {string} Converted file content
   **/
  convertExport(content) {
    const regexp = /^export default (?<exportedModule>.*)$/;
    return content.replace(regexp, 'module.exports = $<exportedModule>');
  },
  /**
   * Convert content to use require/module.exports instead of import/export
   * @param {string} content Initial file content
   * @returns {string} Converted file content
   **/
  convertContent(content) {
    return _.chain(content)
      .thru(this.convertImport)
      .thru(this.convertExport)
      .value();
  },
  /**
   * Convert content of a file in place
   * @param {string} filepath Path to the file to convert
   * @returns {boolean} true on success, false otherwise
   **/
  async convertFile(filepath) {
    const fileExists = await exists(filepath);
    if (!fileExists) {
      return false;
    }

    const initialContent = await read(filepath);
    const newContent = this.convertContent(initialContent);

    await write(newContent, filepath);
    return true;
  },
  /**
   * Convert content of all files passes
   * @param {Array} files Array of filepaths to convert
   **/
  async run(files) {
    await pMap(files, async filepath => {
      await this.convertFile(filepath);
    });
  },
};
