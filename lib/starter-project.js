const log = require('./log')
const files = require('./files')
const config = require('./config')
const npm = require('./npm')

const run = (answers) => {
  const destPath = './'
  const helpers = ['.editorconfig', 'gulpfile.js']
  const libs = ['browser-sync', 'del', 'gulp', 'gulp-bump', 'gulp-cli', 'gulp-exit', 'gulp-if', 'gulp-include', 'gulp-rename', 'gulp-sourcemaps', 'gulp-util', 'gulp-wait', 'require-dir', 'run-sequence']

  const answerKeys = Object.keys(answers)

  for (let i = 0; i < answerKeys.length; i += 1) {
    const answer = answers[answerKeys[i]]

    config.setOptionValue(answerKeys[i], answer)

    console.log(answerKeys[i], answer)

    if (answer.run) {
      switch (answerKeys[i]) {
        case 'html':
          libs.push('gulp-pug')
          libs.push('gulp-htmlmin')
          libs.push('gulp-inline-source')
          libs.push('path')
          libs.push('jstransformer-markdown-it')
          break
        case 'css':
          libs.push('path')
          libs.push('gulp-sass')
          libs.push('gulp-cssimport')
          libs.push('gulp-autoprefixer')
          libs.push('gulp-clean-css')
          libs.push('sass-mq')
          libs.push('modularscale-sass')
          libs.push('normalize.css')
          break
        case 'js':
          libs.push('gulp-util')
          libs.push('gulp-babel')
          libs.push('gulp-include')
          libs.push('gulp-uglify')
          libs.push('babel-core')
          libs.push('babel-preset-env')
          break
        case 'gfx':
          libs.push('gulp-imagemin')
          libs.push('imagemin-mozjpeg')
          libs.push('imagemin-pngquant')
          break
        case 'favicon':
          libs.push('gulp-real-favicon')
          break
        case 'gzip':
          libs.push('gulp-gzip')
          break
        case 'penthouse':
          libs.push('gulp-penthouse')
          break
        case 'kss':
          libs.push('kss')
          break
        case 'sassdoc':
          libs.push('sassdoc')
          break
        case 'jsdoc':
          libs.push('gulp-jsdoc3')
          break
        default:
          break
      }
    }

    if (answer.lint) {
      switch (answerKeys[i]) {
        case 'html':
          helpers.push('.htmllintrc')
          libs.push('gulp-htmllint')
          break
        case 'css':
          helpers.push('.stylelintrc')
          libs.push('gulp-stylelint')
          libs.push('stylelint')
          libs.push('stylelint-config-sass-guidelines')
          libs.push('stylelint-order')
          libs.push('stylelint-scss')
          break
        case 'js':
          helpers.push('.eslintignore')
          helpers.push('.eslintrc.json')
          libs.push('gulp-eslint')
          libs.push('gulp-standard')
          libs.push('eslint')
          libs.push('eslint-config-airbnb-base')
          libs.push('eslint-config-standard')
          libs.push('eslint-plugin-import')
          libs.push('eslint-plugin-node')
          libs.push('eslint-plugin-standard')
          // libs.push('fontfaceobserver')
          break
        default:
          break
      }
    }
  }

  for (let i = 0; i < helpers.length; i += 1) {
    if (!files.directoryExists(destPath)) {
      files.makeDirectory(destPath)
    }

    if (!files.fileExists(`${destPath + helpers[i]}`)) {
      files.copyFile(helpers[i], destPath, helpers[i])
    }
  }

  npm.install(libs)

  const saved = config.save()

  log.message(saved ? 'Config saved successfully!' : 'Config not saved!', !saved)
}

module.exports = {
  run
}
