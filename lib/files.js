const fs = require('fs')
const path = require('path')
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

const directoryExists = (filePath) => {
  try {
    return fs.statSync(filePath).isDirectory()
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

const copyFile = (filePath) => {
  try {
    return ncp(filePath, './', log.message)
  } catch (err) {
    return false
  }
}

const saveFile = (filePath, content) => {
  try {
    console.log(filePath, JSON.stringify(content, null, 2), 'utf-8');

    return fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8')
  } catch (err) {
    return false
  }
}

module.exports = {
  getCurrentDirectoryBase: getCurrentDirectoryBase,
  directoryExists: directoryExists,
  fileExists: fileExists,
  copyFile: copyFile,
  saveFile: saveFile
}
