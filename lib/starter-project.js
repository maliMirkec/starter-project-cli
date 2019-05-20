const clipboardy = require('clipboardy')

const log = require('./log')
const files = require('./files')
const config = require('./config')

const run = (answers) => {
  const destPath = answers.proot
  const helpers = ['.editorconfig', 'gulpfile.js/index.js', 'gulpfile.js/clean.js', 'gulpfile.js/helpers.js', 'gulpfile.js/.helpers.json', 'gulpfile.js/.watch.json']
  const libs = ['del', 'gulp', 'gulp-if', 'gulp-wait', 'gulp-exit']

  const answerKeys = Object.keys(answers)

  for (let i = 0; i < answerKeys.length; i += 1) {
    const answer = answers[answerKeys[i]]

    if (answerKeys[i].indexOf('override') === -1) {
      config.setOptionValue(answerKeys[i], answer)
    }

    if (answer.run) {
      switch (answerKeys[i]) {
        case 'bump':
          helpers.push('gulpfile.js/bump.js')
          helpers.push('gulpfile.js/.bump.json')

          libs.push('gulp-bump')

          break
        case 'critical':
          helpers.push('gulpfile.js/critical.js')
          helpers.push('gulpfile.js/.critical.json')

          libs.push('gulp-penthouse')

          break
        case 'css':
          helpers.push('gulpfile.js/css.js')
          helpers.push('gulpfile.js/.css.json')

          libs.push('gulp-cssimport')

          if (answer.sass) {
            libs.push('gulp-sass')
          }

          if (answer.minify) {
            libs.push('gulp-clean-css')
          }

          if (answer.autoprefix) {
            libs.push('gulp-autoprefixer')
            libs.push('gulp-rename')
          }

          if (answer.sourcemaps) {
            libs.push('gulp-sourcemaps')
          }

          if (answer.lint) {
            helpers.push('.stylelintrc')

            libs.push('gulp-stylelint')
            libs.push('stylelint')
            libs.push('stylelint-config-sass-guidelines')
            libs.push('stylelint-order')
            libs.push('stylelint-scss')
          }

          break
        case 'favicon':
          helpers.push('gulpfile.js/favicon.js')
          helpers.push('gulpfile.js/.favicon.json')
          helpers.push('gulpfile.js/.favicon-data.json')

          libs.push('gulp-real-favicon')

          break
        case 'fonts':
          helpers.push('gulpfile.js/fonts.js')

          break
        case 'gfx':
          helpers.push('gulpfile.js/gfx.js')
          helpers.push('gulpfile.js/.gfx.json')

          libs.push('gulp-imagemin')
          libs.push('imagemin-mozjpeg')
          libs.push('imagemin-pngquant')

          break
        case 'gzip':
          helpers.push('gulpfile.js/gzip.js')
          helpers.push('gulpfile.js/.gzip.json')

          libs.push('gulp-gzip')

          break
        case 'html':
          helpers.push('gulpfile.js/html.js')
          helpers.push('gulpfile.js/.html.json')

          libs.push('path')
          libs.push('gulp-rename')

          if (answer.pug) {
            libs.push('gulp-pug')
          }

          if (answer.minify) {
            libs.push('gulp-htmlmin')
          }

          if (answer.inline) {
            libs.push('gulp-inline-source')
          }

          if (answer.lint) {
            helpers.push('.htmllintrc')

            libs.push('gulp-htmllint')
          }

          break
        case 'js':
          helpers.push('gulpfile.js/js.js')
          helpers.push('gulpfile.js/.js.json')

          libs.push('gulp-babel')
          libs.push('@babel/core')
          libs.push('@babel/preset-env')
          libs.push('gulp-include')

          if (answer.uglify) {
            libs.push('gulp-uglify')
            libs.push('gulp-rename')
          }

          if (answer.lint) {
            helpers.push('.eslintignore')
            helpers.push('.eslintrc.json')

            webpack
            libs.push('gulp-eslint')
            libs.push('gulp-standard')
            libs.push('eslint')
            libs.push('eslint-config-airbnb-base')
            libs.push('eslint-config-standard')
            libs.push('eslint-plugin-import')
            libs.push('eslint-plugin-node')
            libs.push('eslint-plugin-standard')
          }

          if (answer.sourcemaps) {
            libs.push('gulp-sourcemaps')
          }

          break
        case 'jsdoc':
          helpers.push('gulpfile.js/jsdoc.js')
          helpers.push('gulpfile.js/.jsdoc.json')

          libs.push('gulp-jsdoc3')

          break
        case 'kss':
          helpers.push('gulpfile.js/kss.js')
          helpers.push('gulpfile.js/.kss.json')

          libs.push('kss')

          break
        case 'sassdoc':
          helpers.push('gulpfile.js/sassdoc.js')
          helpers.push('gulpfile.js/.sassdoc.json')

          libs.push('sassdoc')

          break
        case 'sync':
          helpers.push('gulpfile.js/sync.js')
          helpers.push('gulpfile.js/.sync.json')

          libs.push('browser-sync')

          break
        default:
          break
      }
    }
  }

  if (!answers.override2) {
    log.message('SPRO aborted!')
  } else {
    const gulpPath = `${files.slash(destPath)}gulpfile.js`

    files.makeDirectory(gulpPath)

    for (let i = 0; i < helpers.length; i += 1) {
      if (answers.override2) {
        files.copyFile(helpers[i], destPath, helpers[i], true)
      }
    }

    const saved = config.save(destPath)

    if (saved) {
      const cmd = `${answers.yarn ? 'yarn add -s -D' : 'npm i -s -D'} ${libs.join(' ')}`

      clipboardy.writeSync(cmd)

      log.message('Config saved successfully! Use the following command to install gulp dependencies:\n', false)
      log.message(cmd, false)
      log.message('\nCommand is copied to clipboard.')
      log.message('\nWarning: installation could last for a few minutes.')
    } else {
      log.message('Config not saved!')
    }
  }
}

module.exports = {
  run
}
