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

    gulp.task("concat:js", function(){
        return streamqueue({ objectMode: true },
            gulp.src('./source/arrayMethods.js'),
            gulp.src('./source/core/simpleRant.js'),
            gulp.src('./source/parser/**/*'),
            gulp.src('./source/extensions/**/*')
        )
            .pipe(concat('./build/simpleRant.core.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("concat:dic", function(){
            gulp.src(['./source/dic/keywords.js','./source/dic/custom.js','./source/dic/dic.js'])
            .pipe(concat('./build/simpleRant.dic.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("minify:core", ["concat:js"], function(){
         gulp.src(["./build/simpleRant.core.js"])
         .pipe(maps.init())
         .pipe(uglify())
         .pipe(maps.write())
         .pipe(gulp.dest("dist"));
         });
    gulp.task("minify:dic", ["concat:dic"], function(){
         gulp.src(["./build/simpleRant.dic.js"])
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

    gulp.task('mocha', ["minify:core","minify:dic"], function () {
        return gulp.src('./test/test.js', {read: false})
            .pipe(mocha({ui:'bdd',reporter: 'nyan'})
        );
    });

    var del    = require('del');
    gulp.task('delete', function(callback) {
        del(["./resources/out/**/*"], callback);
    });

    var runSequence = require('run-sequence');
    gulp.task('test', function(callback) {
        runSequence('delete',
            [
                "compile:dev",
                'mocha'
            ],
            callback);
    });

    gulp.task('compile:dist', function(callback) {
        runSequence(
            [
                "concat:js","concat:dic",
                "minify:core","minify:dic"
            ],
            callback);
    });
    gulp.task('compile:dev', function(callback) {
        runSequence(
            [
                "concat:js","concat:dic"
            ],
            callback);
    });




    gulp.task("watcher", function(){
        gulp.watch('./test/test.js',["test"]);
        gulp.watch(["resources/**/*"], ["parse"]);
        gulp.watch(["./style.scss"], ["shellsass"]);
        gulp.watch(["./index.js"], ["compile:dist"]);
    });

    gulp.task('nodemon', function () {
        nodemon(config).on('restart', ["compile:dist"], function () {
                console.log('#**# Restarted server')
            });
    });


    gulp.task("default", ["compile:dist","shellsass","watcher"]);

    gulp.task("serve", ["compile:dist","shellsass","watcher","nodemon"]);


    /*
    gulp.task('inject', ['copy'], function(){
        var target = gulp.src('./dist/index.min.js');
        // It's not necessary to read the files (will speed up things), we're only after their paths:
        var sources = gulp.src(['./resources/all.dic.js'], {read: false});

        return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
    });*/
