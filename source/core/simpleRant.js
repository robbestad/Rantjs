function SimpleRant() {

    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches, keyword, acceptedKeywords;
        var replacement = [], i=0;

        while (matches = regex.exec(input)) {


            //var input = "noun -long -animal";
            var re=new RegExp("\\w+","g");

            console.log(
                input.match(re)[0]
            );

            // First, get the DIC keyword
            keyword = input.match(re)[0];

            // We accept a number of keywords, and they all correlate to the entries in the DIC files

            //Below is the naive approach. It works, but it's neither elegant nor practical

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

            if (matches[1].match('^noun-tool')) {
                if('undefined' == typeof toolmatch) var toolmatch=false;
                if(!toolmatch) { toolmatch = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-surface')) {
                if('undefined' == typeof surfmatch) var surfmatch=false;
                if(!surfmatch) { surfmatch = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-furniture')) {
                if('undefined' == typeof furnimatch) var furnimatch=false;
                if(!furnimatch) { furnimatch = true; result = parseNouns(this, matches[1], input, result); } }


            if (matches[1].match('^noun-round')) {
                if('undefined' == typeof n1m) var n1m=false;
                if(!n1m) { n1m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-body')) {
                if('undefined' == typeof n2m) var n2m=false;
                if(!n2m) { n2m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-long')) {
                if('undefined' == typeof nlmn) var nlmn=false;
                if(!nlmn) { nlmn = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-liquid')) {
                if('undefined' == typeof n3m) var n3m=false;
                if(!n3m) { n3m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-insect')) {
                if('undefined' == typeof n4m) var n4m=false;
                if(!n4m) { n4m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-clothes')) {
                if('undefined' == typeof n5m) var n5m=false;
                if(!n5m) { n5m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-plant')) {
                if('undefined' == typeof n6m) var n6m=false;
                if(!n6m) { n6m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-person')) {
                if('undefined' == typeof n7m) var n7m=false;
                if(!n7m) { n7m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-ball')) {
                if('undefined' == typeof n9m) var n9m=false;
                if(!n9m) { n9m = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-article')) {
                if('undefined' == typeof n1am) var n1am=false;
                if(!n1am) { n1am = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-drug')) {
                if('undefined' == typeof n1bm) var n1bm=false;
                if(!n1bm) { n1bm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-fruit')) {
                if('undefined' == typeof n1cm) var n1cm=false;
                if(!n1cm) { n1cm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-container')) {
                if('undefined' == typeof n1dm) var n1dm=false;
                if(!n1dm) { n1dm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-instrument')) {
                if('undefined' == typeof n2em) var n2em=false;
                if(!n2em) { n2em = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-sex')) {
                if('undefined' == typeof n2rm) var n2rm=false;
                if(!n2rm) { n2rm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-job')) {
                if('undefined' == typeof n2fm) var n2fm=false;
                if(!n2fm) { n2fm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-weapon')) {
                if('undefined' == typeof n2tm) var n2tm=false;
                if(!n2tm) { n2tm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-hole')) {
                if('undefined' == typeof n2gm) var n2gm=false;
                if(!n2gm) { n2gm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-food')) {
                if('undefined' == typeof n2hm) var n2hm=false;
                if(!n2hm) { n2hm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-vehicle')) {
                if('undefined' == typeof n2jm) var n2jm=false;
                if(!n2jm) { n2jm = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-animal')) {
                if('undefined' == typeof n2km) var n2km=false;
                if(!n2km) { n2km = true; result = parseNouns(this, matches[1], input, result); } }

            if (matches[1].match('^noun-shape')) {
                if('undefined' == typeof n2lm) var n2lm=false;
                if(!n2lm) { n2lm = true; result = parseNouns(this, matches[1], input, result); } }

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