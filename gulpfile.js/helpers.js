// Removes end slash from dir path
const trim = dir => (dir.substr(-1) !== '/' ? dir : dir.substr(0, dir.length - 1))

// Returns root src folder
const src = dir => `${trim(global.config.proot)}/${trim(global.config.src)}`

// Returns root dest folder
const dist = dir => `${trim(global.config.proot)}/${trim(global.config.dist)}`

exports.helpers = {
  trim,
  src,
  dist
}
