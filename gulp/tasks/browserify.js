var gulp  = require('gulp')
var shell = require('gulp-shell')
gulp.task('browserify', function () {
   return gulp.src('*.js', {read: false})
    .pipe(shell([
      'npm run browserify'
    ]
  ))
});
