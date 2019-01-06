const npmi = require('npm-cli')

const log = require('./log')

const install = (libs) => {
  libs.forEach((lib) => {
    const options = {
      name: `${lib}`,
      version: 'latest',
      path: '.',
      forceInstall: false,
      npmLoad: {
        loglevel: 'silent'
      }
    }

    npmi(options, (err, result) => {
      if (err) {
        if (err.code === npmi.LOAD_ERR) {
          log.message('npm load error')
        } else if (err.code === npmi.INSTALL_ERR) {
          log.message('npm install error')
        }

        return log.message(err.message)
      }

      return log.message(`${options.name}@${options.version} installed successfully`)
    })
  })
}

module.exports = {
  install
}
