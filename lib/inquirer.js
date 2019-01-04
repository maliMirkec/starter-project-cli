const inquirer = require('inquirer')
const config = require('./config')

// idea to intercept arguments with minimist https://www.npmjs.com/package/minimist

const basicInteraction = () => {
  const questions = [
    {
      type: 'confirm',
      name: 'override',
      message: '[GENERAL] Do you want to override the project? Be sure to commit all changes before you proceed.',
      default: config.getOptionValue('override')
    }, {
      type: 'input',
      name: 'proot',
      message: '[GENERAL] What is the root folder of the project?',
      default: config.getOptionValue('proot'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.override === true
      }
    }, {
      type: 'input',
      name: 'src',
      message: '[GENERAL] Where is the folder with source code of the project (relative to default path)?',
      default: config.getOptionValue('src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.override === true
      }
    }, {
      type: 'input',
      name: 'dist',
      message: '[GENERAL] Where do you want to store compiled code of the project (relative to default path)?',
      default: config.getOptionValue('dist'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.override === true
      }
    }, {
      type: 'confirm',
      name: 'override2',
      message: '[General] Are you absolutely sure that you want to override the project?',
      default: config.getOptionValue('override2'),
      when (answers) {
        return answers.override === true
      }
    }, {
      type: 'confirm',
      name: 'html[run]',
      message: '[HTML] Do you want to run HTML (Pug) tasks?',
      default: config.getOptionValue('html.run')
    }, {
      type: 'input',
      name: 'html[src]',
      message: '[HTML] Where is the folder with HTML source code (relative to default source path)?',
      default: config.getOptionValue('html.src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.html.run === true
      }
    }, {
      type: 'input',
      name: 'html[dist]',
      message: '[HTML] Where do you want to store compiled HTML code (relative to default destination path)?',
      default: config.getOptionValue('html.dist'),
      when (answers) {
        return answers.html.run === true
      }
    }, {
      type: 'confirm',
      name: 'html[lint]',
      message: '[HTML] Do you want to lint HTML code?',
      default: config.getOptionValue('html.lint'),
      when (answers) {
        return answers.html.run === true
      }
    }, {
      type: 'confirm',
      name: 'css[run]',
      message: '[CSS] Do you want to run CSS (Sass) tasks?',
      default: config.getOptionValue('css.run')
    }, {
      type: 'input',
      name: 'css[src]',
      message: '[CSS] Where is the folder with CSs source code (relative to default source path)?',
      default: config.getOptionValue('css.src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.css.run === true
      }
    }, {
      type: 'input',
      name: 'css[dist]',
      message: '[CSS] Where do you want to store compiled CSS code (relative to default destination path)?',
      default: config.getOptionValue('css.dist'),
      when (answers) {
        return answers.css.run === true
      }
    }, {
      type: 'confirm',
      name: 'css[lint]',
      message: '[CSS] Do you want to lint CSS code?',
      default: config.getOptionValue('css.lint'),
      when (answers) {
        return answers.css.run === true
      }
    }, {
      type: 'confirm',
      name: 'js[run]',
      message: '[JS] Do you want to run JS (es6) tasks?',
      default: config.getOptionValue('js.run')
    }, {
      type: 'input',
      name: 'js[src]',
      message: '[JS] Where is the folder with JS source code (relative to default source path)?',
      default: config.getOptionValue('js.src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.js.run === true
      }
    }, {
      type: 'input',
      name: 'js[dist]',
      message: '[JS] Where do you want to store compiled JS code (relative to default destination path)?',
      default: config.getOptionValue('js.dist'),
      when (answers) {
        return answers.js.run === true
      }
    }, {
      type: 'confirm',
      name: 'js[lint]',
      message: '[JS] Do you want to lint JS code?',
      default: config.getOptionValue('js.lint'),
      when (answers) {
        return answers.js.run === true
      }
    }, {
      type: 'confirm',
      name: 'gfx[run]',
      message: '[IMAGES] Do you want to run image optimization tasks?',
      default: config.getOptionValue('gfx.run')
    }, {
      type: 'input',
      name: 'gfx[src]',
      message: '[IMAGES] Where is the folder with images (relative to default source path)?',
      default: config.getOptionValue('gfx.src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.gfx.run === true
      }
    }, {
      type: 'input',
      name: 'gfx[dist]',
      message: '[IMAGES] Where do you want to store optimized images (relative to default destination path)?',
      default: config.getOptionValue('gfx.dist'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.gfx.run === true
      }
    }, {
      type: 'confirm',
      name: 'fonts[run]',
      message: '[FONTS] Do you use local fonts? Do you want to run font tasks?',
      default: config.getOptionValue('fonts.run')
    }, {
      type: 'input',
      name: 'fonts[src]',
      message: '[FONTS] Where is the folder with local fonts (relative to default source path)?',
      default: config.getOptionValue('fonts.src'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.fonts.run === true
      }
    }, {
      type: 'input',
      name: 'fonts[dist]',
      message: '[FONTS] Where do you want to store local fonts (relative to default destination path)?',
      default: config.getOptionValue('fonts.dist'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.fonts.run === true
      }
    }, {
      type: 'confirm',
      name: 'favicon[run]',
      message: '[FAVICON] Do you want to run favicon tasks?',
      default: config.getOptionValue('favicon.run')
    }, {
      type: 'confirm',
      name: 'critical[run]',
      message: '[CRITICAL] Do you use extract Critical CSS?',
      default: config.getOptionValue('critical.run')
    }, {
      type: 'confirm',
      name: 'gzip[run]',
      message: '[COMPRESS] Do you want to compress (gzip) all assets?',
      default: config.getOptionValue('gzip.run')
    }, {
      type: 'confirm',
      name: 'kss[run]',
      message: '[KSS] Do you want to add KSS style guide?',
      default: config.getOptionValue('kss.run')
    }, {
      type: 'input',
      name: 'kss[dist]',
      message: '[KSS] Where do you want to store KSS style guide (relative to default destination path)?',
      default: config.getOptionValue('kss.dist'),
      validate (value) {
        if (value.length) {
          return true
        }
        return 'This field cannot be empty.'
      },
      when (answers) {
        return answers.kss.run === true
      }
    }, {
      type: 'confirm',
      name: 'sassdoc[run]',
      message: '[SASSDOC] Do you want to add documentation for the SASS code (SassDoc)?',
      default: config.getOptionValue('sassdoc.run'),
      when (answers) {
        return answers.css.run === true
      }
    }, {
      type: 'confirm',
      name: 'jsdoc[run]',
      message: '[JSDOC] Do you want to add documentation for the JS code (JSDoc)?',
      default: config.getOptionValue('jsdoc.run'),
      when (answers) {
        return answers.css.run === true
      }
    }
  ]
  return inquirer.prompt(questions)
}

module.exports = {
  basicInteraction
}
