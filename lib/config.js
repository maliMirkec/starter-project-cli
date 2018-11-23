const Configstore = require('configstore');
const pkg = require('../config.json');
const conf = new Configstore(pkg.name, {
  'override': true,
  'proot': './dest/',
  'src': 'src',
  'dist': 'dist',
  'gulp': '_gulp',
  'override2': true
});

module.exports = {
  getPath: () => {
    return conf.path;
  },

  getOptionValue: (option) => {
    return conf.get(option);
  },

  setOptionValue: (option, value) => {
    return conf.set(option, value);
  }
}

