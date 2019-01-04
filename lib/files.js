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
    return false
  }
}

const directoryExists = (dirPath) => {
  try {
    return fs.statSync(dirPath).isDirectory()
  } catch (err) {
    return false
  }
}

const makeDirectory = (dirPath) => {
  try {
    return mkdirp(dirPath, log.message)
  } catch (err) {
    return false
  }
}

const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath)
  } catch (err) {
    return false
  }
}

const copyFile = (filePath, destPath = './', destFile) => {
  try {
    return ncp(path.join(__dirname, '..', filePath), `${destPath + destFile}`, { clobber: true }, log.message)
  } catch (err) {
    return false
  }
}

const saveFile = (filePath, content) => {
  try {
    console.log(filePath, JSON.stringify(content, null, 2))

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8')

    return true
  } catch (err) {
    console.log(err)

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
