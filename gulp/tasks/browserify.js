var gulp = require('gulp');
var browserify = require('browserify');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var rename   = require('gulp-rename');
var through = require('through2');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var globby = require('globby');


gulp.task('browserify', function () {
  var bundledStream = through();

   bundledStream
   .pipe(source('./source/core/index.js'))
   .pipe(buffer())
   .pipe(uglify())
   .on('error', gutil.log)
   .pipe(sourcemaps.write('./'))
   .pipe(rename('rant.min.js'))
   .pipe(gulp.dest('./dist'));

   globby(['./source/core/*.js'], function(err, entries) {
     // ensure any errors from globby are handled
     if (err) {
       bundledStream.emit('error', err);
       return;
     }

     // create the Browserify instance.
     var b = browserify({
       entries: entries,
       debug: true,
       expose: 'rant'
     });

     b.bundle().pipe(bundledStream);
   });
  return bundledStream;
});
