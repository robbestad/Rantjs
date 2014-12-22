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
            gulp.src('./source/core/prototypes/lexer.js'),
            gulp.src('./source/core/prototypes/string.js'),
            gulp.src('./source/core/prototypes/prototypes.js')
        )
            .pipe(concat('./build/simpleRant.core.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("concat:dic", function(){
            gulp.src(['./source/dic/tokens.js','./source/dic/dic.js','./source/dic/custom.js'])
            .pipe(concat('./build/simpleRant.dic.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("concat:test", ["minify:core"], function(){
        gulp.src(['./build/simpleRant.core.js','./build/simpleRant.dic.js'])
            .pipe(concat('./test/simpleRant.js'))
            .pipe(gulp.dest('./'))
            .on('error', handleErrors);
    });

    gulp.task("build:npm", ["minify:core"], function(){
        gulp.src(['./build/simpleRant.core.js','./build/simpleRant.dic.js'])
            .pipe(concat('index.js'))
            .pipe(uglify({
                mangle:true,
                compress:{
                    sequences     : true,  // join consecutive statemets with the “comma operator”
                    properties    : true,  // optimize property access: a["foo"] → a.foo
                    dead_code     : true,  // discard unreachable code
                    drop_debugger : true,  // discard “debugger” statements
                    unsafe        : false, // some unsafe optimizations (see below)
                    conditionals  : true,  // optimize if-s and conditional expressions
                    comparisons   : true,  // optimize comparisons
                    evaluate      : true,  // evaluate constant expressions
                    booleans      : true,  // optimize boolean expressions
                    loops         : true,  // optimize loops
                    unused        : true,  // drop unused variables/functions
                    hoist_funs    : true,  // hoist function declarations
                    hoist_vars    : false, // hoist variable declarations
                    if_return     : true,  // optimize if-s followed by return/continue
                    join_vars     : true,  // join var declarations
                    cascade       : true,  // try to cascade `right` into `left` in sequences
                    side_effects  : true,  // drop side-effect-free statements
                    warnings      : true,  // warn about potentially dangerous optimizations/code
                    global_defs   : {}     // global definitions
                }
            }))
            .pipe(gulp.dest('./npm/'))
            .on('error', handleErrors);
    });


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


    gulp.task("parse", shell.task([
        'perl resources/parseAll.pl'
    ]));

    gulp.task("coverage", ["concat:test"], shell.task([
        'npm run-script coverage'
    ]));

    gulp.task('mocha', function () {
        return gulp.src('./test/test.js', {read: false})
            .pipe(mocha({ui:'bdd',reporter: 'nyan'})
        );
    });

    var del = require('del');
    gulp.task('delete', function(callback) {
        del(["./resources/out/**/*","./test/simpleRant.js"], callback);
    });

    gulp.task('test', ['concat:test'], function () {
        return gulp.src('./test/test.js', {read: false})
            .pipe(mocha({ui:'bdd',reporter: 'nyan'})
        );
    });

    gulp.task('compile:dist', ["concat:js","concat:dic","minify:core","minify:dic"]);
    gulp.task('compile:dev', ["concat:js", "concat:dic", "concat:test"]);

    gulp.task("watcher", function(){
        gulp.watch('./test/test.js',["test"]);
        gulp.watch(['./source/core/*','./source/parser/*'],["compile:dev","test"]);
        gulp.watch(["resources/**/*"], ["parse"]);
        gulp.watch(["./style.scss"], ["compile:sass"]);
        gulp.watch(["./index.js"], ["compile:dist"]);
    });

    gulp.task('nodemon', function () {
        nodemon(config).on('restart', ["compile:dist"], function () {
                console.log('#**# Restarted server')
            });
    });


    gulp.task("default", ["compile:dist","compile:sass","watcher"]);

    gulp.task("serve", ["compile:dist","compile:sass","watcher","nodemon"]);
