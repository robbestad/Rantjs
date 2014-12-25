var gulp = require("gulp"),
    maps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat");

gulp.task("build:dist", function(){
    gulp.src([
        "./ext/jquery.js",
        "./ext/jquery-ui.min.js",
        "./ext/jquery.zclip.min.js",
        "./ext/words.js",
        "./ext/app.js",
        "./ext/highlight.js"
    ])
        .pipe(concat('dist.min.js'))
        .pipe(maps.init())
        .pipe(uglify())
        .pipe(maps.write())
        .pipe(gulp.dest("dist"));
});
