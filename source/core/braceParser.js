
var braceParser = function (input, group, reps, sep) {
    var tempRes = "", matchIndex = 1;
    var result = input, matches = [], token, replacement = [], regex;
    matchIndex = 0;
    group = group.replace("}", "");
    group = group.replace("{", "");
    var repetitions=reps.pop();
    var separator=sep.pop();
    var newGroup = '';


    // Check for shorthand codes
    //[rep:10][sep:\N]{\C}
    regex = /\\\w+/g;
    i = 0;
    var replaceGroup='';
    while (matches = regex.exec(group)) {
        var groupCopy = group;
        while (i < repetitions) {
            if(matches[0]==="\\C"){  replaceGroup+=require("./randomString")(1); }
            i++;
        }

        groupCopy=groupCopy.replace("\\C", replaceGroup );
        if("undefined" != typeof separator){
            if (separator.toLowerCase() === "n") groupCopy += separator.replace("n", "\n");
            else if (separator.toLowerCase()  === "s") groupCopy += separator.replace("s", " ");
            else groupCopy += separator;
        }
        return groupCopy;

    }

    // Check for token patterns
    regex = /<(.*?)>/g;
    i = 0;
    while (i < repetitions) {
        while (matches = regex.exec(group)) {
            groupCopy = group;
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            if (require("./en_US")().tokens.indexOf(token[0]) != -1) {
                if("undefined" != typeof separator){
                    if (separator === "n") groupCopy += separator.replace("n", "\n");
                    else if (separator === "s") groupCopy += separator.replace("s", " ");
                    else groupCopy += separator;
                }
            }
        }
        newGroup += "undefined" == typeof groupCopy ? "" : groupCopy;

        i++;
    }
    //console.log(group);
    return "undefined" != typeof newGroup ? newGroup : group;
};

module.exports = braceParser;
