var replaceToken = function (matches, input, matchIndex) {
    var result, modifier = 0, re = new RegExp("\\w+", "g");
    var token = matches[matchIndex].match(re)[0];
    var indexPos = matches.index;
    var matched = matches[matchIndex].match(re);
    // matched[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.
    // Let's check if there's any qualifiers or modifiers
    if (token.length > 1) {
        // There are two types. Filters and subs. Let's see what we got
        var mysubs = myfilters = [];
        var dictionary = [];
        if (matched.length > 1) {
            matched.forEach(function (entry, idx) {
                if (idx > 0) {
                    if ("undefined" != typeof require("en_US")()[token].filters) {
                        if (require("en_US")()[token].filters.indexOf(entry) > -1) {
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if ("undefined" != typeof require("en_US")()[token].subs) {
                        if (require("en_US")()[token].subs.indexOf(entry) > -1) {
                            // Subs are grammatical instructions
                            modifier = require("en_US")()[token].subs.indexOf(entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }
    }
    if (myfilters.length <= 0) {
        if ("undefined" != typeof require("en_US")()[token].all) {
            dictionary = dictionary.concat(require("en_US")()[token].all);
        }
    } else {
        myfilters.forEach(function (e) {
            dictionary = dictionary.concat(require("en_US")()[token][e]);
        });
    }

    if (modifier === 0) {
        matched.forEach(function (e) {
            if (e.toLowerCase() === "modifier") {
                modifier = 1;
            }
        });
    }

    var rand, newToken, replacement = [];
    re = new RegExp(matches[0], 'g');

    rand = Math.floor(Math.random() * dictionary.length);
    if (dictionary[rand].match(/\//) <= 0) {
        newToken = dictionary[rand];
    } else {
        newToken = dictionary[rand].split("/")[modifier];
    }
    replacement.push(newToken);

    rand = Math.floor(Math.random() * dictionary.length);
    return replacement[0];
};
module.exports=replaceToken;
