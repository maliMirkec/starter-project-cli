# [Starter Project](https://starter.silvestarbistrovic.from.hr)

![Starter Project Logo - Folder with start button](https://raw.githubusercontent.com/maliMirkec/starter-project-cli/master/src/gfx/png/starter-project.png)

Command Line Interface for Starter Project, the easiest way to implement latest best practices on your project.

## Getting started
Welcome to Starter Project CLI, a command line interface for [Starter Project].

## Installation

Install using npm: `npm install starter-project-cli --save`.

## Command

Run command `spro start` or `spro s` to initialize Starter Project.

You will be prompted to answer about your project structure. Questions will be mostly about your project structure. Once you answer all questions, Starter Project will set up the `gulp` tasks for your project.

Your answers will be stored in the `gulpfile.js/.starter-project.json` file.

You will find additional config files for each `gulp` task in the `gulpfile.js` folder. If some tasks are not running, please see the config files before [opening new issue](https://github.com/maliMirkec/starter-project-cli/issues/new).

## Questions

Here is the list of all questions:
- [GENERAL] Do you want to override the project? Be sure to commit all changes before you proceed.
- [GENERAL] What is the root folder of the project?
- [GENERAL] Where is the folder with source code of the project (relative to default path)?
- [GENERAL] Where do you want to store compiled code of the project (relative to default path)?
- [General] Are you absolutely sure that you want to override the project?
- [HTML] Do you want to run HTML (Pug) tasks?
- [HTML] Where is the folder with HTML source code (relative to default source path)?
- [HTML] Where do you want to store compiled HTML code (relative to default destination path)?
- [HTML] Do you want to lint HTML code?
- [CSS] Do you want to run CSS (Sass) tasks?
- [CSS] Where is the folder with CSs source code (relative to default source path)?
- [CSS] Where do you want to store compiled CSS code (relative to default destination path)?
- [CSS] Do you want to lint CSS code?
- [JS] Do you want to run JS (es6) tasks?
- [JS] Where is the folder with JS source code (relative to default source path)?
- [JS] Where do you want to store compiled JS code (relative to default destination path)?
- [JS] Do you want to lint JS code?
- [IMAGES] Do you want to run image optimization tasks?
- [IMAGES] Where is the folder with images (relative to default source path)?
- [IMAGES] Where do you want to store optimized images (relative to default destination path)?
- [FONTS] Do you use local fonts? Do you want to run font tasks?
- [FONTS] Where is the folder with local fonts (relative to default source path)?
- [FONTS] Where do you want to store local fonts (relative to default destination path)?
- [FAVICON] Do you want to run favicon tasks?
- [CRITICAL] Do you use extract Critical CSS?
- [COMPRESS] Do you want to compress (gzip) all assets?
- [KSS] Do you want to add KSS style guide?
- [KSS] Where do you want to store KSS style guide (relative to default destination path)?
- [SASSDOC] Do you want to add documentation for the SASS code (SassDoc)?
- [JSDOC] Do you want to add documentation for the JS code (JSDoc)?

## Features

Benefit from powerful features, like [Browser-sync](https://www.browsersync.io/), [Sass](http://sass-lang.com/), [Stylelint](https://stylelint.io/), [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript), [Babel](https://babeljs.io/), [Pug template engine](https://pugjs.org/api/getting-started.html), [Imagemin Minification](https://www.npmjs.com/package/gulp-imagemin), [Critical CSS](https://www.smashingmagazine.com/2015/08/understanding-critical-css/), [Sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps), and many more.

## Support

Star on [Github](https://github.com/maliMirkec/starter-project-cli).

Contribute: [report an issue](https://github.com/maliMirkec/starter-project-cli/issues/new) or [create pull request](https://github.com/maliMirkec/starter-project-cli/compare).

> Documentation is still work in progress, stay tuned!

[Starter Project]: (https://starter.silvestarbistrovic.from.hr)
