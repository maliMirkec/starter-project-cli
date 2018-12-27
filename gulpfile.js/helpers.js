const trim = path => (path.substr(-1) !== '/' ? path : path.substr(0, path.length - 1))

exports.helpers = {
  trim
}
