(function () {
    var arrayMethods = {
        /** Returns a shallow copy of this array */
        copy: function () { return this.slice(0); },

        /** Returns true if this array contains 'element', returns false otherwise */
        contains: function (element) { return this.indexOf(element) >= 0; },

        /**  Returns a copy of this array, removing the elements 'from' index 'to' index within it */
        remove: function (from, to) {
            var res = [];
            var i = 0, j = 0;
            for (i = 0; i < from; i++) {
                res[i] = this[i];
            }
            j = i;
            for (i = to; i < this.length; i++) {
                res[j++] = this[i];
            }
            return res;
        },

        /** Returns a copy of this array, rotated 'n' places, counterclockwise if 'n' is positive, clockwise otherwise*/
        rotate: function (n) {
            if (!n) return this.slice(0);
            var length = this.length;
            var res = new Array(length);
            var thisIndex = (n > 0) ? n : length + n, i = 0, j = 0;
            for (i = thisIndex; i < length; i++) {
                res[j++] = this[i];
            }
            for (i = 0; i < thisIndex; i++) {
                res[j++] = this[i];
            }
            return res;
        },

        /**
         * Returns a copy of this array, removing but
         *         the first 'n' elements from it
         *         assumes n=1 when called with no arguments.
         */
        skipFirst: function (n) {
            if (n === 'undefined') n = 1;
            return this.slice(n);
        },

        /**
         * Returns a copy of this array, removing
         *         but the last 'n' elements from it
         *         assumes n=1 when called with no arguments.
         */
        skipLast: function (n) {
            if (n === 'undefined') n = 1;
            if (n > this.length) return [];
            return this.slice(0, this.length - n);
        },

        /**
         * Returns a copy of this array,
         *         sorting its elements randomly
         */

        shuffle: function () {
            array = this.splice(0);
            var m = array.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        },

        /**
         * Returns an unique array
         */
        makeUnique: function(){
            var u = {}, a = [];
            for(var i = 0, l = this.length; i < l; ++i){
                if(u.hasOwnProperty(this[i])) {
                    continue;
                }
                a.push(this[i]);
                u[this[i]] = 1;
            }
            return a;
        },

        /**
         * Returns this associative array length
         */
        getAssociativeArrayLength: function () {
            return this.length;
        },

        /**
         * Returns a copy of this array that contains the difference
         *         between source array and 'array'
         */
        difference: function (array) {
            var filterFunc = filterOnOtherArray_diff.bind(array);
            return this.filter(filterFunc);
        },

        /**
         * Returns a copy of this array that contains the
         *         intersection between source array and 'array'
         */
        intersection: function (array) {
            var filterFunc = filterOnOtherArray_inter.bind(array);
            return this.filter(filterFunc);
        },

        /**
         * Returns a copy of this array that contains the union
         *   between source array with 'array', removing duplicates
         *    ! fails with a sparse array !
         */
        union: function (array) {
            var obj = {}, res = [], i = 0, k = 0;
            for (i = 0; i < this.length; i++) {
                obj[this[i]] = this[i];
            }
            for (i = 0; i < array.length; i++) {
                obj[array[i]] = array[i];
            }
            for (k in obj) {
                res.push(obj[k]);
            }
            return res;
        }
    };

    // let's install those methods on the prototype
    for (var newMethodName in arrayMethods) {
        installFunction(newMethodName, arrayMethods[newMethodName]);
    }

    function installFunction(name, fn) {
        if (Array.prototype[name]) throw ('Array method ' + name + '() already defined.');
        Object.defineProperty(Array.prototype, name, {
            value: fn
        });
    }

    function filterOnOtherArray_diff(arr, i) {
        return (arr.indexOf(i) < 0);
    }

    function filterOnOtherArray_inter(arr, i) {
        return (arr.indexOf(i) >= 0);
    }
})();
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
var lexer = function (rant, matches, input) {
    var result, modifier= 0, re=new RegExp("\\w+","g");
    var token = matches[1].match(re)[0];
    var matched=matches[1].match(re);

    // matched[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.


    // Let's check if there's any qualifiers or modifiers
    if(token.length>1){
        // yes, there are. There are two classes. Filters and subs. Let's see what we got
        var mysubs=myfilters=[];
        var dictionary=[];
        if(matched.length>1){
            matched.forEach(function(entry,idx) {
                if(idx>0){
                    if("undefined" != typeof dic[token].filters){
                        if(dic[token].filters.indexOf(entry)>-1){
                            //console.log("valid filter: "+entry);
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if("undefined" != typeof dic[token].subs){
                        if(dic[token].subs.indexOf(entry)>-1){
                            // Subs are grammatical instructions
                            modifier = dic[token].subs.indexOf(entry);
                            //console.log("valid sub: "+entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }

    }
    if(myfilters.length<=0){
        //console.log(token);
        //console.log(dic[token]);
        if("undefined" != typeof dic[token].all){
            dictionary=dictionary.concat(dic[token].all);
        }
    } else {
        myfilters.forEach(function(e){
            dictionary=dictionary.concat(dic[token][e]);
        });
    }



    if(modifier===0){
        matched.forEach(function(e){
            if(e.toLowerCase() === "modifier"){
                modifier=1;
            }
        });
    }

    var rand, re, i, newToken, replacement = [];
    re = new RegExp( matches[0], 'g');
    if(null !== input.match(re)) i = input.match(re).length;
    while (i > 0) {
        rand = Math.floor(Math.random()*dictionary.length);
        if(dictionary[rand].match(/\//) <=0){
            newToken=dictionary[rand];
        } else {
            newToken=dictionary[rand].split("/")[modifier];
        }
        replacement.push(newToken);
        i--;
    }

    //console.log("using dictionary ");
    var rand=Math.floor(Math.random()*dictionary.length);
    //console.dir(dictionary[rand]);

    re = new RegExp(matches[0], 'g');
    input = input.replace(re, function () {
        return replacement[i++];
    });

    return input;
};



String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

String.prototype.toWordCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSentenceCase = function() {
    var re = /(^\s*\w{1}|\.\s*\w{1})/gi;
    return this.replace(re, function(str) {
        return str.toUpperCase();
    });
};

SimpleRant.prototype.getCase = function (tokenStream) {
    var _case = 0;
    var cases = ["default", "none", "lower", "upper", "title", "word", "first", "sentence"];
    var token, matches, re;
    while (matches = /(\[.*?\])/g.exec(tokenStream)) {
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (["case"].indexOf(token[0]) != -1) {
            if (token[0] === "case") {
                if (cases.indexOf(token[1] != -1)) {
                    _case = cases.indexOf(token[1]);
                }
            }
        }
        return cases[_case];
    }
};




SimpleRant.prototype.capitalize = function (s,_case) {
    if(_case==="upper")
        return s.toUpperCase();
    else if(_case==="lower")
        return s.toLowerCase();
    else if(_case==="word")
        return s.toWordCase();
    else if(_case==="title")
        return s.toTitleCase();
    else if(_case==="sentence")
        return s.toSentenceCase();
    else if(_case==="none")
        return s;
    else
        return s[0].toUpperCase() + s.slice(1); //default && first

};