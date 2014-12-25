var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    config = require("../../config").nodemon.development,
    watch = require('gulp-watch');

gulp.task("default",["build:dist","browserify","watcher"]);
gulp.task("serve", ["build:dist","browserify", "watcher", "nodemon"]);

//gulp.task("serve", ["compile:dist","compile:sass","watcher","nodemon"]);

gulp.task("watcher", function(){
    gulp.watch('./test/test.js',["test"]);
    gulp.watch(['./source/**/*'],["test"]);
    gulp.watch(["resources/**/*"], ["parse"]);
    gulp.watch(["./style.scss"], ["compile:sass"]);
});

gulp.task('nodemon', function () {
    nodemon(config).on('restart', ["browserify"], function () {
        console.log('#**# Restarted server')
    });
});
