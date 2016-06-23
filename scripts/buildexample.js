require("shelljs/global");
cp("dist/rant.min.js", "example/rant.min.js");
exec("gulp build:example");

