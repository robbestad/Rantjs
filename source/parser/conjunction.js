var parseConjunction = function (rant, matched, input, result) {
    if (matched.match('conjunction$')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;

        while (i > 0) {
            replacement.push(rant.getCoordinatingConjunction());
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};
