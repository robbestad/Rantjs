var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    maps = require("gulp-sourcemaps"),
    shell = require("gulp-shell"),
    nodemon = require("gulp-nodemon"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    csso = require("gulp-csso"),
    autoprefixer = require('gulp-autoprefixer'),
    config = require("./config").nodemon.development;

    gulp.task("concatjs", function(){
        gulp.src(
            [
                "./source/arrayMethods.js",
                "./source/arrayMethods.js"
            ])
            .pipe(rename("rant.js"))
            .pipe(gulp.dest("./"));
    });

    gulp.task("scripts", function(){
         gulp.src(["./simpleRant.js"])
         .pipe(maps.init())
         .pipe(uglify())
         .pipe(maps.write())
         .pipe(gulp.dest("dist"));
         });

    gulp.task("sass", function(){
        gulp.src("./*.scss")
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(csso())
        .pipe(sass())
        .pipe(gulp.dest("dist"));
    });

    gulp.task("parse", shell.task([
        'perl resources/parseAll.pl'
    ]));

    gulp.task("default", ["nodemon"], function(){
        gulp.watch(["resources/"], ["parse"]);
        gulp.watch(["./style.scss"], ["sass"]);
        gulp.watch(["./index.js"], ["scripts"]);
    })

    gulp.task('nodemon', function() {
        nodemon(config)
            .on('restart', ['scripts'], function () {
                console.log('#**# Restarted server')
            });
    });


    /*
    gulp.task('inject', ['copy'], function(){
        var target = gulp.src('./dist/index.min.js');
        // It's not necessary to read the files (will speed up things), we're only after their paths:
        var sources = gulp.src(['./resources/all.dic.js'], {read: false});

        return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
    });*/