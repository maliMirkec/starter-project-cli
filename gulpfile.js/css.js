const { src, dest, watch } = require('gulp')
const gulpif = require('gulp-if')
const gulpStylelint = require('gulp-stylelint')
const sass = require('gulp-sass')
const cssimport = require('gulp-cssimport')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')

const { helpers } = require('./helpers')

const cssConfig = require('./.css.json')

// Will process Sass files
function cssStart () {
  const thisSassConfig = (global.config.css.sass)
    ? Object.assign({}, cssConfig.sassConfig, {
      includePaths: cssConfig.sassConfig.includePaths.map(path => helpers.parse(path))
    })
    : {}

  return src(`${helpers.source()}/${helpers.trim(global.config.css.src)}/*.scss`)
    .pipe(gulpif(global.config.css.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(global.config.css.lint, gulpStylelint(cssConfig.styleLintConfig)))
    .pipe(gulpif(global.config.css.sass, sass(thisSassConfig).on('error', sass.logError)))
    .pipe(cssimport())
    .pipe(gulpif(global.config.css.autoprefix, autoprefixer(cssConfig.autoprefixerConfig)))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
    .pipe(gulpif(global.config.css.minify, cleanCSS()))
    .pipe(gulpif(global.config.css.minify, rename(cssConfig.renameConfig)))
    .pipe(gulpif(global.config.css.sourcemaps, sourcemaps.write(`${helpers.source()}/${helpers.trim(global.config.css.dist)}`)))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
    .pipe(global.bs.stream())
}

// Will process non Critical Sass files
function cssStartListen () {
  const thisSassConfig = (global.config.css.sass)
    ? Object.assign({}, cssConfig.sassConfig, {
      includePaths: cssConfig.sassConfig.includePaths.map(path => helpers.parse(path))
    })
    : {}

  return src([`${helpers.source()}/${helpers.trim(global.config.css.src)}/*.scss`, `!${helpers.source()}/${helpers.trim(global.config.css.src)}/*.critical.scss`])
    .pipe(gulpif(global.config.css.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(global.config.css.lint, gulpStylelint(cssConfig.styleLintConfig)))
    .pipe(gulpif(global.config.css.sass, sass(thisSassConfig).on('error', sass.logError)))
    .pipe(cssimport())
    .pipe(autoprefixer(cssConfig.autoprefixerConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
    .pipe(gulpif(global.config.css.minify, cleanCSS()))
    .pipe(gulpif(global.config.css.minify, rename(cssConfig.renameConfig)))
    .pipe(gulpif(global.config.css.sourcemaps, sourcemaps.write(`${helpers.source()}/${helpers.trim(global.config.css.dist)}`)))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.css.dist)}`))
    .pipe(global.bs.stream())
}

// When Sass file is changed, it will process Sass file, too
function cssListen () {
  return watch(helpers.path(`${helpers.source()}/${helpers.trim(global.config.css.src)}/**/*.scss`), global.config.watchConfig, cssStartListen, global.bs.reload)
}

exports.css = {
  cssStart,
  cssListen
}
