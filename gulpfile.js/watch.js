const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('bs-reload', () => {
  global.bs.reload()
})

function reloadHelper (taskArray) {
  return () => {
    runSequence(taskArray, 'bs-reload')
  }
}

gulp.task('watch:dev', () => {
  gulp.watch(`${global.config.proot + global.config.js.src}**/*.js`, reloadHelper(['js']))
  gulp.watch([
    `${global.config.proot + global.config.css.src}**/*.scss`,
    `!${global.config.proot + global.config.css.src}*.critical.scss`
  ], reloadHelper(['css:style']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.critical.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:critical']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.min.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:style']))
  gulp.watch(`${global.config.proot + global.config.html.watch}.pug`, reloadHelper(['html:dev']))
})

gulp.task('watch:docs', () => {
  gulp.watch(`${global.config.proot + global.config.js.src}**/*.js`, reloadHelper(['js']))
  gulp.watch([
    `${global.config.proot + global.config.css.src}**/*.scss`,
    `!${global.config.proot + global.config.css.src}*.critical.scss`
  ], reloadHelper(['css:style']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.critical.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:critical']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['html:dist']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.min.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:style']))
  gulp.watch(`${global.config.proot + global.config.html.watch}.pug`, reloadHelper(['html:dist']))
  gulp.watch(`${global.config.proot + global.config.dest + global.config.js.dest}**/*.js`, reloadHelper(['jsdoc']))
  gulp.watch(`${global.config.proot + global.config.dest + global.config.css.dest}**/*.css`, ['sassdoc', 'kss'])
})

gulp.task('watch:dist', () => {
  gulp.watch(`${global.config.proot + global.config.js.src}**/*.js`, reloadHelper(['js']))
  gulp.watch([
    `${global.config.proot + global.config.css.src}**/*.scss`,
    `!${global.config.proot + global.config.css.src}*.critical.scss`
  ], reloadHelper(['css:style']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.critical.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:critical']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['html:dist']))
  gulp.watch([`${global.config.proot + global.config.dest + global.config.css.dest}**/*.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.min.css`, `!${global.config.proot + global.config.dest + global.config.css.dest}/**/*.critical.min.css`], reloadHelper(['css:minify:style']))
  gulp.watch(`${global.config.proot + global.config.html.watch}.pug`, reloadHelper(['html:dist']))
})
