const log = require('./log')
const files = require('./files')
const config = require('./config')

const run = (answers) => {
  const helpers = ['.editorconfig', 'gulpfile.js', '_gulp']
  const destPath = './'

  const answerKeys = Object.keys(answers)

  for (let i = 0; i < answerKeys.length; i += 1) {
    const answer = answers[answerKeys[i]]

    config.setOptionValue(answerKeys[i], answer)

    if (answer.lint) {
      switch (answerKeys[i]) {
        case 'html':
          helpers.push('.htmllintrc')
          break
        case 'css':
          helpers.push('.stylelintrc')
          break
        case 'js':
          helpers.push('.eslintignore')
          helpers.push('.eslintrc.json')
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

  const saved = config.save()

  log.message(saved ? 'Config saved successfully!' : 'Config not saved!', !saved)
}

module.exports = {
  run
}
