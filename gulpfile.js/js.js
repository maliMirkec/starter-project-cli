const { src, dest, watch } = require('gulp')
const gulpif = require('gulp-if')
const babel = require('gulp-babel')
const include = require('gulp-include')
const eslint = global.config.js.lint ? require('gulp-eslint') : false
const standard = global.config.js.lint ? require('gulp-standard') : false
const sourcemaps = global.config.js.sourcemaps ? require('gulp-sourcemaps') : false
const uglify = global.config.js.uglify ? require('gulp-uglify') : false
const rename = global.config.js.uglify ? require('gulp-rename') : false

const { helpers } = require('./helpers')

const jsConfig = require('./.js.json')

// Will process JS files
function jsStart () {
  const thisEslintConfig = (global.config.js.lint)
    ? Object.assign({}, jsConfig.eslintConfig, {
      configFile: helpers.parse(jsConfig.eslintConfig.configFile)
    })
    : {}

  const thisIncludePaths = jsConfig.includeConfig.includePaths.map(path => helpers.parse(path))

  const thisIncludeConfig = Object.assign({}, jsConfig.includeConfig, {
    includePaths: thisIncludePaths
  })

  return src(`${helpers.source()}/${helpers.trim(global.config.js.src)}/*.js`)
    .pipe(gulpif(global.config.js.sourcemaps, sourcemaps.init()))
    .pipe(gulpif(global.config.js.lint, standard()))
    .pipe(gulpif(global.config.js.lint, standard.reporter('default', jsConfig.standardConfig)))
    .pipe(gulpif(global.config.js.lint, eslint(thisEslintConfig)))
    .pipe(gulpif(global.config.js.lint, eslint.format()))
    .pipe(gulpif(global.config.js.lint, eslint.failAfterError()))
    .pipe(gulpif(global.config.js.lint, eslint.result((result) => {
      console.log(`[JS] ESLint complete: ${result.filePath}`)
      console.log(`[JS] Messages: ${result.messages.length}`)
      console.warn(`[JS] Warnings: ${result.warningCount}`)
      console.error(`[JS] Errors: ${result.errorCount}`)
    })))
    .pipe(include(thisIncludeConfig))
    .pipe(babel(jsConfig.babelConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.js.dist)}`))
    .pipe(gulpif(global.config.js.uglify, uglify()))
    .pipe(gulpif(global.config.js.uglify, rename(jsConfig.renameConfig)))
    .pipe(gulpif(global.config.js.sourcemaps, sourcemaps.write(`${helpers.source()}/${helpers.trim(global.config.js.dist)}`)))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.js.dist)}`))
    .pipe(global.bs.stream())
}

// When JS file is changed, it will process JS file, too
function jsListen () {
  return watch(helpers.path(`${helpers.source()}/${helpers.trim(global.config.js.src)}/*.js`), global.config.watchConfig, jsStart, global.bs.reload)
}

exports.js = {
  jsStart,
  jsListen
}
