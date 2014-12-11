function SimpleRant() {

    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches;
        var replacement = [], i=0;

        while (matches = regex.exec(input)) {

            if (matches[1] == "adv") {
                if('undefined' == typeof adv1match) var adv1match=false;
                if(!adv1match) { adv1match = true; result = parseAdverb(this, matches[1], input, result); } }

            if (matches[1].match('^adv-sexy')) {
                if('undefined' == typeof adv2match) var adv2match=false;
                if(!adv2match) { adv2match = true; result = parseAdverb(this, matches[1], input, result); } }

            if (matches[1].match('^adv-emotion')) {
                if('undefined' == typeof advmatch) var advmatch=false;
                if(!advmatch) { advmatch = true; result = parseAdverb(this, matches[1], input, result); } }

            if (matches[1] == "verb") {
                if('undefined' == typeof vmatch) var vmatch=false;
                if(!vmatch) { vmatch = true; result = parseVerb(this, input, result); } }

            if (matches[1] == "yes") {
                if('undefined' == typeof ymatch) var ymatch=false;
                if(!ymatch) { ymatch = true; result = parseYes(this, input, result); } }

            if (matches[1] == "no") {
                if('undefined' == typeof nomatch) var nomatch=false;
                if(!nomatch) { nomatch = true; result = parseNo(this, input, result); } }

            if (matches[1] == "pron.poss-male") {
                if('undefined' == typeof possmatch) var possmatch=false;
                if(!possmatch) { possmatch = true; result = parsePronMale(this, input, result); } }

            if (matches[1] == "pron.poss-female") {
                if('undefined' == typeof possfmatch) var possfmatch=false;
                if(!possfmatch) { possfmatch = true; result = parsePronFemale(this, input, result); } }

            if (matches[1] == "verb-transitive") {
                if('undefined' == typeof vtmatch) var vtmatch=false;
                if(!vtmatch) { vtmatch = true; result = parseVerbTransitive(this, input, result); } }

            if (matches[1] == "verb.ed") {
                if('undefined' == typeof vematch) var vematch=false;
                if(!vematch) { vematch = true; result = parseVerbed(this, input, result); } }

            if (matches[1] == "title") {
                if('undefined' == typeof tmatch) var tmatch=false;
                if(!tmatch) { tmatch = true; result = parseTitle(this, input, result); } }

            if (matches[1] == "title-male") {
                if('undefined' == typeof tmmatch) var tmmatch=false;
                if(!tmmatch) { tmmatch = true; result = parseTitleMale(this, input, result); } }

            if (matches[1] == "name-male") {
                if('undefined' == typeof mmmatch) var mmmatch=false;
                if(!mmmatch) { mmmatch = true; result = parseNameMale(this, input, result); } }

            if (matches[1] == "name-female") {
                if('undefined' == typeof tmfatch) var tmfatch=false;
                if(!tmfatch) { tmfatch = true; result = parseNameFemale(this, input, result); } }

            if (matches[1] == "amount") {
                if('undefined' == typeof amatch) var amatch=false;
                if(!amatch) { amatch = true; result = parseAmount(this, input, result); } }

            if (matches[1] == "adj") {
                if('undefined' == typeof adjmatch) var adjmatch=false;
                if(!adjmatch) { adjmatch = true; result = parseAdjective(this, matches[1], input, result); } }

            if (matches[1] == "adj.plural") {
                if('undefined' == typeof adjpmatch) var adjpmatch=false;
                if(!adjpmatch) { adjpmatch = true; result = parseAdjective(this, matches[1], input, result); } }

            if (matches[1].match('^noun$')) {
                if('undefined' == typeof nmatch) var nmatch=false;
                if(!nmatch) { nmatch = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun.plural$')) {
                if('undefined' == typeof nplmatch) var nplmatch=false;
                if(!nplmatch) { nplmatch = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-animal$')) {
                if('undefined' == typeof nanmmatch) var nanmmatch=false;
                if(!nanmmatch) { nanmmatch = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^time$')) {
                if('undefined' == typeof tn1match) var tn1match=false;
                if(!tn1match) { tn1match = true; result = parseTimeNoun(this, matches[1], input, result); } }

            if (matches[1].match('^time-month$')) {
                if('undefined' == typeof tn3match) var tn3match=false;
                if(!tn3match) { tn3match = true; result = parseTimeNoun(this, matches[1], input, result); } }

            if (matches[1].match('^time-dayofweek(|.plural)')) {
                if('undefined' == typeof tn5match) var tn5match=false;
                if(!tn5match) { tn5match = true; result = parseTimeNoun(this, matches[1], input, result); } }

            if (matches[1].match('^time-month.plural$')) {
                if('undefined' == typeof tn4match) var tn4match=false;
                if(!tn4match) { tn4match = true; result = parseTimeNoun(this, matches[1], input, result); } }

            if (matches[1].match('^time.plural$')) {
                if('undefined' == typeof tn2match) var tn2match=false;
                if(!tn2match) { tn2match = true; result = parseTimeNoun(this, matches[1], input, result); } }

            if (matches[1].match('^exclamation')) {
                if('undefined' == typeof exmatch) var exmatch=false;
                if(!exmatch) { exmatch = true; result = parseExclamation(this, matches[1], input, result); } }

            if (matches[1].match('^color(|.plural)')) {
                if('undefined' == typeof clmatch) var clmatch=false;
                if(!clmatch) { clmatch = true; result = parseColor(this, matches[1], input, result); } }

            if (matches[1].match('^conjunction$')) {
                if('undefined' == typeof conjmatch) var conjmatch=false;
                if(!conjmatch) { conjmatch = true; result = parseConjunction(this, matches[1], input, result); } }

            if (matches[1].match('^relationship(|.plural)')) {
                if('undefined' == typeof relmatch) var relmatch=false;
                if(!relmatch) { relmatch = true; result = parseRelationship(this, matches[1], input, result); } }

            if (matches[1].match('^face(|.d)')) {
                if('undefined' == typeof fcmatch) var fcmatch=false;
                if(!fcmatch) { fcmatch = true; result = parseFace(this, matches[1], input, result); } }

        }
        return this.capitalize(result);
    };


}


if('undefined' != typeof module){
    module.exports.SimpleRant = SimpleRant;
}