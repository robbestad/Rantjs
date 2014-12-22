var gulp = require("gulp"),
    maps = require("gulp-sourcemaps"),

    concat = require("gulp-concat");

gulp.task("minify:core", ["concat:js", "minify:dic"], function(){
    gulp.src(["./build/simpleRant.core.js"])
        //.pipe(maps.init())
        //.pipe(uglify())
        //.pipe(maps.write())
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:dic", ["concat:dic"], function(){
    gulp.src(["./build/simpleRant.dic.js"])
        //.pipe(maps.init())
        //.pipe(uglify())
        //.pipe(maps.write())
        .pipe(gulp.dest("dist"));
});
