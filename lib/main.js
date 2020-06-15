const exists = require('firost/lib/exists');
const read = require('firost/lib/read');
const write = require('firost/lib/write');
const pMap = require('golgoth/lib/pMap');
const _ = require('golgoth/lib/lodash');
module.exports = {
  convertImportLine(line) {
    const regexp = /^import (?<variableName>.*) from (?<moduleName>.*);$/;
    const matches = line.match(regexp);
    if (!matches) {
      return line;
    }
    const { variableName, moduleName } = matches.groups;
    return `const ${variableName} = require(${moduleName});`;
  },
  convertExportLine(line) {
    const regexp = /^export default (?<exportedModule>.*)$/;
    const matches = line.match(regexp);
    if (!matches) {
      return line;
    }
    const { exportedModule } = matches.groups;
    return `module.exports = ${exportedModule}`;
  },
  async convertFile(filepath) {
    const fileExists = await exists(filepath);
    if (!fileExists) {
      return false;
    }

    const initialContent = await read(filepath);
    const newContent = _.chain(initialContent)
      .split('\n')
      .map(this.convertLine)
      .join('\n')
      .value();

    await write(newContent, filepath);
  },
  async run(files) {
    await pMap(files, async filepath => {
      await this.convertFile(filepath);
    });
  },
};
