var parseAmount = function (rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<amount\>/g).length;
    while (i > 0) {
        var str = rant.getAmount();
        if (str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<amount>/g, function () {
        return replacement[i++];
    });
    return result;
};
