const configPath = './.starter-project.json'
const files = require('./files')
const Configstore = require('configstore')

const conf = new Configstore('starter-project-cli', {
  override: true,
  proot: './dest/',
  src: 'src',
  dist: 'dist',
  gulp: '_gulp',
  override2: true,
  html: {
    run: true,
    src: 'html',
    dist: '',
    lint: false
  },
  css: {
    run: true,
    src: 'scss',
    dist: 'css',
    lint: true
  },
  js: {
    run: true,
    src: 'js',
    dist: 'js',
    lint: true
  },
  gfx: {
    run: true,
    src: 'gfx',
    dist: 'gfx'
  },
  fonts: {
    run: true,
    src: 'fonts',
    dist: 'fonts'
  },
  gzip: {
    run: true
  }
})

const getConf = () => conf.all

const getOptionValue = option => conf.get(option)

const setOptionValue = (option, value) => conf.set(option, value)

const save = () => {
  try {
    return files.saveFile(configPath, getConf())
  } catch (err) {
    return false
  }
}

module.exports = {
  getConf,
  getOptionValue,
  setOptionValue,
  save
}
