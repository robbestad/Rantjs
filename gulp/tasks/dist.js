var gulp = require("gulp"),
    maps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat");

gulp.task("build:words:dist", ["minify-html"], function(){
    gulp.src([
        "./ext/words.js"
    ])
        .pipe(concat('words.min.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write())
        .pipe(gulp.dest("dist"));
});
