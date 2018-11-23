const log = require('./lib/log')
const files = require('./lib/files')
const inquirer = require('./lib/inquirer')
const config = require('./lib/config')

log.clear()
log.figlet('IMPROVER', false)

const run = async () => {
  const answers = await inquirer.startInteraction();
  for (const key in answers) {
    if (answers.hasOwnProperty(key)) {
      config.setOptionValue(key, answers[key]);
    }
  }

  log.message(config.save() || "Config saved successfully!");
}

run();
