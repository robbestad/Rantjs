var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var r = require("../../dist/rant.min");

gulp.task('jasmine', function () {
    return gulp.src('./spec/test.js')
        .pipe(jasmine());
});
