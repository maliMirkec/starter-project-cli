const { src, dest, watch } = require('gulp')
const gulpStylelint = require('gulp-stylelint')
const sass = require('gulp-sass')
const cssimport = require('gulp-cssimport')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const { helpers } = require('./helpers')

const sassConfig = {
  includePaths: [
    './node_modules/modularscale-sass/stylesheets/',
    './node_modules/sass-mq/',
    './node_modules/normalize.css/',
    './src/scss/',
    './src/scss/components'
  ]
}

const styleLintConfig = {
  reporters: [{
    formatter: 'string',
    console: true
  }]
}

const autoprefixedConfig = {
  browsers: ['last 5 versions'],
  cascade: false
}

const renameConfig = {
  suffix: '.min'
}

const watchConfig = {
  ignoreInitial: false
}

function minify () {
  return src(`${helpers.src()}/${helpers.trim(global.config.css.dist)}/*.critical.scss`)
    .pipe(cleanCSS())
    .pipe(rename(renameConfig))
    .pipe(dest(`${helpers.dist()}/${global.config.css.dist}`))
}

function start () {
  return src(`${helpers.src()}/${helpers.trim(global.config.css.src)}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(gulpStylelint(styleLintConfig))
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(cssimport())
    .pipe(autoprefixer(autoprefixedConfig))
    .pipe(sourcemaps.write())
    .pipe(dest(`${helpers.dist()}/${global.config.css.dist}`))
    .pipe(cleanCSS())
    .pipe(rename(renameConfig))
    .pipe(dest(`${helpers.dist()}/${global.config.css.dist}`))
}

function listen () {
  watch(`${helpers.src()}/${helpers.trim(global.config.css.src)}/*.scss`, watchConfig, start)
  watch(`${helpers.src()}/${helpers.trim(global.config.css.dist)}/*.critical.scss`, watchConfig, minify)
}

exports.css = {
  minify,
  start,
  listen
}
