var gulp = require("gulp"),
    shell = require("gulp-shell");

gulp.task("npm", shell.task([
    'cp ./source/core/* ./npm'
]));
