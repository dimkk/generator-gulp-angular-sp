'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  src: '<%= props.paths.src %>',
  dist: '<%= props.paths.dist %>',
  tmp: '<%= props.paths.tmp %>',
  e2e: '<%= props.paths.e2e %>',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components'
<% if(wiredepExclusions.length > 0) { %>,
    exclude: [<%= wiredepExclusions.join(', ') %>]
<% } %>
  },
  mappedSpDir:'z:\\pathToAppFolder\\', // set mapped drive or hive and folder, where app will be *REQUIRED
  spAppDir:'/SiteAssets/app/', // set path to app after _spPageContextInfo.webServerRelativeUrl *REQUIRED
  anchorElementId:'' // set id of element to contain app, if empty - it will be body
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
