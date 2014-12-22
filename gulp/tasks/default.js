var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),

    config = require("../../config").nodemon.development,
    watch = require('gulp-watch');

gulp.task("default", ["compile:dist","compile:sass","watcher"]);

gulp.task("serve", ["compile:dist","compile:sass","watcher","nodemon"]);

gulp.task("watcher", function(){
    gulp.watch('./test/test.js',["test"]);
    gulp.watch(['./source/**/*'],["test"]);
    gulp.watch(["resources/**/*"], ["parse"]);
    gulp.watch(["./style.scss"], ["compile:sass"]);
    gulp.watch(["./index.js"], ["compile:dist"]);
});

gulp.task('nodemon', function () {
    nodemon(config).on('restart', ["compile:dist"], function () {
        console.log('#**# Restarted server')
    });
});
