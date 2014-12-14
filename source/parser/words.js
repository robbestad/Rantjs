var parseWords = function (rant, matched) {
    var result;

    console.log(matched);

    // matched[0] contains the keyword. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.

    // Let's check if there's any qualifiers or modifiers
    if(matched[0].length>1){
        // yes, there are. There are two classes. Filters and subs. Let's see what we got

        var subs = {}; subs=subs["valid_subs_"+matched[0]];
        var filters = "valid_filters_"+matched[0];

        if(subs.length>0){
            console.log("subs: "+subs.length);
            console.log(subs);
        }

        if(filters.length>0){
            console.log("filters: "+filters.length);
            console.log(filters);
        }

    }


    return matched;
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


