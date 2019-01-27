const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const ncp = require('ncp')
const log = require('./log')

ncp.limit = 16

const getCurrentDirectoryBase = () => {
  try {
    return path.basename(process.cwd())
  } catch (err) {
    log(err)

    return false
  }
}

const directoryExists = (dirPath) => {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (err) {
    log(err)

    return false
  }
}

const makeDirectory = (dirPath) => {
  try {
    return mkdirp(dirPath, log.message)
  } catch (err) {
    log(err)

    return false
  }
}

const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    log(err)

    return false
  }
}

const copyFile = (filePath, destPath = './', destFile, checkExists = false) => {
  try {
    const destFilepath = `${(destPath.substr(-1) !== '/') ? `${destPath}/` : destPath}${destFile}`
    if (!fileExists(destFilepath)) {
      return ncp(path.join(__dirname, '..', filePath), `${(destPath.substr(-1) !== '/') ? `${destPath}/` : destPath}${destFile}`, { clobber: true }, log.message)
    }

    log.message('File already exists!')

    return true
  } catch (err) {
    log(err)

    return false
  }
}

const saveFile = (filePath, content) => {
  try {
    fs.writeFileSync(path.join(__dirname, '..', filePath), JSON.stringify(content, null, 2), 'utf-8')

    return true
  } catch (err) {
    log(err)

    return false
  }
}

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  makeDirectory,
  fileExists,
  copyFile,
  saveFile
}
