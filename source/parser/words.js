var parseWords = function (rant, keyword, matched) {
    var result;


    // matched[0] contains the keyword. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.

    //// Let's check if there's any qualifiers or modifiers
    //if(matched[0].length>1){
    //    // yes, there are. There are two classes. Filters and subs. Let's see what we got
    //    var mysubs=myfilters=dictionary=[];
    //    if(matched.length>1){
    //        matched.forEach(function(entry,idx) {
    //            if(idx>0){
    //                if("undefined" != typeof myfilters[keyword]){
    //                    if(myfilters[keyword].indexOf(entry)>-1){
    //                    // this is valid and we apply it. Filters are categories of the keyword, so <adj emotion> will
    //                    // set filters valid for emotion for the keyword adj
    //                    myfilters.push(entry);
    //                    console.log("valid filter: "+entry);
    //                    }
    //                }
    //                if("undefined" != typeof mysubs[keyword]){
    //                    if(mysubs[keyword].indexOf(entry)>-1){
    //                        // this is valid and we apply it
    //                        console.log("valid sub: "+entry);
    //                    }
    //                }
    //            }
    //            // So.. now we got the keyword, the filters and the subs. Let's do some magic
    //        });
    //    }
    //}
    //if(myfilters.length<=0){
    //    console.log("pushing "+keyword+" & all");
    //    dictionary.push(dic[keyword].all);
    //} else myfilters.foreach(function(e) {
    //    console.log("pushing "+keyword+" & "+e);
    //    dictionary.push(dic[keyword].e);
    //});
    //
    //console.log("using dictionary ");
    //console.dir(dictionary);
    //console.log("matched length: "+matched.length);


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


