global.bs = require('browser-sync').create()

// Static server
function sync () {
  return global.bs.init({
    server: {
      baseDir: global.config.proot + global.config.dist
    }
  })
}

exports.browser = {
  sync
}
