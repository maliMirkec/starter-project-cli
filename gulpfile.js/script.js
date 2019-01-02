const { src, dest, watch } = require('gulp')
const eslint = require('gulp-eslint')
const gutil = require('gulp-util')
const babel = require('gulp-babel')
const include = require('gulp-include')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const standard = require('gulp-standard')

const { helpers } = require('./helpers')

const eslintConfig = {
  configFile: `${helpers.proot()}/.eslintrc.json`,
  fix: true,
  quiet: true
}

const includeConfig = {
  hardFail: true,
  includePaths: [
    `${helpers.proot()}/node_modules`
  ]
}

const babelConfig = {
  presets: ['@babel/env']
}

const standardConfig = {
  breakOnError: false,
  showRuleNames: true,
  standard: {
    globals: [
      'requestAnimationFrame',
      'sessionStorage'
    ]
  }
}

const renameConfig = {
  suffix: '.min'
}

const watchConfig = {
  ignoreInitial: false
}

const sourcemapsConfig = `${helpers.src()}/${helpers.trim(global.config.js.dist)}`

function jsStart () {
  return src(`${helpers.src()}/${helpers.trim(global.config.js.src)}/*.js`)
    .pipe(sourcemaps.init())
    .pipe(standard())
    .pipe(standard.reporter('default', standardConfig))
    .pipe(eslint(eslintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.result((result) => {
      gutil.log(gutil.colors.blue(`ESLint result: ${result.filePath}`))
      gutil.log(gutil.colors.green(`# Messages: ${result.messages.length}`))
      gutil.log(gutil.colors.yellow(`# Warnings: ${result.warningCount}`))
      gutil.log(gutil.colors.red(`# Errors: ${result.errorCount}`))
    }))
    .pipe(include(includeConfig))
    .pipe(babel(babelConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.js.dist)}`))
    .pipe(uglify())
    .pipe(rename(renameConfig))
    .pipe(sourcemaps.write(sourcemapsConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.js.dist)}`))
}

function jsListen () {
  watch(`${helpers.src()}/${helpers.trim(global.config.js.src)}/*.js`, watchConfig, jsStart)
}

exports.js = {
  jsStart,
  jsListen
}
