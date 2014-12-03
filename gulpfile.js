var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    maps = require("gulp-sourcemaps"),
    inject = require("gulp-inject"),
    rename = require("gulp-rename");

    gulp.task("scripts", ['inject'], function(){
         gulp.src(["./dist/index.js"])
         .pipe(maps.init())
         .pipe(uglify())
         .pipe(maps.write())
         .pipe(gulp.dest("dist"));
         });

    gulp.task("copy", function(){
       gulp.src("index.js")
           .pipe.(rename("index.min.js"))
           .pipe(gulp.dest("dist"));
    });

    gulp.task('inject', ['copy'], function(){
        var target = gulp.src('./dist/index.min.js');
        // It's not necessary to read the files (will speed up things), we're only after their paths:
        var sources = gulp.src(['./resources/all.dic.js'], {read: false});

        return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
    });