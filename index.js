const log = require('./lib/log');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const config = require('./lib/config');

log.clear();
log.figlet('IMPROVER', false);
log.figlet('IMPROVER');

log.message(config.getPath(), false);

const run = async () => {
  const answers = await inquirer.startInteraction();
  console.log(answers);
}

run();
