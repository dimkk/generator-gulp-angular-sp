/**
 * Created by Dima on 10.05.2015.
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var rs = require('run-sequence');

module.exports = function(options) {
  gulp.task('inject-sp', ['partials'], function () {
    if (options.mappedSpDir === 'z:\\pathToAppFolder\\') throw new Error('no mappedSpDir set in gulpfile.js!');
    if (!options.spAppDir === '/SiteAssets/app/') throw new Error('no spAppDir set in gulpfile.js!');
    var injectStyles = gulp.src([
      options.src + '/app/**/*.css'
    ], { read: false })
      .pipe($.debug());

    var injectScripts = gulp.src([
      options.src + '/app/**/*.js', options.src + '/app/templateCacheHtml.js',
      '!' + options.src + '/app/**/*.spec.js',
      '!' + options.src + '/app/**/*.mock.js'
    ])
      .pipe($.debug())
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectConst = gulp.src([options.src+ '/app/index.js']);

    var injectOptionsConsts = {
      starttag:'scripts:[',
      endtag:']',
      transform: function (filepath, file, i, length) {
        return '_spPageContextInfo.webServerRelativeUrl +   "'+ options.spAppDir + filepath + '"' + (i + 1 < length ? ',' : '');
      }
    };

    var injectOptionsCSS = {
        ignorePath: [options.src, options.tmp + '/serve'],
        addRootSlash: false,
        starttag:'styles:[',
        endtag:']',
        transform: function (filepath, file, i, length) {
          return '_spPageContextInfo.webServerRelativeUrl +   "'+ options.spAppDir + filepath + '"' + (i + 1 < length ? ',' : '');
        }
      };

    var injectOptionsJS = {
        ignorePath: [options.src, options.tmp + '/serve'],
        addRootSlash: false,
        starttag:'scripts:[',
        endtag:']',
      transform: function (filepath, file, i, length) {
          return '_spPageContextInfo.webServerRelativeUrl +   "'+ options.spAppDir + filepath + '"' + (i + 1 < length ? ',' : '');
        }
      };


    return gulp.src(options.src + '/entry.js')
      .pipe($.inject(injectStyles, injectOptionsCSS))
      .pipe($.inject(injectScripts, injectOptionsJS))
      .pipe($.debug())
      .pipe($.replace('spAppDir = ""', 'spAppDir = "'+options.spAppDir+'"'))
      .pipe($.replace('anchorElementId = ""', 'anchorElementId = "'+options.anchorElementId+'"'))
      .pipe(gulp.dest(options.mappedSpDir));
  });



  gulp.task('copy-sp-app', function () {
    return gulp.src([options.src + '/app/**/*.js', '!' + options.src + '/app/**/*.spec.js', options.src + '/app/**/*.css'])
      .pipe($.debug())
      .pipe($.replace('spAppDir=""', 'spAppDir=_spPageContextInfo.webServerRelativeUrl + "'+options.spAppDir+'"'))
      .pipe(gulp.dest(options.mappedSpDir + '/app'));
  });

  gulp.task('copy-sp-other', function () {
    return gulp.src([options.dist + '/**/*', '!' + options.dist + '/index.html', '!' + options.dist + '/favicon.ico'])
      .pipe(gulp.dest(options.mappedSpDir));
  });

  gulp.task('copy-sp-vendorcss', function () {
    return gulp.src(options.dist + '/styles/vendor.css')
      .pipe(gulp.dest(options.mappedSpDir));
  })

  gulp.task('clean-sp', function (done) {
    $.del(options.mappedSpDir, {force:true}, done);
  });

  gulp.task('build-sp', function () {
    rs('build', 'inject-sp', 'copy-sp-app', 'copy-sp-other')
  });

  gulp.task('watch-sp', function () {
    function isOnlyChange(event) {
      return event.type === 'changed';
    };
    gulp.watch([options.src + '/app/**/*.js', options.src + '/app/**/*.css', options.src + '/entry.js'], function(event) {

        rs('inject-sp', 'copy-sp-app');

    });
  });
};
