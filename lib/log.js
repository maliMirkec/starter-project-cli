const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = {
  clear: () => {
    return clear();
  },

  figlet: (text, error = true) => {
    return console.log(
      chalk.hex(error ? '#e01258': '#12e09f')(
        figlet.textSync(text, {
          horizontalLayout: 'fitted',
          verticalLayout: 'universal smushing',
          kerning: 'full'
        })
      )
    );
  },

  message: (text, error = true) => {
    return console.log(
      chalk.hex(error ? '#e01258': '#12e09f')(text)
    );
  }
}
