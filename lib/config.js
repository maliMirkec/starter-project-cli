const Configstore = require('configstore')

const configPath = 'gulpfile.js/.starter-project.json'

const files = require('./files')
const log = require('./log')

const conf = new Configstore('starter-project-cli', {
  proot: './',
  src: 'src',
  dist: 'dist',
  sync: {
    run: true
  },
  html: {
    run: true,
    src: 'html',
    dist: '',
    pug: false,
    minify: true,
    inline: true,
    lint: true
  },
  css: {
    run: true,
    src: 'scss',
    dist: 'css',
    sass: true,
    minify: true,
    autoprefix: true,
    sourcemaps: true,
    lint: true
  },
  js: {
    run: true,
    src: 'js',
    dist: 'js',
    uglify: true,
    lint: true,
    sourcemaps: true
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
  },
  bump: {
    run: true
  }
})

const getConf = () => conf.all

const getOptionValue = option => conf.get(option)

const setOptionValue = (option, value) => conf.set(option, value)

const save = (dir) => {
  try {
    console.log(`${(dir.substr(-1) !== '/') ? `${dir}/` : dir}${configPath}`)
    return true
    // return files.saveFile(`${(dir.substr(-1) !== '/') ? `${dir}/` : dir}${configPath}`, getConf())
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
