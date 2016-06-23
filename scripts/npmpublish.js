require("shelljs/global");
exec("gulp browserify");
exec("gulp minify");
rm("-rf","npmpublish");
mkdir("npmpublish");
mkdir("npmpublish/dist");
mkdir("npmpublish/source");
cp("-R","source","npmpublish");
cp("dist/rant.min.js", "npmpublish/index.min.js");
cp("dist/rant.js", "npmpublish/index.js");
cp("dist/rant.js", "npmpublish/index.js");
cp("README.md", "npmpublish/");
cp("package.npm", "npmpublish/package.json");
exec("cd npmpublish");


