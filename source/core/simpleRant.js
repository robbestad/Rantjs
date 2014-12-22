function SimpleRant() {
    this.rantConstructor = function (inputStream) {
        var outputStream = inputStream, re;
        var regex = /\<(.*?)\>/g;
        var matches, token, indexPos;
        var replacement, i = 0, tags={};
        var repetitions=1;
        var separator=" ";
        var stringCase=this.getCase(inputStream);

        outputStream = inputStream.toLowerCase(), regex = /(\[.*?\])/g;
        while (matches = regex.exec(inputStream)) {
            // [rep:4][sep:\s]{\8,x}
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            if(token[0] === "sep"){
                separator=token[1];
                //separator=matches[0].match(/[^[\](sep:)]+(?=])/)[0];
            }
            if(token[0] === "rep"){
                repetitions=token[1];
            }
        }

        // remove the brackets
        while (matches = regex.exec(inputStream)) {
            inputStream = inputStream.replace(/(\[.*?\])/g, '');
        }

        // instructions in the brackets will only be applied to tokens matched in curly braces
        regex = /(\{.*?\})/;
        var res="";
        var curlymatch;

        while (curlymatch = regex.exec(inputStream)) {
            replacement=this.braceParser(inputStream,curlymatch[1],repetitions,separator);
            inputStream = inputStream.replace(curlymatch[1],replacement);
        }

        // lexer matches (anything inside arrow notation)
        outputStream = this.lexer(inputStream);

        return this.capitalize(outputStream, stringCase);
    };
}


if ('undefined' != typeof module) {
    module.exports.SimpleRant = SimpleRant;
}