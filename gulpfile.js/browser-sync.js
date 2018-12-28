global.bs = require('browser-sync').create()

const { helpers } = require('./helpers')

// Static server
function sync () {
  return global.bs.init({
    server: {
      baseDir: helpers.dist()
    }
  })
}

exports.browser = {
  sync
}
