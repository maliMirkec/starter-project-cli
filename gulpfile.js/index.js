const { series, parallel } = require('gulp')

global.config = require('./.starter-project.json')

const { browser } = require('./browser-sync')
const { bump } = require('./bump')
const { clean } = require('./clean')
const { css } = require('./css')
const { html } = require('./html')
const { js } = require('./script')

exports.bumpPatch = bump.patch
exports.bumpMinor = bump.minor
exports.bumpMajor = bump.major
exports.clean = clean.start
exports.html = html.htmlStart
exports.js = js.jsStart

exports.default = series(
  clean.start,
  css.cssStart,
  js.jsStart,
  html.htmlStart,
  browser.sync,
  css.cssListen,
  js.jsListen,
  html.htmlListen
)
// exports.dev = parallel()

if (process.env.NODE_ENV === 'production') {
  // exports.build = series(transpile, minify);
} else {
  // exports.build = series(transpile, livereload);
}
