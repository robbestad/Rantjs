var parseNouns = function (rant, matched, input, result) {
    if (matched.match('noun(|animal)(|.plural)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            if (matched.match('animal', 'g')) {
                var str=rant.getNounByType('animal', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);

            } else {
                var str=rant.getNoun(plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            }

            i--;
        }


        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};

