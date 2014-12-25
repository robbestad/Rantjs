//var gulp = require("gulp"),
//    //source = require('vinyl-source-stream'),
//    browserify = require('gulp-browserify');

//gulp.task('bundle', function(){
//    var args = xtend(watchify.args, { debug: true })
//    var b = watchify(browserify(args))
//    b.on('update', bundle)
//
//    function bundle() {
//        return b.bundle()
//            .on('error', function(e) {
//                gutil.beep()
//                gutil.log( gutil.colors.red('Bundle error: ',e.message) )
//            })
//            .pipe(source('bundle.js'))
//            .pipe(gulp.dest('./dist'))
//            .pipe(livereload())
//    }
//    return bundle()
//})


var gulp = require('gulp');
    browserify = require('browserify'),
    transform = require('vinyl-transform');
var jasmine     = require('gulp-jasmine');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream'); // makes browserify bundle compatible with gulp
var rename   = require('gulp-rename');


//// Concatenate, Browserify & Minify JS
//gulp.task('browserify', function() {
//    return browserify('./source/core/rant.js', { paths: ['./source/core/'], expose: 'rant'}).bundle()
//        .pipe(source('rant.js'))
//        .pipe(streamify(uglify()))
//        .pipe(gulp.dest('./dist/'));
//});


gulp.task('browserify', function () {

    var browserified = transform(function(filename) {
        return browserify(filename, {paths: ['./source/core/']})
            .require(filename, { expose: 'rant'})
            .bundle();
    });
    return gulp.src('./source/core/index.js')
        .pipe(browserified)
        .pipe(uglify())
        .pipe(rename('rant.min.js'))
        .pipe(gulp.dest('./dist')); // currently this recipe will output to ./dist/x.js. you may use a rename plugin to output it with a different filename for eg. bundle.js
});