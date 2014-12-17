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
var lexer = function (rant, token, matched, matchString, input) {
    var result, modifier=0;


    // matched[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.

    // Let's check if there's any qualifiers or modifiers
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
        //console.dir(myfilters);
        dictionary=dictionary.concat(dic[token].all);
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
    re = new RegExp( matchString, 'g');
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

    re = new RegExp(matchString, 'g');
    input = input.replace(re, function () {
        return replacement[i++];
    });

    return input;
};




SimpleRant.prototype.getFacialExpressionVerbed = function () {
    var num = Math.floor(Math.random() * dic.faced.length);
    return dic.faced[num];
};

SimpleRant.prototype.capitalize = function (s) {
    return s[0].toUpperCase() + s.slice(1);
};
SimpleRant.prototype.getTitle = function () {
    var num = Math.floor(Math.random() * dic.title.all.length);
    return dic.title.all[num];
};
SimpleRant.prototype.getPossMale = function () {
    return dic.pron.male[0].split("/")[3];
};

SimpleRant.prototype.getPossFemale = function () {
    return dic.pron.female[0].split("/")[3];
};


SimpleRant.prototype.getNounAnimal = function () {
    var num = Math.floor(Math.random() * dic.noun.animal.length);
    return dic.noun.animal[num].split("/")[3];
};
SimpleRant.prototype.getCountry = function() {
    var num = Math.floor(Math.random() * dic.country.africa.concat(dic.country.asia,dic.country.caribbean,dic.country.centralamerica,dic.country.eurasia,dic.country.europe,dic.country.mediterranean,dic.country.middleeast,dic.country.northamerica,dic.country.oceania,dic.country.southamerica).length);
    return dic.country.africa.concat(dic.country.asia,dic.country.caribbean,dic.country.centralamerica,dic.country.eurasia,dic.country.europe,dic.country.mediterranean,dic.country.middleeast,dic.country.northamerica,dic.country.oceania,dic.country.southamerica)[num];
};

SimpleRant.prototype.getAdjective = function (plural) {
    var num = Math.floor(Math.random() * dic.adj.all.length);
    if("undefined" != dic.adj.all[num].split("/")[plural])
    return dic.adj.all[num].split("/")[plural];
    else
        return dic.adj.all[num];

};


SimpleRant.prototype.getAdverb = function() {
    var num = Math.floor(Math.random() * dic.adv.emotion.concat(dic.adv.sexy).length);
    return dic.adv.emotion.concat(dic.adv.sexy)[num];
};


SimpleRant.prototype.getAdverbByType = function (type) {
    var num;
    if(type=="emotion"){
        num = Math.floor(Math.random() * dic.adv.emotion.length);
        return dic.adv.emotion[num];
    }
    if(type=="sexy"){
        num = Math.floor(Math.random() * dic.adv.sexy.length);
        return dic.adv.sexy[num];
    }
};


