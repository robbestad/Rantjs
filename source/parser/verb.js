var parseVerb = function(rant, input, result) {
        if('undefined' == typeof matched) var matched=false;
        if(!matched) {
            var result;
            matched=true;
            replacement = [];
            i = result.match(/\<verb\>/g).length;
            while (i > 0) {
                replacement.push(rant.getVerb(0));
                i--;
            }

            i = 0;
            result = result.replace(/\<verb>/g, function () {
                return replacement[i++];
            });
            return result;
        }
};

var parseVerbTransitive = function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<verb-transitive\>/g).length;
        while (i > 0) {
            replacement.push(rant.getVerb(0));
            i--;
        }

        i = 0;
        result = result.replace(/\<verb-transitive>/g, function () {
            return replacement[i++];
        });
        return result;
    }
};

var parseVerbed= function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<verb.ed\>/g).length;
        while (i > 0) {
            replacement.push(rant.getVerb(5));
            i--;
        }

        i = 0;
        result = result.replace(/\<verb.ed>/g, function () {
            return replacement[i++];
        });
        return result;
    }
};
