function SimpleRant() {


    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches, token;
        var replacement = [], i=0;

        while (matches = regex.exec(input)) {


            //var input = "noun -long -animal";
            // We accept a number of keywords, and they all correlate to the entries in the DIC files
            // First, get the DIC token
            var re=new RegExp("\\w+","g");
            token = matches[1].match(re);
            // Match against valid keywords in valid_tokens

            //console.log("checking for existence of token "+token[0]+" in valid_tokens");
            if(valid_tokens.indexOf(token[0]) != -1){
                //console.log("valid token: "+token[0]+" ");

                // Now we're ready to pass the token to the parser. It should
                // include the token and any modifiers
                result = lexer(this, token[0], token, matches[0], result);

            }

        }
        return this.capitalize(result);
    };


}

if('undefined' != typeof module){
    module.exports.SimpleRant = SimpleRant;
}