SimpleRant.prototype.getVerb = function (plural) {
    var num = Math.floor(Math.random() * dic.verb.all.length);
    return dic.verb.all[num].split("/")[plural];
};
SimpleRant.prototype.getColor = function (plural) {
    var num = Math.floor(Math.random() * dic.color.primary.concat(dic.color.secondary).length);
    return dic.color.primary.concat(dic.color.secondary)[num].split("/")[plural];
};
SimpleRant.prototype.getNoun = function (plural) {
    var num = Math.floor(Math.random() * dic.noun.surface.concat(dic.noun.furniture,dic.noun.liquid,dic.noun.animal,dic.noun.article,dic.noun.ball,dic.noun.clothes,dic.noun.container,dic.noun.drug,dic.noun.food,dic.noun.fruit,dic.noun.furniture,dic.noun.hole,dic.noun.insect,dic.noun.job,dic.noun.liquid,dic.noun.long,dic.noun.person,dic.noun.plant,dic.noun.sex,dic.noun.surface,dic.noun.tool,dic.noun.vehicle,dic.noun.weapon).length);
    return  dic.noun.surface.concat(dic.noun.furniture,dic.noun.liquid,dic.noun.animal,dic.noun.article,dic.noun.ball,dic.noun.clothes,dic.noun.container,dic.noun.drug,dic.noun.food,dic.noun.fruit,dic.noun.furniture,dic.noun.hole,dic.noun.insect,dic.noun.job,dic.noun.liquid,dic.noun.long,dic.noun.person,dic.noun.plant,dic.noun.sex,dic.noun.surface,dic.noun.tool,dic.noun.vehicle,dic.noun.weapon)[num].split("/")[plural];
};
SimpleRant.prototype.getNounByType = function (nountype,plural) {
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic.noun.animal.length);
        return dic.noun.animal[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic.noun.tool.length);
        return dic.noun.tool[num].split("/")[plural];
    }
    if(nountype == "surface"){
        var num = Math.floor(Math.random() * dic.noun.surface.length);
        return dic.noun.surface[num].split("/")[plural];
    }
    if(nountype == "furniture"){
        var num = Math.floor(Math.random() * dic.noun.furniture.length);
        return dic.noun.furniture[num].split("/")[plural];
    }
    if(nountype == "round"){
        var num = Math.floor(Math.random() * dic.noun.round.length);
        return dic.noun.round[num].split("/")[plural];
    }
    if(nountype == "body"){
        var num = Math.floor(Math.random() * dic.noun.body.length);
        return dic.noun.body[num].split("/")[plural];
    }
    if(nountype == "liquid"){
        var num = Math.floor(Math.random() * dic.noun.liquid.length);
        return dic.noun.liquid[num].split("/")[plural];
    }
    if(nountype == "insect"){
        var num = Math.floor(Math.random() * dic.noun.insect.length);
        return dic.noun.insect[num].split("/")[plural];
    }
    if(nountype == "clothes"){
        var num = Math.floor(Math.random() * dic.noun.clothes.length);
        return dic.noun.clothes[num].split("/")[plural];
    }
    if(nountype == "plant"){
        var num = Math.floor(Math.random() * dic.noun.plant.length);
        return dic.noun.plant[num].split("/")[plural];
    }
    if(nountype == "person"){
        var num = Math.floor(Math.random() * dic.noun.person.length);
        return dic.noun.person[num].split("/")[plural];
    }
    if(nountype == "tool"){
        var num = Math.floor(Math.random() * dic.noun.tool.length);
        return dic.noun.tool[num].split("/")[plural];
    }
    if(nountype == "long"){
        var num = Math.floor(Math.random() * dic.noun.long.length);
        return dic.noun.long[num].split("/")[plural];
    }
    if(nountype == "ball"){
        var num = Math.floor(Math.random() * dic.noun.ball.length);
        return dic.noun.ball[num].split("/")[plural];
    }
    if(nountype == "article"){
        var num = Math.floor(Math.random() * dic.noun.article.length);
        return dic.noun.article[num].split("/")[plural];
    }
    if(nountype == "drug"){
        var num = Math.floor(Math.random() * dic.noun.drug.length);
        return dic.noun.drug[num].split("/")[plural];
    }
    if(nountype == "fruit"){
        var num = Math.floor(Math.random() * dic.noun.fruit.length);
        return dic.noun.fruit[num].split("/")[plural];
    }
    if(nountype == "container"){
        var num = Math.floor(Math.random() * dic.noun.container.length);
        return dic.noun.container[num].split("/")[plural];
    }
    if(nountype == "instrument"){
        var num = Math.floor(Math.random() * dic.noun.instrument.length);
        return dic.noun.instrument[num].split("/")[plural];
    }
    if(nountype == "sex"){
        var num = Math.floor(Math.random() * dic.noun.sex.length);
        return dic.noun.sex[num].split("/")[plural];
    }
    if(nountype == "job"){
        var num = Math.floor(Math.random() * dic.noun.job.length);
        return dic.noun.job[num].split("/")[plural];
    }
    if(nountype == "weapon"){
        var num = Math.floor(Math.random() * dic.noun.weapon.length);
        return dic.noun.weapon[num].split("/")[plural];
    }
    if(nountype == "hole"){
        var num = Math.floor(Math.random() * dic.noun.hole.length);
        return dic.noun.hole[num].split("/")[plural];
    }
    if(nountype == "food"){
        var num = Math.floor(Math.random() * dic.noun.food.length);
        return dic.noun.food[num].split("/")[plural];
    }
    if(nountype == "vehicle"){
        var num = Math.floor(Math.random() * dic.noun.vehicle.length);
        return dic.noun.vehicle[num].split("/")[plural];
    }
    if(nountype == "animal"){
        var num = Math.floor(Math.random() * dic.noun.animal.length);
        return dic.noun.animal[num].split("/")[plural];
    }
    if(nountype == "shape"){
        var num = Math.floor(Math.random() * dic.noun.shape.length);
        return dic.noun.shape[num].split("/")[plural];
    }
    return "";
};
SimpleRant.prototype.getAmount = function () {
    var num = Math.floor(Math.random() * dic.amount.length);
    return dic.amount[num];
};
SimpleRant.prototype.getRelationship = function (plural) {
    var num = Math.floor(Math.random() * dic.rel.neutral.concat(dic.rel.male, dic.rel.female).length);
    return dic.rel.neutral.concat(dic.rel.male, dic.rel.female)[num].split("/")[plural];
};
SimpleRant.prototype.getTitleMale = function () {
    var num = Math.floor(Math.random() * dic.title.all.length);
    return dic.title.all[num];
};

