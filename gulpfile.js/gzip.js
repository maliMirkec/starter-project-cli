const gulp = require('gulp')
const gzip = require('gulp-gzip')

gulp.task('gzip', () => gulp.src([`${global.config.proot + global.config.dest + global.config.gzip.src}/**/*`, `!${global.config.proot + global.config.dest + global.config.gzip.src}/**/*.gz`])
  .pipe(gzip(global.config.gzip.gzipConfig))
  .pipe(gulp.dest(global.config.proot + global.config.dest + global.config.gzip.dest)))
