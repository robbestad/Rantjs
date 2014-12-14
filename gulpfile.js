var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    maps = require("gulp-sourcemaps"),
    shell = require("gulp-shell"),
    nodemon = require("gulp-nodemon"),
    sass = require("gulp-sass"),
    rename = require("gulp-rename"),
    csso = require("gulp-csso"),
    autoprefixer = require('gulp-autoprefixer'),
    handleErrors = require('./util/handleErrors'),
    streamqueue  = require('streamqueue'),
    concat = require("gulp-concat"),
    watch = require('gulp-watch'),
    mocha = require('gulp-mocha'),
    config = require("./config").nodemon.development;

    gulp.task("concatjs", function(){
        return streamqueue({ objectMode: true },
            gulp.src('./source/arrayMethods.js'),
            gulp.src('./source/dic/**/*'),
            gulp.src('./source/core/simpleRant.js'),
            gulp.src('./source/parser/**/*'),
            gulp.src('./source/extensions/**/*')
        )
            .pipe(concat('./simpleRant.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("scripts", ["concatjs"], function(){
         gulp.src(["./simpleRant.js"])
         .pipe(maps.init())
         .pipe(uglify())
         .pipe(maps.write())
         .pipe(gulp.dest("dist"));
         });

    gulp.task("sass", function(){
        gulp.src("./*.scss")
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sass())
        .pipe(gulp.dest("dist"))
        .on('error', handleErrors);
    });

    gulp.task("shellsass", shell.task([
        'sass style.scss dist/style.css'
    ]));


    gulp.task("parse", shell.task([
        'perl resources/parseAll.pl'
    ]));

    gulp.task("coverage", shell.task([
        'npm run-script coverage'
    ]));

    gulp.task('test', function () {
        return gulp.src('./test/test.js', {read: false})
            .pipe(mocha({ui:'bdd',reporter: 'nyan'})
        );
    });

    gulp.task("watcher", function(){
        gulp.watch('./test/test.js',["scripts","test"]);
        gulp.watch(["resources/**/*"], ["parse"]);
        gulp.watch(["./style.scss"], ["shellsass"]);
        gulp.watch(["./index.js"], ["scripts"]);
    });

    gulp.task('nodemon', function () {
        nodemon(config).on('restart', ['scripts'], function () {
                console.log('#**# Restarted server')
            });
    });


    gulp.task("default", ["scripts","shellsass","watcher"]);

    gulp.task("serve", ["scripts","shellsass","watcher","nodemon"]);


    /*
    gulp.task('inject', ['copy'], function(){
        var target = gulp.src('./dist/index.min.js');
        // It's not necessary to read the files (will speed up things), we're only after their paths:
        var sources = gulp.src(['./resources/all.dic.js'], {read: false});

        return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
    });*/
