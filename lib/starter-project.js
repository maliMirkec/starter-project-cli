const clipboardy = require('clipboardy');

const log = require('./log');
const files = require('./files');
const config = require('./config');

const run = (answers) => {
  const destPath = answers.proot;
  const helpers = ['_.editorconfig', '_gulpfile.js/index.js', '_gulpfile.js/clean.js', '_gulpfile.js/helpers.js', '_gulpfile.js/.helpers.json', '_gulpfile.js/.watch.json'];
  const libs = ['del', 'gulp', 'gulp-if', 'gulp-wait', 'gulp-exit'];

  const answerKeys = Object.keys(answers);

  for (let i = 0; i < answerKeys.length; i += 1) {
    const answer = answers[answerKeys[i]];

    if (answerKeys[i].indexOf('override') === -1) {
      config.setOptionValue(answerKeys[i], answer);
    }

    if (answer.run) {
      switch (answerKeys[i]) {
        case 'bump':
          helpers.push('_gulpfile.js/bump.js');
          helpers.push('_gulpfile.js/.bump.json');

          libs.push('gulp-bump');

          break;
        case 'critical':
          helpers.push('_gulpfile.js/critical.js');
          helpers.push('_gulpfile.js/.critical.json');

          libs.push('gulp-penthouse');

          break;
        case 'css':
          helpers.push('_gulpfile.js/css.js');
          helpers.push('_gulpfile.js/.css.json');

          libs.push('gulp-cssimport');

          if (answer.sass) {
            libs.push('gulp-sass');
          }

          if (answer.minify) {
            libs.push('gulp-clean-css');
          }

          if (answer.autoprefix) {
            helpers.push('_.browserslistrc');

            libs.push('gulp-autoprefixer');
            libs.push('gulp-rename');
          }

          if (answer.sourcemaps) {
            libs.push('gulp-sourcemaps');
          }

          if (answer.lint) {
            helpers.push('_.stylelintrc');

            libs.push('gulp-stylelint');
            libs.push('stylelint');
            libs.push('stylelint-config-sass-guidelines');
            libs.push('stylelint-order');
            libs.push('stylelint-scss');
          }

          break;
        case 'favicon':
          helpers.push('_gulpfile.js/favicon.js');
          helpers.push('_gulpfile.js/.favicon.json');
          helpers.push('_gulpfile.js/.favicon-data.json');

          libs.push('gulp-real-favicon');

          break;
        case 'fonts':
          helpers.push('_gulpfile.js/fonts.js');

          break;
        case 'gfx':
          helpers.push('_gulpfile.js/gfx.js');
          helpers.push('_gulpfile.js/.gfx.json');

          libs.push('gulp-imagemin');
          libs.push('imagemin-mozjpeg');
          libs.push('imagemin-pngquant');

          break;
        case 'html':
          helpers.push('_gulpfile.js/html.js');
          helpers.push('_gulpfile.js/.html.json');

          libs.push('path');
          libs.push('gulp-rename');

          if (answer.pug) {
            libs.push('gulp-pug');
          }

          if (answer.data) {
            libs.push('gulp-data');
          }

          if (answer.minify) {
            libs.push('gulp-htmlmin');
          }

          if (answer.inline) {
            libs.push('gulp-inline-source');
          }

          if (answer.lint) {
            helpers.push('_.htmllintrc');

            libs.push('gulp-htmllint');
          }

          break;
        case 'js':
          helpers.push('_gulpfile.js/js.js');
          helpers.push('_gulpfile.js/.js.json');
          helpers.push('_gulpfile.js/webpack.js');

          libs.push('babel-loader');
          libs.push('@babel/core');
          libs.push('@babel/preset-env');
          libs.push('gulp-include');
          libs.push('webpack');
          libs.push('webpack-stream');

          if (answer.uglify) {
            libs.push('gulp-uglify');
            libs.push('gulp-rename');
          }

          if (answer.lint) {
            helpers.push('_.eslintignore');
            helpers.push('_.eslintrc.json');
            libs.push('gulp-eslint');
            libs.push('eslint');
            libs.push('eslint-config-airbnb-base');
            libs.push('eslint-plugin-import');
            libs.push('eslint-plugin-node');
            libs.push('babel-eslint');
          }

          if (answer.sourcemaps) {
            libs.push('gulp-sourcemaps');
          }

          break;
        case 'jsdoc':
          helpers.push('_gulpfile.js/jsdoc.js');
          helpers.push('_gulpfile.js/.jsdoc.json');

          libs.push('gulp-jsdoc3');

          break;
        case 'kss':
          helpers.push('_gulpfile.js/kss.js');
          helpers.push('_gulpfile.js/.kss.json');

          libs.push('kss');

          break;
        case 'sassdoc':
          helpers.push('_gulpfile.js/sassdoc.js');
          helpers.push('_gulpfile.js/.sassdoc.json');

          libs.push('sassdoc');

          break;
        case 'sync':
          helpers.push('_gulpfile.js/sync.js');
          helpers.push('_gulpfile.js/.sync.json');

          libs.push('browser-sync');

          break;
        default:
          break;
      }
    }
  }

  if (!answers.override2) {
    log.message('SPRO aborted!');
  } else {
    const gulpPath = `${files.slash(destPath)}gulpfile.js`;

    files.makeDirectory(gulpPath);

    for (let i = 0; i < helpers.length; i += 1) {
      if (answers.override2) {
        files.copyFile(helpers[i], destPath, helpers[i], true);
      }
    }

    const saved = config.save(destPath);

    if (saved) {
      const cmd = `${answers.yarn ? 'yarn add -s -D' : 'npm i -s -D'} ${libs.join(' ')}`;

      clipboardy.writeSync(cmd);

      log.message('Config saved successfully! Use the following command to install gulp dependencies:\n', false);
      log.message(cmd, false);
      log.message('\nCommand is copied to clipboard.');
      log.message('\nWarning: installation could last for a few minutes.');
    } else {
      log.message('Config not saved!');
    }
  }
};

module.exports = {
  run,
};
