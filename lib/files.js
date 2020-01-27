const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const ncp = require('ncp');
const log = require('./log');

ncp.limit = 16;

const slash = (dirPath) => ((dirPath.substr(-1) !== '/') ? `${dirPath}/` : dirPath);

const getCurrentDirectoryBase = () => {
  try {
    return path.basename(process.cwd());
  } catch (err) {
    log.message(err);

    return false;
  }
};

const fileExists = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    log.message(err);

    return false;
  }
};

const directoryExists = (dirPath) => {
  try {
    if (!fileExists(dirPath)) {
      return false;
    }

    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    log.message(err);

    return false;
  }
};

const makeDirectory = (dirPath) => {
  try {
    if (!directoryExists(dirPath)) {
      return mkdirp(dirPath);
    }

    return false;
  } catch (err) {
    log.message(err);

    return false;
  }
};

const copyFile = (filePath, destPath = './', destFile) => {
  try {
    const destFileName = destFile.split('/').pop();
    const clb = (destFileName[0] !== '.');

    return ncp(path.join(__dirname, '..', filePath), `${slash(destPath)}${destFile}`, { clobber: clb }, log.message);
  } catch (err) {
    log.message(err);

    return false;
  }
};

const saveFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');

    return true;
  } catch (err) {
    log.message(err);

    return false;
  }
};

module.exports = {
  slash,
  getCurrentDirectoryBase,
  directoryExists,
  makeDirectory,
  fileExists,
  copyFile,
  saveFile,
};
