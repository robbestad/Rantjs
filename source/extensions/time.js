simpleRant.extend=function(input){
    if(matches[1].match('time_noun(|.plural)(|month)')) {
        if("undefined" == timenounplural) var timenounplural=false;
        if(!timenounplural) {
            timenounplural = true;
            replacement = [];
            var re = new RegExp( matches[1], 'g');
            i = result.match(re).length;
            var plural=0;
            if(matches[1].match('plural','g')){
                plural=1;
            }

            while (i > 0) {
                if(matches[1].match('timeofday','g')){
                    replacement.push(this.getTimeOfDay(plural));
                } else
                if(matches[1].match('month','g')){
                    replacement.push(this.getTimeOfMonth(plural));
                } else
                if(matches[1].match('dayofweek','g')){
                    replacement.push(this.getTimeDayOfWeek(plural));
                } else {
                    replacement.push(this.getTimeNoun(plural));
                }
                i--;
            }

            var re = new RegExp('<'+matches[1]+'>', 'g');
            result = result.replace(re, function () {
                return replacement[i++];
            });
        }
    }
};
    