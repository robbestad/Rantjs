var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    config = require("../../config").nodemon.development,
    watch = require('gulp-watch');

gulp.task("default",["build:example","browserify","watcher"]);
gulp.task("serve", ["build:example","browserify", "watcher", "nodemon"]);

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
