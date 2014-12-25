var gulp = require("gulp");
var del = require('del');
gulp.task('delete', function(callback) {
    del(["./resources/out/**/*","./test/rant.js"], callback);
});
