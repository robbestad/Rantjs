var parseTimeNoun = function (rant, matched, input, result) {
    if (matched.match('time(|-month)(|.plural)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            if(matched == "time-month.plural"){
            replacement.push(rant.getTimeOfMonth(plural));
            }
            if(matched == "time-month"){
            replacement.push(rant.getTimeOfMonth(0));
            }
            if(matched == "time-dayofweek"){
            replacement.push(rant.getTimeDayOfWeek(plural));
            }
            if(matched == "time-dayofweek.plural"){
            replacement.push(rant.getTimeDayOfWeek(plural));
            }
            if(matched == "time"){
                replacement.push(rant.getTimeNoun(0));
            }
            if(matched == "time.plural"){
                replacement.push(rant.getTimeNoun(1));
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

