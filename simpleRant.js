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
var dic={}; var subs={}; var filters={};

subs.adj=["normal","ness"];
filters.adj=["appearance","nationality","emotion","weather"];
filters.adv=["sexy","emotion"];
subs.color=["ish"];
filters.color=["primary","secondary"];
filters.country=["asia","middleeast","mediterranean","europe","southamerica","oceania","northamerica","africa","centralamerica","caribbean","eurasia"];
subs.name=["abbr"];
filters.name=["male"];
subs.noun=["singular","plural"];
filters.noun=["body","hole","person","sex","weapon","animal","tool","food","drug","article","fruit","container","furniture","instrument","plant","shape","ball","surface","long","round","clothes","vehicle","insect"];
subs.sound=["singular","plural"];
subs.place=["singular","plural"];
filters.place=["building","indoor","natural","outdoor"];
filters.prefix=["position","quantity","scale","anatomy"];
filters.prepos=["space","time"];
subs.pron=["obj","nom","self","poss","s"];
filters.pron=["male","female"];
subs.quality=["property","more","less","est"];
filters.quality=["physical","human"];
subs.rel=["singular","plural"];
filters.rel=["male","female","neutral"];
filters.substance=["liquid"];
filters.timeadv=["time","past","present","frequency"];
subs.timenoun=["singular","plural"];
filters.timenoun=["timeofday","dayofweek","month","holiday","unit"];
subs.unit=["singular","plural","abbr"];
filters.unit=["length","small","factor","large","weight","volume","pressure","energy","potential","capacitance","current","power","inductance"];
subs.verbimg=["normal","ing","ed","s","er"];
subs.say=["simple","ing","ed","s","er","pp","noun"];
subs.verb=["simple","ing","ed","s","er","pp","noun"];
filters.verb=["transitive","walk","intransitive","sex","pose","eat","liquid","motion","insert","violent","political","legal","move"];
var valid_keys=["activity", "adj", "adv", "color", "conj", "country", "emo", "em", "x", "face", "name", "greet", "surname", "noun", "sound", "title", "place", "prefix", "prepos", "pron", "quality", "rel", "sconj", "substance", "timeadv", "timenoun", "unit", "verbimg", "say", "verb", "vocal", "with", "yn"];


dic.amount = ["a few", "a bunch of", "some", "many more"];
dic.faced = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
dic.pron_female = ["her/she/herself/her/hers"];


var activity ={
	video: [ "Backgammon", "Pong", "Super Mario Bros.", "The Legend of Zelda", "Sonic the Hedgehog", "Call of Duty", "Battlefield", "Hitman", "Morrowind", "Oblivion", "Skyrim", "World of Warcraft", "Contra", "Halo", "Doom", "HalfLife", "Left 4 Dead"],
	game: [ "Football", "Soccer", "Tennis", "Basketball", "Baseball"],
	board: [ "Golf", "Chess", "Checkers"]
};
dic.activity = activity;

var adj ={
	weather: [ "sunny/sunniness", "weather", "rainy/raininess", "weather", "cloudy/cloudiness", "weather", "snowy/snowiness", "weather", "moonlit/moonlight", "weather", "starry/starriness", "weather", "foggy/fogginess", "weather"],
	emotion: [ "severe/severity", "emotion", "sullen/sullenness", "emotion", "naughty/naughtiness", "emotion", "devilish/devilishness", "emotion", "arrogant/arrogance", "emotion", "indifferent/indifference", "emotion", "cranky/crankiness", "emotion", "bittersweet/bittersweetness", "emotion", "jealous/envy", "emotion", "gay/gayness", "emotion", "thankful/thankfulness", "emotion", "groggy/grogginess", "emotion", "flirty/flirtiness", "emotion", "frightened/fright", "emotion", "evil/evil", "emotion", "cheeky/cheekiness", "emotion", "emo/emoness", "emotion", "gleeful/glee", "emotion", "joyful/joy", "emotion", "happy/happiness", "emotion", "bored/boredom", "emotion", "sorrowful/sorrow", "emotion", "sad/sadness", "emotion", "angry/anger", "emotion", "rageing/rage", "emotion", "guilty/guilt", "emotion", "envious/envy", "emotion", "blissful/bliss", "emotion", "interested/interest", "emotion", "smug/smugness", "emotion", "proud/pride", "emotion", "hungry/hunger", "emotion", "ashamed/shame", "emotion", "loving/love", "emotion", "mad/madness", "emotion", "hateful/hate", "emotion", "humiliated/humility", "emotion", "impatient/impatience", "emotion", "surprised/surprise", "emotion", "optimistic/optimism", "emotion", "disappointed/disappointment", "emotion", "remorseful/remorse", "emotion", "contemptuous/contempt", "emotion", "awed/awe", "emotion", "lustful/lust", "emotion", "longing/longing", "emotion", "content/contentfulness", "emotion", "pleasured/pleasure", "emotion", "tormented/torment", "emotion", "horrified/horror", "emotion", "shocked/shock", "emotion", "furious/fury", "emotion", "sly/slyness", "emotion", "aggravated/aggression", "emotion", "dashing/dashingness", "considerate/consideration", "busted/bustedness"],
	nationality: [ "Spanish/Spanish heritage", "nationality", "French/French heritage", "nationality", "German/German heritage", "nationality", "Italian/Italian heritage", "nationality", "Japanese/Japanese heritage", "nationality", "Chinese/Chinese heritage", "nationality", "Korean/Korean heritage", "nationality", "British/British heritage", "nationality", "African/African heritage", "nationality", "American/American heritage", "nationality", "Norwegian/Norwegian heritage", "nationality", "Russian/Russian heritage", "nationality", "Irish/Irish heritage", "nationality", "Mexican/Mexican heritage", "nationality", "Canadian/Canadian heritage", "nationality", "Australian/Australian heritage", "nationality", "AfricanAmerican/AfricanAmericanness", "nationality", "delinquent/delinquency"],
	appearance: [ "sweaty/sweatiness", "appearance", "soapy/soapiness", "appearance", "buttery/butteriness", "religious/religiousness", "righteous/righteousness", "patriotic/patrioticness", "spinetingling/tingliness", "waddly/waddliness", "wobbly/wobbliness", "traditional/tradition", "appetizing/appetizingness", "strict/strictness", "dreadful/dreadfulness", "mythical/mythicalness", "philosophical/philosophy", "enticing/enticingness", "offensive/offensiveness", "luscious/lusciousness", "bouncy/bounciness", "plentiful/plentifulness", "majorleague/majorleagueness", "significant/significance", "expressive/expression", "cuddly/cuddliness", "nude/nudity", "appearance", "rude/rudeness", "political/politicalness", "creative/creativity", "sinful/sin", "glorious/gloriousness", "merciful/mercy", "forgiving/forgiveness", "smart/smartness", "salty/saltiness", "peppery/pepperiness", "slurpee/slurpiness", "criminal/criminality", "domestic/domesticness", "meaningful/meaning", "manly/manliness", "barbeque/barbequeness", "casual/casualness", "standard/standardness", "nasty/nastiness", "exquisite/exquisiteness", "bold/boldness", "proper/properness", "fresh/freshness", "informative/informativeness", "jiggly/jiggliness", "rebellious/rebelliousness", "direful/direfulness", "soothing/soothingness", "disloyal/disloyalty", "loyal/loyalty", "victorious/victory", "deep/depth", "zen/zenness", "royal/royalty", "delightful/delightfulness", "yummy/yumminess", "refreshing/refreshingness", "pleasurable/pleasurability", "delectable/delectableness", "intense/intensity", "ghetto/ghettoness", "strange/strangeness", "odd/oddness", "wasted/wastedness", "eccentric/eccentricity", "satisfactory/satisfaction", "pharmaceutical/pharmaceuticalness", "fishy/fishiness", "jellybelly/jellybellyness", "exotic/exoticness", "queer/queerness", "outlandish/outlandishness", "alien/alienness", "seductive/seductiveness", "superb/superbness", "divine/divinity", "celestial/celestial power", "vibrating/vibration", "wet/moisture", "appearance", "silly/silliness", "spidery/spideriness", "legitimate/legitimacy", "flavorful/flavor", "savory/flavor", "silky/silkiness", "slammin/worth", "slimy/sliminess", "impressive/impressiveness", "appealing/appeal", "revolting/revoltingness", "captivating/captivation", "amazing/amazingness", "masculine/masculinity", "gelatinous/gelatinous goodness", "disjointed/disjointedness", "veiny/veininess", "appearance", "tropical/tropicalness", "rockhard/rockhardness", "steamy/steaminess", "lumpy/lumpiness", "swift/lightning speed", "long/longness", "large/largeness", "small/smallness", "frosty/frostiness", "glassy/glassiness", "hard/hardness", "formal/formality", "blue/blueness", "soft/softness", "moist/moisture", "smooth/smoothness", "torturous/torturousness", "wellused/thoroughness", "wellloved/sweet love", "shiny/shininess", "sleek/sleekness", "greasy/grasiness", "hairy/hairiness", "splintered/splinters", "dreamy/dreaminess", "spicy/spiciness", "terrible/terror", "throbbing/throbbing pleasure", "fluttering/lightweightedness", "mysterious/mystery", "velvety/velvety goodness", "dangerous/danger", "metallic/luster", "skinny/skininess", "fat/fatness", "painful/pain", "oozing/excretory wetness", "flaming/fire", "exploding/explosiveness", "wild/wildness", "rambunctious/wildness", "sizzling/fizzly shizzliness", "perfect/perfection", "raunchy/raunchiness", "romantic/romance", "young/youth", "old/age", "bloodthirsty/bloodthirstiness", "fleshy/fleshiness", "warm/warmth", "cold/coldness", "icy/iciness", "electric/electricity", "sharp/sharpness", "deadly/deadliness", "pulsating/pumpiness", "bloody/bloodiness", "pregnant/pregnancy", "bulging/bulges", "stretchy/stretchiness", "creamy/creaminess", "lovely/loveliness", "grainy/graininess", "rocky/rockiness", "grassy/grassiness", "musical/music", "outstanding/amazement", "identical/identity", "famous/fame", "cheerful/cheer", "livid/anger", "obstinate/stubbornness", "exhausted/fatigue", "graceful/grace", "outrageous/outrage", "radical/radishes", "childish/immaturity", "snobbish/snobbishness", "miserly/misery", "amiable/phallus", "disgusting/disgust", "awful/terror", "humorous/humor", "fanciful/fancy", "pathetic/lameness", "bashful/bashfulness", "freaky/freakiness", "chilly/chill", "stormy/storminess", "humid/humidity", "bountiful/bountifulness", "jubilant/happiness", "irritated/anger", "patient/patience", "dizzy/dizziness", "skeptical/skepticism", "puzzled/confusion", "lighthearted/lightheartedness", "perplexed/confusion", "overwhelmed/domination", "jovial/cheer", "hyper/energy", "squirrely/furriness", "jittery/jitteriness", "sensational/sensationalism", "elegant/elegance", "flabbergasted/confusion", "dreary/dreariness", "impish/impishness", "sneaky/sneakiness", "horrid/horridness", "monsterous/largeness", "acidic/acidity", "acoustic/loudness", "active/activity", "adaptable/adaptability", "aggressive/agressiveness", "additional/extra cheese", "adequate/adequacy", "administrative/domination", "advantageous/advantage", "advisable/wisdom", "extreme/extremity", "hardcore/hardcoreness", "snappy/snappiness", "scary/scariness", "immense/immensity", "woody/woodiness", "dominant/dominance", "submissive/submissiveness", "pitiful/pity", "sickening/sickness", "questionable/questionability", "intriguing/interest", "fantastic/fantasticness", "thrilling/thrill", "tactical/tacticalness", "drooling/sliminess", "epic/epicness", "succulant/deliciousness", "slick/slickness", "damp/dampness", "explosive/explosiveness", "flammable/flammability", "watertight/virginity", "watery/wateriness", "heavy/heaviness", "disagreeable/disagreement", "keen/keenness", "fertile/fertility", "sterile/sterility", "distorted/distortion", "itchy/itchiness", "fruity/fruitiness", "hazardous/hazardousness", "troubling/trouble", "critical/criticalness", "treacherous/treachery", "speculative/speculation", "menacing/menace", "threatening/intimidation", "ticklish/ticklishness", "vulnerable/vulnerability", "wicked/wickedness", "formidable/formidableness", "brave/bravery", "supple/softness", "splendid/splendidness", "nutritious/nutrition", "melodic/melodicness", "infectious/infectiousness", "sticky/stickiness", "magnificent/magnificence", "fantastical/fantasticness", "incredible/incredibility", "unbelievable/falseness", "shocking/shock", "horrifying/horror", "unstable/instability", "funny/humorousness", "delicious/deliciousness", "tasty/tastiness", "fingerlicking/fingerlickingness", "super/superness", "juicy/juiciness", "drippy/drippiness", "dripping/drippingness", "defiant/defiance", "resonant/resonance", "crackly/crackliness", "highflying/aerodynamics", "wavy/waviness", "nutty/nuttiness", "insane/insanity", "unpleasant/unpleasant nature", "inadvisable/inadvisable nature", "pleasant/pleasant nature", "sandy/sandiness", "stinky/stinkiness", "dead/deadness", "honest/honesty", "trustworthy/trustworthiness", "profitable/proifitability", "essential/essentialness", "courageous/courage", "charming/charm", "beloved/belovedness", "marvelous/marvelousness", "breathtaking/breathtakingness", "surprising/surprise", "awesome/awesomeness", "zesty/zestiness", "astounding/astoundingness", "lubricated/lubrication", "stimulating/stimulus", "clever/cleverness", "magical/magic", "harmless/harmlessness", "gentle/gentleness", "raging/rage", "noisy/noisiness", "passionate/passion", "interracial/interracialness", "chromeplated/chromeplatedness", "ripped/wear", "tattered/wear", "heinous/heinousness", "shady/shadiness", "appearance", "corrugated/corrugation", "appearance", "hulking/hulkingness", "appearance", "jagged/jaggedness", "appearance", "ratty/rattiness", "appearance", "stout/stoutness", "appearance", "whopping/whoppingness", "appearance", "humongous/humongousness", "appearance", "mammoth/mammothness", "appearance", "enormous/enormousness", "appearance", "colossal/colossality", "appearance", "monochromatic/monochromaticness", "appearance", "grimy/griminess", "appearance", "funnylooking/funny looks", "appearance", "gigantic/impressive size", "appearance", "limp/limpness", "appearance", "naked/nakedness", "appearance", "revealing/nakedness", "appearance", "pretty/prettiness", "appearance", "grey/greyness", "appearance", "microscopic/microscopicness", "appearance", "bearded/beardedness", "appearance", "floppy/floppiness", "appearance", "fluffy/fluffiness", "appearance", "dirty/dirt", "appearance", "petite/petiteness", "appearance", "sloppy/sloppiness", "appearance", "wide/wideness", "appearance", "slippery/slipperiness", "appearance", "sopping/wetness", "appearance", "slender/slenderness", "appearance", "dry/dryness", "appearance", "lickable/lickability", "appearance", "wooly/wooliness", "appearance", "colorful/color", "appearance", "mossy/mossiness", "appearance", "transparent/transparence", "appearance", "narrow/narrowness", "appearance", "glossy/glossiness", "appearance", "ancient/ancience", "appearance", "wrinkly/raisins", "appearance", "shriveled/raisins", "appearance", "plump/plumpness", "appearance", "green/greenness", "appearance", "brown/brownness", "appearance", "red/redness", "appearance", "white/whiteness", "appearance", "black/blackness", "appearance", "spiky/spikiness", "appearance", "thick/thickness", "appearance", "furry/furriness", "appearance", "fuzzy/fuzziness", "appearance", "wooden/woodness", "appearance", "bubbly/bubbliness", "appearance", "foamy/foaminess", "appearance", "smoky/smokiness", "appearance", "battered/batteredness", "appearance", "ugly/ugliness", "appearance", "glamourous/glamour", "appearance", "attractive/attractiveness", "appearance", "smoggy/smogginess", "appearance", "sparkling/sparkle", "appearance", "spotless/cleanliness", "appearance", "wideeyed/wideness", "appearance", "cubic/cubic shape", "appearance", "symmetrical/symmetry", "appearance", "orbital/roundness", "appearance", "exposed/exposure", "appearance", "redhot/glowingred heat", "appearance", "bent/deformation", "appearance", "crooked/crookedness", "appearance", "uneven/unevenness", "appearance", "delicate/delicateness", "appearance", "moldy/moldiness", "appearance", "crusty/crustiness", "appearance", "filthy/filth", "appearance", "muscular/beefiness", "appearance", "glittery/glitter", "appearance", "purple/purpleness", "appearance", "ragged/raggedness", "appearance", "weedy/weediness", "appearance", "papery/paperiness", "appearance", "dazzling/sparkle", "appearance", "blinding/brightness", "appearance", "beautiful/beauty", "appearance", "windy/windiness", "appearance", "dusty/dustiness", "appearance", "short/shortness", "appearance", "tall/height", "appearance", "menthol/menthol goodness", "appearance", "emaciated/emaciation", "appearance", "iridescent/iridescence", "appearance", "golden/golden luster", "appearance", "spontaneous/spontaneity", "daring/dare", "radioactive/radioactivity", "poisonous/toxicity", "savage/savageness", "terrifying/scariness", "unlikely/unlikelihood", "speedy/speediness", "indestructible/involunurability", "invisible/invisibility", "appearance", "odorous/odor", "penetrative/penetrative power", "immaculate/immaculateness", "rowdy/rowdiness", "rational/rationality", "irrational/irrationality", "blasphemous/blasphemy", "cooperative/cooperation", "professional/professionalism", "punctual/punctuality", "festive/festiveness", "polluted/pollution", "potent/potency", "powdery/powderiness", "appearance", "powerful/power", "piggy/pigginess", "assertive/assetiveness", "ethical/ethicalness", "tightlipped/tight lips", "firm/firmness", "unethical/unethicalness", "highbrow/highbrowness", "scholarly/scholarliness", "academic/academicness", "sophisticated/sophistication", "intelligent/intelligence", "intellectual/intellect", "cultural/culture", "popular/popularity", "furrowed/furrowedness", "appearance", "illiterate/illiteracy", "educated/education", "durable/durability", "sublime/sublimeness", "ambitious/ambition", "familyfriendly/familyfriendliness", "contaminated/contamination", "unfortunate/misfortune", "fortunate/fortune", "absolute/absoluteness", "logical/logical", "frictional/friction", "creamfilled/creaminess", "malleable/malleability", "fast/speed", "squeamish/squeamishness", "unlimited/unlimitedness", "gassy/gassiness", "edgy/edginess", "artsy/artsiness", "feasible/feasibility", "infeasible/infeasibility", "possible/possibility", "potential/potential", "intentional/intention", "dumb/dumbness", "disorganized/disorder", "irregular/irregularity", "certified/certification", "sure/sureness", "complimentary/complimentariness", "supplementary/supplementariness", "derogatory/derogatoriness", "scornful/scorn", "gross/grossness", "erect/erectness", "flaccid/flaccidness", "appearance", "sexy/sex appeal", "ravishing/rocksolid arousal", "horny/horniness", "kinky/kinkiness", "trashy/trashiness"]
};
dic.adj = adj;
	var adj_all= ["informative/informativeness","infectious/infectiousness","infeasible/infeasibility"].concat(adj.weather,adj.emotion,adj.nationality,adj.appearance);
