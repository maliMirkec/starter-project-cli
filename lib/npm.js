const npm = require('npm')

const install = (libs) => {
  npm.load({ 'save-prod': true }, (error) => {
    if (error) console.log(error)

    npm.commands.install(libs, (err, data) => {
      if (err) return console.error(err)

      return data
    })
  })
}

module.exports = {
  install
}
