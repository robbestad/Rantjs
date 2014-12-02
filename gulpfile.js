var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

    gulp.task("scripts", function(){
             gulp.src("index.js")
             .pipe(uglify())
             .pipe(rename("index.min.js"))
             .pipe(gulp.dest("dist"));
             });
