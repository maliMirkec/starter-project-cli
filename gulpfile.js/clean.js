// const gulp = require('gulp')
const del = require('del')

const { helpers } = require('./helpers')

// Get all dist folders
function get () {
  return Object.values(global.config)
    .filter(val => val.run && val.dist)
    .map(val => `${helpers.dist()}/${helpers.trim(val.dist)}`)
}

// Delete all dist folders
function start () {
  return del(get())
}

exports.clean = {
  start
}
