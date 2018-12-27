const gulp = require('gulp')
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')
const htmllint = require('gulp-htmllint')
const rename = require('gulp-rename')
const inlineSource = require('gulp-inline-source')
const path = require('path')

https:// stackoverflow.com/questions/27689351/how-can-i-use-a-glob-to-ignore-files-that-start-with-an-underscore

gulp.task('html:dist', () => gulp.src(`${global.config.proot + global.config.html.src}.pug`)
  .pipe(pug(global.config.html.pugConfig))
  .pipe(htmllint(global.config.html.htmllintConfig))
  .pipe(htmlmin(global.config.html.htmlminConfig))
  .pipe(inlineSource({
    rootpath: path.resolve(global.config.proot + global.config.html.inlineSourcePath)
  }))
  .pipe(rename(global.config.html.renameConfig))
  .pipe(gulp.dest(global.config.proot + global.config.html.dest)))

gulp.task('html:dev', () => gulp.src(`${global.config.proot + global.config.html.src}.pug`)
  .pipe(pug(global.config.html.pugConfig))
  .pipe(htmllint(global.config.html.htmllintConfig))
  .pipe(inlineSource({
    rootpath: path.resolve(global.config.proot + global.config.html.inlineSourcePath),
    ignore: ['css', 'script']
  }))
  .pipe(rename(global.config.html.renameConfig))
  .pipe(gulp.dest(global.config.proot + global.config.html.dest)))
