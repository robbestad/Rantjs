var parseTitle = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<title\>/g).length;
    while (i > 0) {
        var str=rant.getTitle();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<title>/g, function () {
        return replacement[i++];
    });
    return result;

};

var parseTitleMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<title.male\>/g).length;
    while (i > 0) {
        var str=rant.getTitleMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<title.male>/g, function () {
        return replacement[i++];
    });
    return result;

};