// Removes end slash from dir path
const trim = dir => (dir.substr(-1) !== '/' ? dir : dir.substr(0, dir.length - 1))

// Returns root src folder
const src = () => `${trim(global.config.proot)}/${trim(global.config.src)}`

// Returns root dest folder
const dist = () => `${trim(global.config.proot)}/${trim(global.config.dist)}`

// Returns root folder
const proot = () => `${trim(global.config.proot)}/`

exports.helpers = {
  proot,
  trim,
  src,
  dist
}
