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
echo("Copied npm files. Now enter npmpublish, make sure the version is correct and then publish");
echo("Also remember to tag the release with git tag -a _version_ -m \"_message_\"");
echo ("Then push with git push --follow-tags origin master");

