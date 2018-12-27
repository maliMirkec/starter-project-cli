const { series, parallel } = require('gulp')

global.config = require('./.starter-project.json')

const { browser } = require('./browser-sync')
const { bump } = require('./bump')
// require('./clean')
// require('./kill')
// require('./watch')

exports.bumpPatch = bump.patch
exports.bumpMinor = bump.minor
exports.bumpMajor = bump.major

exports.default = series(browser.sync)
// exports.dev = parallel()

if (process.env.NODE_ENV === 'production') {
  // exports.build = series(transpile, minify);
} else {
  // exports.build = series(transpile, livereload);
}

// gulp.task('dev:sequence', callback => runSequence('clean', global.config.gfx.run ? 'gfx' : null, global.config.fonts.run ? 'fonts' : null, global.config.js.run ? 'js' : null, global.config.jsdoc.run ? 'jsdoc' : null, global.config.css.run ? 'css' : null, global.config.html.run ? 'html:dev' : null, global.config.sassdoc.run ? 'sassdoc' : null, global.config.kss.run ? 'kss' : null, 'watch:dev', 'browser:sync', global.config.penthouse.run ? 'critical:dev' : null, global.config.kill.dev.run ? 'kill:delay' : null, callback))

// gulp.task('dev', ['dev:sequence'])

// gulp.task('docs:sequence', callback => runSequence('clean', global.config.gfx.run ? 'gfx' : null, global.config.fonts.run ? 'fonts' : null, global.config.js.run ? 'js' : null, global.config.jsdoc.run ? 'jsdoc' : null, global.config.css.run ? 'css' : null, global.config.sassdoc.run ? 'sassdoc' : null, global.config.kss.run ? 'kss' : null, global.config.html.run ? 'html:dev' : null, 'watch:docs', 'browser:sync', global.config.kill.docs.run ? 'kill:delay' : null, callback))

// gulp.task('docs', ['docs:sequence'])

// gulp.task('dist:sequence', callback => runSequence('clean', global.config.gfx.run ? 'gfx' : null, global.config.fonts.run ? 'fonts' : null, global.config.js.run ? 'js' : null, global.config.jsdoc.run ? 'jsdoc' : null, global.config.css.run ? 'css' : null, global.config.sassdoc.run ? 'sassdoc' : null, global.config.kss.run ? 'kss' : null, global.config.html.run ? 'html:dist' : null, 'watch:dist', 'browser:sync', global.config.penthouse.run ? 'critical:dist' : null, global.config.kill.dist.run ? 'kill:delay' : null, callback))

// gulp.task('dist', ['dist:sequence'])

// gulp.task('deploy:sequence', callback => runSequence('clean', global.config.favicon.run ? 'favicon' : null, global.config.gfx.run ? 'gfx' : null, global.config.fonts.run ? 'fonts' : null, global.config.js.run ? 'js:deploy' : null, global.config.jsdoc.run ? 'jsdoc' : null, global.config.css.run ? 'css:deploy' : null, global.config.sassdoc.run ? 'sassdoc' : null, global.config.kss.run ? 'kss' : null, global.config.html.run ? 'html:dist' : null, 'watch:dist', 'browser:sync', global.config.penthouse.run ? 'critical:deploy' : null, global.config.gzip.run ? 'gzip' : null, global.config.kill.deploy.run ? 'kill:delay' : null, callback))

// gulp.task('default', ['deploy:sequence'])
