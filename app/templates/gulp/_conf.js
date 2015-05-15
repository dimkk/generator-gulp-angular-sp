/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: '<%= props.paths.src %>',
  dist: '<%= props.paths.dist %>',
  tmp: '<%= props.paths.tmp %>',
  e2e: '<%= props.paths.e2e %>',
  mappedSpDir: 'Z:\\testapp', // mapped sharepoint folder, or path to hive folder
  spAppDir:'/SiteAssets/testApp' //path to app(entry.js) relative to spweb url
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  directory: 'bower_components'
<% if(wiredepExclusions.length > 0) { %>,
  exclude: [<%= wiredepExclusions.join(', ') %>]
<% } %>
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
