#!/usr/bin/env node

const program = require('commander')
const log = require('./lib/log')
const inquirer = require('./lib/inquirer')
const sp = require('./lib/starter-project')

log.clear()
log.figlet('S-PRO', false)
log.message(`\n ** Starter Project CLI **\n`, false)

program
  .version('0.0.1')
  .description('Starter Project CLI')

program
  .command('start')
  .alias('s')
  .description('Initialize Basic Starter Project')
  .action(() => {
    inquirer.basicInteraction().then((answers) => {
      sp.run(answers)
    })
  })

  // .command('starter-project-config')
  // .alias('spro-conf')
  // .description('Initialize Advanced Starter Project')
  // .action(() => {
  //   inquirer.advancedInteraction().then((answers) => {
  //     sp.run(answers)
  //   })
  // })

program.parse(process.argv)
