var parseAdjective = function (rant, matched, input, result) {
    if(matched.match('adj(|.plural)$')) {
        replacement = [];
        var re = new RegExp( matched, 'g');
        i = result.match(re).length;
        var plural=0;
        if(matched.match('plural','g')){
            plural=1;
        }

        while (i > 0) {
            replacement.push(rant.getAdjective(plural));
            i--;
        }

        var re = new RegExp('<'+matched+'>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};


