function SimpleRant() {
    this.rantConstructor = function (input) {
        var result = input, re;
        var regex = /\<(.*?)\>/g;
        var matches, token;
        var replacement = [], i = 0, tags={};

        var _case="default";
        var cases={valid:["default","none","lower","upper","title","word","first","sentence"]};

        // TAG matches (anything inside bracket notation)
        // From the Wiki https://github.com/TheBerkin/Rant/wiki
        // Tags are instructions that can be placed anywhere inside a pattern.
        // They change various aspects of how the pattern is interpreted past that point.
        // Tags are defined inside of square brackets ([ ]).
        // There are several types of tags: functions, metapatterns, replacers, list functions, and subroutines.

        result = input, matches, token, replacement = [], i= 0, regex = /(\[.*?\])/g;
        tags.valid=["rep","case"];
        while (matches = regex.exec(input)) {
            // [rep:4] - repeat 4 times (loop)
            // [rep:4][sep:\s]{\8,x}
            //console.log("input token: "+matches[1]);
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);

            if (tags.valid.indexOf(token[0]) != -1) {
                //console.log("valid token: "+token);
                if(token[0]==="case"){
                    if(cases.valid.indexOf(token[1] != -1)){
                        _case=cases.valid.indexOf(token[1]);
                    }
                }
                //console.log("case: "+cases.valid[_case]);

                //remove the tag
                input = input.replace(matches[0], '');
                //tags.applied=matches[1];
            }
        }



        //
        //
        //
        //// expression matches (anything inside curly bracket notation)
        //result = input, matches, token, replacement = [], i= 0, regex = /(\{.*?\})/g;
        //while (matches = regex.exec(input)) {
        //    // [rep:4] - repeat 4 times (loop)
        //    // [rep:4][sep:\s]{\8,x}
        //    console.log(matches[1]);
        //    //result = lexer(this, matches, result);
        //
        //}

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
        return this.capitalize(result,cases.valid[_case]);
    };
}


if ('undefined' != typeof module) {
    module.exports.SimpleRant = SimpleRant;
}