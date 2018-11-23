const fs = require('fs');
const path = require('path');
const ncp = require('ncp')
const log = require('./log')

ncp.limit = 16

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  fileExists: (filePath) => {
    try {
      return fs.existsSync(filePath);
    } catch (err) {
      return false;
    }
  },

  createNewFile: (filePath) => {
    ncp(filePath, './', log.message)
  }
};
