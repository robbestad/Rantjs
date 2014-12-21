//SimpleRant.prototype.titleCase = function(title){
//    var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
//    var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";
//
//        var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;
//
//        while (true) {
//            var m = split.exec(title);
//
//            parts.push( title.substring(index, m ? m.index : title.length)
//                .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
//                    return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
//                })
//                .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
//                .replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
//                    return punct + upper(word);
//                })
//                .replace(RegExp("\\b" + small + punct + "$", "ig"), upper));
//
//            index = split.lastIndex;
//
//            if ( m ) parts.push( m[0] );
//            else break;
//        }
//
//        return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
//            .replace(/(['Õ])S\b/ig, "$1s")
//            .replace(/\b(AT&T|Q&A)\b/ig, function(all){
//                return all.toUpperCase();
//            });
//
//    function lower(word){
//        return word.toLowerCase();
//    }
//
//    function upper(word){
//        return word.substr(0,1).toUpperCase() + word.substr(1);
//    }
//};

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

String.prototype.toWordCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSentenceCase = function() {
    var re = /(^\s*\w{1}|\.\s*\w{1})/gi;
    return this.replace(re, function(str) {
        return str.toUpperCase();
    });
};

SimpleRant.prototype.capitalize = function (s,_case) {
    if(_case==="upper")
        return s.toUpperCase();
    else if(_case==="lower")
        return s.toLowerCase();
    else if(_case==="word")
        return s.toWordCase();
    else if(_case==="title")
        return s.toTitleCase();
    else if(_case==="sentence")
        return s.toSentenceCase();
    else if(_case==="none")
        return s;
    else
        return s[0].toUpperCase() + s.slice(1); //default && first

};