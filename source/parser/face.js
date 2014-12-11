var parseFace = function (rant, matched, input, result) {
    if (matched.match('face(|.d)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        //var plural = 0;


        while (i > 0) {
            if (matched.match('face.d', 'g')) {
                replacement.push(rant.getFacialExpressionVerbed());
            } else {
                replacement.push(rant.getFacialExpression());
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
