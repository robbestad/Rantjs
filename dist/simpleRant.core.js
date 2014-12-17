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
var lexer = function (rant, matched, matches, input) {
    var result, modifier=0;
    var token = matched[0];

    // matched[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.

    // Let's check if there's any qua'lifiers or modifiers
    if(matched[0].length>1){
        // yes, there are. There are two classes. Filters and subs. Let's see what we got
        var mysubs=myfilters=[];
        var dictionary=[];
        if(matched.length>1){
            matched.forEach(function(entry,idx) {
                if(idx>0){
                    if("undefined" != typeof filters[token]){
                        if(filters[token].indexOf(entry)>-1){
                            //console.log("valid filter: "+entry);
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if("undefined" != typeof subs[token]){
                        if(subs[token].indexOf(entry)>-1){
                            // Subs are grammatical instructions
                            modifier = subs[token].indexOf(entry);
                            //console.log("valid sub: "+entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }

    }
    if(myfilters.length<=0){
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



SimpleRant.prototype.capitalize = function (s) {
    return s[0].toUpperCase() + s.slice(1);
};

