var gulp = require("gulp"),
    handleErrors = require('../util/handleErrors'),
    streamqueue  = require('streamqueue'),
    concat = require("gulp-concat");

gulp.task("concat:js", function(){
    return streamqueue({ objectMode: true },
        //gulp.src('./source/arrayMethods.js'),
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

gulp.task("concat:test", ["minify:core","minify:dic"], function(){
    gulp.src(['./build/simpleRant.core.js','./build/simpleRant.dic.js'])
        .pipe(concat('./test/simpleRant.js'))
        .pipe(gulp.dest('./'))
        .on('error', handleErrors);
});