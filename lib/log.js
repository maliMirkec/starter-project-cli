const chalk = require('chalk');
const clearLib = require('clear');
const figletLib = require('figlet');

const clear = () => clearLib();

const figlet = (text, error = true) => console.log(chalk.hex(error ? '#e01258' : '#12e09f')(figletLib.textSync(text, {
  horizontalLayout: 'default',
  verticalLayout: 'default',
  kerning: 'fitted',
  font: 'Graceful',
})));

const message = (text, error = true) => (text ? console.log(chalk.hex(error ? '#e01258' : '#12e09f')(text)) : false);

module.exports = {
  clear,
  figlet,
  message,
};
