const chalk = require('chalk')
const clearLib = require('clear')
const figletLib = require('figlet')

const clear = () => clearLib()

const figlet = (text, error = true) => console.log(chalk.hex(error ? '#e01258' : '#12e09f')(figletLib.textSync(text, {
  horizontalLayout: 'fitted',
  verticalLayout: 'universal smushing',
  kerning: 'full'
})))

const message = (text, error = true) => console.log(chalk.hex(error ? '#e01258' : '#12e09f')(text))

module.exports = {
  clear: clear,
  figlet: figlet,
  message: message
}
