const configPath = './gulpfile.js/.starter-project.json'
const Configstore = require('configstore')

const files = require('./files')

const conf = new Configstore('starter-project-cli', {
  override: true,
  proot: './',
  src: 'src',
  dist: 'dist',
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
  favicons: {
    run: true,
    src: 'favicons',
    dist: 'favicons'
  },
  penthouse: {
    run: true
  },
  gzip: {
    run: true
  },
  kss: {
    run: true,
    dist: 'favicons'
  },
  sassdoc: {
    run: true
  },
  jsdoc: {
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
