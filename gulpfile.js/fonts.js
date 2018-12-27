const gulp = require('gulp')

gulp.task('fonts', () => gulp.src(`${global.config.proot + global.config.fonts.src}**/*`)
  .pipe(gulp.dest(global.config.proot + global.config.dest + global.config.fonts.dest)))
