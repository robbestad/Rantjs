SimpleRant.prototype.getCase = function (tokenStream) {
    var _case = 0;
    var cases = ["default", "none", "lower", "upper", "title", "word", "first", "sentence"];
    var token, matches, re;
    while (matches = /(\[.*?\])/g.exec(tokenStream)) {
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (["case"].indexOf(token[0]) != -1) {
            if (token[0] === "case") {
                if (cases.indexOf(token[1] != -1)) {
                    _case = cases.indexOf(token[1]);
                }
            }
        }
        return cases[_case];
    }
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
