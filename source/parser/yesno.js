var parseYes = function(rant, input, result) {
        var result;
        replacement = [];
        i = result.match(/\<yes\>/g).length;
        while (i > 0) {
            var strYes=rant.getYes();
            if(strYes.match(/\//)) strYes.split("/")[0];
            replacement.push(strYes);
            i--;
        }

        i = 0;
        result = result.replace(/\<yes>/g, function () {
            return replacement[i++];
        });
        return result;

};

var parseNo = function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<no\>/g).length;
        while (i > 0) {
            var strNo=rant.getNo();
            if(strNo.match(/\//)) strNo.split("/")[0];
            replacement.push(strNo);
            i--;
        }

        i = 0;
        result = result.replace(/\<no>/g, function () {
            return replacement[i++];
        });
        return result;
    }
};


