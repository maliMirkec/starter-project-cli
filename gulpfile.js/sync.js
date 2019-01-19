global.bs = require('browser-sync').create()

const { helpers } = require('./helpers')

const syncConfig = require('./.sync.json')

// Start static server
function syncStart (cb) {
  console.log(global.config.sync.run)

  if (global.config.sync.run) {
    let thisConfig = {}

    if (syncConfig.proxy) {
      thisConfig = Object.assign({}, syncConfig, {
        proxy: syncConfig.proxy
      })
    } else if (syncConfig.server && syncConfig.server.baseDir) {
      thisConfig = Object.assign({}, syncConfig, {
        server: syncConfig.server
      })
    } else {
      thisConfig = Object.assign({}, syncConfig.server, { baseDir: helpers.dist() })
    }

    console.log(thisConfig)

    global.bs.init(thisConfig)
  }

  cb()
}

// Stop static server
function syncStop (cb) {
  global.bs.exit()

  cb()
}

exports.sync = {
  syncStart,
  syncStop
}
