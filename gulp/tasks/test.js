var gulp = require("gulp"),
    handleErrors = require('../util/handleErrors'),
    mocha = require('gulp-mocha'),
    shell = require("gulp-shell"),
    concat = require("gulp-concat");

gulp.task("coverage", ["concat:test"], shell.task([
    'npm run-script coverage'
]));

gulp.task('test', function () {
    return gulp.src('./test/test.js', {read: false})
        .pipe(mocha({ui:'bdd',reporter: 'nyan'})
    );
});