dic.adj.all=adj_all;

var adv ={
	emotion: [ "happily", "emotion", "gladly", "emotion", "grudgingly", "emotion", "arrogantly", "emotion", "sadly", "emotion", "frantically", "emotion", "greedily", "emotion", "cautiously", "emotion", "hollowly", "emotion", "enviously", "emotion", "angrily", "emotion", "warily", "emotion", "shamefully", "emotion", "gleefully", "emotion", "grumpily", "emotion", "anxiously", "emotion", "regretfully", "emotion", "patiently", "emotion", "evilly", "emotion", "terrifyingly", "emotion", "curiously", "intentionally", "deliberately", "magically", "necessarily", "unnecessarily", "fluidly", "expertly", "professionally", "partially", "intuitively", "artfully", "thoroughly", "illegally", "mortally", "harmonically", "objectively", "cooly", "casually", "perfectly", "imperfectly", "victoriously", "grandly", "richly", "heartily", "musically", "to kingdom come", "methodically", "nonchalantly", "systematically", "recklessly"],
	sexy: [ "smoothly", "sexy", "slowly", "sexy", "lovingly", "sexy", "forcibly", "sexy", "up and down", "sexy", "side to side", "sexy", "romantically", "sexy", "hungrily", "sexy", "sweetly", "sexy", "roughly", "sexy", "delightedly", "sexy"]
};
dic.adv = adv;

var color ={
	secondary: [ "cyan/cyanish", "secondary", "magenta/magentaish", "secondary", "yellow/yellowish", "secondary", "orange/orangish", "purple/purplish", "turquoise/turquoiseish", "pink/pinkish", "grey/greyish", "black/blackish", "white/whitish", "brown/brownish", "lime green/limegreenish", "lavender/lavenderish", "maroon/maroonish", "gold/goldish", "silver/silverish"],
	primary: [ "red/reddish", "primary", "green/greenish", "primary", "blue/bluish", "primary"]
};
dic.color = color;

var conj ={
};
dic.conj = conj;
	var conj_all= ["and","or","but","nor","for","yet","so"].concat();
dic.conj.all=conj_all;

