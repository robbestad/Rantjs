var parseNameMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<name-male\>/g).length;
    while (i > 0) {
        var str=rant.getNameMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<name-male>/g, function () {
        return replacement[i++];
    });
    return result;

};

var parseNameFemale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<name-female\>/g).length;
    while (i > 0) {
        var str=rant.getNameFemale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<name-female>/g, function () {
        return replacement[i++];
    });
    return result;

};