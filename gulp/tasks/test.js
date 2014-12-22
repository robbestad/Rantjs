var gulp = require("gulp"),
    handleErrors = require('../util/handleErrors'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    mocha = require('gulp-mocha'),
    shell = require("gulp-shell"),

    concat = require("gulp-concat");


gulp.task("parse", shell.task([
    'perl resources/parseAll.pl'
]));

gulp.task("coverage", ["concat:test"], shell.task([
    'npm run-script coverage'
]));

var del = require('del');
gulp.task('delete', function(callback) {
    del(["./resources/out/**/*","./test/simpleRant.js"], callback);
});

gulp.task('test', ['concat:test'], function () {
    return gulp.src('./test/test.js', {read: false})
        .pipe(mocha({ui:'bdd',reporter: 'nyan'})
    );
});

