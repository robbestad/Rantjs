var parseAdverb = function (rant, matched, input, result) {
    if (matched.match('adv(|-emotion)(|-sexy)')) {
        replacement = [];
        var re;

        re = new RegExp(matched, 'g');
        i = result.match(re).length;

        while (i > 0) {
            if (matched.match('sexy', 'g')) {
                replacement.push(rant.getAdverbByType('sexy'));
            }
            else
            if (matched.match('emotion', 'g')) {
                replacement.push(rant.getAdverbByType('emotion'));

            } else {
                replacement.push(rant.getAdverb());
            }
            i--;
        }

        re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};

