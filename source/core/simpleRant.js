function SimpleRant() {
    this.rantConstructor = function (input) {
        var result = input, matches, token, replacement = [], i= 0, regex = /\<(.*?)\>/g;
        while (matches = regex.exec(input)) {
            //var input = "noun -long -animal";
            // We accept a number of keywords, and they all correlate to the entries in the DIC files
            // First, get the DIC token
            var re=new RegExp("\\w+","g");
            token = matches[1].match(re);
            // Match against valid keywords in valid_tokens
            if(valid_tokens.indexOf(token[0]) != -1){
                // Now we're ready to pass the token to the parser. It should
                // include the token and any modifiers
                result = lexer(this, token, matches, result);
            }
        }
        return this.capitalize(result);
    };
}

SimpleRant.prototype.capitalize = function (s) {
    return s[0].toUpperCase() + s.slice(1);
};

if('undefined' != typeof module){
    module.exports.SimpleRant = SimpleRant;
}