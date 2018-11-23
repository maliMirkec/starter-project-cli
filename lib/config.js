const configPath = './.improver.json'
const files = require('./files')
const Configstore = require('configstore')
const conf = new Configstore('improver-cli', {
  override: true,
  proot: './dest/',
  src: 'src',
  dist: 'dist',
  gulp: '_gulp',
  override2: true
})

const getConf = () => conf.all;

const getOptionValue = option => conf.get(option);

const setOptionValue = (option, value) => conf.set(option, value);

const save = () => {
  console.log(configPath, getConf());

  try {
    console.log(configPath, getConf());

    return files.saveFile(configPath, getConf())
  } catch (err) {
    return false
  }
}

module.exports = {
  getConf: getConf,
  getOptionValue: getOptionValue,
  setOptionValue: setOptionValue,
  save: save
}
