var gulp = require("gulp"),
    handleErrors = require('../util/handleErrors'),
    sass = require("gulp-sass"),
    csso = require("gulp-csso"),
    shell = require("gulp-shell"),
    autoprefixer = require('gulp-autoprefixer');

gulp.task("sass", function(){
    gulp.src("./*.scss")
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest("dist"))
        .on('error', handleErrors);
});

gulp.task("compile:sass", shell.task([
    'sass style.scss dist/style.css'
]));
