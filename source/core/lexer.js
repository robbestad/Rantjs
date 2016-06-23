var lexer = function (input, dic) {
    dic = dic || require("./en_US");
    var tempRes="";
    var result = input, matches, token, replacement = [],regex = /\<(.*?)\>/g;
    while (matches = regex.exec(input)) {
        // We accept a number of keywords, and they all correlate to the entries in the DIC files
        // First, get the DIC token
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        // Match against valid keywords in valid_tokens
        if (dic().tokens.indexOf(token[0]) != -1) {
            // Now we're ready to pass the token to the parser. It should
            // include the token and any modifiers and subs
            // result = lexer(this, matches, result);

            tempRes = require("./replaceToken")( matches, result, 1, dic);
            result = result.replace(matches[0], function () {
                return tempRes;
            });
        }
    }
    return result;
};
module.exports=lexer;
