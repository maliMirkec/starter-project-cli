const configPath = './gulpfile.js/.starter-project.json'
const Configstore = require('configstore')

const files = require('./files')
const log = require('./log')

const conf = new Configstore('starter-project-cli', {
  override: true,
  proot: './',
  src: 'src',
  dist: 'dist',
  override2: true,
  sync: {
    run: true
  },
  html: {
    run: true,
    pug: false,
    src: 'html',
    dist: '',
    lint: true
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
  favicon: {
    run: true
  },
  critical: {
    run: true
  },
  gzip: {
    run: true
  },
  kss: {
    run: true,
    dist: 'docs/styleguide'
  },
  sassdoc: {
    run: true,
    dist: 'docs/sass'
  },
  jsdoc: {
    run: true,
    dist: 'docs/js'
  }
})

const getConf = () => conf.all

const getOptionValue = option => conf.get(option)

const setOptionValue = (option, value) => conf.set(option, value)

const save = () => {
  try {
    return files.saveFile(configPath, getConf())
  } catch (err) {
    log.message(err)

    return false
  }
}

module.exports = {
  getConf,
  getOptionValue,
  setOptionValue,
  save
}
