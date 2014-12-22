var gulp = require("gulp"),
    handleErrors = require('../util/handleErrors'),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    csso = require("gulp-csso"),
    shell = require("gulp-shell"),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require("gulp-concat");

gulp.task('compile:dist', ["concat:js","concat:dic","minify:core","minify:dic"]);

gulp.task('compile:dev', ["concat:js", "concat:dic", "concat:test"]);

gulp.task("sass", function(){
    gulp.src("./*.scss")
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sass())
        .pipe(gulp.dest("dist"))
        .on('error', handleErrors);
});

gulp.task("compile:sass", shell.task([
    'sass style.scss dist/style.css'
]));
