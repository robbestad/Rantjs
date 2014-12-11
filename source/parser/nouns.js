var parseNouns = function (rant, matched, input, result) {
    if (matched.match('noun.*')) {
        var re,replacement = [];
        re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            if (matched.match('animal', 'g')) {
                var str = rant.getNounByType('animal', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('tool', 'g')) {
                var str=rant.getNounByType('tool', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('surface', 'g')) {
                var str=rant.getNounByType('surface', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('furniture', 'g')) {
                var str=rant.getNounByType('furniture', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('round', 'g')) {
                var str=rant.getNounByType('round', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('body', 'g')) {
                var str=rant.getNounByType('body', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('liquid', 'g')) {
                var str=rant.getNounByType('liquid', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('insect', 'g')) {
                var str=rant.getNounByType('insect', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('clothes', 'g')) {
                var str=rant.getNounByType('clothes', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('plant', 'g')) {
                var str=rant.getNounByType('plant', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('person', 'g')) {
                var str=rant.getNounByType('person', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('long', 'g')) {
                var str=rant.getNounByType('long', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('ball', 'g')) {
                var str=rant.getNounByType('ball', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('article', 'g')) {
                var str=rant.getNounByType('article', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('drug', 'g')) {
                var str=rant.getNounByType('drug', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('fruit', 'g')) {
                var str=rant.getNounByType('fruit', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('container', 'g')) {
                var str=rant.getNounByType('container', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('instrument', 'g')) {
                var str=rant.getNounByType('instrument', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('sex', 'g')) {
                var str=rant.getNounByType('sex', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('job', 'g')) {
                var str=rant.getNounByType('job', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('weapon', 'g')) {
                var str=rant.getNounByType('weapon', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('hole', 'g')) {
                var str=rant.getNounByType('hole', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('food', 'g')) {
                var str=rant.getNounByType('food', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('vehicle', 'g')) {
                var str = rant.getNounByType('vehicle', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('shape', 'g')) {
                var str = rant.getNounByType('shape', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else {
                var str=rant.getNoun(plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
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

