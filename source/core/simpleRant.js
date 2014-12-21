function SimpleRant() {
    this.rantConstructor = function (input) {
        var result = input, re;
        var regex = /\<(.*?)\>/g;
        var matches, token;
        var replacement = [], i = 0, tags={};

        var stringCase=this.getCase(input);

        // TAG matches (anything inside bracket notation)
        // From the Wiki https://github.com/TheBerkin/Rant/wiki
        // Tags are instructions that can be placed anywhere inside a pattern.
        // They change various aspects of how the pattern is interpreted past that point.
        // Tags are defined inside of square brackets ([ ]).
        // There are several types of tags: functions, metapatterns, replacers, list functions, and subroutines.

        result = input, matches, token, replacement = [], i= 0, regex = /(\[.*?\])/g;
        tags.valid=["rep","case"];
        while (matches = regex.exec(input)) {
            input = input.replace(matches[0], '');

            // [rep:4] - repeat 4 times (loop)
            // [rep:4][sep:\s]{\8,x}
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);


        }




        // lexer matches (anything inside arrow notation)
        result = input, matches, token, replacement = [], i = 0, regex = /\<(.*?)\>/g;
        while (matches = regex.exec(input)) {
            //var input = "noun long animal";
            // We accept a number of keywords, and they all correlate to the entries in the DIC files
            // First, get the DIC token
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            // Match against valid keywords in valid_tokens
            if (dic.tokens.indexOf(token[0]) != -1) {
                // Now we're ready to pass the token to the parser. It should
                // include the token and any modifiers and subs
                result = lexer(this, matches, result);
            }
        }
        return this.capitalize(result,stringCase);
    };
}


if ('undefined' != typeof module) {
    module.exports.SimpleRant = SimpleRant;
}