var country ={
	mediterranean: [ "Akrotiri", "mediterranean", "Cyprus", "mediterranean", "Czech Republic"],
	caribbean: [ "Cuba", "caribbean", "Dominica", "caribbean", "Dominican Republic", "Ecuador", "Jamaica", "caribbean", "Jan Mayen"],
	oceania: [ "Australia", "oceania", "Guam", "oceania", "Indonesia", "asia oceania", "New Zealand", "oceania", "Papua New Guinea", "oceania", "Paracel Islands", "Paraguay", "Philippines", "oceania", "Pitcairn Islands", "Samoa", "oceania", "San Marino", "Sao Tome and Principe", "Solomon Islands", "oceania"],
	eurasia: [ "Russia", "europe asia eurasia"],
	africa: [ "Democratic Republic of the Congo", "africa", "Republic of the Congo", "africa", "Cook Islands", "Coral Sea Islands", "Egypt", "africa", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands", "Faroe Islands", "Fiji", "Ghana", "africa", "Gibraltar", "Glorioso Islands", "Kenya", "africa", "Kiribati", "Libya", "africa", "Liechtenstein", "Madagascar", "africa", "Malawi", "Morocco", "africa", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Niger", "africa", "Nigeria", "africa", "Niue", "Norfolk Island", "Northern Mariana Islands", "Rwanda", "africa", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Somalia", "africa", "South Africa", "africa", "South Georgia and the South Sandwich Islands", "Sudan", "africa", "Suriname", "Svalbard", "Swaziland"],
	middleeast: [ "Afghanistan", "asia middleeast", "Iran", "middleeast", "Iraq", "middleeast", "Israel", "middleeast", "Pakistan", "middleeast", "Palau", "Saudi Arabia", "middleeast", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Syria", "middleeast", "United Arab Emirates", "middleeast"],
	southamerica: [ "Argentina", "southamerica", "Armenia", "Aruba", "Ashmore and Cartier Islands", "Brazil", "southamerica", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Chile", "southamerica", "Colombia", "southamerica", "Comoros", "Peru", "southamerica"],
	asia: [ "Afghanistan", "asia middleeast", "Cambodia", "asia", "Cameroon", "China", "asia", "Christmas Island", "Clipperton Island", "Cocos Islands", "Hong Kong", "asia", "India", "asia", "Indonesia", "asia oceania", "Japan", "asia", "Jersey", "Jordan", "Juan de Nova Island", "Kazakhstan", "North Korea", "asia", "South Korea", "asia", "Kuwait", "Kyrgyzstan", "asia", "Laos", "Malaysia", "asia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mongolia", "asia", "Montserrat", "Nepal", "asia", "Russia", "europe asia eurasia", "Singapore", "asia", "Taiwan", "asia", "Tajikistan", "Tanzania", "Thailand", "asia", "TimorLeste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tromelin Island", "Tunisia"],
	europe: [ "Albania", "europe", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Austria", "europe", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Bassas da India", "Belarus", "Belgium", "europe", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Bulgaria", "europe", "Burkina Faso", "Burma", "Burundi", "Denmark", "europe", "Dhekelia", "Djibouti", "Finland", "europe", "France", "europe", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "The Gambia", "Gaza Strip", "Georgia", "Germany", "europe", "Greece", "europe", "Greenland", "Grenada", "Guadeloupe", "Hungary", "europe", "Iceland", "Ireland", "europe", "Isle of Man", "Italy", "europe", "Latvia", "europe", "Lebanon", "Lesotho", "Liberia", "Lithuania", "europe", "Luxembourg", "europe", "Macau", "Macedonia", "Netherlands", "europe", "Netherlands Antilles", "New Caledonia", "Norway", "europe", "Oman", "Poland", "europe", "Portugal", "europe", "Puerto Rico", "Qatar", "Reunion", "Romania", "europe", "Russia", "europe asia eurasia", "Slovakia", "europe", "Slovenia", "europe", "Spain", "europe", "Spratly Islands", "Sri Lanka", "Sweden", "europe", "Switzerland", "europe", "Turkey", "europe", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "europe"],
	northamerica: [ "Canada", "northamerica", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Mexico", "northamerica", "Federated States of Micronesia", "Moldova", "Monaco", "United States", "northamerica", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wake Island", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Zambia"],
	centralamerica: [ "Costa Rica", "centralamerica", "Cote d'Ivoire", "Croatia", "Guatemala", "centralamerica", "Guernsey", "Guinea", "GuineaBissau", "Guyana", "Haiti", "centralamerica", "Heard Island and McDonald Islands", "Holy See", "Honduras", "centralamerica", "Nicaragua", "centralamerica", "Panama", "centralamerica"]
};
dic.country = country;

var em ={
};
dic.em = em;
	var em_all= ["very","rather","quite","extremely","incredibly","really","thoroughly","most","absolutely","positively","unbelievably","super","majorly","oh so"].concat();
dic.em.all=em_all;

var emo ={
};
dic.emo = emo;
	var emo_all= ["joy","fright","happiness","boredom","sorrow","sadness","anger","rage","guilt","envy","passion","bliss","pain","interest","smugness","pride","hunger","despair","shame","love","madness","hatred","pity","humility","anticipation","surprise","optimism","disappointment","remorse","contempt","awe","lust","longing","contentment","pleasure","irritation","torment","horror","shock","terror","ecstasy","satisfaction","gratitude","melancholy","fury","excitement","confusion","bewilderment"].concat();
dic.emo.all=emo_all;

var face ={
};
dic.face = face;
	var face_all= ["smile","frown","grimace","evil grin","cheeky grin","sneer","pucker","smirk","grin","snarl","trollface","visage","snicker","pout","poker face","toothy grin","blank face","pout lip"].concat();
dic.face.all=face_all;

var greet ={
};
dic.greet = greet;
	var greet_all= ["hello","greetings","hola","hey","what's up","whazzup","yo","good day","good morning","good afternoon","good evening","good night","hey buddy","ahoy","sup","salutations","aloha","konichi wa","what's happening","how's it hanging","how's it going","what's new","guten Tag"].concat();
dic.greet.all=greet_all;

var names ={
	female: [ "Gus", "Karen", "Heidi", "Jessie", "Gabrielle", "Jessica", "Laura", "Sara", "Linda", "Britney", "Kristin", "Kate", "Amanda", "Renae", "Ruth", "Betty", "Lindsey", "Saralyn", "Alice", "Stacey", "Sadie", "Kat", "Marge", "Mary", "Michelle", "Kimberly", "Debbie", "Megan", "Susan", "Maria", "Jennifer", "Helen", "Sandra", "Rebecca", "Martha", "Stephanie", "Gloria", "Jane", "Tina", "Tracy", "Tiffany", "Valerie", "Lauren", "Bertha", "Vicki", "Delores", "Jacki", "Varlerie", "Scarlett", "Christina", "Maggie", "Crystal", "Ember"],
	male: [ "Billybob/B", "Moses/M", "Barack/B", "Vijay/V", "Rex/R", "Sasquatch/S", "Elvis/E", "Zachy/Z", "John/J", "Mickey/M", "Jake/J", "Stan/S", "Jamier/J", "Sean/S", "Snuggles/S", "Max/M", "Mitchell/M", "Collin/C", "Nick/N", "Danny/D", "Ronald/R", "Tim/T", "Timmy/T", "Scott/S", "Cody/C", "Louie/L", "Keith/K", "Luke/L", "Nicholas", "Todd", "Barney", "Brandon", "Victor", "William", "Alex", "Ken", "Gordon", "Grover", "Steve", "Kyle", "George", "Rick", "Craig", "Greg", "Andy", "Kevin", "Dick", "Tom", "Harry", "Bill", "Brian", "Francis", "Corbin", "Gilbert", "Jeff", "Bruce", "Benny", "Justin", "Tony", "Robin", "Roger", "Parker", "Vanshay", "Lee", "Ian", "Joshua", "Michael", "Shonuff", "Tristan", "Kermit", "Wilbur", "Malcolm", "Akbar", "Ambar", "Athumani", "Jela", "Jengo", "Kabili", "Kanaifu", "Kandoro", "Keto", "Khalfan", "Kiango", "Kijani", "Kondo", "Nuru", "Penda", "Penha", "Safari", "Thimba", "Adish", "Arash", "Ariabod", "Arwan", "Arya", "Asho", "Atish", "Baback", "Baraz", "Barbod", "Bardia", "Barid", "Bast", "Benham", "Bian", "Dareh", "Darius", "Darrius", "Dastan", "Gul", "Jahan", "Kamran", "Kaveh", "Kaysar", "Menelin", "Masih", "Meghdad", "Milad", "Nasha", "Naveed", "Navid", "Parham", "Pouria", "Radwan", "Roshan", "Saman", "Sardar", "Sarmad", "Shadan", "Shahan", "Shahin", "Shahryar", "Shapur", "Sher", "Abeeku", "Abu", "Addae", "Ade", "Adeben", "Adjatay", "Adjo", "Adwin", "Agu", "Ajamu", "Ajani", "Akello", "Akia", "Akins", "Akintunde", "Anane", "Ande", "Andwele", "Armani", "Asante", "Ashanti", "Ayele", "Ayinde", "Ayzize", "Azibo", "Badru", "Bahari", "Bandele", "Banji", "Barke", "Belay", "Bem", "Berta", "Birungi", "Braima", "Camara", "Chiazam", "Chincha", "Chikezie", "Chimelu", "Chinelo", "Chinua", "Davu", "Deka", "Akuna", "Binda", "Euroa", "Thor", "Gidja", "Kaawa", "Kinta", "Kumba", "Mani", "Omeo", "Onyx", "Paratyl", "Ponto", "Quoba", "Taworri", "Teangi", "Thono", "Tyipa", "Yamparti", "Yarran", "Yoyko", "Abbot", "Abe", "Acton", "Adair", "Aidric", "Alan", "Alastair", "Albert", "Albion", "Aldan", "Alden", "Aldis", "Alfred", "Algernon", "Alick", "Allard", "Alvar", "Ansley", "Anson", "Aragorn", "Arathorn", "Arden", "Argyle", "Art", "Ash", "Ashford", "Ashton", "Atherton", "Atticus", "Aubrey", "August", "Austin", "Axton", "Bailey", "Baker", "Baldwin", "Balthasar", "Bardolf", "Barnaby", "Baron", "Barrett", "Barrington", "Barton", "Baxter", "Beauchamp", "Beauregard", "Beck", "Beckett", "Beckham", "Benjamin", "Benson", "Bently", "Benton", "Berke", "Beverly", "Bevis", "Bringham", "Birch", "Bishop", "Blake", "Blaze", "Boniface", "Bono", "Booker", "Boston", "Brad", "Bradley", "Bradshaw", "Brantley", "Brenton", "Brett", "Brewster", "Breyson", "Briar", "Brice", "Bridger", "Brighton", "Bristol", "Brock", "Bronson", "Brook", "Bryan", "Buckley", "Burgess", "Burris", "Burton", "Byron", "Caldwell", "Caledon", "Calico", "Camden", "Canon", "Carlton", "Carrington", "Carter", "Carver", "Cash", "Caspian", "Cecil", "Celtic", "Chad", "Chadwick", "Chainey", "Chandler", "Charleston", "Charlie", "Charlton", "Chauncey", "Chay", "Chester", "Chet", "Chip", "Clarence", "Clark", "Clayton", "Cleavon", "Clement", "Cleaveland", "Clifford", "Clifton", "Clint", "Clinton", "Clive", "Colby", "Coleman", "Colton", "Conrad", "Conroy", "Cornell", "Cosmo", "Cotton", "Crawford", "Creighton", "Crimson", "Crosby", "Dalton", "Darrel", "Darryl", "Darwin", "Dash", "Daughtry", "Dawson", "Deacon", "Dennis", "Derek", "Derring", "Devon", "Dexter", "Dexton", "Diamond", "Dixon", "Don", "Donnie", "Dorsey", "Doug", "Dracen", "Drake", "Dryden", "Dudley", "Duke", "Dustin", "Dwayne", "Dwight", "Dyson", "Earl", "Easton", "Eastwood", "Ed", "Edd", "Eddy", "Edgar", "Edgerton", "Edison", "Edmund", "Edric", "Edward", "Edwin", "Egbert", "Elden", "Elias", "Elliot", "Ellis", "Elmer", "Elmo", "Elton", "Elvin", "Elwood", "Emerson", "Emmet", "Ernie", "Errol", "Erv", "Ervin", "Erwin", "Eugene", "Fairfax", "Falcon", "Farley", "Ferguson", "Ferris", "Filbert", "Fisher", "Fitzwilliam", "Fletcher", "Floyd", "Forbes", "Ford", "Forrest", "Foster", "Fraley", "Frank", "Frederick", "Frenchie", "Fulbright", "Gage", "Galahad", "Gale", "Gardner", "Garland", "Garrison", "Garth", "Gary", "Gavin", "Gaylord", "Godfrey", "Graham", "Graydon", "Griff", "Gulliver", "Fluffy", "male"]
};
dic.names = names;

var noun ={
	surface: [ "floor/floors", "surface", "wall/walls", "surface", "ceiling/ceilings", "surface", "patio/patios", "surface", "bed/beds", "furniture surface", "bedsheet/bedsheets", "surface", "window/windows", "surface", "door/doors", "surface", "chair/chairs", "furniture surface", "carpet/carpets", "surface", "desk/desks", "furniture surface", "roof/roofs", "surface", "tabletop/tabletops", "surface"],
	furniture: [ "chair/chairs", "furniture", "button/buttons", "tuber/tubers", "joint/joints", "horseradish/horseradishes", "bed/beds", "furniture surface", "chair/chairs", "furniture surface", "desk/desks", "furniture surface", "coffee table/coffee tables", "furniture", "couch/couches", "furniture", "recliner/recliners", "furniture", "lawn chair/lawn chairs", "furniture", "rocking chair/rocking chairs", "furniture", "nightstand/nightstands"],
	round: [ "kidney/kidneys", "round", "fibula/fibulas", "golf ball/golf balls", "ball round", "wig/wigs", "tit/tits", "body sex round", "boob/boobs", "body sex round"],
	body: [ "mouth/mouths", "body hole", "peninsula/peninsulas", "afro/afros", "body", "disco ball/disco balls", "rotisserie/rotisseries", "pizza/pizzas", "caboose/cabooses", "frosting/frostings", "giblet/giblets", "cornea/corneas", "body", "bone/bones", "body", "snorkel/snorkels", "cocktail/cocktails", "papaya/papayas", "hole/holes", "pornstar/pornstars", "mandible/mandibles", "body", "kneecap/kneecaps", "body", "face/faces", "body", "loin/loins", "body", "femur/femurs", "body", "mohawk/mohawks", "dingleberry/dingleberries", "teddy bear/teddy bears", "dimple/dimples", "body", "micropenis/micropenises", "sex body", "pussy/pussies", "body sex", "vagflap/vagflaps", "body sex", "cuntflap/cuntflaps", "body sex", "cunt/cunts", "body sex", "anus/anuses", "body sex hole", "sphincter/sphincters", "body sex hole", "tit/tits", "body sex round", "taint/taints", "body sex", "foreskin/foreskins", "body sex", "boob/boobs", "body sex round", "boner/boners", "body sex long", "dick/dicks", "body sex long", "cock/cocks", "body sex long", "asshole/assholes", "body hole", "ballsack/ballsacks", "body sex", "testicle/testicles", "body sex", "scrotum/scrotums", "body sex", "pube/pubes", "body", "penis/penises", "body sex long", "vagina/vaginas", "body hole sex", "pussy/pussies", "body hole sex", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers", "chesticle/chesticles", "body", "willy/willies", "body sex long", "prick/pricks", "body sex long", "manhood/manhoods"],
	liquid: [ "furniture", "saliva/saliva", "tar/tar", "water/water", "soup/soups", "soap/soaps", "slime/slime", "bleach/bleach", "pudding/puddings", "lotion/lotions", "sauce/sauces", "earwax/earwax", "snot/snots", "sweat/sweats", "acid/acids", "wine/wines", "oil/oils", "olive oil/olive oil", "urine/urine", "diarrhea/diarrhea", "beer/beers", "rain/rains", "toothpaste/toothpastes", "yogurt/yogurts", "cream/creams", "grease/grease"],
	insect: [ "grasshopper/grasshoppers", "animal insect", "locust/locusts", "animal insect", "cricket/crickets", "animal insect", "beetle/beetles", "animal insect"],
	clothes: [ "boot/boots", "clothes article", "zipper/zippers", "clothes article", "sock/socks", "clothes article", "shoe/shoes", "clothes article", "slipper/slippers", "clothes article"],
	plant: [ "pumpkin/pumpkins", "plant", "fern/ferns", "plant", "maple tree/maple trees", "plant", "thistle/thistles", "plant", "daisy/daisies", "plant", "stinging nettle/stinging nettles", "plant", "dandelion/dandelions", "plant", "tulip/tulips", "plant", "clover/clovers", "plant", "marigold/marigolds", "plant", "hedge/hedges", "plant"],
	person: [ "teen/teens", "person", "child/children", "person", "dude/dudes", "person", "truth/truths", "pedestrian/pedestrians", "elf/elves", "person", "man/men", "person", "woman/women", "person", "puppet/puppets", "swag/swag", "lady/ladies", "person", "baby/babies", "fruit person"],
	tool: [ "wheelbarrow/wheelbarrows", "weapon tool", "lemonade/lemonades", "cramp/cramps", "doodle/doodles", "stone/stones", "waffle/waffles", "jelly bean/jelly beans", "sofa/sofas", "muffin/muffins", "ragamuffin/ragamuffins", "robot/robots", "tool", "lawn mower/lawn mowers", "tool weapon", "carcass/carcasses", "horsewhip/horsewhips", "weapon tool", "radish/radishes", "scab/scabs", "leaf/leaves", "bench/benches", "razor/razors", "weapon tool", "arrow/arrows", "long weapon tool", "pencil/pencils", "long weapon tool", "drill/drills", "long tool weapon", "iron maiden/iron maidens", "tool", "leaf blower/leaf blowers", "tool", "pickaxe/pickaxes", "tool weapon", "pistol/pistols", "tool", "spoon/spoons", "tool long", "fork/forks", "tool weapon long", "blender/blenders", "tool", "squeegee/squeegees", "tool", "shovel/shovels", "long tool weapon", "loincloth/loincloths", "tool", "nutcracker/nutcrackers", "tool", "hammer/hammers", "long tool", "chainsaw/chainsaws", "tool weapon", "microscope/microscopes", "tool", "pot/pots", "tool", "pan/pans", "tool", "screwdriver/screwdrivers", "tool long", "jackhammer/jackhammers", "tool long", "jockstrap/jockstraps", "tool", "hacksaw/hacksaws", "tool", "ladder/ladders", "tool", "shopping cart/shopping carts", "tool", "bomb/bombs", "tool weapon", "firecracker/firecrackers", "tool", "drug/drugs", "tool", "sword/swords", "tool weapon long", "spear/spears", "tool long weapon", "cattle prod/cattle prods", "tool", "vacuum/vacuums", "tool", "wrench/wrenches", "long tool", "phone/phones", "tool", "can opener/can openers", "tool", "stapler/staplers", "tool weapon", "pitchfork/pitchforks", "tool weapon long", "blowtorch/blowtorches", "tool long", "machete/machetes", "tool long weapon", "rumpus/rumpuses", "tool", "flamethrower/flamethrowers", "tool weapon long", "garden hose/garden hoses", "wand/wands", "tool long", "stun gun/stun guns", "tool weapon", "bunsen burner/bunsen burners", "tool long", "wrinkle/wrinkles", "battering ram/battering rams", "long weapon tool", "nipple clamp/nipple clamps", "tool", "butthair/butthairs", "tool", "poopoo/poopoos"],
	long: [ "toothpick/toothpicks", "long", "turd/turds", "long", "rocket/rockets", "long", "flute/flutes", "long instrument", "clarinet/clarinets", "long instrument", "trumpet/trumpets", "long instrument", "arrow/arrows", "long weapon tool", "dart/darts", "long weapon", "pencil/pencils", "long weapon tool", "cigarette/cigarettes", "long", "pickle/pickles", "long", "ruler/rulers", "long", "cucumber/cucumbers", "long", "staple/staples", "long", "panhandle/panhandles", "long", "telephone pole/telephone poles", "long weapon", "extension cord/extension cords", "long", "candle/candles", "long", "tree/trees", "long", "knife/knives", "long", "torch/torches", "long weapon", "broom/brooms", "long", "broomstick/broomsticks", "long weapon", "pole/poles", "long", "crack pipe/crack pipes", "long", "lightbulb/lightbulbs", "long", "umbrella/umbrellas", "long", "cannon/cannons", "long", "sausage/sausages", "long", "chain/chains", "long", "banana/bananas", "long", "plunger/plungers", "long", "spork/sporks", "long", "toothbrush/toothbrushes", "long", "banister/banisters", "long", "baton/batons", "long weapon", "drill/drills", "long tool weapon", "spoon/spoons", "tool long", "fork/forks", "tool weapon long", "shovel/shovels", "long tool weapon", "hammer/hammers", "long tool", "screwdriver/screwdrivers", "tool long", "jackhammer/jackhammers", "tool long", "sword/swords", "tool weapon long", "spear/spears", "tool long weapon", "wrench/wrenches", "long tool", "pitchfork/pitchforks", "tool weapon long", "blowtorch/blowtorches", "tool long", "machete/machetes", "tool long weapon", "flamethrower/flamethrowers", "tool weapon long", "garden hose/garden hoses", "snake/snakes", "long", "anaconda/anacondas", "fish/fishes", "owl/owls", "otter/otters", "lemur/lemurs", "bull/bulls", "chicken/chickens", "peacock/peacocks", "gorilla/gorillas", "dove/doves", "pony/ponies", "squirrel/squirrels", "horse/horses", "donkey/donkeys", "baboon/baboon", "cockroach/cockroaches", "butler/butlers", "yeti/yetis", "demon/demons", "devil/devils", "ogre/ogres", "goat/goats", "llama/llamas", "porcupine/porcupines", "tiger/tigers", "lion/lions", "wolf/wolves", "hyena/hyenas", "titan/titans", "lizard/lizards", "hedgehog/hedgehogs", "zebra/zebras", "quokka/quokkas", "newt/newts", "vulture/vultures", "yak/yaks", "jaguar/jaguars", "xerus/xeruses", "dog/dogs", "bulldog/bulldogs", "beagle/beagles", "poodle/poodles", "umbilical cord/umbilical cords", "long", "fanny/fannies", "chin/chins", "nostril/nostrils", "unibrow/unibrows", "mustache/mustaches", "head/heads", "armpit/armpits", "rump/rumps", "throat/throats", "goatee/goatees", "nose/noses", "elbow/elbows", "esophagus/esophaguses", "toe/toes", "leg/legs", "long", "pancreas/pancreases", "stinger/stingers", "scapula/scapulas", "gallbladder/gallbladders", "skin/skin", "neck/necks", "toenail/toenails", "horn/horns", "epidermis/epidermises", "duodenum/duodenums", "heart/hearts", "tentacle/tentacles", "long", "knuckle/knuckles", "uvula/uvulas", "tongue/tongues", "long", "finger/fingers", "long", "lip/lips", "snout/snouts", "tooth/teeth", "body/bodies", "jowl/jowls", "whisker/whiskers", "beak/beaks", "navel/navels", "wand/wands", "tool long", "bunsen burner/bunsen burners", "tool long", "wrinkle/wrinkles", "jalapeno/jalapenos", "long", "hubcap/hubcaps", "shotgun/shotguns", "weapon long", "harpoon/harpoons", "long weapon", "tire/tires", "silo/silos", "long", "shuttlecock/shuttlecocks", "Communist/Communists", "Democrat/Democrats", "Republican/Republicans", "president/presidents", "anthill/anthills", "battering ram/battering rams", "long weapon tool", "double dildo/double dildos", "sex long", "boner/boners", "body sex long", "dick/dicks", "body sex long", "cock/cocks", "body sex long", "penis/penises", "body sex long", "willy/willies", "body sex long", "prick/pricks", "body sex long", "manhood/manhoods"],
	ball: [ "basketball/basketballs", "ball", "baseball/baseballs", "ball", "beach ball/beach balls", "ball", "tennis ball/tennis balls", "ball", "boulder/boulders", "meatball/meatballs", "ball", "golf ball/golf balls", "ball round", "wig/wigs"],
	article: [ "bra/bras", "article", "sharpie/sharpies", "vest/vests", "article", "boot/boots", "clothes article", "zipper/zippers", "clothes article", "sock/socks", "clothes article", "shoe/shoes", "clothes article", "slipper/slippers", "clothes article", "pants/pants", "article", "sweatshirt/sweatshirts", "article", "kilt/kilts", "article", "belt/belts", "article", "skirt/skirts", "article", "girdle/girdles", "article", "pantaloons/pantaloons", "article", "shirt/shirts", "article", "dress/dresses", "article", "jacket/jackets", "article", "hat/hats", "article", "top hat/top hats", "article", "underwear/underwear", "article", "tuxedo/tuxedoes", "article", "suit/suits", "article", "boxers/boxers", "article", "panties/panties", "article", "thong/thongs", "article", "shit/shits"],
	drug: [ "cocaine/cocaine", "drug", "diaper/diapers", "dishrag/dishrags", "LSD/LSD", "drug", "PCP/PCP", "drug", "mescaline/mescaline", "drug", "marijuana/marijuana", "drug", "meth/meth", "drug", "crack/crack", "drug", "roofie/roofies", "drug", "heroin/heroin", "drug", "smack/smack", "drug", "shroom/shrooms", "drug", "bath salts/bath salts", "drug", "extacy/extacy", "drug"],
	fruit: [ "prune/prunes", "fruit food", "raisin/raisins", "grape/grapes", "fruit food", "kumquat/kumquats", "fruit food", "grass/grasses", "grapefruit/grapefruits", "fruit food", "tea bag/tea bags", "teapot/teapots", "canister/canisters", "battery/batteries", "clock/clocks", "plug/plugs", "towel/towels", "apricot/apricots", "fruit food", "doll/dolls", "tampon/tampons", "apple/apples", "fruit", "lime/limes", "fruit", "orange/oranges", "fruit", "lemon/lemons", "fruit", "watermelon/watermelons", "fruit", "pineapple/pineapples", "fruit", "coconut/coconuts", "fruit", "blueberry/blueberries", "fruit", "strawberry/strawberries", "fruit", "raspberry/raspberries", "fruit", "tangerine/tangerines", "fruit", "kiwi/kiwis", "fruit", "grape/grapes", "fruit", "tomato/tomatoes", "fruit", "nectarine/nectarines", "fruit", "baby/babies", "fruit person"],
	container: [ "garbage can/garbage cans", "container", "manure/manure", "bottle/bottles", "container weapon", "carpet/carpets", "earwax/earwax", "fog/fogs", "hemorroid/hemorroids", "cork/corks", "barrel/barrels", "container", "coffin/coffins", "container", "vodka/vodka", "pickle jar/pickle jars", "package/packages", "cup/cups", "wallet/wallets", "glass/glasses", "shot glass/shot glasses", "bowl/bowls", "container/containers", "flask/flasks", "bottle/bottles", "pitcher/pitchers", "pipe/pipes", "bong/bongs", "pouch/pouches", "purse/purses", "pocket/pockets", "jar/jars", "suitcase/suitcases", "box/boxes", "trunk/trunks", "package/packages", "case/cases", "packet/packets", "cell/cells", "test tube/test tubes", "vial/vials", "vat/vats", "pot/pots", "turkey baster/turkey basters", "trashcan/trashcans", "drawer/drawers", "chest/chests", "well/wells", "kettle/kettles", "bag/bags", "balloon/balloons", "sack/sacks", "basket/baskets", "carton/cartons", "oven/ovens", "tub/tubs", "toilet/toilets", "freezer/freezers", "skillet/skillets", "container", "constitution/constitutions"],
	instrument: [ "piano/pianos", "instrument", "trombone/trombones", "instrument", "accordion/accordions", "instrument", "flute/flutes", "long instrument", "clarinet/clarinets", "long instrument", "trumpet/trumpets", "long instrument"],
	sex: [ "handcuff/handcuffs", "sex", "avocado/avocados", "banjo/banjos", "bingo/bingos", "nickel/nickels", "dime/dimes", "penny/pennies", "cheeseburger/cheeseburgers", "sponge/sponges", "popsicle/popsicles", "garden hose/garden hoses", "cuntrocket/cuntrockets", "sex", "micropenis/micropenises", "sex body", "cuntwaffle/cuntwaffles", "sex", "blue waffle/blue waffles", "sex", "dildo/dildos", "sex", "double dildo/double dildos", "sex long", "dinocock/dinococks", "sex", "pussy/pussies", "body sex", "vagflap/vagflaps", "body sex", "cuntflap/cuntflaps", "body sex", "cunt/cunts", "body sex", "anus/anuses", "body sex hole", "sphincter/sphincters", "body sex hole", "tit/tits", "body sex round", "taint/taints", "body sex", "foreskin/foreskins", "body sex", "goatse/goatses", "sex hole", "boob/boobs", "body sex round", "boner/boners", "body sex long", "dick/dicks", "body sex long", "cock/cocks", "body sex long", "ballsack/ballsacks", "body sex", "testicle/testicles", "body sex", "scrotum/scrotums", "body sex", "penis/penises", "body sex long", "vagina/vaginas", "body hole sex", "pussy/pussies", "body hole sex", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers", "willy/willies", "body sex long", "prick/pricks", "body sex long", "manhood/manhoods"],
	job: [ "rottweiler/rottweilers", "carpenter/carpenters", "reporter/reporters", "journalist/journalists", "guitarist/guitarists", "archaeologist/archaeologists", "urologist/urologists", "circus performer/circus performers", "juggler/jugglers", "explorer/explorers", "artist/artists", "mechanic/mechanics", "hunter/hunters", "spelunker/spelunkers", "bartender/bartenders", "accountant/accountants", "movie star/movie stars", "mailman/mailmen", "construction worker/construction workers", "principal/principals", "prince/princes", "princess/princesses", "surgeon/surgeons", "gambler/gamblers", "dentist/dentists", "chef/chefs", "celebrity/celebrities", "waitress/waitresses", "burglar/burglars", "waiter/waiters", "doctor/doctors", "nurse/nurses", "lawyer/lawyers", "butler/butlers", "actor/actors", "athlete/athletes", "babysitter/babysitters", "golfer/golfers", "vampire/vampires", "fireman/firemen", "rapper/rappers", "gangster/gangsters", "hippie/hippies", "clown/clowns", "banker/bankers", "pianist/pianists", "politician/politicians", "president/presidents", "magician/magicians", "stock broker/stock brokers", "cop/cops", "sky diver/sky divers", "snake charmer/snake charmers", "fortune teller/fortune tellers", "serial killer/serial killers", "plumber/plumbers", "FBI agent/FBI agents", "assassin/assassins", "wizard/wizards", "salesman/salesmen", "singer/singers", "policeman/policemen", "physician/physicians", "paramedic/paramedics", "ninja/ninjas", "teacher/teachers", "senator/senators", "scientist/scientists", "constable/constables", "taxidermist/taxidermists", "biologist/biologists", "pope/popes", "bachelor/bachelors", "haberdasher/haberdashers", "armorer/armorers", "tanner/tanners", "hobbit/hobbits", "pirate/pirates", "stripper/strippers", "hooker/hookers"],
	weapon: [ "musket/muskets", "weapon", "credit card/credit cards", "truffle/truffles", "gearshift/gearshifts", "ghost/ghosts", "ridge/ridges", "meat/meats", "dictionary/dictionaries", "asymptote/asymptotes", "peppermint/peppermints", "candy cane/candy canes", "bulge/bulges", "lump/lumps", "garden/gardens", "treasure/treasures", "scuba/scubas", "wheelbarrow/wheelbarrows", "weapon tool", "lemonade/lemonades", "cramp/cramps", "doodle/doodles", "stone/stones", "waffle/waffles", "jelly bean/jelly beans", "sofa/sofas", "muffin/muffins", "ragamuffin/ragamuffins", "needle/needles", "weapon", "pipe/pipes", "weapon", "money/money", "car/cars", "flowerpot/flowerpots", "lawn mower/lawn mowers", "tool weapon", "carcass/carcasses", "lampstand/lampstands", "weapon", "bottle/bottles", "container weapon", "carpet/carpets", "earwax/earwax", "fog/fogs", "hemorroid/hemorroids", "cork/corks", "brick/bricks", "weapon", "cement/cement", "shrub/shrubs", "cleat/cleats", "weapon", "globe/globes", "kite/kites", "dagger/daggers", "weapon", "horsewhip/horsewhips", "weapon tool", "radish/radishes", "scab/scabs", "leaf/leaves", "bench/benches", "nail/nails", "weapon", "rubber/rubbers", "feces/feces", "bullet/bullets", "weapon", "dynamite/dynamites", "kettle/kettles", "enigma/enigmas", "keyboard/keyboards", "lube/lubes", "mask/masks", "duct tape/duct tape", "razor/razors", "weapon tool", "arrow/arrows", "long weapon tool", "dart/darts", "long weapon", "pencil/pencils", "long weapon tool", "telephone pole/telephone poles", "long weapon", "torch/torches", "long weapon", "broomstick/broomsticks", "long weapon", "baton/batons", "long weapon", "drill/drills", "long tool weapon", "pickaxe/pickaxes", "tool weapon", "fork/forks", "tool weapon long", "shovel/shovels", "long tool weapon", "chainsaw/chainsaws", "tool weapon", "bomb/bombs", "tool weapon", "sword/swords", "tool weapon long", "spear/spears", "tool long weapon", "stapler/staplers", "tool weapon", "pitchfork/pitchforks", "tool weapon long", "machete/machetes", "tool long weapon", "flamethrower/flamethrowers", "tool weapon long", "stun gun/stun guns", "tool weapon", "shotgun/shotguns", "weapon long", "harpoon/harpoons", "long weapon", "tire/tires", "battering ram/battering rams", "long weapon tool"],
	hole: [ "mouth/mouths", "body hole", "peninsula/peninsulas", "tunnel/tunnels", "hole", "anus/anuses", "body sex hole", "sphincter/sphincters", "body sex hole", "goatse/goatses", "sex hole", "asshole/assholes", "body hole", "vagina/vaginas", "body hole sex", "pussy/pussies", "body hole sex", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers"],
	food: [ "bread/bread", "food", "magnifying glass/magnifying glasses", "prune/prunes", "fruit food", "raisin/raisins", "grape/grapes", "fruit food", "kumquat/kumquats", "fruit food", "grass/grasses", "tuna/tuna", "animal food", "mirror/mirrors", "urinal/urinals", "hazelnut/hazelnuts", "food", "walnut/walnuts", "food", "ventricle/ventricles", "almond/almonds", "food", "laptop/laptops", "wall/walls", "onion/onions", "food", "cabbage/cabbages", "wool/wool", "grapefruit/grapefruits", "fruit food", "tea bag/tea bags", "teapot/teapots", "canister/canisters", "battery/batteries", "clock/clocks", "plug/plugs", "towel/towels", "peanut/peanuts", "food", "towelette/towelettes", "moist towelette/moist towelettes", "cuckoo/cuckoos", "potato/potatoes", "food", "apricot/apricots", "fruit food", "doll/dolls", "tampon/tampons", "meatloaf/meatloaves", "food", "loaf/loaves", "spinach/spinach", "food", "manhole/manholes", "pretzel/pretzels", "food", "cornflake/cornflakes", "food", "corn/corns", "food", "marshmallow/marshmallows", "food", "salmon/salmon", "animal food", "fudge/fudge", "food", "basket/baskets", "biscuit/biscuits", "food", "pope/popes", "flapjack/flapjacks", "ointment/ointments", "ball"],
	vehicle: [ "train/trains", "vehicle", "minivan/minivans", "vehicle", "semi/semis", "vehicle", "hot rod/hot rods", "vehicle", "truck/trucks", "vehicle", "boat/boats", "vehicle", "submarine/submarines", "vehicle", "aircraft carrier/aircraft carriers", "vehicle", "airplane/airplanes", "vehicle", "blimp/blimps", "vehicle", "motorcycle/motorcycles", "vehicle"],
	animal: [ "bass/basses", "animal", "football/footballs", "dollar bill/dollar bills", "log/logs", "chicken wing/chicken wings", "pylon/pylons", "card/cards", "rock/rocks", "book/books", "rabies/rabies", "fan/fans", "eraser/erasers", "fart/farts", "booger/boogers", "monster/monsters", "nerd/nerds", "tuna/tuna", "animal food", "mirror/mirrors", "urinal/urinals", "salmon/salmon", "animal food", "sex long tool", "leech/leeches", "squid/squids", "octopus/octopi", "velociraptor/velociraptors", "tyrannosaurus rex/tyrannosaurus rexes", "sphinx/sphinxes", "viking/vikings", "tadpole/tadpoles", "skunk/skunks", "seagull/seagulls", "parrot/parrots", "weasel/weasels", "mammoth/mammoths", "bat/bats", "landlord/landlords", "moose/moose", "frog/frogs", "toad/toads", "ant/ants", "chihuahua/chihuahuas", "deer/deer", "rat/rats", "cat/cats", "mayor/mayors", "flamingo/flamingos", "turtle/turtles", "blowfish/blowfish", "grasshopper/grasshoppers", "animal insect", "locust/locusts", "animal insect", "cricket/crickets", "animal insect", "beetle/beetles", "animal insect", "bitch/bitches", "animal"],
	shape: [ "square/squares", "shape", "triangle/triangles", "shape", "oval/ovals", "shape", "circle/circles", "shape"]
};
dic.noun = noun;

var place ={
	outdoor: [ "beach/beaches", "natural outdoor", "highway/highways", "outdoor", "mountain/mountains", "natural outdoor", "hill/hills", "natural outdoor", "railroad/railroads", "outdoor", "road/roads", "outdoor", "hilltop/hilltops", "natural outdoor", "park/parks", "outdoor", "lakeside/lakesides", "natural outdoor", "grassy plain/grassy plains", "natural outdoor", "crater/craters", "natural outdoor", "valley/valleys", "natural outdoor", "volcano/volcanoes", "natural outdoor", "island/islands", "natural outdoor", "farm/farms", "outdoor", "rooftop/rooftops", "outdoor", "dance floor/dance floors", "outdoor", "graveyard/graveyards", "outdoor", "cemetary/cemetaries", "outdoor", "field/fields", "outdoor", "street/streets", "outdoor", "battlefield/battlefields", "outdoor", "wasteland/wastelands", "natural outdoor", "playground/playgrounds", "outdoor", "amusement park/amusement parks"],
	building: [ "palace/palaces", "building indoor", "jail/jails", "building indoor", "tomb/tombs", "building indoor", "coffeeshop/coffeeshops", "building indoor", "tower/towers", "building indoor", "stable/stables", "building indoor", "barn/barns", "building indoor", "mansion/mansions", "building indoor", "castle/castles", "building indoor", "stadium/stadiums", "building indoor", "school/schools", "building indoor", "mall/malls", "building indoor", "store/stores", "building indoor", "shanty/shanties", "building indoor", "prison/prisons", "building indoor", "shack/shacks", "building indoor", "tent/tents", "building indoor", "outhouse/outhouses", "building indoor", "cottage/cottages", "building indoor", "asylum/asylums", "building indoor", "bar/bars", "building indoor", "pub/pubs", "building indoor", "nightclub/nightclubs", "building indoor", "factory/factories", "building indoor", "firehouse/firehouses", "building indoor", "safehouse/safehouses", "building indoor", "warehouse/warehouses", "building indoor", "bomb shelter/bomb shelters", "building indoor", "homeless shelter/homeless shelters", "building indoor", "church/churches", "building indoor", "distillery/distilleries", "building indoor", "conservatory/conservatories", "building indoor", "morgue/morgues", "building indoor", "funeral home/funeral homes", "building indoor", "courthouse/courthouses", "building indoor", "theater/theaters", "building indoor", "studio/studios", "building indoor", "fort/forts", "building indoor", "nursery/nurseries", "building indoor", "library/libraries", "building indoor", "hospital/hospitals", "building indoor", "hostel/hostels", "building indoor", "hotel/hostels", "building indoor", "post office/post offices", "building indoor", "laboratory/laboratories", "building indoor"],
	indoor: [ "palace/palaces", "building indoor", "classroom/classrooms", "indoor", "nest/nests", "natural indoor", "office/offices", "indoor", "ditch/ditches", "natural indoor", "cave/caves", "natural indoor", "house/houses", "indoor", "bathroom/bathrooms", "indoor", "bedroom/bedrooms", "indoor", "town/towns", "indoor", "jail/jails", "building indoor", "shop/shops", "indoor", "tomb/tombs", "building indoor", "basement/basements", "indoor", "dungeon/dungeons", "indoor", "coffeeshop/coffeeshops", "building indoor", "tower/towers", "building indoor", "stable/stables", "building indoor", "barn/barns", "building indoor", "mansion/mansions", "building indoor", "castle/castles", "building indoor", "attic/attics", "indoor", "cage/cages", "indoor", "stadium/stadiums", "building indoor", "school/schools", "building indoor", "mall/malls", "building indoor", "store/stores", "building indoor", "stand/stands", "indoor", "company/companies", "indoor", "land/lands", "natural indoor", "garden/gardens", "indoor", "wonderland/wonderlands", "indoor", "abyss/abysses", "indoor", "shanty/shanties", "building indoor", "prison/prisons", "building indoor", "apartment/apartments", "indoor", "closet/closets", "indoor", "shack/shacks", "building indoor", "tent/tents", "building indoor", "car/cars", "indoor", "van/vans", "indoor", "alley/alleys", "indoor", "forest/forests", "natural indoor", "meadow/meadows", "natural indoor", "outhouse/outhouses", "building indoor", "boat/boats", "indoor", "portapotty/portapotties", "indoor", "sauna/saunas", "indoor", "cottage/cottages", "building indoor", "bank/banks", "indoor", "asylum/asylums", "building indoor", "arcade/arcades", "indoor", "bar/bars", "building indoor", "pub/pubs", "building indoor", "nightclub/nightclubs", "building indoor", "factory/factories", "building indoor", "station/stations", "indoor", "firehouse/firehouses", "building indoor", "safehouse/safehouses", "building indoor", "warehouse/warehouses", "building indoor", "bomb shelter/bomb shelters", "building indoor", "homeless shelter/homeless shelters", "building indoor", "firetruck/firetrucks", "indoor", "ambulance/ambulances", "indoor", "kitchen/kitchens", "indoor", "church/churches", "building indoor", "distillery/distilleries", "building indoor", "conservatory/conservatories", "building indoor", "morgue/morgues", "building indoor", "funeral home/funeral homes", "building indoor", "courthouse/courthouses", "building indoor", "trailer/trailers", "indoor", "theater/theaters", "building indoor", "studio/studios", "building indoor", "ring/rings", "indoor", "fort/forts", "building indoor", "nursery/nurseries", "building indoor", "library/libraries", "building indoor", "hospital/hospitals", "building indoor", "hostel/hostels", "building indoor", "hotel/hostels", "building indoor", "sanctuary/sanctuaries", "indoor", "bus/buses", "indoor", "post office/post offices", "building indoor", "skyway/skyways", "indoor", "opera/operas", "indoor", "laboratory/laboratories", "building indoor", "garage/garages", "indoor", "festival/festivals", "indoor", "carnival/carnivals", "indoor", "dispensary/dispensaries", "indoor"],
	natural: [ "nest/nests", "natural indoor", "ditch/ditches", "natural indoor", "cave/caves", "natural indoor", "land/lands", "natural indoor", "forest/forests", "natural indoor", "meadow/meadows", "natural indoor", "beach/beaches", "natural outdoor", "mountain/mountains", "natural outdoor", "hill/hills", "natural outdoor", "hilltop/hilltops", "natural outdoor", "lakeside/lakesides", "natural outdoor", "grassy plain/grassy plains", "natural outdoor", "crater/craters", "natural outdoor", "valley/valleys", "natural outdoor", "volcano/volcanoes", "natural outdoor", "island/islands", "natural outdoor", "wasteland/wastelands", "natural outdoor"]
};
dic.place = place;

var prefix ={
	scale: [ "micro", "scale", "macro", "scale"],
	quantity: [ "bi", "quantity", "tri", "quantity", "quad", "quantity", "octo", "quantity", "a", "anti", "un", "in", "pseudo", "penta", "quantity", "mono", "quantity", "sub", "omni"],
	position: [ "pre", "position", "post", "position", "extra", "position", "intra", "position", "mega", "exo", "endo", "position", "mid", "position", "under", "position", "over", "position", "mis", "non", "auto", "circum", "contra", "homo", "hyper"],
	anatomy: [ "cardio", "anatomy", "neuro", "anatomy", "pyro", "super", "mini", "psycho", "trans", "fore", "semi"]
};
dic.prefix = prefix;

var prepos ={
	time: [ "after", "time", "before", "time", "during", "time", "despite", "time", "following", "time", "for", "time", "until", "time", "since", "time", "regarding"],
	space: [ "aboard", "space", "about", "space", "above", "space", "across", "space", "against", "space", "along", "space", "amid", "space", "among", "space", "around", "space", "as", "space", "at", "space", "behind", "space", "below", "space", "beneath", "space", "beside", "space", "besides", "space", "between", "space", "beyond", "space", "by", "space", "down", "space", "from", "space", "in", "space", "inside", "space", "into", "space", "near", "space", "of", "space", "off", "space", "on", "space", "onto", "space", "opposite", "space", "outside", "space", "over", "space", "past", "space", "round", "space", "through", "space", "to", "space", "toward", "space", "towards", "space", "under", "space", "underneath", "space", "up", "space", "upon", "space", "versus", "space", "via", "space", "with", "space", "within", "space", "without", "space"]
};
dic.prepos = prepos;

var preposition ={
};
dic.preposition = preposition;
	var preposition_all= ["with","without","alongside","inside of","using","with the help of"].concat();
dic.preposition.all=preposition_all;

var pron ={
	female: [ "her/she/herself/her/hers"],
	male: [ "him/he/himself/his/his", "male"]
};
dic.pron = pron;

var quality ={
	human: [ "race/racier/less racier/raciest", "human", "age/older/younger/oldest", "human", "gender/sexier/more gender neutral/sexiest", "human", "ethnicity/more ethnic/less ethnic/most ethnic", "human", "honesty/more thuthful/less truthful/most truthful"],
	physical: [ "speed/faster/slower/fastest", "physical", "size/bigger/smaller/biggest", "physical", "wetness/wetter/drier/wettest", "physical", "force/harder/softer/hardest", "physical", "weight/heavier/lighter/heaviest", "physical", "color/more colorful/duller/most colorful", "physical", "luminosity/brighter/darker/brightest", "physical", "power level/more powerful/weaker/most powerful", "physical", "height/taller/shorter/tallest", "physical", "length/longer/shorter/longest", "physical", "width/wider/skinnier/widest", "physical", "girth/girthier/less girthy/girthiest", "physical"]
};
dic.quality = quality;

var rel ={
	female: [ "mommy/mommies", "female", "sister/sisters", "female", "mother/mothers", "female", "grandma/grandmas", "female", "stepmother/stepmothers", "female", "aunt/aunts", "female", "girlfriend/girlfriends", "female", "wife/wives", "female", "daughter/daughters", "female", "granddaughter/granddaughters", "female", "girl/girls", "female", "woman/women", "female"],
	male: [ "brother/brothers", "male", "father/fathers", "male", "grandpa/grandpas", "male", "uncle/uncles", "male", "boyfriend/boyfriends", "male", "husband/husbands", "male", "stepfather/stepfathers", "male", "godfather/godfathers", "male", "son/sons", "male", "grandson/grandsons", "male", "boy/boys", "male", "man/men", "male", "daddy/daddies", "male"],
	neutral: [ "friend/friends", "neutral", "cousin/cousins", "neutral", "colleague/colleagues", "neutral", "boss/bosses", "neutral", "master/masters", "neutral", "buddy/buddies", "neutral", "child/children", "neutral", "baby/babies", "neutral", "fella/fellas"]
};
dic.rel = rel;

var say ={
};
dic.say = say;
	var say_all= ["say/saying/said/says/sayer/said/saying","shoot/shooting/shot/shoots/shooter/shot/shooting","call/calling/called/calls/caller/called/calling","croak/croaking/croaked/croaks/croaker/croaked/croaking","cry/crying/cried/cries/cryer/cried/crying","whimper/whimpering/whimpered/whimpers/whimperer/whimpered/whimpering","mumble/mumbling/mumbled/mumbles/mumbler/mumbled/mumbling","scream/screaming/screamed/screams/screamer/screamed/screaming","shriek/shrieking/shrieked/shrieks/shrieker/shrieked/shrieking","moan/moaning/moaned/moans/moaner/moaned/moaning","shout/shouting/shouted/shouts/shouter/shouted/shouting","yell/yelling/yelled/yells/yeller/yelled/yelling","wail/wailing/wailed/wails/wailer/wailed/wailing","swear/swearing/swore/swears/swearer/sworn/swearing","bawl/bawling/bawled/bawls/bawler/bawled/bawling","snap/snapping/snapped/snaps/snapper/snapped/snapping","whisper/whispering/whispered/whispers/whisperer/whispered/whispering","cackle/cackling/cackled/cackles/cackler/cackled/cackling","grunt/grunting/grunted/grunts/grunter/grunted/grunting","roar/roaring/roared/roars/roarer/roared/roaring","snort/snorting/snorted/snorts/snorter/snorted/snorting","whine/whining/whined/whines/whiner/whined/whining","screech/screeching/screeched/screeches/screecher/screeched/screeching","squeal/squealing/squealed/squeals/squealer/squealed/squealing","hoot/hooting/hooted/hoots/hooter/hooted/hooting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","spit/spitting/spat/spits/spitter/spat/spitting","declare/declaring/declared/declares/declarer/declared/declaration","breathe/breathing/breathed/breathes/breather/breathed/breathing","announce/announcing/announced/announces/announcer/announced/announcing","snicker/snickering/snickered/snickers/snickerer/snickered/snickering","beep/beeping/beeped/beeps/beeper/beeped/beeping","exclaim/exclaiming/exclaimed/exclaims/exclaimer/exclaimed/exclamation","burp/burping/burped/burps/burper/burped/burping","laugh/laughing/laughed/laughs/laugher/laughed/laughter","mutter/muttering/muttered/mutters/mutterer/muttered/muttering","hiss/hissing/hissed/hisses/hisser/hissed/hissing"].concat();
dic.say.all=say_all;

var sconj ={
};
dic.sconj = sconj;
	var sconj_all= ["after","although","as","as if","as long as","as much as","as soon as","as though","because","before","even","even if","even though","if","if only","if when","if then","inasmuch","in order that","just as","lest","now","now since","now that","now when","once","provided","provided that","rather than","since","so that","supposing","than","that","though","til","unless","until","when","whenever","where","whereas","where if","wherever","whether","which","while","who","whoever","why"].concat();
dic.sconj.all=sconj_all;

var sound ={
};
dic.sound = sound;
	var sound_all= ["bang/bangs","squelch/squelches","squeal/squeals","boom/booms","beep/beeps","crash/crashes","wail/wails","roar/roars","shatter/shatters","pop/pops","note/notes","thump/thumps","rumble/rumbles","scrape/scrapes","screech/screeches","flap/flaps","flutter/flutters","swoosh/swooshes","pound/pounds","slap/slaps","clang/clangs","toot/toots","tick/ticks","foom/fooms","rap/raps","tap/taps","shudder/shudders","crack/cracks"].concat();
dic.sound.all=sound_all;

var substance ={
	liquid: [ "water", "liquid", "vomit", "liquid", "orange juice", "liquid", "sweat", "liquid", "blood", "liquid", "lava", "liquid", "gasoline", "liquid", "sand", "oil", "liquid", "molten iron", "liquid", "grease", "liquid", "tears", "liquid", "ketchup", "liquid", "mustard", "liquid", "mayonnaise", "liquid", "soy sauce", "liquid", "beer", "liquid", "wine", "liquid", "vodka", "liquid", "olive oil", "liquid", "extravirgin olive oil", "liquid", "earwax", "vinegar", "liquid", "paint", "liquid", "liquid nitrogen", "liquid", "tomato sauce", "liquid", "ink", "liquid", "lemonade", "liquid", "oatmeal", "spaghetti", "flour", "sap", "liquid", "plasma", "liquid", "dark matter", "antimatter", "corn", "snow", "acid", "liquid", "magma", "liquid", "happiness", "dick cheese", "cum", "liquid", "lube", "liquid", "crotch juice", "liquid", "pee", "liquid", "piss", "liquid", "pisswater", "liquid", "diarrhea", "liquid", "jizz", "liquid", "urine"]
};
dic.substance = substance;

var surname ={
};
dic.surname = surname;
	var surname_all= ["Pollock","Washington","Hayne","Machler","Kaye","Murdock","Dick","Johnson","Jackson","Anderson","Smith","Bingley","Presley","Olson","Pederson","Clark","Stark","Lee","Meyer","Palin","Shaw","Andrews","Sampson","Mueller","Allan","Underwood","Cyrus","Harris","Lewis","Phillips","Thompson","Miller","Pratt","Griff","Wright","Jones","Brown","Davis","Wilson","Moore","Taylor","Thomas","White","Martin","Garcia","Martinez","Robinson","Rodriguez","Walker","Hall","Allen","Young","Hernandez","Underthun","Werdal","King","Lopez","Hill","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Roberts","Turner","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Sterling","Cox","Howard","Ward","Torres","Gray","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Ross","Jenkins","Perry","Long","Butler","Simmons","Russell","Bryant","McDonald","Little","Jacobs","Wang","Schroeder","Hartman","Woodard","Kemp","Glenn","Baxter","Bond","Nixon","Strong","Hurst","Farrell","Roth","Prince","Serrano","Glass","Knox","Randolph","Maynard","Foley","Chang","Bauer","Rivers","Walls","Sexton","Gentry","Leon","Barron","Estes","Middleton","Best","Dudley","Herman","Pennington","Solomon","Kerr","Chen","Blackburn","Gay","Avery","Hendricks","Barry","Horne","Meadows","Velentine","Church","Russo","Benton","Howe","Hinton","Tillman","Key","Peck","Morin","Gamble","Bentley","Stout","Petty","Osborn","Joyner","Rosario","Stein","Huber","Vanyo","Guthrie","Noel","Vang","Cooke","Wooten","Forbes","Hewitt"].concat();
dic.surname.all=surname_all;

var timeadv ={
	frequency: [ "once again", "frequency", "never again", "frequency", "instantly", "frequency", "usually", "frequency", "yesterday", "frequency", "sometimes", "frequency", "occasionally", "frequency", "often", "frequency", "once in a while", "frequency", "never", "frequency", "frequently", "frequency", "once a week", "frequency", "daily", "frequency", "once a month", "frequency", "again", "frequency", "repeatedly", "frequency", "all the time", "frequency", "hardly", "frequency", "barely", "frequency", "several times", "frequency", "every night", "frequency", "this time", "frequency", "biweekly", "frequency", "centenially", "frequency", "every now and then", "frequency", "from now on", "frequency", "until further notice", "frequency", "for 10 weeks", "frequency", "for 36 hours", "frequency", "on Mondays", "frequency", "every Tuesday", "frequency", "profusely", "frequency", "perpetually"],
	time: [ "at sunrise", "time", "a month ago", "time past", "a week ago", "time past", "a day ago", "time past", "an hour ago", "time past", "a year ago", "time past", "millions of years ago", "time past", "billions of years ago", "time past", "trillions of years ago", "time past", "today", "time present", "tonight", "time present", "presently", "time present", "now", "time present", "just 5 minutes ago", "time past", "5 minutes later", "time", "1 hour later", "time", "1 day later", "time", "1 week later", "time", "1 month later", "time", "6 months later", "time", "a year later", "time", "5 years later", "time", "10 years later", "time", "at the full moon", "time", "at sunset", "time", "later", "time", "recently", "time"],
	past: [ "a month ago", "time past", "a week ago", "time past", "a day ago", "time past", "an hour ago", "time past", "a year ago", "time past", "millions of years ago", "time past", "billions of years ago", "time past", "trillions of years ago", "time past", "just 5 minutes ago", "time past"],
	present: [ "today", "time present", "tonight", "time present", "presently", "time present", "now", "time present"]
};
dic.timeadv = timeadv;
	var timeadv_all= ["5 minutes later","1 hour later","1 day later","1 week later","1 month later","6 months later","5 years later","10 years later"].concat(timeadv.frequency,timeadv.time,timeadv.past,timeadv.present);
dic.timeadv.all=timeadv_all;

var timenoun ={
	holiday: [ "New Year's Eve/New Year's Eves", "holiday", "New Year's Day/New Year's Days", "holiday", "Valentine's Day/Valentine's Days", "holiday", "Easter/Easters", "holiday", "Labor Day/Labor Days", "holiday", "Halloween/Halloweens", "holiday", "Thanksgiving/Thanksgivings", "holiday", "Christmas/Christmasses", "holiday", "Hanukkah/Hanukkahs", "holiday", "Black Friday/Black Fridays", "holiday", "Kwanzaa/Kwanzaas", "holiday", "Boxing Day/Boxing Days", "holiday", "Labor Day/Labor Days", "holiday", "Father's Day/Father's Days", "holiday", "Mother's Day/Mother's Days", "holiday", "Groundhog Day/Groundhog Days", "holiday"],
	unit: [ "millisecond/milliseconds", "unit", "second/seconds", "unit", "minute/minutes", "unit", "hour/hours", "unit", "day/days", "unit", "month/months", "unit", "year/years", "unit", "century/centuries"],
	month: [ "January/Januaries", "month", "February/Februaries", "month", "March/Marches", "month", "April/Aprils", "month", "May/Mays", "month", "June/Junes", "month", "July/Julies", "month", "August/Augusts", "month", "September/Septembers", "month", "October/Octobers", "month", "November/Novembers", "month", "December/Decembers", "month"],
	dayofweek: [ "Sunday/Sundays", "dayofweek", "Monday/Mondays", "dayofweek", "Tuesday/Tuesdays", "dayofweek", "Wednesday/Wednesdays", "dayofweek", "Thursday/Thursdays", "dayofweek", "Friday/Fridays", "dayofweek", "Saturday/Saturdays", "dayofweek"],
	timeofday: [ "dawn/dawns", "timeofday", "morning/mornings", "timeofday", "noon/noons", "timeofday", "day/days", "timeofday", "afternoon/afternoons", "timeofday", "evening/evenings", "timeofday", "dusk/dusks", "timeofday", "night/nights", "timeofday", "midnight/midnights", "timeofday"]
};
dic.timenoun = timenoun;

var title ={
};
dic.title = title;
	var title_all= ["Dr.","Sir","Honorable","Madam","King","Queen","Prince","Granny","Master","Mayor","Governor","Colonel","Sergeant","Daddy","Mama","Papa","Sensei","Dojo","Ms","Mrs.","Mr.","Mistress","Moist","Old","Professor"].concat();
dic.title.all=title_all;

var unit ={
	energy: [ "volt/volts/V", "energy potential", "millivolt/millivolts/mV", "energy potential small factor", "kilovolt/kilovolts/kV", "energy potential large factor", "farad/farads/F", "energy capacitance", "microfarad/microfarads/μF", "energy capacitance small factor", "joule/joules/J", "energy", "kilojoule/kilojoules/kJ", "energy large factor", "ampere/amperes/A", "energy current", "milliampere/milliamperes/mA", "energy current small factor", "watt/watts/W", "energy power", "kilowatt/kilowatts/kW", "energy power large factor", "milliwatt/milliwatts/mW", "energy power small factor", "megawatt/megawatts/MW", "energy power large factor", "henry/henries/H"],
	small: [ "centimeter/centimeters/cm", "length small factor", "milliliter/milliliters/mL", "volume small factor", "millivolt/millivolts/mV", "energy potential small factor", "microfarad/microfarads/μF", "energy capacitance small factor", "milliampere/milliamperes/mA", "energy current small factor", "milliwatt/milliwatts/mW", "energy power small factor"],
	pressure: [ "decibel/decibels/dB", "pressure", "pascal/pascals/Pa", "pressure", "kilopascal/kilopascals/kPa", "pressure large factor"],
	volume: [ "gallon/gallons/gal", "volume", "bucket/buckets/bucket", "volume", "liter/liters/L", "volume", "teaspoon/teaspoons/tsp", "volume", "cup/cups/c", "volume", "quart/quarts/qt", "volume", "pint/pints/pt", "volume", "milliliter/milliliters/mL", "volume small factor", "tablespoon/tablespoons/tbsp", "volume", "cubic centimeter/cubic centimeters/cc", "volume"],
	potential: [ "volt/volts/V", "energy potential", "millivolt/millivolts/mV", "energy potential small factor", "kilovolt/kilovolts/kV", "energy potential large factor"],
	factor: [ "centimeter/centimeters/cm", "length small factor", "kilometer/kilometers/km", "length large factor", "kilogram/kilograms/kg", "weight large factor", "megaton/megatons/Mt", "weight large factor", "milliliter/milliliters/mL", "volume small factor", "kilopascal/kilopascals/kPa", "pressure large factor", "millivolt/millivolts/mV", "energy potential small factor", "kilovolt/kilovolts/kV", "energy potential large factor", "microfarad/microfarads/μF", "energy capacitance small factor", "kilojoule/kilojoules/kJ", "energy large factor", "milliampere/milliamperes/mA", "energy current small factor", "kilowatt/kilowatts/kW", "energy power large factor", "milliwatt/milliwatts/mW", "energy power small factor", "megawatt/megawatts/MW", "energy power large factor"],
	large: [ "kilometer/kilometers/km", "length large factor", "kilogram/kilograms/kg", "weight large factor", "megaton/megatons/Mt", "weight large factor", "kilopascal/kilopascals/kPa", "pressure large factor", "kilovolt/kilovolts/kV", "energy potential large factor", "kilojoule/kilojoules/kJ", "energy large factor", "kilowatt/kilowatts/kW", "energy power large factor", "megawatt/megawatts/MW", "energy power large factor"],
	length: [ "centimeter/centimeters/cm", "length small factor", "meter/meters/m", "length", "kilometer/kilometers/km", "length large factor", "inch/inches/in", "length", "foot/feet/ft", "length", "yard/yards/y", "length", "mile/miles/mi", "length", "lightyear/lightyears/ly", "length"],
	power: [ "watt/watts/W", "energy power", "kilowatt/kilowatts/kW", "energy power large factor", "milliwatt/milliwatts/mW", "energy power small factor", "megawatt/megawatts/MW", "energy power large factor"],
	current: [ "ampere/amperes/A", "energy current", "milliampere/milliamperes/mA", "energy current small factor"],
	weight: [ "pound/pounds/lb", "weight", "gram/grams/g", "weight", "kilogram/kilograms/kg", "weight large factor", "ton/tons/t", "weight", "megaton/megatons/Mt", "weight large factor", "ounce/ounces/oz", "weight"],
	capacitance: [ "farad/farads/F", "energy capacitance", "microfarad/microfarads/μF", "energy capacitance small factor"],
	inductance: [ "henry/henries/H"]
};
dic.unit = unit;

var verb ={
	eat: [ "slurp/slurping/slurped/slurps/slurper/slurped/slurping", "eat intransitive", "lick/licking/licked/licks/licker/licked/licking", "eat intransitive", "snort/snorting/snorted/snorts/snorter/snorted/snorting", "eat intransitive", "eat/eating/ate/eats/eater/eaten/eating", "eat intransitive transitive", "suck/sucking/sucked/sucks/sucker/sucked/sucking", "eat transitive", "snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling", "eat intransitive", "guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling", "eat transitive", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "eat transitive intransitive", "nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling", "eat transitive", "gnaw/gnawing/gnawed/gnaws/gnawer/gnawed/gnawing", "eat", "nip/nipping/nipped/nips/nipper/nipped/nipping", "eat violent", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "eat intransitive transitive", "chew/chewing/chewed/chews/chewer/chewed/chewing", "eat intransitive transitive"],
	move: [ "lunge/lunging/lunged/lunges/lunger/lunged/lunging", "motion move", "jump/jumping/jumped/jumps/jumper/jumped/jumping", "motion move", "push/pushing/pushed/pushes/pusher/pushed/pushing", "move transitive insert", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration", "motion move intransitive"],
	insert: [ "screw/screwing/screwed/screws/screwer/screwed/screwing", "motion insert", "poke/poking/poked/pokes/poker/poked/poking", "motion insert", "stick/sticking/stuck/sticks/sticker/stuck/sticking", "motion insert", "prod/prodding/prodded/prods/prodder/prodded/prodding", "motion insert", "wedge/wedging/wedged/wedges/wedger/wedged/wedging", "motion insert", "inject/injecting/injected/injects/injector/injected/injection", "motion insert", "cram/cramming/crammed/crams/crammer/crammed/cramming", "motion insert", "feed/feeding/fed/feeds/feeder/fed/feeding", "transitive insert", "forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting", "nail/nailing/nailed/nails/nailer/nailed/nailing", "violent transitive insert", "push/pushing/pushed/pushes/pusher/pushed/pushing", "move transitive insert", "plunge/plunging/plunged/plunges/plunger/plunged/plunging", "transitive insert", "ram/ramming/rammed/rams/rammer/rammed/ramming", "transitive insert", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "motion sex transitive intransitive insert"],
	sex: [ "stroke/stroking/stroked/strokes/stroker/stroked/stroking", "sex transitive", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "transitive sex liquid", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "intransitive sex liquid", "please/pleasing/pleased/pleases/pleaser/pleasted/pleasing", "transitive sex", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "motion sex transitive intransitive insert", "mount/mounting/mounted/mounts/mounter/mounted/mounting", "sex transitive", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "sex transitive intransitive", "masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation", "sex intransitive", "fellate/fellating/fellated/fellates/fellater/fellated/fellatio", "sex transitive", "titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking", "sex transitive", "turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification", "sex transitive"],
	intransitive: [ "moan/moaning/moaned/moans/moaner/moaned/moaning", "intransitive", "rustle/rustling/rustled/rustles/rustler/rustled/rustling", "intransitive", "fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling", "intransitive", "hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping", "intransitive", "vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration", "intransitive", "strain/straining/strained/strains/strainer/strained/straining", "transitive intransitive", "tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling", "intransitive", "shave/shaving/shaved/shaves/shaver/shaved/shaving", "transitive intransitive", "kiss/kissing/kissed/kisses/kisser/kissed/kissing", "transitive intransitive", "cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling", "transitive intransitive", "soak/soaking/soaked/soaks/soaker/soaked/soaking", "transitive intransitive", "jerk/jerking/jerked/jerks/jerker/jerked/jerking", "transitive intransitive", "scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing", "transitive intransitive", "burn/burning/burned/burns/burner/burnt/burning", "transitive intransitive", "freeze/freezing/froze/freezes/freezer/frozen/freezing", "transitive intransitive", "bake/baking/baked/bakes/baker/baked/baking", "transitive intransitive", "swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing", "transitive intransitive", "flatten/flattening/flattened/flattens/flattener/flattened/flattening", "transitive intransitive", "rot/rotting/rotted/rots/rotter/rotten/rotting", "intransitive", "sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture", "transitive intransitive", "roll/rolling/rolled/rolls/roller/rolled/rolling", "transitive intransitive", "cut/cutting/cut/cuts/cutter/cut/cutting", "transitive intransitive", "dig/digging/dug/digs/digger/dug/digging", "transitive intransitive", "cook/cooking/cooked/cooks/cooker/cooked/cooking", "transitive intransitive", "rattle/rattling/rattled/rattles/rattler/rattled/rattling", "intransitive", "pull/pulling/pulled/pulls/puller/pulled/pulling", "transitive intransitive", "yank/yanking/yanked/yanks/yanker/yanked/yanking", "transitive intransitive", "boil/boiling/boiled/boils/boiler/boiled/boiling", "transitive intransitive", "plaster/plastering/plastered/plasters/plasterer/plastered/plastering", "transitive intransitive", "smoke/smoking/smoked/smokes/smoker/smoked/smoking", "transitive intransitive", "flick/flicking/flicked/flicks/flicker/flicked/flicking", "transitive intransitive", "scorch/scorching/scorched/scorches/scorcher/scorched/scorching", "transitive intransitive", "breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding", "transitive intransitive", "waste/wasting/wasted/wastes/waster/wasted/wasting", "transitive intransitive", "fume/fuming/fumed/fumes/fumer/fumed/fuming", "intransitive", "stand/standing/stood/stands/stander/stood/standing", "pose intransitive", "sit/sitting/sat/sits/sitter/sat/sitting", "pose intransitive", "lay/laying/laid/lays/layer/laid/laying", "pose intransitive", "crouch/crouching/crouched/crouches/croucher/crouched/crouching", "pose intransitive", "squat/squatting/squatted/squats/squatter/squatted/squatting", "pose intransitive", "slurp/slurping/slurped/slurps/slurper/slurped/slurping", "eat intransitive", "lick/licking/licked/licks/licker/licked/licking", "eat intransitive", "snort/snorting/snorted/snorts/snorter/snorted/snorting", "eat intransitive", "eat/eating/ate/eats/eater/eaten/eating", "eat intransitive transitive", "snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling", "eat intransitive", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "eat transitive intransitive", "spurt/spurting/spurted/spurts/spurter/spurted/spurting", "liquid intransitive transitive", "paint/painting/painted/paints/painter/painted/painting", "liquid intransitive transitive", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "liquid transitive intransitive", "drain/draining/drained/drains/drainer/drained/draining", "liquid intransitive transitive", "smatter/smattering/smattered/smatters/smatterer/smattered/smattering", "liquid intransitive", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "liquid transitive intransitive", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "liquid transitive intransitive", "drip/dripping/dripped/drips/dripper/dripped/dripping", "liquid intransitive transitive", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "liquid intransitive transitive", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "liquid transitive intransitive", "bathe/bathing/bathed/bathes/bather/bathed/bathing", "intransitive transitive", "snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling", "transitive intransitive", "puke/puking/puked/pukes/puker/puked/puking", "liquid intransitive", "lather/lathering/lathered/lathers/latherer/lathered/lathering", "intransitive", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "eat intransitive transitive", "chew/chewing/chewed/chews/chewer/chewed/chewing", "eat intransitive transitive", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "motion transitive intransitive", "pray/praying/prayed/prays/prayer/prayed/prayer", "intransitive", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "intransitive sex liquid", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "motion sex transitive intransitive insert", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "sex transitive intransitive", "masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation", "sex intransitive", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration", "motion move intransitive", "twerk/twerking/twerked/twerks/twerker/twerked/twerking", "motion intransitive", "defecate/defecating/defecated/defecates/defecator/defecated/defecation", "liquid intransitive transitive", "urinate/urinating/urinated/urinates/urinator/urinated/urination", "liquid intransitive"],
	liquid: [ "spurt/spurting/spurted/spurts/spurter/spurted/spurting", "liquid intransitive transitive", "smear/smearing/smeared/smears/smearer/smeared/smearing", "liquid transitive", "paint/painting/painted/paints/painter/painted/painting", "liquid intransitive transitive", "shower/showering/showered/showers/showerer/showered/showering", "liquid transitive", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "liquid transitive intransitive", "drain/draining/drained/drains/drainer/drained/draining", "liquid intransitive transitive", "smatter/smattering/smattered/smatters/smatterer/smattered/smattering", "liquid intransitive", "splatter/splattering/splattered/splatters/splatterer/splattered/splattering", "liquid transitive", "spray/spraying/sprayed/sprays/sprayer/sprayed/spraying", "liquid transitive", "jetspray/jetspraying/jetsprayed/jetsprays/jetsprayer/jetsprayed/jetspraying", "liquid transitive", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "liquid transitive intransitive", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "liquid transitive intransitive", "drip/dripping/dripped/drips/dripper/dripped/dripping", "liquid intransitive transitive", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "liquid intransitive transitive", "pour/pouring/poured/pours/pourer/poured/pouring", "liquid transitive", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "liquid transitive intransitive", "gush/gushing/gushed/gushes/gusher/gushed/gushing", "liquid", "puke/puking/puked/pukes/puker/puked/puking", "liquid intransitive", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "transitive sex liquid", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "intransitive sex liquid", "defecate/defecating/defecated/defecates/defecator/defecated/defecation", "liquid intransitive transitive", "urinate/urinating/urinated/urinates/urinator/urinated/urination", "liquid intransitive"],
	transitive: [ "invigorate/invigorating/invigorated/invigorates/invigorator/invigorated/invigoration", "transitive", "extrapolate/extrapolating/extrapolated/extrapolates/extrapolator/extrapolated/extrapolation", "transitive", "extrude/extruding/extruded/extrudes/extruder/extruded/extruding", "transitive", "squelch/squelching/squelched/squelches/squelcher/squelched/squelching", "articulate/articulating/articulated/articulates/articulator/articulated/articulation", "transitive", "transcribe/transcribing/transcribed/transcribes/transcriber/transcribed/transcribing", "transitive", "draft/drafting/drafted/drafts/drafter/drafted/drafting", "transitive", "tune/tuning/tuned/tunes/tuner/tuned/tunings", "transitive", "withdraw/withdrawing/withdrew/withdraws/withdrawer/withdrawn/withdrawing", "transitive", "strategize/strategizing/strategized/strategizes/strategizer/strategized/strategizing", "zip/zipping/zipped/zips/zipper/zipped/zipping", "transitive", "extend/extending/extended/extends/extender/extended/extending", "transitive", "streamline/streamlining/streamlined/streamlines/streamliner/streamlined/streamlining", "transitive", "organize/organizing/organized/organizes/organizer/organized/organization", "transitive", "quantify/quantifying/quantified/quantifies/quantifier/quantified/quantification", "transitive", "grate/grating/grated/grates/grater/grated/grating", "transitive", "tape/taping/taped/tapes/taper/taped/taping", "transitive", "oil/oiling/oiled/oils/oiler/oiled/oiling", "transitive", "strap/strapping/strapped/straps/strapper/strapped/strapping", "transitive", "cultivate/cultivating/cultivated/cultivates/cultivater/cultivated/cultivation", "transitive", "discipline/disciplining/disciplined/disciplines/discipliner/disciplined/discipline", "transitive", "examine/examining/examined/examines/examiner/examined/examination", "transitive", "stew/stewing/stewed/stews/stewer/stewed/stewing", "transitive", "stir/stirring/stirred/stirs/stirrer/stirred/stirring", "transitive", "hug/hugging/hugged/hugs/hugger/hugged/hugging", "transitive", "pop/popping/popped/pops/popper/popped/popping", "transitive", "sanitize/sanitizing/sanitized/sanitizes/sanitizer/sanitized/sanitization", "transitive", "clean/cleaning/cleaned/cleans/cleaner/cleaned/cleaning", "transitive", "touch/touching/touched/touches/toucher/touched/touching", "transitive", "strain/straining/strained/strains/strainer/strained/straining", "transitive intransitive", "kill/killing/killed/kills/killer/killed/killing", "transitive", "barbeque/barbequing/barbequed/barbeques/barbequer/barbequed/barbequing", "gargle/gargling/gargled/gargles/gargler/gargled/gargling", "transitive", "crumple/crumpling/crumpled/crumples/crumpler/crumpled/crumpling", "transitive", "salt/salting/salted/salts/salter/salted/salting", "transitive", "season/seasoning/seasoned/seasons/seasoner/seasoned/seasoning", "transitive", "marinate/marinating/marinated/marinates/marinater/marinated/marination", "transitive", "pickle/pickling/pickled/pickles/pickler/pickled/pickling", "transitive", "polish/polishing/polished/polishes/polisher/polished/polishing", "transitive", "caress/caressing/caressed/caresses/caresser/caressed/caressing", "transitive", "stimulate/stimulating/stimulated/stimulates/stimulator/stimulated/stimulation", "transitive", "hunt/hunting/hunted/hunts/hunter/hunted/hunting", "transitive", "dishonor/dishonoring/dishonored/dishonors/dishonorer/dishonored/dishonoring", "transitive", "puff/puffing/puffed/puffs/puffer/puffed/puffing", "suckle/suckling/suckled/suckles/suckler/suckled/suckling", "transitive", "squeeze/squeezing/squeezed/squeezes/squeezer/squeezed/squeezing", "transitive", "infest/infesting/infested/infests/infester/infested/infestation", "transitive", "tap/tapping/tapped/taps/tapper/tapped/tapping", "transitive", "probe/probing/probed/probes/proper/probed/probing", "transitive", "blast/blasting/blasted/blasts/blaster/blasted/blasting", "transitive", "shave/shaving/shaved/shaves/shaver/shaved/shaving", "transitive intransitive", "wrinkle/wrinkling/wrinkled/wrinkles/wrinkler/wrinkled/wrinkling", "transitive", "kiss/kissing/kissed/kisses/kisser/kissed/kissing", "transitive intransitive", "cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling", "transitive intransitive", "soak/soaking/soaked/soaks/soaker/soaked/soaking", "transitive intransitive", "grip/gripping/gripped/grips/gripper/gripped/gripping", "transitive", "jerk/jerking/jerked/jerks/jerker/jerked/jerking", "transitive intransitive", "scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing", "transitive intransitive", "mist/misting/misted/mists/mister/misted/misting", "transitive", "burn/burning/burned/burns/burner/burnt/burning", "transitive intransitive", "freeze/freezing/froze/freezes/freezer/frozen/freezing", "transitive intransitive", "dryfreeze/dryfreezing/dryfroze/dryfreezes/dryfreezer/dryfrozen/dryfreezing", "transitive", "bake/baking/baked/bakes/baker/baked/baking", "transitive intransitive", "deepfry/deepfrying/deepfried/deepfries/deepfrier/deepfried/deepfrying", "transitive", "swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing", "transitive intransitive", "flatten/flattening/flattened/flattens/flattener/flattened/flattening", "transitive intransitive", "glue/gluing/glued/glues/gluer/glued/gluing", "transitive", "rub/rubbing/rubbed/rubs/rubber/rubbed/rubbing", "transitive", "swipe/swiping/swiped/swipes/swiper/swiped/swiping", "transitive", "sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture", "transitive intransitive", "iron/ironing/ironed/irons/ironer/ironed/ironing", "transitive", "roll/rolling/rolled/rolls/roller/rolled/rolling", "transitive intransitive", "slit/slitting/slit/slits/slitter/slit/slitting", "transitive", "cut/cutting/cut/cuts/cutter/cut/cutting", "transitive intransitive", "loosen/loosening/loosened/loosens/loosener/loosened/loosening", "transitive", "tighten/tightening/tightened/tightens/tightener/tightened/tightening", "transitive", "penetrate/penetrating/penetrated/penetrates/penetrator/penetrated/penetration", "transitive", "strike/striking/struck/strikes/striker/stricken/striking", "transitive", "recycle/recycling/recycled/recycles/recycler/recycled/recycling", "transitive", "groom/grooming/groomed/grooms/groomer/groomed/grooming", "transitive", "hypnotize/hypnotizing/hypnotized/hypnotizes/hypnotist/hypnotized/hypnosis", "transitive", "dig/digging/dug/digs/digger/dug/digging", "transitive intransitive", "crush/crushing/crushed/crushes/crusher/crushed/crushing", "transitive", "cook/cooking/cooked/cooks/cooker/cooked/cooking", "transitive intransitive", "massage/massaging/massaged/massages/massager/massaged/massage", "transitive", "toke/toking/toked/tokes/toker/toked/toking", "transitive", "pull/pulling/pulled/pulls/puller/pulled/pulling", "transitive intransitive", "yank/yanking/yanked/yanks/yanker/yanked/yanking", "transitive intransitive", "dice/dicing/diced/dices/dicer/diced/dicing", "transitive", "chop/chopping/chopped/chops/chopper/chopped/chopping", "transitive", "boil/boiling/boiled/boils/boiler/boiled/boiling", "transitive intransitive", "uproot/uprooting/uprooted/uproots/uprooter/uprooted/uprooting", "transitive", "clip/clipping/clipped/clips/clipper/clipped/clipping", "transitive", "stroke/stroking/stroked/strokes/stroker/stroked/stroking", "sex transitive", "plaster/plastering/plastered/plasters/plasterer/plastered/plastering", "transitive intransitive", "scrunch/scrunching/scrunched/scrunches/scruncher/scrunched/scrunching", "transitive", "superglue/supergluing/superglued/superglues/supergluer/superglued/supergluing", "transitive", "embrace/embracing/embraced/embraces/embracer/embraced/embrace", "transitive", "smoke/smoking/smoked/smokes/smoker/smoked/smoking", "transitive intransitive", "moisten/moistening/moistened/moistens/moistener/moistened/moisturization", "transitive", "flick/flicking/flicked/flicks/flicker/flicked/flicking", "transitive intransitive", "scorch/scorching/scorched/scorches/scorcher/scorched/scorching", "transitive intransitive", "scold/scolding/scolded/scolds/scolder/scolded/scolding", "transitive", "punish/punishing/punished/punishes/punisher/punished/punishment", "transitive", "handle/handling/handled/handles/handler/handled/handling", "transitive", "manipulate/manipulating/manipulated/manipulates/manipulator/manipulated/manipulation", "transitive", "exploit/exploiting/exploited/exploits/exploiter/exploited/exploitation", "transitive", "misuse/misusing/misused/misuses/misuser/misused/misuse", "transitive", "breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding", "transitive intransitive", "pillage/pillaging/pillaged/pillages/pillager/pillaged/pillaging", "transitive", "eliminate/eliminating/eliminated/eliminates/eliminater/eliminated/elimination", "transitive", "waste/wasting/wasted/wastes/waster/wasted/wasting", "transitive intransitive", "grind/grinding/grinded/grinds/grinder/ground/grinding", "transitive", "fight/fighting/fought/fights/fighter/fighted/fighting", "transitive", "stuff/stuffing/stuffed/stuffs/stuffer/stuffed/stuffing", "transitive", "eat/eating/ate/eats/eater/eaten/eating", "eat intransitive transitive", "suck/sucking/sucked/sucks/sucker/sucked/sucking", "eat transitive", "guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling", "eat transitive", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "eat transitive intransitive", "nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling", "eat transitive", "spurt/spurting/spurted/spurts/spurter/spurted/spurting", "liquid intransitive transitive", "smear/smearing/smeared/smears/smearer/smeared/smearing", "liquid transitive", "paint/painting/painted/paints/painter/painted/painting", "liquid intransitive transitive", "shower/showering/showered/showers/showerer/showered/showering", "liquid transitive", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "liquid transitive intransitive", "drain/draining/drained/drains/drainer/drained/draining", "liquid intransitive transitive", "splatter/splattering/splattered/splatters/splatterer/splattered/splattering", "liquid transitive", "spray/spraying/sprayed/sprays/sprayer/sprayed/spraying", "liquid transitive", "jetspray/jetspraying/jetsprayed/jetsprays/jetsprayer/jetsprayed/jetspraying", "liquid transitive", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "liquid transitive intransitive", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "liquid transitive intransitive", "drip/dripping/dripped/drips/dripper/dripped/dripping", "liquid intransitive transitive", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "liquid intransitive transitive", "pour/pouring/poured/pours/pourer/poured/pouring", "liquid transitive", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "liquid transitive intransitive", "sue/suing/sued/sues/suer/sued/suing", "legal transitive", "prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution", "legal transitive", "convict/convicting/convicted/convicts/convicter/convicted/conviction", "legal transitive", "legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization", "legal transitive", "bathe/bathing/bathed/bathes/bather/bathed/bathing", "intransitive transitive", "cripple/crippling/crippled/cripples/crippler/crippled/crippling", "violent transitive", "customize/customizing/customized/customizes/customizer/customized/customization", "transitive", "decorate/decorating/decorated/decorates/decorator/decorated/decoration", "transitive", "feed/feeding/fed/feeds/feeder/fed/feeding", "transitive insert", "forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting", "harass/harassing/harassed/harasses/harasser/harassed/harassment", "violent transitive", "hoist/hostng/hoisted/hoists/hoister/hoisted/hoisting", "transitive", "nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing", "violent transitive", "nail/nailing/nailed/nails/nailer/nailed/nailing", "violent transitive insert", "preen/preening/preened/preens/preener/preened/preening", "transitive", "ride/riding/rode/rides/rider/ridden/riding", "transitive", "rob/robbing/robbed/robs/robber/robbed/robbery", "violent transitive", "sharpen/sharpening/sharpened/sharpens/sharpener/sharpened/sharpening", "transitive", "snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling", "transitive intransitive", "donate/donating/donated/donates/donater/donated/donation", "transitive", "purify/purifying/purified/purifies/purifier/purified/purification", "transitive", "rapture/rapturing/raptured/raptures/rapturer/raptured/rapture", "toast/toasting/toasted/toasts/toaster/toasted/toasting", "transitive", "liquidate/liquidating/liquidated/liquidates/liquidator/liquidated/liquidation", "transitive", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "eat intransitive transitive", "chew/chewing/chewed/chews/chewer/chewed/chewing", "eat intransitive transitive", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "motion transitive intransitive", "push/pushing/pushed/pushes/pusher/pushed/pushing", "move transitive insert", "chill/chilling/chilled/chills/chiller/chilled/chilling", "transitive", "report/reporting/reported/reports/reporter/reported/reporting", "transitive", "plunge/plunging/plunged/plunges/plunger/plunged/plunging", "transitive insert", "ram/ramming/rammed/rams/rammer/rammed/ramming", "transitive insert", "vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization", "violent transitive", "bless/blessing/blessed/blesses/blesser/blessed/blessing", "transitive", "liquefy/liquefying/liquefied/liquefies/liquefier/liquefied/liquefication", "violent transitive", "shred/shredding/shredded/shreds/shredder/shredded/shredding", "violent transitive", "erect/erecting/erected/erects/erector/erected/erection", "transitive", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "transitive sex liquid", "fertilize/fertilizing/fertilized/fertilizes/fertilizer/fertilized/fertilization", "transitive", "please/pleasing/pleased/pleases/pleaser/pleasted/pleasing", "transitive sex", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "motion sex transitive intransitive insert", "mount/mounting/mounted/mounts/mounter/mounted/mounting", "sex transitive", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "sex transitive intransitive", "fellate/fellating/fellated/fellates/fellater/fellated/fellatio", "sex transitive", "titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking", "sex transitive", "turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification", "sex transitive", "grope/groping/groped/gropes/groper/groped/groping", "violent transitive", "defecate/defecating/defecated/defecates/defecator/defecated/defecation", "liquid intransitive transitive", "finger/fingering/fingered/fingers/fingerer/fingered/fingering"],
	political: [ "veto/vetoing/vetoed/vetoes/vetoer/vetoed/vetoing", "political", "elect/electing/elected/elects/electer/elected/election", "political", "ratify/ratifying/ratified/ratifies/ratifier/ratified/ratification", "political", "amend/amending/amended/amends/amender/amended/amendment", "political", "impeach/impeaching/impeached/impeaches/impeacher/impeached/impeachment", "political", "inaugurate/inaugurating/inaugurated/inaugurates/inaugurater/inaugurated/inauguration", "political", "petition/petitioning/petitioned/petitions/petitioner/petitioned/petitioning"],
	legal: [ "sue/suing/sued/sues/suer/sued/suing", "legal transitive", "prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution", "legal transitive", "convict/convicting/convicted/convicts/convicter/convicted/conviction", "legal transitive", "legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization", "legal transitive"],
	violent: [ "pluck/plucking/plucked/plucks/plucker/plucked/plucking", "violent", "bite/biting/bit/bites/biter/bitten/biting", "violent", "fart/farting/farted/farts/farter/farted/farting", "violent", "manhandle/manhandling/manhandled/manhandles/manhandler/manhandled/manhandling", "violent", "maul/mauling/mauled/mauls/mauler/mauled/mauling", "violent", "whip/whipping/whipped/whips/whipper/whipped/whipping", "violent", "dominate/dominating/dominated/dominates/dominator/dominated/domination", "violent", "punch/punching/punched/punches/puncher/punched/punching", "violent", "headbutt/headbutting/headbutted/headbutts/headbutter/headbutted/headbutting", "violent", "impale/impaling/impaled/impales/impaler/impaled/impalement", "violent", "scratch/scratching/scratched/scratches/scratcher/scratched/scratching", "violent", "grab/grabbing/grabbed/grabs/grabber/grabbed/grabbing", "violent", "snip/snipping/snipped/snips/snipper/snipped/snipping", "violent", "shatter/shattering/shattered/shatters/shatterer/shattered/shattering", "violent", "slap/slapping/slapped/slaps/slapper/slapped/slapping", "violent", "tickle/tickling/tickled/tickles/tickler/tickled/tickling", "violent", "stab/stabbing/stabbed/stabs/stabber/stabbed/stabbing", "violent", "strangle/strangling/strangled/strangles/strangler/strangled/strangulation", "violent", "decapitate/decapitating/decapitated/decapitates/decapitater/decapitated/decapitation", "violent", "behead/beheading/beheaded/beheads/beheader/beheaded/beheading", "violent", "dangle/dangling/dangled/dangles/dangler/dangled/dangling", "violent", "hang/hanging/hung/hangs/hanger/hanged/hanging", "violent", "gouge/gouging/gouged/gouges/gouger/gouged/gouging", "violent", "electrocute/electrocuting/electrocuted/electrocutes/electrocuter/electrocuted/electrocution", "violent", "slash/slashing/slashed/slashes/slasher/slashed/slashing", "violent", "hammer/hammering/hammered/hammers/hammerer/hammered/hammering", "violent", "bludgeon/bludgeoning/bludgeoned/bludgeons/bludgeoner/bludgeoned/bludgeoning", "violent", "pierce/piercing/pierced/pierces/piercer/pierced/piercing", "violent", "skewer/skewering/skewered/skewers/skewerer/skewered/skewering", "violent", "spank/spanking/spanked/spanks/spanker/spanked/spanking", "violent", "vomit/vomiting/vomited/vomits/vomiter/vomited/vomiting", "violent", "pinch/pinching/pinched/pinches/pincher/pinched/pinching", "violent", "shove/shoving/shoved/shoves/shover/shoved/shoving", "violent", "amputate/amputating/amputated/amputates/amputator/amputated/amputation", "violent", "throttle/throttling/throttled/throttles/throttler/throttled/throttling", "violent", "implode/imploding/imploded/implodes/imploder/imploded/implosion", "violent", "explode/exploding/exploded/explodes/exploder/exploded/explosion", "violent", "cremate/cremating/cremated/cremates/cremater/cremated/cremation", "violent", "assault/assaulting/assaulted/assaults/assaulter/assaulted/assault", "violent", "attack/attacking/attacked/attacks/attacker/attacked/attack", "violent", "authenticate/authenticating/authenticated/authenticates/authenticator/authenticated/authentication", "choke/choking/choked/chokes/choker/choked/choking", "commandeer/commandeering/commandeered/commandeers/commandeerer/commandeered/commandeering", "conserve/conserving/conserved/conserves/conserver/conserved/conservation", "crash/crashing/crashed/crashes/crasher/crashed/crashing", "cripple/crippling/crippled/cripples/crippler/crippled/crippling", "violent transitive", "dissect/dissecting/dissected/dissects/dissector/dissected/dissection", "violent", "dramatize/dramatizing/dramatized/dramatizes/dramatizer/dramatized/dramatization", "harass/harassing/harassed/harasses/harasser/harassed/harassment", "violent transitive", "injure/injuring/injured/injures/injurer/injured/injury", "violent", "jingle/jingling/jingled/jingles/jingler/jingled/jingling", "jimmy/jimmying/jimmied/jimmies/jimmier/jimmied/jimmying", "kidnap/kidnapping/kidnapped/kidnaps/kidnapper/kidnapped/kidnapping", "violent", "lecture/lecturing/lectured/lectures/lecturer/lectured/lecturing", "mangle/mangling/mangled/mangles/mangler/mangled/mangling", "violent", "maim/maiming/maimed/maims/maimer/maimed/maiming", "violent", "mutilate/mutilating/mutilated/mutilates/mutilater/mutilated/mutilation", "violent", "nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing", "violent transitive", "nail/nailing/nailed/nails/nailer/nailed/nailing", "violent transitive insert", "nip/nipping/nipped/nips/nipper/nipped/nipping", "eat violent", "rob/robbing/robbed/robs/robber/robbed/robbery", "violent transitive", "vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization", "violent transitive", "liquefy/liquefying/liquefied/liquefies/liquefier/liquefied/liquefication", "violent transitive", "shred/shredding/shredded/shreds/shredder/shredded/shredding", "violent transitive", "grope/groping/groped/gropes/groper/groped/groping", "violent transitive"],
	walk: [ "snoop/snooping/snooped/snoops/snooper/snooped/snooping", "walk", "click/clicking/clicked/clicks/clicker/clicked/clicking", "flap/flapping/flapped/flaps/flapper/flapped/flapping", "joust/jousting/jousted/jousts/jouster/jousted/jousting", "walk", "slouch/slouching/slouched/slouches/sloucher/slouched/slouching", "walk", "walk/walking/walked/walks/walker/walked/walking", "walk", "skip/skipping/skipped/skips/skipper/skipped/skipping", "walk", "march/marching/marched/marches/marcher/marched/marching", "walk", "run/running/ran/runs/runner/run/running", "walk", "stampede/stampeding/stampeded/stampedes/stampeder/stampeded/stampeding", "walk", "strut/strutting/strutted/struts/strutter/strutted/strutting", "walk", "tiptoe/tiptoeing/tiptoed/tiptoes/tiptoer/tiptoed/tiptoeing", "walk", "sprint/sprinting/sprinted/sprints/sprinter/sprinted/sprinting", "walk", "gallop/galloping/galloped/gallops/galloper/galloped/galloping", "walk", "crawl/crawling/crawled/crawls/crawler/crawled/crawling", "walk", "trot/trotting/trotted/trots/trotter/trotted/trotting", "walk", "sleepwalk/sleepwalking/sleepwalked/sleepwalks/sleepwalker/sleepwalked/sleepwalking", "walk", "abduct/abducting/abducted/abducts/abductor/abducted/abduction", "abolish/abolishing/abolished/abolishes/abolisher/abolished/abolishment", "apprehend/apprehending/apprehended/apprehends/apprehender/apprehended/apprehension"],
	motion: [ "tremble/trembling/trembled/trembles/trembler/trembled/trembling", "motion", "waddle/waddling/waddled/woddles/woddler/waddled/waddling", "motion", "wiggle/wiggling/wiggled/wiggles/wiggler/wiggled/wiggling", "motion", "slam/slamming/slammed/slams/slammer/slammed/slamming", "motion", "kick/kicking/kicked/kicks/kicker/kicked/kicking", "motion", "smack/smacking/smacked/smacks/smacker/smacked/smacking", "motion", "stomp/stomping/stomped/stomps/stomper/stomped/stomping", "motion", "shoot/shooting/shot/shoots/shooter/shot/shooting", "motion", "screw/screwing/screwed/screws/screwer/screwed/screwing", "motion insert", "pump/pumping/pumped/pumps/pumper/pumped/pumping", "motion", "hack/hacking/hacked/hacks/hacker/hacked/hacking", "motion", "poke/poking/poked/pokes/poker/poked/poking", "motion insert", "crank/cranking/cranked/cranks/cranker/cranked/cranking", "motion", "serve/serving/served/serves/server/served/serving", "motion", "force/forcing/forced/forces/forcer/forced/forcing", "motion", "stick/sticking/stuck/sticks/sticker/stuck/sticking", "motion insert", "move/moving/moved/moves/mover/moved/moving", "motion", "bind/binding/bound/binds/binder/bound/binding", "motion", "staple/stapling/stapled/staples/stapler/stapled/stapling", "motion", "eject/ejecting/ejected/ejects/ejector/ejected/ejection", "motion", "crunch/crunching/crunched/crunches/cruncher/crunched/crunching", "motion", "squish/squishing/squished/squishes/squisher/squished/squishing", "motion", "prod/prodding/prodded/prods/prodder/prodded/prodding", "motion insert", "wedge/wedging/wedged/wedges/wedger/wedged/wedging", "motion insert", "blow/blowing/blew/blows/blower/blown/blowing", "motion", "knead/kneading/kneaded/kneads/kneader/kneaded/kneading", "motion", "twist/twisting/twisted/twists/twister/twisted/twisting", "motion", "throw/throwing/threw/throws/thrower/thrown/throwing", "motion", "fly/flying/flew/flies/flier/flown/flying", "motion", "shake/shaking/shook/shakes/shaker/shaken/shaking", "motion", "bang/banging/banged/bangs/banger/banged/banging", "motion", "press/pressing/pressed/presses/presser/pressed/pressing", "motion", "inject/injecting/injected/injects/injector/injected/injection", "motion insert", "slip/slipping/slipped/slips/slipper/slipped/slipping", "motion", "rip/ripping/ripped/rips/ripper/ripped/ripping", "motion", "twang/twanging/twanged/twangs/twanger/twanged/twanging", "motion", "cram/cramming/crammed/crams/crammer/crammed/cramming", "motion insert", "hurl/hurling/hurled/hurls/hurler/hurled/hurling", "motion", "lunge/lunging/lunged/lunges/lunger/lunged/lunging", "motion move", "jump/jumping/jumped/jumps/jumper/jumped/jumping", "motion move", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "motion transitive intransitive", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "motion sex transitive intransitive insert", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration", "motion move intransitive", "twerk/twerking/twerked/twerks/twerker/twerked/twerking", "motion intransitive"],
	pose: [ "stand/standing/stood/stands/stander/stood/standing", "pose intransitive", "sit/sitting/sat/sits/sitter/sat/sitting", "pose intransitive", "lay/laying/laid/lays/layer/laid/laying", "pose intransitive", "crouch/crouching/crouched/crouches/croucher/crouched/crouching", "pose intransitive", "squat/squatting/squatted/squats/squatter/squatted/squatting", "pose intransitive"]
};
dic.verb = verb;
	var verb_all= ["infest/infesting/infested/infests/infester/infested/infestation"].concat(verb.eat,verb.move,verb.insert,verb.sex,verb.intransitive,verb.liquid,verb.transitive,verb.political,verb.legal,verb.violent,verb.walk,verb.motion,verb.pose);
dic.verb.all=verb_all;

var verbimg ={
};
dic.verbimg = verbimg;
	var verbimg_all= ["shine/shining/shone/shines/shiner","gleam/gleaming/gleamed/gleams/gleamer","crumple/crumpling/crumpled/crumples/crumpler","sparkle/sparkling/sparkled/sparkles/sparkler","bloom/blooming/bloomed/blooms/bloomer","grow/growing/grew/grows/grower","shrink/shrinking/shrunk/shrinks/shrinker","glow/glowing/glowed/glows/glower","lighten/lightening/lightened/lightens/lightener","darken/darkening/darkened/darkens/darkener","steam/steaming/steamed/steams/steamer","flash/flashing/flashed/flashes/flasher","bubble/bubbling/bubbled/bubbles/bubbler","burn/burning/burned/burns/burner","flutter/fluttering/fluttered/flutters/flutterer","flap/flapping/flapped/flaps/flapper","ripple/rippling/rippled/ripples/rippler","smolder/smoldering/smoldered/smolders/smolderer","fizz/fizzing/fizzed/fizzes/fizzer","fester/festering/festered/festers/festerer","froth/frothing/frothed/froths/frother","rise/rising/rose/rises/riser","churn/churning/churned/churns/churner","shimmer/shimmering/shimmered/shimmers/shimmerer","blossom/blossoming/blossomed/blossoms/blossomer","wilt/wilting/wilted/wilts/wilter","twinkle/twinkling/twinkled/twinkles/twinkler","radiate/radiating/radiated/radiates/radiator","bloat/bloating/bloated/bloats/bloater","twist/twisting/twisted/twists/twister","wave/waving/waved/waves/waver","shudder/shuddering/shuddered/shudders/shudderer","shiver/shivering/shivered/shivers/shiverer","shake/shaking/shook/shakes/shaker","soften/softening/softened/softens/softener","harden/hardening/hardened/hardens/hardener","bleed/bleeding/bled/bleeds/bleeder","crack/cracking/cracked/cracks/cracker","blacken/blackening/blackened/blackens/blackener","whiten/whitening/whitened/whitens/whitener","wiggle/wiggling/wiggled/wiggles/wiggler"].concat();
dic.verbimg.all=verbimg_all;

var vocal ={
};
dic.vocal = vocal;
	var vocal_all= ["mmmmmm","oooh","uhhhm","eeeeeeee","oof","wow","ouch","yikes","ahhhh","ugh","eeek","ahem","aargh","boo hoo","ha ha ha","muahahaha"].concat();
dic.vocal.all=vocal_all;

var x ={
};
dic.x = x;
	var x_all= ["I'll be damned","bravo","geez","holy cow","good heavens","holy moley","ermahgerd","LOL","Bingo","ROFL","WTF","good lord","awesome","excellent","jolly good","this is the end","run for your lives","wicked","epic","damn","oh boy","boy oh boy oh boy","what in the world","what the hell","oh joy","woot","omgomgomg","no way","this can't be","mine eyes are deceiving me","gasp","oh my goodness","oh dear","oh my","dear me","dear dear","my my","my oh my","aw shucks","whoa","wow","oh wow","trololol","oho","oh glorious day","disgraceful","oh hell yes","hella good","hurrah","what","beautiful","ahhhhh mahh gahh","by golly","this is delicious","oh gog","K.O.","finish him","my leg","I'm gonna faint","alas","rats"].concat();
dic.x.all=x_all;

var yn ={
	yes: [ "yes", "yayaya", "yep", "yeppers", "definitely", "absolutely", "without a doubt", "indeed", "affirmative", "undoubtedly", "undeniably", "yes/yes", "hell yes", "ya", "certainly", "obviously", "oh yes"],
	no: [ "I couldn't agree more", "no", "definitely not", "absolutely not", "no way", "impossible", "negative", "nope", "hell no", "nooooo", "not at all", "certainly not", "obviously not", "oh no", "most certainly not", "there's no way"]
};
dic.yn = yn;

function SimpleRant() {


    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches, keyword, acceptedKeywords;
        var replacement = [], i=0;

        while (matches = regex.exec(input)) {


            //var input = "noun -long -animal";
            // We accept a number of keywords, and they all correlate to the entries in the DIC files
            // First, get the DIC keyword
            var re=new RegExp("\\w+","g");
            keyword = matches[1].match(re);
            // Match against valid keywords in valid_keys

            console.log("checking for existence of keyword "+keyword[0]+" in valid_keys");

            //if(valid_keys.indexOf(keyword[0]) != -1){
            //    console.log("valid keyword: "+keyword[0]+" ");
            //
            //    // Now we're ready to pass the keyword to the parser. It should
            //    // include the keyword and any modifiers
            //    var nresult = parseWords(this, keyword[0], keyword);
            //
            //    console.log(nresult);
            //    console.log("-------");
            //}


            // Below is the naive approach. It works, but it's neither elegant nor practical and
            // should be considered POC rather than production code.



            console.log("parsing using the old functions");

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
                if(!adjmatch) { adjmatch = true;
                    console.log("parsing adjective");
                    result = parseAdjective(this, matches[1], input, result); } }

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
var parseAdjective = function (rant, matched, input, result) {
    if(matched.match('adj(|.plural)$')) {
        replacement = [];
        var re = new RegExp( matched, 'g');
        i = result.match(re).length;
        var plural=0;
        if(matched.match('plural','g')){
            plural=1;
        }


        while (i > 0) {
            replacement.push(rant.getAdjective(plural));
            i--;
        }

        var re = new RegExp('<'+matched+'>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};



var parseAdverb = function (rant, matched, input, result) {
    if (matched.match('adv(|-emotion)(|-sexy)')) {
        replacement = [];
        var re;

        re = new RegExp(matched, 'g');
        i = result.match(re).length;

        while (i > 0) {
            if (matched.match('sexy', 'g')) {
                replacement.push(rant.getAdverbByType('sexy'));
            }
            else
            if (matched.match('emotion', 'g')) {
                replacement.push(rant.getAdverbByType('emotion'));

            } else {
                replacement.push(rant.getAdverb());
            }
            i--;
        }

        re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};


var parseColor = function (rant, matched, input, result) {
    if (matched.match('color(|.plural)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            replacement.push(rant.getColor(plural));
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};

var parseConjunction = function (rant, matched, input, result) {
    if (matched.match('conjunction$')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;

        while (i > 0) {
            replacement.push(rant.getCoordinatingConjunction());
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};

var parseExclamation = function (rant, matched, input, result) {
    if (matched.match('exclamation')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        //var plural = 0;
        //if (matched.match('plural', 'g')) {
        //    plural = 1;
        //}

        while (i > 0) {
            replacement.push(rant.getExclamation());
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};
var parseFace = function (rant, matched, input, result) {
    if (matched.match('face(|.d)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        //var plural = 0;


        while (i > 0) {
            if (matched.match('face.d', 'g')) {
                replacement.push(rant.getFacialExpressionVerbed());
            } else {
                replacement.push(rant.getFacialExpression());
            }
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};

var parseAmount = function (rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<amount\>/g).length;
    while (i > 0) {
        var str = rant.getAmount();
        if (str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<amount>/g, function () {
        return replacement[i++];
    });
    return result;
};

var parseNameMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<name-male\>/g).length;
    while (i > 0) {
        var str=rant.getNameMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<name-male>/g, function () {
        return replacement[i++];
    });
    return result;

};

var parseNameFemale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<name-female\>/g).length;
    while (i > 0) {
        var str=rant.getNameFemale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<name-female>/g, function () {
        return replacement[i++];
    });
    return result;

};
var parseNouns = function (rant, matched, input, result) {
    if (matched.match('noun.*')) {
        var re,replacement = [];
        re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            if (matched.match('animal', 'g')) {
                var str = rant.getNounByType('animal', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('tool', 'g')) {
                var str=rant.getNounByType('tool', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('surface', 'g')) {
                var str=rant.getNounByType('surface', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('furniture', 'g')) {
                var str=rant.getNounByType('furniture', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('round', 'g')) {
                var str=rant.getNounByType('round', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('body', 'g')) {
                var str=rant.getNounByType('body', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('liquid', 'g')) {
                var str=rant.getNounByType('liquid', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('insect', 'g')) {
                var str=rant.getNounByType('insect', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('clothes', 'g')) {
                var str=rant.getNounByType('clothes', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('plant', 'g')) {
                var str=rant.getNounByType('plant', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('person', 'g')) {
                var str=rant.getNounByType('person', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('long', 'g')) {
                var str=rant.getNounByType('long', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('ball', 'g')) {
                var str=rant.getNounByType('ball', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('article', 'g')) {
                var str=rant.getNounByType('article', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('drug', 'g')) {
                var str=rant.getNounByType('drug', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('fruit', 'g')) {
                var str=rant.getNounByType('fruit', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('container', 'g')) {
                var str=rant.getNounByType('container', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('instrument', 'g')) {
                var str=rant.getNounByType('instrument', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('sex', 'g')) {
                var str=rant.getNounByType('sex', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('job', 'g')) {
                var str=rant.getNounByType('job', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('weapon', 'g')) {
                var str=rant.getNounByType('weapon', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('hole', 'g')) {
                var str=rant.getNounByType('hole', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('food', 'g')) {
                var str=rant.getNounByType('food', plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('vehicle', 'g')) {
                var str = rant.getNounByType('vehicle', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else if (matched.match('shape', 'g')) {
                var str = rant.getNounByType('shape', plural);
                if (str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            } else {
                var str=rant.getNoun(plural);
                if(str.match(/\//)) str.split("/")[0];
                replacement.push(str);
            }

            i--;
        }


        re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};


var parsePronMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<pron.poss-male\>/g).length;
    while (i > 0) {
        var str=rant.getPossMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<pron.poss-male>/g, function () {
        return replacement[i++];
    });

    return result;

};

var parsePronFemale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<pron.poss-female\>/g).length;
    while (i > 0) {
        var str=rant.getPossFemale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<pron.poss-female>/g, function () {
        return replacement[i++];
    });

    return result;

};

var parseRelationship = function (rant, matched, input, result) {
    if (matched.match('rel(|.plural)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            replacement.push(rant.getRelationship(plural));
            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};
var parseTimeNoun = function (rant, matched, input, result) {
    if (matched.match('time(|-month)(|.plural)')) {
        replacement = [];
        var re = new RegExp(matched, 'g');
        i = result.match(re).length;
        var plural = 0;
        if (matched.match('plural', 'g')) {
            plural = 1;
        }

        while (i > 0) {
            if(matched == "time-month.plural"){
            replacement.push(rant.getTimeOfMonth(plural));
            }
            if(matched == "time-month"){
            replacement.push(rant.getTimeOfMonth(0));
            }
            if(matched == "time-dayofweek"){
            replacement.push(rant.getTimeDayOfWeek(plural));
            }
            if(matched == "time-dayofweek.plural"){
            replacement.push(rant.getTimeDayOfWeek(plural));
            }
            if(matched == "time"){
                replacement.push(rant.getTimeNoun(0));
            }
            if(matched == "time.plural"){
                replacement.push(rant.getTimeNoun(1));
            }

            i--;
        }

        var re = new RegExp('<' + matched + '>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};


var parseTitle = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<title\>/g).length;
    while (i > 0) {
        var str=rant.getTitle();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<title>/g, function () {
        return replacement[i++];
    });
    return result;

};

var parseTitleMale = function(rant, input, result) {
    var result;
    replacement = [];
    i = result.match(/\<title.male\>/g).length;
    while (i > 0) {
        var str=rant.getTitleMale();
        if(str.match(/\//)) str.split("/")[0];
        replacement.push(str);
        i--;
    }

    i = 0;
    result = result.replace(/\<title.male>/g, function () {
        return replacement[i++];
    });
    return result;

};
var parseVerb = function(rant, input, result) {
        if('undefined' == typeof matched) var matched=false;
        if(!matched) {
            var result;
            matched=true;
            replacement = [];
            i = result.match(/\<verb\>/g).length;
            while (i > 0) {
                replacement.push(rant.getVerb(0));
                i--;
            }

            i = 0;
            result = result.replace(/\<verb>/g, function () {
                return replacement[i++];
            });
            return result;
        }
};

var parseVerbTransitive = function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<verb-transitive\>/g).length;
        while (i > 0) {
            replacement.push(rant.getVerb(0));
            i--;
        }

        i = 0;
        result = result.replace(/\<verb-transitive>/g, function () {
            return replacement[i++];
        });
        return result;
    }
};

var parseVerbed= function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<verb.ed\>/g).length;
        while (i > 0) {
            replacement.push(rant.getVerb(2));
            i--;
        }

        i = 0;
        result = result.replace(/\<verb.ed>/g, function () {
            return replacement[i++];
        });
        return result;
    }
};

var parseWords = function (rant, keyword, matched) {
    var result;


    // matched[0] contains the keyword. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.

    // Let's check if there's any qualifiers or modifiers
    if(matched[0].length>1){
        // yes, there are. There are two classes. Filters and subs. Let's see what we got
        if(matched.length>1){
            matched.forEach(function(entry,idx) {
                if(idx>0){
                    if("undefined" != typeof filters[keyword]){
                        if(filters[keyword].indexOf(entry)>-1){
                        // this is valid and we apply it
                        console.log("valid filter: "+entry);
                        }
                    }
                    if("undefined" != typeof subs[keyword]){
                        if(subs[keyword].indexOf(entry)>-1){
                            // this is valid and we apply it
                            console.log("valid sub: "+entry);
                        }
                    }

                    // So.. now we got the keyword, the filters and the subs. Let's do some magic
                    dic[keyword]


                }
            });
            //console.log("matched length: "+matched.length);
        }


    }


    return matched;
    if(matched.match('adj(|.plural)$')) {
        replacement = [];
        var re = new RegExp( matched, 'g');
        i = result.match(re).length;
        var plural=0;
        if(matched.match('plural','g')){
            plural=1;
        }

        while (i > 0) {
            replacement.push(rant.getAdjective(plural));
            i--;
        }

        var re = new RegExp('<'+matched+'>', 'g');
        result = result.replace(re, function () {
            return replacement[i++];
        });
    }
    return result;
};



var parseYes = function(rant, input, result) {
        var result;
        replacement = [];
        i = result.match(/\<yes\>/g).length;
        while (i > 0) {
            var strYes=rant.getYes();
            if(strYes.match(/\//)) strYes.split("/")[0];
            replacement.push(strYes);
            i--;
        }

        i = 0;
        result = result.replace(/\<yes>/g, function () {
            return replacement[i++];
        });
        return result;

};

var parseNo = function(rant, input, result) {
    if('undefined' == typeof matched) var matched=false;
    if(!matched) {
        var result;
        matched=true;
        replacement = [];
        i = result.match(/\<no\>/g).length;
        while (i > 0) {
            var strNo=rant.getNo();
            if(strNo.match(/\//)) strNo.split("/")[0];
            replacement.push(strNo);
            i--;
        }

        i = 0;
        result = result.replace(/\<no>/g, function () {
            return replacement[i++];
        });
        return result;
    }
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


