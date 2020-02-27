const inquirer = require('inquirer');
const config = require('./config');

const basicInteraction = () => {
  const questions = [
    {
      type: 'confirm',
      name: 'override',
      message: '    GENERAL | Do you want to override the project? Be sure to commit all changes before you proceed.',
      default: true,
    }, {
      type: 'input',
      name: 'proot',
      message: '    GENERAL | What is the root folder of the project?',
      default: config.getOptionValue('proot'),
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'This field cannot be empty.';
      },
      when(answers) {
        return answers.override === true;
      },
    }, {
      type: 'input',
      name: 'src',
      message: '    GENERAL | Where is the folder with the source code of the project (relative to default path)?',
      default: config.getOptionValue('src'),
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'This field cannot be empty.';
      },
      when(answers) {
        return answers.override === true;
      },
    }, {
      type: 'input',
      name: 'dist',
      message: '    GENERAL | Where do you want to store compiled code of the project (relative to default path)?',
      default: config.getOptionValue('dist'),
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'This field cannot be empty.';
      },
      when(answers) {
        return answers.override === true;
      },
    }, {
      type: 'confirm',
      name: 'override2',
      message: '    GENERAL | Are you sure that you want to override the project?',
      default: true,
      when(answers) {
        return answers.override === true;
      },
    }, {
      type: 'confirm',
      name: 'sync[run]',
      message: 'BROWSERSYNC | Do you want to run BrowserSync to preview changes in the browser?',
      default: config.getOptionValue('sync.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'html[run]',
      message: '       HTML | Do you want to run HTML tasks?',
      default: config.getOptionValue('html.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'html[pug]',
      message: '       HTML | Are you using Pug as a template engine?',
      default: config.getOptionValue('html.pug'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true;
      },
    }, {
      type: 'confirm',
      name: 'html[pug]',
      message: '       HTML | Do you want to inject data into pug files?',
      default: config.getOptionValue('html.data'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true && answers.html.pug === true;
      },
    }, {
      type: 'confirm',
      name: 'html[inline]',
      message: '       HTML | Do you want to run inline source tasks (inline CSS or SVG in HTML code)?',
      default: config.getOptionValue('html.inline'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true && answers.html.pug === true;
      },
    }, {
      type: 'input',
      name: 'html[src]',
      message: '       HTML | Where is the folder with HTML source code (relative to default source path)?',
      default: config.getOptionValue('html.src'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true;
      },
    }, {
      type: 'input',
      name: 'html[dist]',
      message: '       HTML | Where do you want to store compiled HTML code (relative to default destination path)?',
      default: config.getOptionValue('html.dist'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true;
      },
    }, {
      type: 'confirm',
      name: 'html[minify]',
      message: '       HTML | Do you want to minify HTML code?',
      default: config.getOptionValue('html.minify'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true;
      },
    }, {
      type: 'confirm',
      name: 'html[lint]',
      message: '       HTML | Do you want to lint HTML code?',
      default: config.getOptionValue('html.lint'),
      when(answers) {
        return answers.override2 === true && answers.html.run === true;
      },
    }, {
      type: 'confirm',
      name: 'css[run]',
      message: '        CSS | Do you want to run CSS tasks?',
      default: config.getOptionValue('css.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'css[sass]',
      message: '        CSS | Are you using Sass?',
      default: config.getOptionValue('css.sass'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'input',
      name: 'css[src]',
      message: '        CSS | Where is the folder with CSS source code (relative to default source path)?',
      default: config.getOptionValue('css.src'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'input',
      name: 'css[dist]',
      message: '        CSS | Where do you want to store compiled CSS code (relative to default destination path)?',
      default: config.getOptionValue('css.dist'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'confirm',
      name: 'css[minify]',
      message: '        CSS | Do you want to minify CSS code?',
      default: config.getOptionValue('css.minify'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'confirm',
      name: 'css[autoprefix]',
      message: '        CSS | Do you want to autoprefix CSS code?',
      default: config.getOptionValue('css.autoprefix'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'confirm',
      name: 'css[sourcemaps]',
      message: '        CSS | Do you want to add sourcemaps for CSS code?',
      default: config.getOptionValue('css.sourcemaps'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'confirm',
      name: 'css[lint]',
      message: '        CSS | Do you want to lint CSS code?',
      default: config.getOptionValue('css.lint'),
      when(answers) {
        return answers.override2 === true && answers.css.run === true;
      },
    }, {
      type: 'confirm',
      name: 'js[run]',
      message: '         JS | Do you want to run JavaScript (es6) tasks?',
      default: config.getOptionValue('js.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'js[src]',
      message: '         JS | Where is the folder with JavaScript source code (relative to default source path)?',
      default: config.getOptionValue('js.src'),
      when(answers) {
        return answers.override2 === true && answers.js.run === true;
      },
    }, {
      type: 'input',
      name: 'js[dist]',
      message: '         JS | Where do you want to store compiled JavaScript code (relative to default destination path)?',
      default: config.getOptionValue('js.dist'),
      when(answers) {
        return answers.override2 === true && answers.js.run === true;
      },
    }, {
      type: 'confirm',
      name: 'js[uglify]',
      message: '         JS | Do you want to minify JavaScript code?',
      default: config.getOptionValue('js.uglify'),
      when(answers) {
        return answers.override2 === true && answers.js.run === true;
      },
    }, {
      type: 'confirm',
      name: 'js[sourcemaps]',
      message: '         JS | Do you want to add sourcemaps for JavaScript code?',
      default: config.getOptionValue('js.sourcemaps'),
      when(answers) {
        return answers.override2 === true && answers.js.run === true;
      },
    }, {
      type: 'confirm',
      name: 'js[lint]',
      message: '         JS | Do you want to lint JavaScript code?',
      default: config.getOptionValue('js.lint'),
      when(answers) {
        return answers.override2 === true && answers.js.run === true;
      },
    }, {
      type: 'confirm',
      name: 'gfx[run]',
      message: '     IMAGES | Do you want to run image optimization tasks?',
      default: config.getOptionValue('gfx.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'gfx[src]',
      message: '     IMAGES | Where is the folder with images (relative to default source path)?',
      default: config.getOptionValue('gfx.src'),
      when(answers) {
        return answers.override2 === true && answers.gfx.run === true;
      },
    }, {
      type: 'input',
      name: 'gfx[dist]',
      message: '     IMAGES | Where do you want to store optimized images (relative to default destination path)?',
      default: config.getOptionValue('gfx.dist'),
      when(answers) {
        return answers.override2 === true && answers.gfx.run === true;
      },
    }, {
      type: 'confirm',
      name: 'fonts[run]',
      message: '      FONTS | Do you use local fonts? Do you want to run font tasks?',
      default: config.getOptionValue('fonts.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'fonts[src]',
      message: '      FONTS | Where is the folder with local fonts (relative to default source path)?',
      default: config.getOptionValue('fonts.src'),
      when(answers) {
        return answers.override2 === true && answers.fonts.run === true;
      },
    }, {
      type: 'input',
      name: 'fonts[dist]',
      message: '      FONTS | Where do you want to store local fonts (relative to default destination path)?',
      default: config.getOptionValue('fonts.dist'),
      when(answers) {
        return answers.override2 === true && answers.fonts.run === true;
      },
    }, {
      type: 'confirm',
      name: 'favicon[run]',
      message: '    FAVICON | Do you want to run favicon tasks?',
      default: config.getOptionValue('favicon.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'critical[run]',
      message: '   CRITICAL | Do you want to extract Critical CSS?',
      default: config.getOptionValue('critical.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'kss[run]',
      message: '        KSS | Do you want to add KSS style guide?',
      default: config.getOptionValue('kss.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'kss[dist]',
      message: '        KSS | Where do you want to store KSS style guide (relative to default destination path)?',
      default: config.getOptionValue('kss.dist'),
      when(answers) {
        return answers.override2 === true && answers.kss.run === true;
      },
    }, {
      type: 'confirm',
      name: 'sassdoc[run]',
      message: '    SASSDOC | Do you want to add documentation for the SASS code (SassDoc)?',
      default: config.getOptionValue('sassdoc.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'sassdoc[dist]',
      message: '    SASSDOC | Where do you want to store SassDoc files (relative to default destination path)?',
      default: config.getOptionValue('sassdoc.dist'),
      when(answers) {
        return answers.override2 === true && answers.sassdoc.run === true;
      },
    }, {
      type: 'confirm',
      name: 'jsdoc[run]',
      message: '      JSDOC | Do you want to add documentation for the JS code (JSDoc)?',
      default: config.getOptionValue('jsdoc.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'input',
      name: 'jsdoc[dist]',
      message: '      JSDOC | Where do you want to store JSdoc files (relative to default destination path)?',
      default: config.getOptionValue('jsdoc.dist'),
      when(answers) {
        return answers.override2 === true && answers.jsdoc.run === true;
      },
    }, {
      type: 'confirm',
      name: 'bump[run]',
      message: '     SEMVER | Do you want to add semver versioning tasks (for automatic bump of any version in any file which supports semver versioning, like package.json)?',
      default: config.getOptionValue('bump.run'),
      when(answers) {
        return answers.override2 === true;
      },
    }, {
      type: 'confirm',
      name: 'yarn',
      message: '       YARN | Do you use Yarn as your default dependency manager?',
      default: config.getOptionValue('yarn'),
      when(answers) {
        return answers.override2 === true;
      },
    },
  ];
  return inquirer.prompt(questions);
};

module.exports = {
  basicInteraction,
};