SimpleRant.prototype.getNameMale = function () {
    var num = Math.floor(Math.random() * dic.names.male.length);
    return dic.names.male[num];
};
SimpleRant.prototype.getNameFemale = function () {
    var num = Math.floor(Math.random() * dic.names.female.length);
    return dic.names.female[num];
};

SimpleRant.prototype.getYes = function () {
    var num = Math.floor(Math.random() * dic.yn.yes.length);
    return dic.yn.yes[num];
};
SimpleRant.prototype.getNo = function () {
    var num = Math.floor(Math.random() * dic.yn.no.length);
    return dic.yn.no[num];
};
SimpleRant.prototype.getExclamation = function () {
    var num = Math.floor(Math.random() * dic.emo.all.length);
    return dic.emo.all[num];
};
SimpleRant.prototype.getFirstName = function () {
    var num = Math.floor(Math.random() * dic.names.male.concat(dic.names.female).length);
    return dic.names.male.concat(dic.names.female)[num].split("/")[plural];
};
SimpleRant.prototype.getLastName = function () {
    var num = Math.floor(Math.random() * dic.surname.all.length);
    return dic.surname.all[num];
};
SimpleRant.prototype.getFacialExpression = function () {
    var num = Math.floor(Math.random() * dic.face.all.length);
    return dic.face.all[num];
};

SimpleRant.prototype.getCoordinatingConjunction = function () {
    var num = Math.floor(Math.random() * dic.conj.all.length);
    return dic.conj.all[num];
};


SimpleRant.prototype.getTimeNoun = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.dayofweek.concat(dic.timenoun.timeofday,dic.timenoun.month).length);
    return dic.timenoun.dayofweek.concat(dic.timenoun.timeofday,dic.timenoun.month)[num].split("/")[plural];
};

SimpleRant.prototype.getTimeDayOfWeek = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.dayofweek.length);
    return dic.timenoun.dayofweek[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfDay = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.timeofday.length);
    return dic.timenoun.timeofday[num].split("/")[plural];
};
SimpleRant.prototype.getTimeOfMonth = function (plural) {
    var num = Math.floor(Math.random() * dic.timenoun.month.length);
    return dic.timenoun.month[num].split("/")[plural];
};


