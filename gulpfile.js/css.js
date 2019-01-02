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
    `${helpers.proot()}/node_modules/modularscale-sass/stylesheets/`,
    `${helpers.proot()}/node_modules/sass-mq/`,
    `${helpers.proot()}/node_modules/normalize.css/`,
    `${helpers.src()}/scss/`,
    `${helpers.src()}/scss/components/`
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

const sourcemapsConfig = `${helpers.src()}/${helpers.trim(global.config.css.dist)}`

function cssMinify () {
  return src(`${helpers.src()}/${helpers.trim(global.config.css.dist)}/*.critical.scss`)
    .pipe(cleanCSS())
    .pipe(rename(renameConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
}

function cssStart () {
  return src(`${helpers.src()}/${helpers.trim(global.config.css.src)}/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(gulpStylelint(styleLintConfig))
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(cssimport())
    .pipe(autoprefixer(autoprefixedConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
    .pipe(cleanCSS())
    .pipe(rename(renameConfig))
    .pipe(sourcemaps.write(sourcemapsConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
}

function cssListen () {
  watch(`${helpers.src()}/${helpers.trim(global.config.css.src)}/*.scss`, watchConfig, cssStart)
  watch(`${helpers.src()}/${helpers.trim(global.config.css.dist)}/*.critical.scss`, watchConfig, cssMinify)
}

exports.css = {
  cssMinify,
  cssStart,
  cssListen
}
