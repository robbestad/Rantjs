var gulp = require("gulp"),
    mocha = require('gulp-mocha'),
    shell = require("gulp-shell"),
    concat = require("gulp-concat");

gulp.task("coverage", shell.task([
    'npm run coverage'
]));

gulp.task("test",  shell.task([
    'npm test'
]));
