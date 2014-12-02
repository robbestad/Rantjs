var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    maps = require("gulp-sourcemaps"),
    rename = require("gulp-rename");

    gulp.task("scripts", function(){
             gulp.src("index.js")
             .pipe(maps.init())
             .pipe(uglify())
             .pipe(rename("index.min.js"))
             .pipe(maps.write())
             .pipe(gulp.dest("dist"));
             });
