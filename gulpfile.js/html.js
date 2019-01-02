const { src, dest, watch } = require('gulp')
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')
const htmllint = require('gulp-htmllint')
const rename = require('gulp-rename')
const inlineSource = require('gulp-inline-source')
const path = require('path')

const { helpers } = require('./helpers')

const pugConfig = {
  pretty: true,
  basedir: `${helpers.src()}/${helpers.trim(global.config.html.src)}/`
}

const htmllintConfig = {
  config: `${helpers.proot()}/.htmllintrc`,
  failOnError: true
}

const htmlminConfig = {
  collapseWhitespace: true
}

const renameConfig = {
  extname: '.html'
}

const inlineConfig = {
  rootpath: path.resolve(helpers.dist())
}

const watchConfig = {
  ignoreInitial: false
}

function htmlStart () {
  return src(`${helpers.src()}/${helpers.trim(global.config.html.src)}/[^_]**/*.pug`)
    .pipe(pug(pugConfig))
    .pipe(htmllint(htmllintConfig))
    .pipe(htmlmin(htmlminConfig))
    .pipe(inlineSource(inlineConfig))
    .pipe(rename(renameConfig))
    .pipe(dest(`${helpers.dist()}/${helpers.trim(global.config.html.dist)}`))
}

function htmlListen () {
  watch(`${helpers.src()}/${helpers.trim(global.config.html.src)}/*.pug`, watchConfig, htmlStart)
}

exports.html = {
  htmlStart,
  htmlListen
}
