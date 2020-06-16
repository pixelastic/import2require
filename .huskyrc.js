const config = require('aberlaas/lib/configs/husky.js');
module.exports = {
  hooks: {
    ...config.hooks,
    'prepare-commit-msg': 'yarn run husky:prepare-commit-msg',
  },
};
