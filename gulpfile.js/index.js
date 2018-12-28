const { series, parallel } = require('gulp')

global.config = require('./.starter-project.json')

const { browser } = require('./browser-sync')
const { bump } = require('./bump')
const { clean } = require('./clean')
const { css } = require('./css')

exports.bumpPatch = bump.patch
exports.bumpMinor = bump.minor
exports.bumpMajor = bump.major
exports.clean = clean.start

exports.default = series(clean.start, css.start, browser.sync, css.listen)
// exports.dev = parallel()

if (process.env.NODE_ENV === 'production') {
  // exports.build = series(transpile, minify);
} else {
  // exports.build = series(transpile, livereload);
}
