const log = require('./log')
const files = require('./files')
const config = require('./config')

const run = (answers) => {
  const destPath = './'
  const helpers = ['.editorconfig', 'gulpfile.js']
  const tasks = ['index.js', 'helpers.js', '.helpers.json', 'clean.js', '.clean.json']
  const libs = ['del', 'gulp', 'gulp-if', 'gulp-wait', 'gulp-exit']

  const answerKeys = Object.keys(answers)

  for (let i = 0; i < answerKeys.length; i += 1) {
    const answer = answers[answerKeys[i]]

    config.setOptionValue(answerKeys[i], answer)

    if (answer.run) {
      switch (answerKeys[i]) {
        case 'bump':
          tasks.push('bump.js')
          tasks.push('.bump.json')

          libs.push('gulp-bump')

          break
        case 'critical':
          tasks.push('critical.js')
          tasks.push('.critical.json')

          libs.push('gulp-penthouse')

          break
        case 'css':
          tasks.push('css.js')
          tasks.push('.css.json')

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
          tasks.push('favicon.js')
          tasks.push('.favicon.json')
          tasks.push('.favicon-data.json')

          libs.push('gulp-real-favicon')

          break
        case 'gfx':
          tasks.push('gfx.js')
          tasks.push('.gfx.json')

          libs.push('gulp-imagemin')
          libs.push('imagemin-mozjpeg')
          libs.push('imagemin-pngquant')

          break
        case 'gzip':
          tasks.push('gzip.js')
          tasks.push('.gzip.json')

          libs.push('gulp-gzip')

          break
        case 'html':
          tasks.push('html.js')
          tasks.push('.html.json')

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
          tasks.push('js.js')
          tasks.push('.js.json')

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
          tasks.push('jsdoc.js')
          tasks.push('.jsdoc.json')

          libs.push('gulp-jsdoc3')

          break
        case 'kss':
          tasks.push('kss.js')
          tasks.push('.kss.json')

          libs.push('kss')

          break
        case 'sassdoc':
          tasks.push('sassdoc.js')
          tasks.push('.sassdoc.json')

          libs.push('sassdoc')

          break
        case 'sync':
          tasks.push('sync.js')
          tasks.push('.sync.json')

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
    // log.message(tasks, false)
    // log.message(helpers, false)

    for (let i = 0; i < helpers.length; i += 1) {
      // if (!files.directoryExists(destPath)) {
      //   files.makeDirectory(destPath)
      // }

      if (answers.override2) {
        files.copyFile(helpers[i], destPath, helpers[i])
      }
    }

    const saved = config.save(answers.proot)

    if (saved) {
      log.message('Config saved successfully! Use the following command to install gulp dependencies:\n', false)
      log.message(`${answers.yarn ? 'yarn add -s -D' : 'npm i -s -D'} ${libs.join(' ')}`, false)
      log.message('\nWarning: installation could last for a few minutes.')
    } else {
      log.message('Config not saved!')
    }
  }
}

module.exports = {
  run
}
