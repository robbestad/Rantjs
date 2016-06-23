
var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');

gulp.task('minify-html', function() {
    var opts = {comments:false,spare:false,quotes:false,empty:false};

    gulp.src('./static/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./example/'))
});
