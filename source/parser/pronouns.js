var parsePronMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<pron.poss-male\>/g).length;
    while (i > 0) {
        var str=rant.getPossMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<pron.poss-male>/g, function () {
        return replacement[i++];
    });

    return result;

};

var parsePronFemale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<pron.poss-female\>/g).length;
    while (i > 0) {
        var str=rant.getPossFemale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<pron.poss-female>/g, function () {
        return replacement[i++];
    });

    return result;

};