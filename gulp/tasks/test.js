var gulp = require("gulp"),
    mocha = require('gulp-mocha'),
    shell = require("gulp-shell"),
    concat = require("gulp-concat");

gulp.task("coverage", ["concat:test"], shell.task([
    'npm run-script coverage'
]));

gulp.task("test",  shell.task([
    'NODE_PATH=./source/core ./node_modules/.bin/mocha test/test.js --reporter nyan'
]));
//
//gulp.task('test', function () {
//    return gulp.src('./test/test.js', {read: false})
//        .pipe(mocha({ui:'bdd',reporter: 'nyan'})
//    );
//});
//
