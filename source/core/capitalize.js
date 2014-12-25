
var capitalize = function (s,_case) {
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

module.exports = capitalize;
