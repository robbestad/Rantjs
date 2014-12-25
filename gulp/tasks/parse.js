var gulp = require("gulp"),
    shell = require("gulp-shell");

gulp.task("parse", shell.task([
    'perl resources/parseAll.pl'
]));
