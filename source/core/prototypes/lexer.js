SimpleRant.prototype.replaceToken = function (matches, input, matchIndex) {
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
                    if ("undefined" != typeof dic[token].filters) {
                        if (dic[token].filters.indexOf(entry) > -1) {
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if ("undefined" != typeof dic[token].subs) {
                        if (dic[token].subs.indexOf(entry) > -1) {
                            // Subs are grammatical instructions
                            modifier = dic[token].subs.indexOf(entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }
    }
    if (myfilters.length <= 0) {
        if ("undefined" != typeof dic[token].all) {
            dictionary = dictionary.concat(dic[token].all);
        }
    } else {
        myfilters.forEach(function (e) {
            dictionary = dictionary.concat(dic[token][e]);
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


SimpleRant.prototype.lexer = function (input) {
    var tempRes="";
    var result = input, matches, token, replacement = [],regex = /\<(.*?)\>/g;
    while (matches = regex.exec(input)) {
        //console.log(matches);
        // We accept a number of keywords, and they all correlate to the entries in the DIC files
        // First, get the DIC token
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        // Match against valid keywords in valid_tokens
        if (dic.tokens.indexOf(token[0]) != -1) {
            // Now we're ready to pass the token to the parser. It should
            // include the token and any modifiers and subs
            // result = lexer(this, matches, result);

            tempRes = this.replaceToken( matches, result, 1);

            result = result.replace(matches[0], function () {
                return tempRes;
            });
        }
    }
    return result;
};

SimpleRant.prototype.braceParser = function (input, group, repetitions, separator) {
    var tempRes = "", matchIndex = 1;
    var result = input, matches = [], token, replacement = [], regex;
    matchIndex = 0;
    group = group.replace("}", "");
    group = group.replace("{", "");
    regex = /<(.*?)>/g;

    var newGroup = '';
    i = 0;
    while (i < repetitions) {
        while (matches = regex.exec(group)) {
            var groupCopy = group;
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            if (dic.tokens.indexOf(token[0]) != -1) {
                //groupCopy +=  this.replaceToken( matches, result, 1);
                if (separator === "n") groupCopy += separator.replace("n", "\n");
                else if (separator === "s") groupCopy += separator.replace("s", " ");
                else groupCopy += separator;
            }
        }
        newGroup += groupCopy;

        i++;
    }
    return newGroup;
};

