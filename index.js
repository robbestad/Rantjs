(function () {

    var arrayMethods = {
//        /**
//         * Returns a shallow copy of this array
//         */
//        copy: function () {
//            return this.slice(0);
//        },
//
//        /**
//         * Returns true if this array contains 'element', returns false otherwise
//         */
//        contains: function (element) {
//            return this.indexOf(element) >= 0;
//        },
//
//
//        /**
//         * Returns a copy of this array, removing the elements
//         *         'from' index 'to' index within it
//         */
//        remove: function (from, to) {
//            var res = [];
//            var i = 0, j = 0;
//            for (i = 0; i < from; i++) {
//                res[i] = this[i];
//            }
//            j = i;
//            for (i = to; i < this.length; i++) {
//                res[j++] = this[i];
//            }
//            return res;
//        },
//
//        /**
//         * Returns a copy of this array, rotated 'n' places,
//         *     counterclockwise if 'n' is positive, clockwise otherwise
//         */
//        rotate: function (n) {
//            if (!n) return this.slice(0);
//            var length = this.length;
//            var res = new Array(length);
//            var thisIndex = (n > 0) ? n : length + n, i = 0, j = 0;
//            for (i = thisIndex; i < length; i++) {
//                res[j++] = this[i];
//            }
//            for (i = 0; i < thisIndex; i++) {
//                res[j++] = this[i];
//            }
//            return res;
//        },
//
//        /**
//         * Returns a copy of this array, removing but
//         *         the first 'n' elements from it
//         *         assumes n=1 when called with no arguments.
//         */
//        skipFirst: function (n) {
//            if (n === 'undefined') n = 1;
//            return this.slice(n);
//        },
//
//        /**
//         * Returns a copy of this array, removing
//         *         but the last 'n' elements from it
//         *         assumes n=1 when called with no arguments.
//         */
//        skipLast: function (n) {
//            if (n === 'undefined') n = 1;
//            if (n > this.length) return [];
//            return this.slice(0, this.length - n);
//        },
//
//        /**
//         * Returns a copy of this array,
//         *         sorting its elements randomly
//         */
//
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

function simpleRant() {


    var dic_adj=["sensible/sensibility","headless/headlessness","charitable/charitability","sociopathic/sociopathicness","ergonomic/ergonomicness","organic/organicness","regal/regalness","constitutional/constitutionalness","unconstitutional/unconstitutionalness","allnatural/allnaturalness","wholegrain/wholegraininess","Victorian/Victorianness","rustic/rusticness","luxurious/luxuriousness","invigorating/invigoratingness","tangy/tanginess","jazzy/jazziness","retro/retroness","ductile/ductileness","oldfashioned/oldfashionedness","flexible/flexibility","tender/tenderness","fabulous/fabulousness","fatherly/fatherliness","toasty/toastiness","mellow/mellowness","historical/historicalness","fragrant/fragrance","superfluous/superfluousness","squishy/squishiness","flappy/flappiness","slippy/slippiness","Confederate/Confederateness","slow/slowness","messy/messiness","holy/holiness","organized/order","nifty/niftiness","athletic/athleticness","juvenile/juvenileness","gallant/gallantness","corny/corniness","groovy/grooviness","weightless/weightlessness","rough/roughness","gourmet/gourmetness","deluxe/deluxeness","wholesome/wholesomeness","sweaty/sweatiness","soapy/soapiness","buttery/butteriness","religious/religiousness","righteous/righteousness","patriotic/patrioticness","spinetingling/tingliness","waddly/waddliness","wobbly/wobbliness","traditional/tradition","appetizing/appetizingness","strict/strictness","dreadful/dreadfulness","mythical/mythicalness","philosophical/philosophy","enticing/enticingness","offensive/offensiveness","luscious/lusciousness","bouncy/bounciness","plentiful/plentifulness","majorleague/majorleagueness","significant/significance","expressive/expression","cuddly/cuddliness","nude/nudity","rude/rudeness","political/politicalness","creative/creativity","sinful/sin","glorious/gloriousness","merciful/mercy","forgiving/forgiveness","smart/smartness","salty/saltiness","peppery/pepperiness","slurpee/slurpiness","criminal/criminality","domestic/domesticness","meaningful/meaning","manly/manliness","barbeque/barbequeness","casual/casualness","standard/standardness","nasty/nastiness","exquisite/exquisiteness","bold/boldness","proper/properness","fresh/freshness","informative/informativeness","jiggly/jiggliness","rebellious/rebelliousness","direful/direfulness","soothing/soothingness","disloyal/disloyalty","loyal/loyalty","victorious/victory","deep/depth","zen/zenness","royal/royalty","delightful/delightfulness","yummy/yumminess","refreshing/refreshingness","pleasurable/pleasurability","delectable/delectableness","intense/intensity","ghetto/ghettoness","strange/strangeness","odd/oddness","wasted/wastedness","eccentric/eccentricity","satisfactory/satisfaction","pharmaceutical/pharmaceuticalness","fishy/fishiness","jellybelly/jellybellyness","exotic/exoticness","queer/queerness","outlandish/outlandishness","alien/alienness","seductive/seductiveness","superb/superbness","divine/divinity","celestial/celestial power","vibrating/vibration","wet/moisture","silly/silliness","spidery/spideriness","legitimate/legitimacy","flavorful/flavor","savory/flavor","silky/silkiness","slammin/worth","slimy/sliminess","impressive/impressiveness","appealing/appeal","revolting/revoltingness","captivating/captivation","amazing/amazingness","masculine/masculinity","gelatinous/gelatinous goodness","disjointed/disjointedness","veiny/veininess","tropical/tropicalness","rockhard/rockhardness","steamy/steaminess","lumpy/lumpiness","swift/lightning speed","long/longness","large/largeness","small/smallness","frosty/frostiness","glassy/glassiness","hard/hardness","formal/formality","blue/blueness","soft/softness","moist/moisture","smooth/smoothness","torturous/torturousness","wellused/thoroughness","wellloved/sweet love","shiny/shininess","sleek/sleekness","greasy/grasiness","hairy/hairiness","splintered/splinters","dreamy/dreaminess","spicy/spiciness","terrible/terror","throbbing/throbbing pleasure","fluttering/lightweightedness","mysterious/mystery","velvety/velvety goodness","dangerous/danger","metallic/luster","skinny/skininess","fat/fatness","painful/pain","oozing/excretory wetness","flaming/fire","exploding/explosiveness","wild/wildness","rambunctious/wildness","sizzling/fizzly shizzliness","perfect/perfection","raunchy/raunchiness","romantic/romance","young/youth","old/age","bloodthirsty/bloodthirstiness","fleshy/fleshiness","warm/warmth","cold/coldness","icy/iciness","electric/electricity","sharp/sharpness","deadly/deadliness","pulsating/pumpiness","bloody/bloodiness","pregnant/pregnancy","bulging/bulges","stretchy/stretchiness","creamy/creaminess","lovely/loveliness","grainy/graininess","rocky/rockiness","grassy/grassiness","musical/music","outstanding/amazement","identical/identity","famous/fame","cheerful/cheer","livid/anger","obstinate/stubbornness","exhausted/fatigue","graceful/grace","outrageous/outrage","radical/radishes","childish/immaturity","snobbish/snobbishness","miserly/misery","amiable/phallus","disgusting/disgust","awful/terror","humorous/humor","fanciful/fancy","pathetic/lameness","bashful/bashfulness","freaky/freakiness","chilly/chill","stormy/storminess","humid/humidity","bountiful/bountifulness","jubilant/happiness","irritated/anger","patient/patience","dizzy/dizziness","skeptical/skepticism","puzzled/confusion","lighthearted/lightheartedness","perplexed/confusion","overwhelmed/domination","jovial/cheer","hyper/energy","squirrely/furriness","jittery/jitteriness","sensational/sensationalism","elegant/elegance","flabbergasted/confusion","dreary/dreariness","impish/impishness","sneaky/sneakiness","horrid/horridness","monsterous/largeness","acidic/acidity","acoustic/loudness","active/activity","adaptable/adaptability","aggressive/agressiveness","additional/extra cheese","adequate/adequacy","administrative/domination","advantageous/advantage","advisable/wisdom","extreme/extremity","hardcore/hardcoreness","snappy/snappiness","scary/scariness","immense/immensity","woody/woodiness","dominant/dominance","submissive/submissiveness","pitiful/pity","sickening/sickness","questionable/questionability","intriguing/interest","fantastic/fantasticness","thrilling/thrill","tactical/tacticalness","drooling/sliminess","epic/epicness","succulant/deliciousness","slick/slickness","damp/dampness","explosive/explosiveness","flammable/flammability","watertight/virginity","watery/wateriness","heavy/heaviness","disagreeable/disagreement","keen/keenness","fertile/fertility","sterile/sterility","distorted/distortion","itchy/itchiness","fruity/fruitiness","hazardous/hazardousness","troubling/trouble","critical/criticalness","treacherous/treachery","speculative/speculation","menacing/menace","threatening/intimidation","ticklish/ticklishness","vulnerable/vulnerability","wicked/wickedness","formidable/formidableness","brave/bravery","supple/softness","splendid/splendidness","nutritious/nutrition","melodic/melodicness","infectious/infectiousness","sticky/stickiness","magnificent/magnificence","fantastical/fantasticness","incredible/incredibility","unbelievable/falseness","shocking/shock","horrifying/horror","unstable/instability","funny/humorousness","delicious/deliciousness","tasty/tastiness","fingerlicking/fingerlickingness","super/superness","juicy/juiciness","drippy/drippiness","dripping/drippingness","defiant/defiance","resonant/resonance","crackly/crackliness","highflying/aerodynamics","wavy/waviness","nutty/nuttiness","insane/insanity","unpleasant/unpleasant nature","inadvisable/inadvisable nature","pleasant/pleasant nature","sandy/sandiness","stinky/stinkiness","dead/deadness","honest/honesty","trustworthy/trustworthiness","profitable/proifitability","essential/essentialness","courageous/courage","charming/charm","beloved/belovedness","marvelous/marvelousness","breathtaking/breathtakingness","surprising/surprise","awesome/awesomeness","zesty/zestiness","astounding/astoundingness","lubricated/lubrication","stimulating/stimulus","clever/cleverness","magical/magic","harmless/harmlessness","gentle/gentleness","raging/rage","noisy/noisiness","passionate/passion","interracial/interracialness","chromeplated/chromeplatedness","ripped/wear","tattered/wear","heinous/heinousness","shady/shadiness","corrugated/corrugation","hulking/hulkingness","jagged/jaggedness","ratty/rattiness","stout/stoutness","whopping/whoppingness","humongous/humongousness","mammoth/mammothness","enormous/enormousness","colossal/colossality","monochromatic/monochromaticness","grimy/griminess","funnylooking/funny looks","gigantic/impressive size","limp/limpness","naked/nakedness","revealing/nakedness","pretty/prettiness","grey/greyness","microscopic/microscopicness","bearded/beardedness","floppy/floppiness","fluffy/fluffiness","dirty/dirt","petite/petiteness","sloppy/sloppiness","wide/wideness","slippery/slipperiness","sopping/wetness","slender/slenderness","dry/dryness","lickable/lickability","wooly/wooliness","colorful/color","mossy/mossiness","transparent/transparence","narrow/narrowness","glossy/glossiness","ancient/ancience","wrinkly/raisins","shriveled/raisins","plump/plumpness","green/greenness","brown/brownness","red/redness","white/whiteness","black/blackness","spiky/spikiness","thick/thickness","furry/furriness","fuzzy/fuzziness","wooden/woodness","bubbly/bubbliness","foamy/foaminess","smoky/smokiness","battered/batteredness","ugly/ugliness","glamourous/glamour","attractive/attractiveness","smoggy/smogginess","sparkling/sparkle","spotless/cleanliness","wideeyed/wideness","cubic/cubic shape","symmetrical/symmetry","orbital/roundness","exposed/exposure","redhot/glowingred heat","bent/deformation","crooked/crookedness","uneven/unevenness","delicate/delicateness","moldy/moldiness","crusty/crustiness","filthy/filth","muscular/beefiness","glittery/glitter","purple/purpleness","ragged/raggedness","weedy/weediness","papery/paperiness","dazzling/sparkle","blinding/brightness","beautiful/beauty","windy/windiness","dusty/dustiness","short/shortness","tall/height","menthol/menthol goodness","Spanish/Spanish heritage","French/French heritage","German/German heritage","Italian/Italian heritage","Japanese/Japanese heritage","Chinese/Chinese heritage","Korean/Korean heritage","British/British heritage","African/African heritage","American/American heritage","Norwegian/Norwegian heritage","Russian/Russian heritage","Irish/Irish heritage","Mexican/Mexican heritage","Canadian/Canadian heritage","Australian/Australian heritage","severe/severity","sullen/sullenness","naughty/naughtiness","devilish/devilishness","arrogant/arrogance","indifferent/indifference","cranky/crankiness","bittersweet/bittersweetness","jealous/envy","gay/gayness","thankful/thankfulness","groggy/grogginess","flirty/flirtiness","frightened/fright","evil/evil","cheeky/cheekiness","emo/emoness","gleeful/glee","joyful/joy","happy/happiness","bored/boredom","sorrowful/sorrow","sad/sadness","angry/anger","rageing/rage","guilty/guilt","envious/envy","blissful/bliss","interested/interest","smug/smugness","proud/pride","hungry/hunger","ashamed/shame","loving/love","mad/madness","hateful/hate","humiliated/humility","impatient/impatience","surprised/surprise","optimistic/optimism","disappointed/disappointment","remorseful/remorse","contemptuous/contempt","awed/awe","lustful/lust","longing/longing","content/contentfulness","pleasured/pleasure","tormented/torment","horrified/horror","shocked/shock","furious/fury","sly/slyness","sunny/sunniness","rainy/raininess","cloudy/cloudiness","snowy/snowiness","moonlit/moonlight","starry/starriness","foggy/fogginess","crapulous/crapulousness","feckless/fecklessness","peckish/peckishness","comely/comeliness","bilious/biliousness","serene/serenity","emaciated/emaciation","AfricanAmerican/AfricanAmericanness","delinquent/delinquency","aggravated/aggression","dashing/dashingness","considerate/consideration","busted/bustedness","iridescent/iridescence","golden/golden luster","spontaneous/spontaneity","daring/dare","radioactive/radioactivity","poisonous/toxicity","savage/savageness","terrifying/scariness","unlikely/unlikelihood","speedy/speediness","indestructible/involunurability","invisible/invisibility","odorous/odor","penetrative/penetrative power","immaculate/immaculateness","rowdy/rowdiness","rational/rationality","irrational/irrationality","blasphemous/blasphemy","cooperative/cooperation","professional/professionalism","punctual/punctuality","festive/festiveness","polluted/pollution","potent/potency","powdery/powderiness","powerful/power","piggy/pigginess","assertive/assetiveness","ethical/ethicalness","tightlipped/tight lips","firm/firmness","unethical/unethicalness","highbrow/highbrowness","scholarly/scholarliness","academic/academicness","sophisticated/sophistication","intelligent/intelligence","intellectual/intellect","cultural/culture","popular/popularity","furrowed/furrowedness","illiterate/illiteracy","educated/education","durable/durability","sublime/sublimeness","ambitious/ambition","familyfriendly/familyfriendliness","contaminated/contamination","unfortunate/misfortune","fortunate/fortune","absolute/absoluteness","logical/logical","frictional/friction","creamfilled/creaminess","malleable/malleability","fast/speed","squeamish/squeamishness","unlimited/unlimitedness","gassy/gassiness","edgy/edginess","artsy/artsiness","feasible/feasibility","infeasible/infeasibility","possible/possibility","potential/potential","intentional/intention","dumb/dumbness","disorganized/disorder","irregular/irregularity","certified/certification","sure/sureness","complimentary/complimentariness","supplementary/supplementariness","derogatory/derogatoriness","scornful/scorn","gross/grossness","erect/erectness","flaccid/flaccidness","sexy/sex appeal","ravishing/rocksolid arousal","horny/horniness","kinky/kinkiness","trashy/trashiness","sexual/sexuality"];
    var dic_adj_weather = ["sunny/sunniness", "rainy/raininess", "cloudy/cloudiness", "snowy/snowiness", "moonlit/moonlight", "starry/starriness", "foggy/fogginess"];
    var dic_adj_emotion = ["severe/severity", "sullen/sullenness", "naughty/naughtiness", "devilish/devilishness", "arrogant/arrogance", "indifferent/indifference", "cranky/crankiness", "bittersweet/bittersweetness", "jealous/envy", "gay/gayness", "thankful/thankfulness", "groggy/grogginess", "flirty/flirtiness", "frightened/fright", "evil/evil", "cheeky/cheekiness", "emo/emoness", "gleeful/glee", "joyful/joy", "happy/happiness", "bored/boredom", "sorrowful/sorrow", "sad/sadness", "angry/anger", "rageing/rage", "guilty/guilt", "envious/envy", "blissful/bliss", "interested/interest", "smug/smugness", "proud/pride", "hungry/hunger", "ashamed/shame", "loving/love", "mad/madness", "hateful/hate", "humiliated/humility", "impatient/impatience", "surprised/surprise", "optimistic/optimism", "disappointed/disappointment", "remorseful/remorse", "contemptuous/contempt", "awed/awe", "lustful/lust", "longing/longing", "content/contentfulness", "pleasured/pleasure", "tormented/torment", "horrified/horror", "shocked/shock", "furious/fury", "sly/slyness", "aggravated/aggression", "dashing/dashingness", "considerate/consideration", "busted/bustedness"];
    var dic_adj_nationality = ["Spanish/Spanish heritage", "French/French heritage", "German/German heritage", "Italian/Italian heritage", "Japanese/Japanese heritage", "Chinese/Chinese heritage", "Korean/Korean heritage", "British/British heritage", "African/African heritage", "American/American heritage", "Norwegian/Norwegian heritage", "Russian/Russian heritage", "Irish/Irish heritage", "Mexican/Mexican heritage", "Canadian/Canadian heritage", "Australian/Australian heritage", "AfricanAmerican/AfricanAmericanness", "delinquent/delinquency"];
    var dic_adj_appearance = ["sweaty/sweatiness", "soapy/soapiness", "buttery/butteriness", "religious/religiousness", "righteous/righteousness", "patriotic/patrioticness", "spinetingling/tingliness", "waddly/waddliness", "wobbly/wobbliness", "traditional/tradition", "appetizing/appetizingness", "strict/strictness", "dreadful/dreadfulness", "mythical/mythicalness", "philosophical/philosophy", "enticing/enticingness", "offensive/offensiveness", "luscious/lusciousness", "bouncy/bounciness", "plentiful/plentifulness", "majorleague/majorleagueness", "significant/significance", "expressive/expression", "cuddly/cuddliness", "nude/nudity", "rude/rudeness", "political/politicalness", "creative/creativity", "sinful/sin", "glorious/gloriousness", "merciful/mercy", "forgiving/forgiveness", "smart/smartness", "salty/saltiness", "peppery/pepperiness", "slurpee/slurpiness", "criminal/criminality", "domestic/domesticness", "meaningful/meaning", "manly/manliness", "barbeque/barbequeness", "casual/casualness", "standard/standardness", "nasty/nastiness", "exquisite/exquisiteness", "bold/boldness", "proper/properness", "fresh/freshness", "informative/informativeness", "jiggly/jiggliness", "rebellious/rebelliousness", "direful/direfulness", "soothing/soothingness", "disloyal/disloyalty", "loyal/loyalty", "victorious/victory", "deep/depth", "zen/zenness", "royal/royalty", "delightful/delightfulness", "yummy/yumminess", "refreshing/refreshingness", "pleasurable/pleasurability", "delectable/delectableness", "intense/intensity", "ghetto/ghettoness", "strange/strangeness", "odd/oddness", "wasted/wastedness", "eccentric/eccentricity", "satisfactory/satisfaction", "pharmaceutical/pharmaceuticalness", "fishy/fishiness", "jellybelly/jellybellyness", "exotic/exoticness", "queer/queerness", "outlandish/outlandishness", "alien/alienness", "seductive/seductiveness", "superb/superbness", "divine/divinity", "celestial/celestial power", "vibrating/vibration", "wet/moisture", "silly/silliness", "spidery/spideriness", "legitimate/legitimacy", "flavorful/flavor", "savory/flavor", "silky/silkiness", "slammin/worth", "slimy/sliminess", "impressive/impressiveness", "appealing/appeal", "revolting/revoltingness", "captivating/captivation", "amazing/amazingness", "masculine/masculinity", "gelatinous/gelatinous goodness", "disjointed/disjointedness", "veiny/veininess", "tropical/tropicalness", "rockhard/rockhardness", "steamy/steaminess", "lumpy/lumpiness", "swift/lightning speed", "long/longness", "large/largeness", "small/smallness", "frosty/frostiness", "glassy/glassiness", "hard/hardness", "formal/formality", "blue/blueness", "soft/softness", "moist/moisture", "smooth/smoothness", "torturous/torturousness", "wellused/thoroughness", "wellloved/sweet love", "shiny/shininess", "sleek/sleekness", "greasy/grasiness", "hairy/hairiness", "splintered/splinters", "dreamy/dreaminess", "spicy/spiciness", "terrible/terror", "throbbing/throbbing pleasure", "fluttering/lightweightedness", "mysterious/mystery", "velvety/velvety goodness", "dangerous/danger", "metallic/luster", "skinny/skininess", "fat/fatness", "painful/pain", "oozing/excretory wetness", "flaming/fire", "exploding/explosiveness", "wild/wildness", "rambunctious/wildness", "sizzling/fizzly shizzliness", "perfect/perfection", "raunchy/raunchiness", "romantic/romance", "young/youth", "old/age", "bloodthirsty/bloodthirstiness", "fleshy/fleshiness", "warm/warmth", "cold/coldness", "icy/iciness", "electric/electricity", "sharp/sharpness", "deadly/deadliness", "pulsating/pumpiness", "bloody/bloodiness", "pregnant/pregnancy", "bulging/bulges", "stretchy/stretchiness", "creamy/creaminess", "lovely/loveliness", "grainy/graininess", "rocky/rockiness", "grassy/grassiness", "musical/music", "outstanding/amazement", "identical/identity", "famous/fame", "cheerful/cheer", "livid/anger", "obstinate/stubbornness", "exhausted/fatigue", "graceful/grace", "outrageous/outrage", "radical/radishes", "childish/immaturity", "snobbish/snobbishness", "miserly/misery", "amiable/phallus", "disgusting/disgust", "awful/terror", "humorous/humor", "fanciful/fancy", "pathetic/lameness", "bashful/bashfulness", "freaky/freakiness", "chilly/chill", "stormy/storminess", "humid/humidity", "bountiful/bountifulness", "jubilant/happiness", "irritated/anger", "patient/patience", "dizzy/dizziness", "skeptical/skepticism", "puzzled/confusion", "lighthearted/lightheartedness", "perplexed/confusion", "overwhelmed/domination", "jovial/cheer", "hyper/energy", "squirrely/furriness", "jittery/jitteriness", "sensational/sensationalism", "elegant/elegance", "flabbergasted/confusion", "dreary/dreariness", "impish/impishness", "sneaky/sneakiness", "horrid/horridness", "monsterous/largeness", "acidic/acidity", "acoustic/loudness", "active/activity", "adaptable/adaptability", "aggressive/agressiveness", "additional/extra cheese", "adequate/adequacy", "administrative/domination", "advantageous/advantage", "advisable/wisdom", "extreme/extremity", "hardcore/hardcoreness", "snappy/snappiness", "scary/scariness", "immense/immensity", "woody/woodiness", "dominant/dominance", "submissive/submissiveness", "pitiful/pity", "sickening/sickness", "questionable/questionability", "intriguing/interest", "fantastic/fantasticness", "thrilling/thrill", "tactical/tacticalness", "drooling/sliminess", "epic/epicness", "succulant/deliciousness", "slick/slickness", "damp/dampness", "explosive/explosiveness", "flammable/flammability", "watertight/virginity", "watery/wateriness", "heavy/heaviness", "disagreeable/disagreement", "keen/keenness", "fertile/fertility", "sterile/sterility", "distorted/distortion", "itchy/itchiness", "fruity/fruitiness", "hazardous/hazardousness", "troubling/trouble", "critical/criticalness", "treacherous/treachery", "speculative/speculation", "menacing/menace", "threatening/intimidation", "ticklish/ticklishness", "vulnerable/vulnerability", "wicked/wickedness", "formidable/formidableness", "brave/bravery", "supple/softness", "splendid/splendidness", "nutritious/nutrition", "melodic/melodicness", "infectious/infectiousness", "sticky/stickiness", "magnificent/magnificence", "fantastical/fantasticness", "incredible/incredibility", "unbelievable/falseness", "shocking/shock", "horrifying/horror", "unstable/instability", "funny/humorousness", "delicious/deliciousness", "tasty/tastiness", "fingerlicking/fingerlickingness", "super/superness", "juicy/juiciness", "drippy/drippiness", "dripping/drippingness", "defiant/defiance", "resonant/resonance", "crackly/crackliness", "highflying/aerodynamics", "wavy/waviness", "nutty/nuttiness", "insane/insanity", "unpleasant/unpleasant nature", "inadvisable/inadvisable nature", "pleasant/pleasant nature", "sandy/sandiness", "stinky/stinkiness", "dead/deadness", "honest/honesty", "trustworthy/trustworthiness", "profitable/proifitability", "essential/essentialness", "courageous/courage", "charming/charm", "beloved/belovedness", "marvelous/marvelousness", "breathtaking/breathtakingness", "surprising/surprise", "awesome/awesomeness", "zesty/zestiness", "astounding/astoundingness", "lubricated/lubrication", "stimulating/stimulus", "clever/cleverness", "magical/magic", "harmless/harmlessness", "gentle/gentleness", "raging/rage", "noisy/noisiness", "passionate/passion", "interracial/interracialness", "chromeplated/chromeplatedness", "ripped/wear", "tattered/wear", "heinous/heinousness", "shady/shadiness", "corrugated/corrugation", "hulking/hulkingness", "jagged/jaggedness", "ratty/rattiness", "stout/stoutness", "whopping/whoppingness", "humongous/humongousness", "mammoth/mammothness", "enormous/enormousness", "colossal/colossality", "monochromatic/monochromaticness", "grimy/griminess", "funnylooking/funny looks", "gigantic/impressive size", "limp/limpness", "naked/nakedness", "revealing/nakedness", "pretty/prettiness", "grey/greyness", "microscopic/microscopicness", "bearded/beardedness", "floppy/floppiness", "fluffy/fluffiness", "dirty/dirt", "petite/petiteness", "sloppy/sloppiness", "wide/wideness", "slippery/slipperiness", "sopping/wetness", "slender/slenderness", "dry/dryness", "lickable/lickability", "wooly/wooliness", "colorful/color", "mossy/mossiness", "transparent/transparence", "narrow/narrowness", "glossy/glossiness", "ancient/ancience", "wrinkly/raisins", "shriveled/raisins", "plump/plumpness", "green/greenness", "brown/brownness", "red/redness", "white/whiteness", "black/blackness", "spiky/spikiness", "thick/thickness", "furry/furriness", "fuzzy/fuzziness", "wooden/woodness", "bubbly/bubbliness", "foamy/foaminess", "smoky/smokiness", "battered/batteredness", "ugly/ugliness", "glamourous/glamour", "attractive/attractiveness", "smoggy/smogginess", "sparkling/sparkle", "spotless/cleanliness", "wideeyed/wideness", "cubic/cubic shape", "symmetrical/symmetry", "orbital/roundness", "exposed/exposure", "redhot/glowingred heat", "bent/deformation", "crooked/crookedness", "uneven/unevenness", "delicate/delicateness", "moldy/moldiness", "crusty/crustiness", "filthy/filth", "muscular/beefiness", "glittery/glitter", "purple/purpleness", "ragged/raggedness", "weedy/weediness", "papery/paperiness", "dazzling/sparkle", "blinding/brightness", "beautiful/beauty", "windy/windiness", "dusty/dustiness", "short/shortness", "tall/height", "menthol/menthol goodness", "emaciated/emaciation", "iridescent/iridescence", "golden/golden luster", "spontaneous/spontaneity", "daring/dare", "radioactive/radioactivity", "poisonous/toxicity", "savage/savageness", "terrifying/scariness", "unlikely/unlikelihood", "speedy/speediness", "indestructible/involunurability", "invisible/invisibility", "odorous/odor", "penetrative/penetrative power", "immaculate/immaculateness", "rowdy/rowdiness", "rational/rationality", "irrational/irrationality", "blasphemous/blasphemy", "cooperative/cooperation", "professional/professionalism", "punctual/punctuality", "festive/festiveness", "polluted/pollution", "potent/potency", "powdery/powderiness", "powerful/power", "piggy/pigginess", "assertive/assetiveness", "ethical/ethicalness", "tightlipped/tight lips", "firm/firmness", "unethical/unethicalness", "highbrow/highbrowness", "scholarly/scholarliness", "academic/academicness", "sophisticated/sophistication", "intelligent/intelligence", "intellectual/intellect", "cultural/culture", "popular/popularity", "furrowed/furrowedness", "illiterate/illiteracy", "educated/education", "durable/durability", "sublime/sublimeness", "ambitious/ambition", "familyfriendly/familyfriendliness", "contaminated/contamination", "unfortunate/misfortune", "fortunate/fortune", "absolute/absoluteness", "logical/logical", "frictional/friction", "creamfilled/creaminess", "malleable/malleability", "fast/speed", "squeamish/squeamishness", "unlimited/unlimitedness", "gassy/gassiness", "edgy/edginess", "artsy/artsiness", "feasible/feasibility", "infeasible/infeasibility", "possible/possibility", "potential/potential", "intentional/intention", "dumb/dumbness", "disorganized/disorder", "irregular/irregularity", "certified/certification", "sure/sureness", "complimentary/complimentariness", "supplementary/supplementariness", "derogatory/derogatoriness", "scornful/scorn", "gross/grossness", "erect/erectness", "flaccid/flaccidness", "sexy/sex appeal", "ravishing/rocksolid arousal", "horny/horniness", "kinky/kinkiness", "trashy/trashiness"];
    dic_adj = dic_adj.concat(dic_adj_weather,dic_adj_emotion,dic_adj_nationality,dic_adj_appearance);
    var dic_adv=["gloriously","majestically","sarcastically","obscenely","unbelievably","royally","buoyantly","comfortably","justly","continually","bitterly","accidentally","absentmindedly","generously","coaxingly","faithfully","explosively","spontaneously","magestically","kindly","fiercely","strongly","fervently","genuinely","wholeheartedly","honestly","truly","keenly","rashly","stubbornly","persistently","firmly","purposefully","strictly","weakly","sharply","intensively","solemnly","determinedly","lightly","gravely","deeply","earnestly","animatedly","ardently","carefully","diligently","hastily","laboriously","restlessly","speedily","spiritedly","strenuously","vigilantly","fearlessly","sluggishly","densely","closely","rebelliously","thirstily","meekly","mildly","modestly","calmly","discreetly","silently","greatly","intently","nimbly","vigorously","actively","readily","rapidly","promptly","efficiently","merrily","briskly","stealthily","forgivingly","mercifully","awkwardly","coldly","joyfully","urgently","adventurously","indubitably","beautifully","hatefully","wisely","blissfully","terribly","bravely","sympathetically","suspiciously","intensely","crossly","mysteriously","singlehandedly","naturally","ferociously","heavily","dreamily","loudly","effortlessly","wetly","peacefully","daintily","snugly","crunchily","ticklishly","pointedly","noisily","wildly","enthusiastically","elegantly","energetically","busily","quickly","slickly","saggingly","quietly","defiantly","inappropriately","immediately","torturously","hurriedly","formally","courageously","with haste","excitedly","thickly","boldly","proudly","deliciously","fleetingly","secretly","violently","appreciatively","thoughtlessly","carelessly","smartly","delicately","sloppily","slimily","anally","eagerly","brightly","correctly","smoothly","slowly","lovingly","forcibly","up and down","side to side","romantically","hungrily","sweetly","roughly","delightedly","happily","gladly","grudgingly","arrogantly","sadly","frantically","greedily","cautiously","hollowly","enviously","angrily","warily","shamefully","gleefully","grumpily","anxiously","regretfully","patiently","evilly","terrifyingly","curiously","intentionally","deliberately","magically","necessarily","unnecessarily","fluidly","expertly","professionally","partially","intuitively","artfully","thoroughly","illegally","mortally","harmonically","objectively","cooly","casually","perfectly","imperfectly","victoriously","grandly","richly","heartily","musically","to kingdom come","methodically","nonchalantly","systematically","recklessly","neatly"];
    var dic_adv_emotion = ["happily", "gladly", "grudgingly", "arrogantly", "sadly", "frantically", "greedily", "cautiously", "hollowly", "enviously", "angrily", "warily", "shamefully", "gleefully", "grumpily", "anxiously", "regretfully", "patiently", "evilly", "terrifyingly", "curiously", "intentionally", "deliberately", "magically", "necessarily", "unnecessarily", "fluidly", "expertly", "professionally", "partially", "intuitively", "artfully", "thoroughly", "illegally", "mortally", "harmonically", "objectively", "cooly", "casually", "perfectly", "imperfectly", "victoriously", "grandly", "richly", "heartily", "musically", "to kingdom come", "methodically", "nonchalantly", "systematically", "recklessly"];
    var dic_adv_sexy = ["smoothly", "slowly", "lovingly", "forcibly", "up and down", "side to side", "romantically", "hungrily", "sweetly", "roughly", "delightedly"];
    dic_adv = dic_adv.concat(dic_adv_emotion,dic_adv_sexy);
    var dic_color=["red/reddish","green/greenish","blue/bluish","cyan/cyanish","magenta/magentaish","yellow/yellowish","orange/orangish","purple/purplish","turquoise/turquoiseish","pink/pinkish","grey/greyish","black/blackish","white/whitish","brown/brownish","lime green/limegreenish","lavender/lavenderish","maroon/maroonish","gold/goldish","silver/silverish","crimson/crimsonish"];
    var dic_color_secondary = ["cyan/cyanish", "magenta/magentaish", "yellow/yellowish", "orange/orangish", "purple/purplish", "turquoise/turquoiseish", "pink/pinkish", "grey/greyish", "black/blackish", "white/whitish", "brown/brownish", "lime green/limegreenish", "lavender/lavenderish", "maroon/maroonish", "gold/goldish", "silver/silverish"];
    var dic_color_primary = ["red/reddish", "green/greenish", "blue/bluish"];
    dic_color = dic_color.concat(dic_color_secondary,dic_color_primary);
    var dic_conj=["and","or","but","nor","for","yet","so"];
    dic_conj = dic_conj.concat();
    var dic_country=["Afghanistan","Akrotiri","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Ashmore and Cartier Islands","Australia","Austria","Azerbaijan","The Bahamas","Bahrain","Bangladesh","Barbados","Bassas da India","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burma","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Clipperton Island","Cocos Islands","Colombia","Comoros","Democratic Republic of the Congo","Republic of the Congo","Cook Islands","Coral Sea Islands","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Dhekelia","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","The Gambia","Gaza Strip","Georgia","Germany","Ghana","Gibraltar","Glorioso Islands","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","GuineaBissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Jan Mayen","Japan","Jersey","Jordan","Juan de Nova Island","Kazakhstan","Kenya","Kiribati","North Korea","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Federated States of Micronesia","Moldova","Monaco","Mongolia","Montserrat","Morocco","Mozambique","Namibia","Nauru","Navassa Island","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paracel Islands","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Spain","Spratly Islands","Sri Lanka","Sudan","Suriname","Svalbard","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","TimorLeste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tromelin Island","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
    var dic_country_mediterranean = ["Akrotiri", "Cyprus", "Czech Republic"];
    var dic_country_caribbean = ["Cuba", "Dominica", "Dominican Republic", "Ecuador", "Jamaica", "Jan Mayen"];
    var dic_country_oceania = ["Australia", "Guam", "Indonesia", "New Zealand", "Papua New Guinea", "Paracel Islands", "Paraguay", "Philippines", "Pitcairn Islands", "Samoa", "San Marino", "Sao Tome and Principe", "Solomon Islands"];
    var dic_country_eurasia = ["Russia"];
    var dic_country_africa = ["Democratic Republic of the Congo", "Republic of the Congo", "Cook Islands", "Coral Sea Islands", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Europa Island", "Falkland Islands", "Faroe Islands", "Fiji", "Ghana", "Gibraltar", "Glorioso Islands", "Kenya", "Kiribati", "Libya", "Liechtenstein", "Madagascar", "Malawi", "Morocco", "Mozambique", "Namibia", "Nauru", "Navassa Island", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Rwanda", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Sudan", "Suriname", "Svalbard", "Swaziland"];
    var dic_country_middleeast = ["Afghanistan", "Iran", "Iraq", "Israel", "Pakistan", "Palau", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Syria", "United Arab Emirates"];
    var dic_country_southamerica = ["Argentina", "Armenia", "Aruba", "Ashmore and Cartier Islands", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Chile", "Colombia", "Comoros", "Peru"];
    var dic_country_asia = ["Afghanistan", "Cambodia", "Cameroon", "China", "Christmas Island", "Clipperton Island", "Cocos Islands", "Hong Kong", "India", "Indonesia", "Japan", "Jersey", "Jordan", "Juan de Nova Island", "Kazakhstan", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mongolia", "Montserrat", "Nepal", "Russia", "Singapore", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "TimorLeste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tromelin Island", "Tunisia"];
    var dic_country_europe = ["Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Bassas da India", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Denmark", "Dhekelia", "Djibouti", "Finland", "France", "French Guiana", "French Polynesia", "French Southern and Antarctic Lands", "Gabon", "The Gambia", "Gaza Strip", "Georgia", "Germany", "Greece", "Greenland", "Grenada", "Guadeloupe", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy", "Latvia", "Lebanon", "Lesotho", "Liberia", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Netherlands", "Netherlands Antilles", "New Caledonia", "Norway", "Oman", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Slovakia", "Slovenia", "Spain", "Spratly Islands", "Sri Lanka", "Sweden", "Switzerland", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom"];
    var dic_country_northamerica = ["Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Mexico", "Federated States of Micronesia", "Moldova", "Monaco", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands", "Wake Island", "Wallis and Futuna", "West Bank", "Western Sahara", "Yemen", "Zambia"];
    var dic_country_centralamerica = ["Costa Rica", "Cote d'Ivoire", "Croatia", "Guatemala", "Guernsey", "Guinea", "GuineaBissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See", "Honduras", "Nicaragua", "Panama"];
    dic_country = dic_country.concat(dic_country_mediterranean,dic_country_caribbean,dic_country_oceania,dic_country_eurasia,dic_country_africa,dic_country_middleeast,dic_country_southamerica,dic_country_asia,dic_country_europe,dic_country_northamerica,dic_country_centralamerica);
    var dic_em=["very","rather","quite","extremely","incredibly","really","thoroughly","most","absolutely","positively","unbelievably","super","majorly","oh so"];
    dic_em = dic_em.concat();
    var dic_emo=["joy","fright","happiness","boredom","sorrow","sadness","anger","rage","guilt","envy","passion","bliss","pain","interest","smugness","pride","hunger","despair","shame","love","madness","hatred","pity","humility","anticipation","surprise","optimism","disappointment","remorse","contempt","awe","lust","longing","contentment","pleasure","irritation","torment","horror","shock","terror","ecstasy","satisfaction","gratitude","melancholy","fury","excitement","confusion","bewilderment"];
    dic_emo = dic_emo.concat();
    var dic_face=["smile","frown","grimace","evil grin","cheeky grin","sneer","pucker","smirk","grin","snarl","trollface","visage","snicker","pout","poker face","toothy grin","blank face","pout lip"];
    dic_face = dic_face.concat();
    var dic_greet=["hello","greetings","hola","hey","what's up","whazzup","yo","good day","good morning","good afternoon","good evening","good night","hey buddy","ahoy","sup","salutations","aloha","konichi wa","what's happening","how's it hanging","how's it going","what's new","guten Tag"];
    dic_greet = dic_greet.concat();
    var dic_name=[];
    var dic_name_female = ["Gus", "Karen", "Heidi", "Jessie", "Gabrielle", "Jessica", "Laura", "Sara", "Linda", "Britney", "Kristin", "Kate", "Amanda", "Renae", "Ruth", "Betty", "Lindsey", "Saralyn", "Alice", "Stacey", "Sadie", "Kat", "Marge", "Mary", "Michelle", "Kimberly", "Debbie", "Megan", "Susan", "Maria", "Jennifer", "Helen", "Sandra", "Rebecca", "Martha", "Stephanie", "Gloria", "Jane", "Tina", "Tracy", "Tiffany", "Valerie", "Lauren", "Bertha", "Vicki", "Delores", "Jacki", "Varlerie", "Scarlett", "Christina", "Maggie", "Crystal", "Ember"];
    var dic_name_male = ["", "Billybob/B", "Moses/M", "Barack/B", "Vijay/V", "Rex/R", "Sasquatch/S", "Elvis/E", "Zachy/Z", "John/J", "Mickey/M", "Jake/J", "Stan/S", "Jamier/J", "Sean/S", "Snuggles/S", "Max/M", "Mitchell/M", "Collin/C", "Nick/N", "Danny/D", "Ronald/R", "Tim/T", "Timmy/T", "Scott/S", "Cody/C", "Louie/L", "Keith/K", "Luke/L", "Nicholas", "Todd", "Barney", "Brandon", "Victor", "William", "Alex", "Ken", "Gordon", "Grover", "Steve", "Kyle", "George", "Rick", "Craig", "Greg", "Andy", "Kevin", "Dick", "Tom", "Harry", "Bill", "Brian", "Francis", "Corbin", "Gilbert", "Jeff", "Bruce", "Benny", "Justin", "Tony", "Robin", "Roger", "Parker", "Vanshay", "Lee", "Ian", "Joshua", "Michael", "Shonuff", "Tristan", "Kermit", "Wilbur", "Malcolm", "Akbar", "Ambar", "Athumani", "Jela", "Jengo", "Kabili", "Kanaifu", "Kandoro", "Keto", "Khalfan", "Kiango", "Kijani", "Kondo", "Nuru", "Penda", "Penha", "Safari", "Thimba", "Adish", "Arash", "Ariabod", "Arwan", "Arya", "Asho", "Atish", "Baback", "Baraz", "Barbod", "Bardia", "Barid", "Bast", "Benham", "Bian", "Dareh", "Darius", "Darrius", "Dastan", "Gul", "Jahan", "Kamran", "Kaveh", "Kaysar", "Menelin", "Masih", "Meghdad", "Milad", "Nasha", "Naveed", "Navid", "Parham", "Pouria", "Radwan", "Roshan", "Saman", "Sardar", "Sarmad", "Shadan", "Shahan", "Shahin", "Shahryar", "Shapur", "Sher", "Abeeku", "Abu", "Addae", "Ade", "Adeben", "Adjatay", "Adjo", "Adwin", "Agu", "Ajamu", "Ajani", "Akello", "Akia", "Akins", "Akintunde", "Anane", "Ande", "Andwele", "Armani", "Asante", "Ashanti", "Ayele", "Ayinde", "Ayzize", "Azibo", "Badru", "Bahari", "Bandele", "Banji", "Barke", "Belay", "Bem", "Berta", "Birungi", "Braima", "Camara", "Chiazam", "Chincha", "Chikezie", "Chimelu", "Chinelo", "Chinua", "Davu", "Deka", "Akuna", "Binda", "Euroa", "Thor", "Gidja", "Kaawa", "Kinta", "Kumba", "Mani", "Omeo", "Onyx", "Paratyl", "Ponto", "Quoba", "Taworri", "Teangi", "Thono", "Tyipa", "Yamparti", "Yarran", "Yoyko", "Abbot", "Abe", "Acton", "Adair", "Aidric", "Alan", "Alastair", "Albert", "Albion", "Aldan", "Alden", "Aldis", "Alfred", "Algernon", "Alick", "Allard", "Alvar", "Ansley", "Anson", "Aragorn", "Arathorn", "Arden", "Argyle", "Art", "Ash", "Ashford", "Ashton", "Atherton", "Atticus", "Aubrey", "August", "Austin", "Axton", "Bailey", "Baker", "Baldwin", "Balthasar", "Bardolf", "Barnaby", "Baron", "Barrett", "Barrington", "Barton", "Baxter", "Beauchamp", "Beauregard", "Beck", "Beckett", "Beckham", "Benjamin", "Benson", "Bently", "Benton", "Berke", "Beverly", "Bevis", "Bringham", "Birch", "Bishop", "Blake", "Blaze", "Boniface", "Bono", "Booker", "Boston", "Brad", "Bradley", "Bradshaw", "Brantley", "Brenton", "Brett", "Brewster", "Breyson", "Briar", "Brice", "Bridger", "Brighton", "Bristol", "Brock", "Bronson", "Brook", "Bryan", "Buckley", "Burgess", "Burris", "Burton", "Byron", "Caldwell", "Caledon", "Calico", "Camden", "Canon", "Carlton", "Carrington", "Carter", "Carver", "Cash", "Caspian", "Cecil", "Celtic", "Chad", "Chadwick", "Chainey", "Chandler", "Charleston", "Charlie", "Charlton", "Chauncey", "Chay", "Chester", "Chet", "Chip", "Clarence", "Clark", "Clayton", "Cleavon", "Clement", "Cleaveland", "Clifford", "Clifton", "Clint", "Clinton", "Clive", "Colby", "Coleman", "Colton", "Conrad", "Conroy", "Cornell", "Cosmo", "Cotton", "Crawford", "Creighton", "Crimson", "Crosby", "Dalton", "Darrel", "Darryl", "Darwin", "Dash", "Daughtry", "Dawson", "Deacon", "Dennis", "Derek", "Derring", "Devon", "Dexter", "Dexton", "Diamond", "Dixon", "Don", "Donnie", "Dorsey", "Doug", "Dracen", "Drake", "Dryden", "Dudley", "Duke", "Dustin", "Dwayne", "Dwight", "Dyson", "Earl", "Easton", "Eastwood", "Ed", "Edd", "Eddy", "Edgar", "Edgerton", "Edison", "Edmund", "Edric", "Edward", "Edwin", "Egbert", "Elden", "Elias", "Elliot", "Ellis", "Elmer", "Elmo", "Elton", "Elvin", "Elwood", "Emerson", "Emmet", "Ernie", "Errol", "Erv", "Ervin", "Erwin", "Eugene", "Fairfax", "Falcon", "Farley", "Ferguson", "Ferris", "Filbert", "Fisher", "Fitzwilliam", "Fletcher", "Floyd", "Forbes", "Ford", "Forrest", "Foster", "Fraley", "Frank", "Frederick", "Frenchie", "Fulbright", "Gage", "Galahad", "Gale", "Gardner", "Garland", "Garrison", "Garth", "Gary", "Gavin", "Gaylord", "Godfrey", "Graham", "Graydon", "Griff", "Gulliver", "Fluffy"];
    dic_name = dic_name.concat(dic_name_female,dic_name_male);
    var dic_noun=["wedgie/wedgies","zygote/zygotes","fetus/fetuses","mouth/mouths","peninsula/peninsulas","teen/teens","child/children","dude/dudes","truth/truths","pedestrian/pedestrians","afro/afros","disco ball/disco balls","rotisserie/rotisseries","pizza/pizzas","caboose/cabooses","frosting/frostings","giblet/giblets","handcuff/handcuffs","avocado/avocados","banjo/banjos","bingo/bingos","nickel/nickels","dime/dimes","penny/pennies","cheeseburger/cheeseburgers","sponge/sponges","popsicle/popsicles","musket/muskets","credit card/credit cards","truffle/truffles","gearshift/gearshifts","ghost/ghosts","ridge/ridges","meat/meats","dictionary/dictionaries","asymptote/asymptotes","peppermint/peppermints","candy cane/candy canes","bulge/bulges","lump/lumps","garden/gardens","treasure/treasures","scuba/scubas","elf/elves","bass/basses","football/footballs","dollar bill/dollar bills","log/logs","chicken wing/chicken wings","pylon/pylons","card/cards","rock/rocks","book/books","rabies/rabies","fan/fans","eraser/erasers","fart/farts","booger/boogers","monster/monsters","nerd/nerds","wheelbarrow/wheelbarrows","lemonade/lemonades","cramp/cramps","doodle/doodles","stone/stones","waffle/waffles","jelly bean/jelly beans","sofa/sofas","muffin/muffins","ragamuffin/ragamuffins","man/men","woman/women","puppet/puppets","swag/swag","bread/bread","magnifying glass/magnifying glasses","cocaine/cocaine","diaper/diapers","dishrag/dishrags","needle/needles","pipe/pipes","money/money","car/cars","flowerpot/flowerpots","robot/robots","lady/ladies","bra/bras","sharpie/sharpies","lawn mower/lawn mowers","carcass/carcasses","prune/prunes","raisin/raisins","grape/grapes","kumquat/kumquats","grass/grasses","garbage can/garbage cans","manure/manure","lampstand/lampstands","bottle/bottles","carpet/carpets","earwax/earwax","fog/fogs","hemorroid/hemorroids","cork/corks","tuna/tuna","mirror/mirrors","urinal/urinals","hazelnut/hazelnuts","walnut/walnuts","ventricle/ventricles","brick/bricks","cement/cement","shrub/shrubs","almond/almonds","laptop/laptops","wall/walls","cornea/corneas","cleat/cleats","globe/globes","kite/kites","dagger/daggers","horsewhip/horsewhips","radish/radishes","scab/scabs","leaf/leaves","bench/benches","nail/nails","rubber/rubbers","feces/feces","bone/bones","snorkel/snorkels","cocktail/cocktails","papaya/papayas","hole/holes","tunnel/tunnels","bullet/bullets","dynamite/dynamites","kettle/kettles","enigma/enigmas","keyboard/keyboards","lube/lubes","mask/masks","duct tape/duct tape","chair/chairs","button/buttons","tuber/tubers","joint/joints","horseradish/horseradishes","onion/onions","cabbage/cabbages","wool/wool","grapefruit/grapefruits","tea bag/tea bags","teapot/teapots","canister/canisters","battery/batteries","clock/clocks","plug/plugs","towel/towels","peanut/peanuts","towelette/towelettes","moist towelette/moist towelettes","cuckoo/cuckoos","potato/potatoes","apricot/apricots","doll/dolls","tampon/tampons","meatloaf/meatloaves","loaf/loaves","spinach/spinach","manhole/manholes","razor/razors","pretzel/pretzels","cornflake/cornflakes","corn/corns","marshmallow/marshmallows","salmon/salmon","barrel/barrels","fudge/fudge","basket/baskets","coffin/coffins","piano/pianos","trombone/trombones","accordion/accordions","biscuit/biscuits","pope/popes","flapjack/flapjacks","ointment/ointments","pumpkin/pumpkins","fern/ferns","maple tree/maple trees","thistle/thistles","daisy/daisies","stinging nettle/stinging nettles","dandelion/dandelions","tulip/tulips","clover/clovers","marigold/marigolds","square/squares","triangle/triangles","oval/ovals","circle/circles","basketball/basketballs","baseball/baseballs","beach ball/beach balls","tennis ball/tennis balls","boulder/boulders","baby/babies","floor/floors","wall/walls","ceiling/ceilings","patio/patios","bed/beds","bedsheet/bedsheets","window/windows","door/doors","chair/chairs","carpet/carpets","desk/desks","roof/roofs","tabletop/tabletops","coffee table/coffee tables","couch/couches","recliner/recliners","lawn chair/lawn chairs","rocking chair/rocking chairs","nightstand/nightstands","toothpick/toothpicks","turd/turds","rocket/rockets","flute/flutes","clarinet/clarinets","trumpet/trumpets","arrow/arrows","dart/darts","pencil/pencils","cigarette/cigarettes","pickle/pickles","ruler/rulers","cucumber/cucumbers","staple/staples","panhandle/panhandles","telephone pole/telephone poles","extension cord/extension cords","candle/candles","tree/trees","knife/knives","torch/torches","broom/brooms","broomstick/broomsticks","pole/poles","crack pipe/crack pipes","lightbulb/lightbulbs","umbrella/umbrellas","cannon/cannons","sausage/sausages","chain/chains","banana/bananas","plunger/plungers","spork/sporks","toothbrush/toothbrushes","banister/banisters","baton/batons","drill/drills","iron maiden/iron maidens","leaf blower/leaf blowers","pickaxe/pickaxes","pistol/pistols","spoon/spoons","fork/forks","blender/blenders","squeegee/squeegees","shovel/shovels","loincloth/loincloths","nutcracker/nutcrackers","hammer/hammers","chainsaw/chainsaws","microscope/microscopes","pot/pots","pan/pans","screwdriver/screwdrivers","jackhammer/jackhammers","jockstrap/jockstraps","hacksaw/hacksaws","ladder/ladders","shopping cart/shopping carts","bomb/bombs","firecracker/firecrackers","drug/drugs","sword/swords","spear/spears","cattle prod/cattle prods","vacuum/vacuums","wrench/wrenches","phone/phones","can opener/can openers","stapler/staplers","pitchfork/pitchforks","blowtorch/blowtorches","machete/machetes","rumpus/rumpuses","flamethrower/flamethrowers","garden hose/garden hoses","LSD/LSD","PCP/PCP","mescaline/mescaline","marijuana/marijuana","meth/meth","crack/crack","roofie/roofies","heroin/heroin","smack/smack","shroom/shrooms","bath salts/bath salts","extacy/extacy","vest/vests","boot/boots","zipper/zippers","sock/socks","shoe/shoes","slipper/slippers","pants/pants","sweatshirt/sweatshirts","kilt/kilts","belt/belts","skirt/skirts","girdle/girdles","pantaloons/pantaloons","shirt/shirts","dress/dresses","jacket/jackets","hat/hats","top hat/top hats","underwear/underwear","tuxedo/tuxedoes","suit/suits","boxers/boxers","mandible/mandibles","kneecap/kneecaps","face/faces","loin/loins","wand/wands","stun gun/stun guns","train/trains","minivan/minivans","semi/semis","hot rod/hot rods","truck/trucks","boat/boats","submarine/submarines","aircraft carrier/aircraft carriers","airplane/airplanes","blimp/blimps","motorcycle/motorcycles","bunsen burner/bunsen burners","wrinkle/wrinkles","jalapeno/jalapenos","hubcap/hubcaps","hedge/hedges","golf ball/golf balls","wig/wigs","skillet/skillets","constitution/constitutions","femur/femurs","mohawk/mohawks","dingleberry/dingleberries","teddy bear/teddy bears","dimple/dimples","shotgun/shotguns","grasshopper/grasshoppers","locust/locusts","cricket/crickets","beetle/beetles","harpoon/harpoons","tire/tires","silo/silos","shuttlecock/shuttlecocks","Communist/Communists","Democrat/Democrats","Republican/Republicans","president/presidents","anthill/anthills","battering ram/battering rams","cuntrocket/cuntrockets","micropenis/micropenises","cuntwaffle/cuntwaffles","blue waffle/blue waffles","dildo/dildos","double dildo/double dildos","dinocock/dinococks","pussy/pussies","vagflap/vagflaps","cuntflap/cuntflaps","cunt/cunts","anus/anuses","sphincter/sphincters","tit/tits","taint/taints","foreskin/foreskins","nipple clamp/nipple clamps","goatse/goatses","panties/panties","thong/thongs","shit/shits","boob/boobs","butthair/butthairs","poopoo/poopoos","boner/boners","dick/dicks","cock/cocks","asshole/assholes","ballsack/ballsacks","testicle/testicles","scrotum/scrotums","pube/pubes","penis/penises","vagina/vaginas","pussy/pussies","yeast/yeast infections","poop/poops","motherfucker/motherfuckers","bitch/bitches","chesticle/chesticles","willy/willies","prick/pricks","manhood/manhoods"];
    var dic_noun_surface = ["floor/floors", "wall/walls", "ceiling/ceilings", "patio/patios", "bed/beds", "bedsheet/bedsheets", "window/windows", "door/doors", "chair/chairs", "carpet/carpets", "desk/desks", "roof/roofs", "tabletop/tabletops"];
    var dic_noun_furniture = ["chair/chairs", "button/buttons", "tuber/tubers", "joint/joints", "horseradish/horseradishes", "bed/beds", "chair/chairs", "desk/desks", "coffee table/coffee tables", "couch/couches", "recliner/recliners", "lawn chair/lawn chairs", "rocking chair/rocking chairs"];
    var dic_noun_round = ["kidney/kidneys", "fibula/fibulas", "golf ball/golf balls", "wig/wigs", "tit/tits", "boob/boobs"];
    var dic_noun_body = ["mouth/mouths", "peninsula/peninsulas", "afro/afros", "disco ball/disco balls", "rotisserie/rotisseries", "pizza/pizzas", "caboose/cabooses", "frosting/frostings", "giblet/giblets", "cornea/corneas", "bone/bones", "snorkel/snorkels", "cocktail/cocktails", "papaya/papayas", "hole/holes", "pornstar/pornstars", "mandible/mandibles", "kneecap/kneecaps", "face/faces", "loin/loins", "femur/femurs", "mohawk/mohawks", "dingleberry/dingleberries", "teddy bear/teddy bears", "dimple/dimples", "micropenis/micropenises", "pussy/pussies", "vagflap/vagflaps", "cuntflap/cuntflaps", "cunt/cunts", "anus/anuses", "sphincter/sphincters", "tit/tits", "taint/taints", "foreskin/foreskins", "boob/boobs", "boner/boners", "dick/dicks", "cock/cocks", "asshole/assholes", "ballsack/ballsacks", "testicle/testicles", "scrotum/scrotums", "pube/pubes", "penis/penises", "vagina/vaginas", "pussy/pussies", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers", "chesticle/chesticles", "willy/willies", "prick/pricks"];
    var dic_noun_liquid = ["nightstand/nightstands", "saliva/saliva", "tar/tar", "water/water", "soup/soups", "soap/soaps", "slime/slime", "bleach/bleach", "pudding/puddings", "lotion/lotions", "sauce/sauces", "earwax/earwax", "snot/snots", "sweat/sweats", "acid/acids", "wine/wines", "oil/oils", "olive oil/olive oil", "urine/urine", "diarrhea/diarrhea", "beer/beers", "rain/rains", "toothpaste/toothpastes", "yogurt/yogurts", "cream/creams", "grease/grease"];
    var dic_noun_insect = ["grasshopper/grasshoppers", "locust/locusts", "cricket/crickets", "beetle/beetles"];
    var dic_noun_clothes = ["boot/boots", "zipper/zippers", "sock/socks", "shoe/shoes", "slipper/slippers"];
    var dic_noun_plant = ["pumpkin/pumpkins", "fern/ferns", "maple tree/maple trees", "thistle/thistles", "daisy/daisies", "stinging nettle/stinging nettles", "dandelion/dandelions", "tulip/tulips", "clover/clovers", "marigold/marigolds", "hedge/hedges"];
    var dic_noun_person = ["teen/teens", "child/children", "dude/dudes", "truth/truths", "pedestrian/pedestrians", "elf/elves", "man/men", "woman/women", "puppet/puppets", "swag/swag", "lady/ladies", "baby/babies"];
    var dic_noun_tool = ["wheelbarrow/wheelbarrows", "lemonade/lemonades", "cramp/cramps", "doodle/doodles", "stone/stones", "waffle/waffles", "jelly bean/jelly beans", "sofa/sofas", "muffin/muffins", "ragamuffin/ragamuffins", "robot/robots", "lawn mower/lawn mowers", "carcass/carcasses", "horsewhip/horsewhips", "radish/radishes", "scab/scabs", "leaf/leaves", "bench/benches", "razor/razors", "arrow/arrows", "pencil/pencils", "drill/drills", "iron maiden/iron maidens", "leaf blower/leaf blowers", "pickaxe/pickaxes", "pistol/pistols", "spoon/spoons", "fork/forks", "blender/blenders", "squeegee/squeegees", "shovel/shovels", "loincloth/loincloths", "nutcracker/nutcrackers", "hammer/hammers", "chainsaw/chainsaws", "microscope/microscopes", "pot/pots", "pan/pans", "screwdriver/screwdrivers", "jackhammer/jackhammers", "jockstrap/jockstraps", "hacksaw/hacksaws", "ladder/ladders", "shopping cart/shopping carts", "bomb/bombs", "firecracker/firecrackers", "drug/drugs", "sword/swords", "spear/spears", "cattle prod/cattle prods", "vacuum/vacuums", "wrench/wrenches", "phone/phones", "can opener/can openers", "stapler/staplers", "pitchfork/pitchforks", "blowtorch/blowtorches", "machete/machetes", "rumpus/rumpuses", "flamethrower/flamethrowers", "wand/wands", "stun gun/stun guns", "bunsen burner/bunsen burners", "wrinkle/wrinkles", "battering ram/battering rams", "nipple clamp/nipple clamps", "butthair/butthairs", "poopoo/poopoos"];
    var dic_noun_long = ["toothpick/toothpicks", "turd/turds", "rocket/rockets", "flute/flutes", "clarinet/clarinets", "trumpet/trumpets", "arrow/arrows", "dart/darts", "pencil/pencils", "cigarette/cigarettes", "pickle/pickles", "ruler/rulers", "cucumber/cucumbers", "staple/staples", "panhandle/panhandles", "telephone pole/telephone poles", "extension cord/extension cords", "candle/candles", "tree/trees", "knife/knives", "torch/torches", "broom/brooms", "broomstick/broomsticks", "pole/poles", "crack pipe/crack pipes", "lightbulb/lightbulbs", "umbrella/umbrellas", "cannon/cannons", "sausage/sausages", "chain/chains", "banana/bananas", "plunger/plungers", "spork/sporks", "toothbrush/toothbrushes", "banister/banisters", "baton/batons", "drill/drills", "spoon/spoons", "fork/forks", "shovel/shovels", "hammer/hammers", "screwdriver/screwdrivers", "jackhammer/jackhammers", "sword/swords", "spear/spears", "wrench/wrenches", "pitchfork/pitchforks", "blowtorch/blowtorches", "machete/machetes", "flamethrower/flamethrowers", "snake/snakes", "anaconda/anacondas", "fish/fishes", "owl/owls", "otter/otters", "lemur/lemurs", "bull/bulls", "chicken/chickens", "peacock/peacocks", "gorilla/gorillas", "dove/doves", "pony/ponies", "squirrel/squirrels", "horse/horses", "donkey/donkeys", "baboon/baboon", "cockroach/cockroaches", "butler/butlers", "yeti/yetis", "demon/demons", "devil/devils", "ogre/ogres", "goat/goats", "llama/llamas", "porcupine/porcupines", "tiger/tigers", "lion/lions", "wolf/wolves", "hyena/hyenas", "titan/titans", "lizard/lizards", "hedgehog/hedgehogs", "dog/dogs", "bulldog/bulldogs", "beagle/beagles", "poodle/poodles", "umbilical cord/umbilical cords", "fanny/fannies", "chin/chins", "nostril/nostrils", "unibrow/unibrows", "mustache/mustaches", "head/heads", "armpit/armpits", "rump/rumps", "throat/throats", "goatee/goatees", "nose/noses", "elbow/elbows", "esophagus/esophaguses", "toe/toes", "leg/legs", "pancreas/pancreases", "stinger/stingers", "scapula/scapulas", "gallbladder/gallbladders", "skin/skin", "neck/necks", "toenail/toenails", "horn/horns", "epidermis/epidermises", "duodenum/duodenums", "heart/hearts", "tentacle/tentacles", "knuckle/knuckles", "uvula/uvulas", "tongue/tongues", "finger/fingers", "lip/lips", "snout/snouts", "tooth/teeth", "body/bodies", "jowl/jowls", "whisker/whiskers", "beak/beaks", "navel/navels", "wand/wands", "bunsen burner/bunsen burners", "wrinkle/wrinkles", "jalapeno/jalapenos", "hubcap/hubcaps", "shotgun/shotguns", "harpoon/harpoons", "tire/tires", "silo/silos", "shuttlecock/shuttlecocks", "Communist/Communists", "Democrat/Democrats", "Republican/Republicans", "president/presidents", "anthill/anthills", "battering ram/battering rams", "double dildo/double dildos", "boner/boners", "dick/dicks", "cock/cocks", "penis/penises", "willy/willies", "prick/pricks"];
    var dic_noun_ball = ["basketball/basketballs", "baseball/baseballs", "beach ball/beach balls", "tennis ball/tennis balls", "meatball/meatballs", "golf ball/golf balls", "wig/wigs"];
    var dic_noun_article = ["bra/bras", "sharpie/sharpies", "vest/vests", "boot/boots", "zipper/zippers", "sock/socks", "shoe/shoes", "slipper/slippers", "pants/pants", "sweatshirt/sweatshirts", "kilt/kilts", "belt/belts", "skirt/skirts", "girdle/girdles", "pantaloons/pantaloons", "shirt/shirts", "dress/dresses", "jacket/jackets", "hat/hats", "top hat/top hats", "underwear/underwear", "tuxedo/tuxedoes", "suit/suits", "boxers/boxers", "panties/panties", "thong/thongs", "shit/shits"];
    var dic_noun_drug = ["cocaine/cocaine", "diaper/diapers", "dishrag/dishrags", "LSD/LSD", "PCP/PCP", "mescaline/mescaline", "marijuana/marijuana", "meth/meth", "crack/crack", "roofie/roofies", "heroin/heroin", "smack/smack", "shroom/shrooms", "bath salts/bath salts", "extacy/extacy"];
    var dic_noun_fruit = ["prune/prunes", "raisin/raisins", "grape/grapes", "kumquat/kumquats", "grass/grasses", "grapefruit/grapefruits", "tea bag/tea bags", "teapot/teapots", "canister/canisters", "battery/batteries", "clock/clocks", "plug/plugs", "towel/towels", "apricot/apricots", "doll/dolls", "tampon/tampons", "apple/apples", "lime/limes", "orange/oranges", "lemon/lemons", "watermelon/watermelons", "pineapple/pineapples", "coconut/coconuts", "blueberry/blueberries", "strawberry/strawberries", "raspberry/raspberries", "tangerine/tangerines", "kiwi/kiwis", "grape/grapes", "tomato/tomatoes", "nectarine/nectarines", "baby/babies"];
    var dic_noun_container = ["garbage can/garbage cans", "manure/manure", "bottle/bottles", "carpet/carpets", "earwax/earwax", "fog/fogs", "hemorroid/hemorroids", "cork/corks", "barrel/barrels", "coffin/coffins", "vodka/vodka", "pickle jar/pickle jars", "package/packages", "cup/cups", "wallet/wallets", "glass/glasses", "shot glass/shot glasses", "bowl/bowls", "container/containers", "flask/flasks", "bottle/bottles", "pitcher/pitchers", "pipe/pipes", "bong/bongs", "pouch/pouches", "purse/purses", "pocket/pockets", "jar/jars", "suitcase/suitcases", "box/boxes", "trunk/trunks", "package/packages", "case/cases", "packet/packets", "cell/cells", "test tube/test tubes", "vial/vials", "vat/vats", "pot/pots", "turkey baster/turkey basters", "trashcan/trashcans", "drawer/drawers", "chest/chests", "well/wells", "kettle/kettles", "bag/bags", "balloon/balloons", "sack/sacks", "basket/baskets", "carton/cartons", "oven/ovens", "tub/tubs", "toilet/toilets", "freezer/freezers", "skillet/skillets", "constitution/constitutions"];
    var dic_noun_instrument = ["piano/pianos", "trombone/trombones", "accordion/accordions", "flute/flutes", "clarinet/clarinets", "trumpet/trumpets"];
    var dic_noun_sex = ["handcuff/handcuffs", "avocado/avocados", "banjo/banjos", "bingo/bingos", "nickel/nickels", "dime/dimes", "penny/pennies", "cheeseburger/cheeseburgers", "sponge/sponges", "popsicle/popsicles", "cuntrocket/cuntrockets", "micropenis/micropenises", "cuntwaffle/cuntwaffles", "blue waffle/blue waffles", "dildo/dildos", "double dildo/double dildos", "dinocock/dinococks", "pussy/pussies", "vagflap/vagflaps", "cuntflap/cuntflaps", "cunt/cunts", "anus/anuses", "sphincter/sphincters", "tit/tits", "taint/taints", "foreskin/foreskins", "goatse/goatses", "boob/boobs", "boner/boners", "dick/dicks", "cock/cocks", "ballsack/ballsacks", "testicle/testicles", "scrotum/scrotums", "penis/penises", "vagina/vaginas", "pussy/pussies", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers", "willy/willies", "prick/pricks"];
    var dic_noun_job = ["rottweiler/rottweilers", "carpenter/carpenters", "reporter/reporters", "journalist/journalists", "guitarist/guitarists", "archaeologist/archaeologists", "urologist/urologists", "circus performer/circus performers", "juggler/jugglers", "explorer/explorers", "artist/artists", "mechanic/mechanics", "hunter/hunters", "spelunker/spelunkers", "bartender/bartenders", "accountant/accountants", "movie star/movie stars", "mailman/mailmen", "construction worker/construction workers", "principal/principals", "prince/princes", "princess/princesses", "surgeon/surgeons", "gambler/gamblers", "dentist/dentists", "chef/chefs", "celebrity/celebrities", "waitress/waitresses", "burglar/burglars", "waiter/waiters", "doctor/doctors", "nurse/nurses", "lawyer/lawyers", "butler/butlers", "actor/actors", "athlete/athletes", "babysitter/babysitters", "golfer/golfers", "vampire/vampires", "fireman/firemen", "rapper/rappers", "gangster/gangsters", "hippie/hippies", "clown/clowns", "banker/bankers", "pianist/pianists", "politician/politicians", "president/presidents", "magician/magicians", "stock broker/stock brokers", "cop/cops", "sky diver/sky divers", "snake charmer/snake charmers", "fortune teller/fortune tellers", "serial killer/serial killers", "plumber/plumbers", "FBI agent/FBI agents", "assassin/assassins", "wizard/wizards", "salesman/salesmen", "singer/singers", "policeman/policemen", "physician/physicians", "paramedic/paramedics", "ninja/ninjas", "teacher/teachers", "senator/senators", "scientist/scientists", "constable/constables", "taxidermist/taxidermists", "biologist/biologists", "pope/popes", "bachelor/bachelors", "haberdasher/haberdashers", "armorer/armorers", "tanner/tanners", "hobbit/hobbits", "pirate/pirates", "stripper/strippers", "hooker/hookers"];
    var dic_noun_weapon = ["musket/muskets", "credit card/credit cards", "truffle/truffles", "gearshift/gearshifts", "ghost/ghosts", "ridge/ridges", "meat/meats", "dictionary/dictionaries", "asymptote/asymptotes", "peppermint/peppermints", "candy cane/candy canes", "bulge/bulges", "lump/lumps", "garden/gardens", "treasure/treasures", "scuba/scubas", "wheelbarrow/wheelbarrows", "lemonade/lemonades", "cramp/cramps", "doodle/doodles", "stone/stones", "waffle/waffles", "jelly bean/jelly beans", "sofa/sofas", "muffin/muffins", "ragamuffin/ragamuffins", "needle/needles", "pipe/pipes", "money/money", "car/cars", "flowerpot/flowerpots", "lawn mower/lawn mowers", "carcass/carcasses", "lampstand/lampstands", "bottle/bottles", "carpet/carpets", "earwax/earwax", "fog/fogs", "hemorroid/hemorroids", "cork/corks", "brick/bricks", "cement/cement", "shrub/shrubs", "cleat/cleats", "globe/globes", "kite/kites", "dagger/daggers", "horsewhip/horsewhips", "radish/radishes", "scab/scabs", "leaf/leaves", "bench/benches", "nail/nails", "rubber/rubbers", "feces/feces", "bullet/bullets", "dynamite/dynamites", "kettle/kettles", "enigma/enigmas", "keyboard/keyboards", "lube/lubes", "mask/masks", "duct tape/duct tape", "razor/razors", "arrow/arrows", "dart/darts", "pencil/pencils", "telephone pole/telephone poles", "torch/torches", "broomstick/broomsticks", "baton/batons", "drill/drills", "pickaxe/pickaxes", "fork/forks", "shovel/shovels", "chainsaw/chainsaws", "bomb/bombs", "sword/swords", "spear/spears", "stapler/staplers", "pitchfork/pitchforks", "machete/machetes", "flamethrower/flamethrowers", "stun gun/stun guns", "shotgun/shotguns", "harpoon/harpoons", "tire/tires", "battering ram/battering rams"];
    var dic_noun_hole = ["mouth/mouths", "peninsula/peninsulas", "tunnel/tunnels", "anus/anuses", "sphincter/sphincters", "goatse/goatses", "asshole/assholes", "vagina/vaginas", "pussy/pussies", "yeast/yeast infections", "poop/poops", "motherfucker/motherfuckers"];
    var dic_noun_food = ["bread/bread", "magnifying glass/magnifying glasses", "prune/prunes", "raisin/raisins", "grape/grapes", "kumquat/kumquats", "grass/grasses", "tuna/tuna", "mirror/mirrors", "urinal/urinals", "hazelnut/hazelnuts", "walnut/walnuts", "ventricle/ventricles", "almond/almonds", "laptop/laptops", "wall/walls", "onion/onions", "cabbage/cabbages", "wool/wool", "grapefruit/grapefruits", "tea bag/tea bags", "teapot/teapots", "canister/canisters", "battery/batteries", "clock/clocks", "plug/plugs", "towel/towels", "peanut/peanuts", "towelette/towelettes", "moist towelette/moist towelettes", "cuckoo/cuckoos", "potato/potatoes", "apricot/apricots", "doll/dolls", "tampon/tampons", "meatloaf/meatloaves", "loaf/loaves", "spinach/spinach", "manhole/manholes", "pretzel/pretzels", "cornflake/cornflakes", "corn/corns", "marshmallow/marshmallows", "salmon/salmon", "fudge/fudge", "basket/baskets", "biscuit/biscuits", "pope/popes", "flapjack/flapjacks", "ointment/ointments", "boulder/boulders"];
    var dic_noun_vehicle = ["train/trains", "minivan/minivans", "semi/semis", "hot rod/hot rods", "truck/trucks", "boat/boats", "submarine/submarines", "aircraft carrier/aircraft carriers", "airplane/airplanes", "blimp/blimps", "motorcycle/motorcycles"];
    var dic_noun_animal = ["bass/basses", "football/footballs", "dollar bill/dollar bills", "log/logs", "chicken wing/chicken wings", "pylon/pylons", "card/cards", "rock/rocks", "book/books", "rabies/rabies", "fan/fans", "eraser/erasers", "fart/farts", "booger/boogers", "monster/monsters", "nerd/nerds", "tuna/tuna", "mirror/mirrors", "urinal/urinals", "salmon/salmon", "garden hose/garden hoses", "leech/leeches", "squid/squids", "octopus/octopi", "velociraptor/velociraptors", "tyrannosaurus rex/tyrannosaurus rexes", "sphinx/sphinxes", "viking/vikings", "tadpole/tadpoles", "skunk/skunks", "seagull/seagulls", "parrot/parrots", "weasel/weasels", "mammoth/mammoths", "bat/bats", "landlord/landlords", "moose/moose", "frog/frogs", "toad/toads", "ant/ants", "chihuahua/chihuahuas", "deer/deer", "rat/rats", "cat/cats", "mayor/mayors", "flamingo/flamingos", "turtle/turtles", "blowfish/blowfish", "grasshopper/grasshoppers", "locust/locusts", "cricket/crickets", "beetle/beetles", "bitch/bitches"];
    var dic_noun_shape = ["square/squares", "triangle/triangles", "oval/ovals", "circle/circles"];
    dic_noun = dic_noun.concat(dic_noun_surface,dic_noun_furniture,dic_noun_round,dic_noun_body,dic_noun_liquid,dic_noun_insect,dic_noun_clothes,dic_noun_plant,dic_noun_person,dic_noun_tool,dic_noun_long,dic_noun_ball,dic_noun_article,dic_noun_drug,dic_noun_fruit,dic_noun_container,dic_noun_instrument,dic_noun_sex,dic_noun_job,dic_noun_weapon,dic_noun_hole,dic_noun_food,dic_noun_vehicle,dic_noun_animal,dic_noun_shape);
    var dic_place=["palace/palaces","classroom/classrooms","nest/nests","office/offices","ditch/ditches","cave/caves","house/houses","bathroom/bathrooms","bedroom/bedrooms","town/towns","jail/jails","shop/shops","tomb/tombs","basement/basements","dungeon/dungeons","coffeeshop/coffeeshops","tower/towers","stable/stables","barn/barns","mansion/mansions","castle/castles","attic/attics","cage/cages","stadium/stadiums","school/schools","mall/malls","store/stores","stand/stands","company/companies","land/lands","garden/gardens","wonderland/wonderlands","abyss/abysses","shanty/shanties","prison/prisons","apartment/apartments","closet/closets","shack/shacks","tent/tents","car/cars","van/vans","alley/alleys","forest/forests","meadow/meadows","outhouse/outhouses","boat/boats","portapotty/portapotties","sauna/saunas","cottage/cottages","bank/banks","asylum/asylums","arcade/arcades","bar/bars","pub/pubs","nightclub/nightclubs","factory/factories","station/stations","firehouse/firehouses","safehouse/safehouses","warehouse/warehouses","bomb shelter/bomb shelters","homeless shelter/homeless shelters","firetruck/firetrucks","ambulance/ambulances","kitchen/kitchens","church/churches","distillery/distilleries","conservatory/conservatories","morgue/morgues","funeral home/funeral homes","courthouse/courthouses","trailer/trailers","theater/theaters","studio/studios","ring/rings","fort/forts","nursery/nurseries","library/libraries","hospital/hospitals","hostel/hostels","hotel/hostels","sanctuary/sanctuaries","bus/buses","post office/post offices","skyway/skyways","opera/operas","laboratory/laboratories","garage/garages","festival/festivals","carnival/carnivals","dispensary/dispensaries","beach/beaches","highway/highways","mountain/mountains","hill/hills","railroad/railroads","road/roads","hilltop/hilltops","park/parks","lakeside/lakesides","grassy plain/grassy plains","crater/craters","valley/valleys","volcano/volcanoes","island/islands","farm/farms","rooftop/rooftops","dance floor/dance floors","graveyard/graveyards","cemetary/cemetaries","field/fields","street/streets","battlefield/battlefields","wasteland/wastelands","playground/playgrounds","amusement park/amusement parks"];
    var dic_place_outdoor = ["beach/beaches", "highway/highways", "mountain/mountains", "hill/hills", "railroad/railroads", "road/roads", "hilltop/hilltops", "park/parks", "lakeside/lakesides", "grassy plain/grassy plains", "crater/craters", "valley/valleys", "volcano/volcanoes", "island/islands", "farm/farms", "rooftop/rooftops", "dance floor/dance floors", "graveyard/graveyards", "cemetary/cemetaries", "field/fields", "street/streets", "battlefield/battlefields", "wasteland/wastelands", "playground/playgrounds"];
    var dic_place_building = ["palace/palaces", "jail/jails", "tomb/tombs", "coffeeshop/coffeeshops", "tower/towers", "stable/stables", "barn/barns", "mansion/mansions", "castle/castles", "stadium/stadiums", "school/schools", "mall/malls", "store/stores", "shanty/shanties", "prison/prisons", "shack/shacks", "tent/tents", "outhouse/outhouses", "cottage/cottages", "asylum/asylums", "bar/bars", "pub/pubs", "nightclub/nightclubs", "factory/factories", "firehouse/firehouses", "safehouse/safehouses", "warehouse/warehouses", "bomb shelter/bomb shelters", "homeless shelter/homeless shelters", "church/churches", "distillery/distilleries", "conservatory/conservatories", "morgue/morgues", "funeral home/funeral homes", "courthouse/courthouses", "theater/theaters", "studio/studios", "fort/forts", "nursery/nurseries", "library/libraries", "hospital/hospitals", "hostel/hostels", "hotel/hostels", "post office/post offices", "laboratory/laboratories"];
    var dic_place_indoor = ["palace/palaces", "classroom/classrooms", "nest/nests", "office/offices", "ditch/ditches", "cave/caves", "house/houses", "bathroom/bathrooms", "bedroom/bedrooms", "town/towns", "jail/jails", "shop/shops", "tomb/tombs", "basement/basements", "dungeon/dungeons", "coffeeshop/coffeeshops", "tower/towers", "stable/stables", "barn/barns", "mansion/mansions", "castle/castles", "attic/attics", "cage/cages", "stadium/stadiums", "school/schools", "mall/malls", "store/stores", "stand/stands", "company/companies", "land/lands", "garden/gardens", "wonderland/wonderlands", "abyss/abysses", "shanty/shanties", "prison/prisons", "apartment/apartments", "closet/closets", "shack/shacks", "tent/tents", "car/cars", "van/vans", "alley/alleys", "forest/forests", "meadow/meadows", "outhouse/outhouses", "boat/boats", "portapotty/portapotties", "sauna/saunas", "cottage/cottages", "bank/banks", "asylum/asylums", "arcade/arcades", "bar/bars", "pub/pubs", "nightclub/nightclubs", "factory/factories", "station/stations", "firehouse/firehouses", "safehouse/safehouses", "warehouse/warehouses", "bomb shelter/bomb shelters", "homeless shelter/homeless shelters", "firetruck/firetrucks", "ambulance/ambulances", "kitchen/kitchens", "church/churches", "distillery/distilleries", "conservatory/conservatories", "morgue/morgues", "funeral home/funeral homes", "courthouse/courthouses", "trailer/trailers", "theater/theaters", "studio/studios", "ring/rings", "fort/forts", "nursery/nurseries", "library/libraries", "hospital/hospitals", "hostel/hostels", "hotel/hostels", "sanctuary/sanctuaries", "bus/buses", "post office/post offices", "skyway/skyways", "opera/operas", "laboratory/laboratories", "garage/garages", "festival/festivals", "carnival/carnivals", "dispensary/dispensaries"];
    var dic_place_natural = ["nest/nests", "ditch/ditches", "cave/caves", "land/lands", "forest/forests", "meadow/meadows", "beach/beaches", "mountain/mountains", "hill/hills", "hilltop/hilltops", "lakeside/lakesides", "grassy plain/grassy plains", "crater/craters", "valley/valleys", "volcano/volcanoes", "island/islands", "wasteland/wastelands"];
    dic_place = dic_place.concat(dic_place_outdoor,dic_place_building,dic_place_indoor,dic_place_natural);
    var dic_prefix=["pre","post","extra","intra","mega","exo","endo","bi","tri","quad","octo","a","anti","un","in","pseudo","penta","micro","macro","cardio","neuro","pyro","super","mini","psycho","trans","fore","semi","mid","under","over","mis","non","auto","circum","contra","homo","hyper","mono","sub","omni","uni"];
    var dic_prefix_scale = ["micro", "macro"];
    var dic_prefix_quantity = ["bi", "tri", "quad", "octo", "a", "anti", "un", "in", "pseudo", "penta", "mono", "sub", "omni"];
    var dic_prefix_position = ["pre", "post", "extra", "intra", "mega", "exo", "endo", "mid", "under", "over", "mis", "non", "auto", "circum", "contra", "homo", "hyper"];
    var dic_prefix_anatomy = ["cardio", "neuro", "pyro", "super", "mini", "psycho", "trans", "fore", "semi"];
    dic_prefix = dic_prefix.concat(dic_prefix_scale,dic_prefix_quantity,dic_prefix_position,dic_prefix_anatomy);
    var dic_prepos=["aboard","about","above","across","against","along","amid","among","around","as","at","behind","below","beneath","beside","besides","between","beyond","by","down","from","in","inside","into","near","of","off","on","onto","opposite","outside","over","past","round","through","to","toward","towards","under","underneath","up","upon","versus","via","with","within","without","after","before","during","despite","following","for","until","since","regarding"];
    var dic_prepos_time = ["after", "before", "during", "despite", "following", "for", "until", "since"];
    var dic_prepos_space = ["aboard", "about", "above", "across", "against", "along", "amid", "among", "around", "as", "at", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "by", "down", "from", "in", "inside", "into", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "round", "through", "to", "toward", "towards", "under", "underneath", "up", "upon", "versus", "via", "with", "within", "without"];
    dic_prepos = dic_prepos.concat(dic_prepos_time,dic_prepos_space);
    var dic_pron=["him/he/himself/his/his","her/she/herself/her/hers"];
    var dic_pron_male = ["him/he/himself/his/his"];
    dic_pron = dic_pron.concat(dic_pron_male);
    var dic_quality=["speed/faster/slower/fastest","size/bigger/smaller/biggest","wetness/wetter/drier/wettest","force/harder/softer/hardest","weight/heavier/lighter/heaviest","color/more colorful/duller/most colorful","luminosity/brighter/darker/brightest","power level/more powerful/weaker/most powerful","height/taller/shorter/tallest","length/longer/shorter/longest","width/wider/skinnier/widest","girth/girthier/less girthy/girthiest","race/racier/less racier/raciest","age/older/younger/oldest","gender/sexier/more gender neutral/sexiest","ethnicity/more ethnic/less ethnic/most ethnic","honesty/more thuthful/less truthful/most truthful"];
    var dic_quality_human = ["race/racier/less racier/raciest", "age/older/younger/oldest", "gender/sexier/more gender neutral/sexiest", "ethnicity/more ethnic/less ethnic/most ethnic"];
    var dic_quality_physical = ["speed/faster/slower/fastest", "size/bigger/smaller/biggest", "wetness/wetter/drier/wettest", "force/harder/softer/hardest", "weight/heavier/lighter/heaviest", "color/more colorful/duller/most colorful", "luminosity/brighter/darker/brightest", "power level/more powerful/weaker/most powerful", "height/taller/shorter/tallest", "length/longer/shorter/longest", "width/wider/skinnier/widest", "girth/girthier/less girthy/girthiest"];
    dic_quality = dic_quality.concat(dic_quality_human,dic_quality_physical);
    var dic_rel=["brother/brothers","father/fathers","grandpa/grandpas","uncle/uncles","boyfriend/boyfriends","husband/husbands","stepfather/stepfathers","godfather/godfathers","son/sons","grandson/grandsons","boy/boys","man/men","mommy/mommies","daddy/daddies","sister/sisters","mother/mothers","grandma/grandmas","stepmother/stepmothers","aunt/aunts","girlfriend/girlfriends","wife/wives","daughter/daughters","granddaughter/granddaughters","girl/girls","woman/women","friend/friends","cousin/cousins","colleague/colleagues","boss/bosses","master/masters","buddy/buddies","child/children","baby/babies","fella/fellas"];
    var dic_rel_female = ["mommy/mommies", "sister/sisters", "mother/mothers", "grandma/grandmas", "stepmother/stepmothers", "aunt/aunts", "girlfriend/girlfriends", "wife/wives", "daughter/daughters", "granddaughter/granddaughters", "girl/girls", "woman/women"];
    var dic_rel_male = ["brother/brothers", "father/fathers", "grandpa/grandpas", "uncle/uncles", "boyfriend/boyfriends", "husband/husbands", "stepfather/stepfathers", "godfather/godfathers", "son/sons", "grandson/grandsons", "boy/boys", "man/men", "daddy/daddies"];
    var dic_rel_neutral = ["friend/friends", "cousin/cousins", "colleague/colleagues", "boss/bosses", "master/masters", "buddy/buddies", "child/children", "baby/babies"];
    dic_rel = dic_rel.concat(dic_rel_female,dic_rel_male,dic_rel_neutral);
    var dic_say=["say/saying/said/says/sayer/said/saying","shoot/shooting/shot/shoots/shooter/shot/shooting","call/calling/called/calls/caller/called/calling","croak/croaking/croaked/croaks/croaker/croaked/croaking","cry/crying/cried/cries/cryer/cried/crying","whimper/whimpering/whimpered/whimpers/whimperer/whimpered/whimpering","mumble/mumbling/mumbled/mumbles/mumbler/mumbled/mumbling","scream/screaming/screamed/screams/screamer/screamed/screaming","shriek/shrieking/shrieked/shrieks/shrieker/shrieked/shrieking","moan/moaning/moaned/moans/moaner/moaned/moaning","shout/shouting/shouted/shouts/shouter/shouted/shouting","yell/yelling/yelled/yells/yeller/yelled/yelling","wail/wailing/wailed/wails/wailer/wailed/wailing","swear/swearing/swore/swears/swearer/sworn/swearing","bawl/bawling/bawled/bawls/bawler/bawled/bawling","snap/snapping/snapped/snaps/snapper/snapped/snapping","whisper/whispering/whispered/whispers/whisperer/whispered/whispering","cackle/cackling/cackled/cackles/cackler/cackled/cackling","grunt/grunting/grunted/grunts/grunter/grunted/grunting","roar/roaring/roared/roars/roarer/roared/roaring","snort/snorting/snorted/snorts/snorter/snorted/snorting","whine/whining/whined/whines/whiner/whined/whining","screech/screeching/screeched/screeches/screecher/screeched/screeching","squeal/squealing/squealed/squeals/squealer/squealed/squealing","hoot/hooting/hooted/hoots/hooter/hooted/hooting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","spit/spitting/spat/spits/spitter/spat/spitting","declare/declaring/declared/declares/declarer/declared/declaration","breathe/breathing/breathed/breathes/breather/breathed/breathing","announce/announcing/announced/announces/announcer/announced/announcing","snicker/snickering/snickered/snickers/snickerer/snickered/snickering","beep/beeping/beeped/beeps/beeper/beeped/beeping","exclaim/exclaiming/exclaimed/exclaims/exclaimer/exclaimed/exclamation","burp/burping/burped/burps/burper/burped/burping","laugh/laughing/laughed/laughs/laugher/laughed/laughter","mutter/muttering/muttered/mutters/mutterer/muttered/muttering","hiss/hissing/hissed/hisses/hisser/hissed/hissing"];
    dic_say = dic_say.concat();
    var dic_sconj=["after","although","as","as if","as long as","as much as","as soon as","as though","because","before","even","even if","even though","if","if only","if when","if then","inasmuch","in order that","just as","lest","now","now since","now that","now when","once","provided","provided that","rather than","since","so that","supposing","than","that","though","til","unless","until","when","whenever","where","whereas","where if","wherever","whether","which","while","who","whoever","why"];
    dic_sconj = dic_sconj.concat();
    var dic_sound=["bang/bangs","squelch/squelches","squeal/squeals","boom/booms","beep/beeps","crash/crashes","wail/wails","roar/roars","shatter/shatters","pop/pops","note/notes","thump/thumps","rumble/rumbles","scrape/scrapes","screech/screeches","flap/flaps","flutter/flutters","swoosh/swooshes","pound/pounds","slap/slaps","clang/clangs","toot/toots","tick/ticks","foom/fooms","rap/raps","tap/taps","shudder/shudders","crack/cracks"];
    dic_sound = dic_sound.concat();
    var dic_substance=["water","vomit","orange juice","sweat","blood","lava","gasoline","sand","oil","molten iron","grease","tears","ketchup","mustard","mayonnaise","soy sauce","beer","wine","vodka","olive oil","extravirgin olive oil","earwax","vinegar","paint","liquid nitrogen","tomato sauce","ink","lemonade","oatmeal","spaghetti","flour","sap","plasma","dark matter","antimatter","corn","snow","acid","magma","happiness","dick cheese","cum","lube","crotch juice","pee","piss","pisswater","diarrhea","jizz","urine"];
    var dic_substance_liquid = ["water", "vomit", "orange juice", "sweat", "blood", "lava", "gasoline", "sand", "oil", "molten iron", "grease", "tears", "ketchup", "mustard", "mayonnaise", "soy sauce", "beer", "wine", "vodka", "olive oil", "extravirgin olive oil", "earwax", "vinegar", "paint", "liquid nitrogen", "tomato sauce", "ink", "lemonade", "oatmeal", "spaghetti", "flour", "sap", "plasma", "dark matter", "antimatter", "corn", "snow", "acid", "magma", "happiness", "dick cheese", "cum", "lube", "crotch juice", "pee", "piss", "pisswater", "diarrhea", "jizz"];
    dic_substance = dic_substance.concat(dic_substance_liquid);
    var dic_surname=["Pollock","Washington","Hayne","Machler","Kaye","Murdock","Dick","Johnson","Jackson","Anderson","Smith","Bingley","Presley","Olson","Pederson","Clark","Stark","Lee","Meyer","Palin","Shaw","Andrews","Sampson","Mueller","Allan","Underwood","Cyrus","Harris","Lewis","Phillips","Thompson","Miller","Pratt","Griff","Wright","Jones","Brown","Davis","Wilson","Moore","Taylor","Thomas","White","Martin","Garcia","Martinez","Robinson","Rodriguez","Walker","Hall","Allen","Young","Hernandez","Underthun","Werdal","King","Lopez","Hill","Green","Adams","Baker","Gonzalez","Nelson","Carter","Mitchell","Roberts","Turner","Campbell","Parker","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan","Bell","Murphy","Bailey","Rivera","Cooper","Richardson","Sterling","Cox","Howard","Ward","Torres","Gray","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Ross","Jenkins","Perry","Long","Butler","Simmons","Russell","Bryant","McDonald","Little","Jacobs","Wang","Schroeder","Hartman","Woodard","Kemp","Glenn","Baxter","Bond","Nixon","Strong","Hurst","Farrell","Roth","Prince","Serrano","Glass","Knox","Randolph","Maynard","Foley","Chang","Bauer","Rivers","Walls","Sexton","Gentry","Leon","Barron","Estes","Middleton","Best","Dudley","Herman","Pennington","Solomon","Kerr","Chen","Blackburn","Gay","Avery","Hendricks","Barry","Horne","Meadows","Velentine","Church","Russo","Benton","Howe","Hinton","Tillman","Key","Peck","Morin","Gamble","Bentley","Stout","Petty","Osborn","Joyner","Rosario","Stein","Huber","Vanyo","Guthrie","Noel","Vang","Cooke","Wooten","Forbes","Hewitt"];
    dic_surname = dic_surname.concat();
    var dic_timeadv=["at sunrise","a month ago","a week ago","a day ago","an hour ago","a year ago","millions of years ago","billions of years ago","trillions of years ago","today","tonight","presently","now","just 5 minutes ago","5 minutes later","1 hour later","1 day later","1 week later","1 month later","6 months later","a year later","5 years later","10 years later","at the full moon","at sunset","later","recently","once again","never again","instantly","usually","yesterday","sometimes","occasionally","often","once in a while","never","frequently","once a week","daily","once a month","again","repeatedly","all the time","hardly","barely","several times","every night","this time","biweekly","centenially","every now and then","from now on","until further notice","for 10 weeks","for 36 hours","on Mondays","every Tuesday","profusely","perpetually"];
    var dic_timeadv_frequency = ["once again", "never again", "instantly", "usually", "yesterday", "sometimes", "occasionally", "often", "once in a while", "never", "frequently", "once a week", "daily", "once a month", "again", "repeatedly", "all the time", "hardly", "barely", "several times", "every night", "this time", "biweekly", "centenially", "every now and then", "from now on", "until further notice", "for 10 weeks", "for 36 hours", "on Mondays", "every Tuesday", "profusely"];
    var dic_timeadv_time = ["at sunrise", "a month ago", "a week ago", "a day ago", "an hour ago", "a year ago", "millions of years ago", "billions of years ago", "trillions of years ago", "today", "tonight", "presently", "now", "just 5 minutes ago", "5 minutes later", "1 hour later", "1 day later", "1 week later", "1 month later", "6 months later", "a year later", "5 years later", "10 years later", "at the full moon", "at sunset", "later", "recently"];
    var dic_timeadv_present = ["today", "tonight", "presently", "now"];
    dic_timeadv = dic_timeadv.concat(dic_timeadv_frequency,dic_timeadv_time,dic_timeadv_present);
    var dic_timenoun=["dawn/dawns","morning/mornings","noon/noons","day/days","afternoon/afternoons","evening/evenings","dusk/dusks","night/nights","midnight/midnights","Sunday/Sundays","Monday/Mondays","Tuesday/Tuesdays","Wednesday/Wednesdays","Thursday/Thursdays","Friday/Fridays","Saturday/Saturdays","January/Januaries","February/Februaries","March/Marches","April/Aprils","May/Mays","June/Junes","July/Julies","August/Augusts","September/Septembers","October/Octobers","November/Novembers","December/Decembers","New Year's Eve/New Year's Eves","New Year's Day/New Year's Days","Valentine's Day/Valentine's Days","Easter/Easters","Labor Day/Labor Days","Halloween/Halloweens","Thanksgiving/Thanksgivings","Christmas/Christmasses","Hanukkah/Hanukkahs","Black Friday/Black Fridays","Kwanzaa/Kwanzaas","Boxing Day/Boxing Days","Labor Day/Labor Days","Father's Day/Father's Days","Mother's Day/Mother's Days","Groundhog Day/Groundhog Days","millisecond/milliseconds","second/seconds","minute/minutes","hour/hours","day/days","month/months","year/years","century/centuries"];
    var dic_timenoun_holiday = ["New Year's Eve/New Year's Eves", "New Year's Day/New Year's Days", "Valentine's Day/Valentine's Days", "Easter/Easters", "Labor Day/Labor Days", "Halloween/Halloweens", "Thanksgiving/Thanksgivings", "Christmas/Christmasses", "Hanukkah/Hanukkahs", "Black Friday/Black Fridays", "Kwanzaa/Kwanzaas", "Boxing Day/Boxing Days", "Labor Day/Labor Days", "Father's Day/Father's Days", "Mother's Day/Mother's Days", "Groundhog Day/Groundhog Days"];
    var dic_timenoun_unit = ["millisecond/milliseconds", "second/seconds", "minute/minutes", "hour/hours", "day/days", "month/months", "year/years"];
    var dic_timenoun_month = ["January/Januaries", "February/Februaries", "March/Marches", "April/Aprils", "May/Mays", "June/Junes", "July/Julies", "August/Augusts", "September/Septembers", "October/Octobers", "November/Novembers", "December/Decembers"];
    var dic_timenoun_dayofweek = ["Sunday/Sundays", "Monday/Mondays", "Tuesday/Tuesdays", "Wednesday/Wednesdays", "Thursday/Thursdays", "Friday/Fridays", "Saturday/Saturdays"];
    var dic_timenoun_timeofday = ["dawn/dawns", "morning/mornings", "noon/noons", "day/days", "afternoon/afternoons", "evening/evenings", "dusk/dusks", "night/nights", "midnight/midnights"];
    dic_timenoun = dic_timenoun.concat(dic_timenoun_holiday,dic_timenoun_unit,dic_timenoun_month,dic_timenoun_dayofweek,dic_timenoun_timeofday);
    var dic_title=["Dr.","Sir","Honorable","Madam","King","Queen","Prince","Granny","Master","Mayor","Governor","Colonel","Sergeant","Daddy","Mama","Papa","Sensei","Dojo","Ms","Mrs.","Mr.","Mistress","Moist","Old","Professor"];
    dic_title = dic_title.concat();
    var dic_unit=["centimeter/centimeters/cm","meter/meters/m","kilometer/kilometers/km","inch/inches/in","foot/feet/ft","yard/yards/y","mile/miles/mi","lightyear/lightyears/ly","pound/pounds/lb","gram/grams/g","kilogram/kilograms/kg","ton/tons/t","megaton/megatons/Mt","ounce/ounces/oz","gallon/gallons/gal","bucket/buckets/bucket","liter/liters/L","teaspoon/teaspoons/tsp","cup/cups/c","quart/quarts/qt","pint/pints/pt","milliliter/milliliters/mL","tablespoon/tablespoons/tbsp","decibel/decibels/dB","pascal/pascals/Pa","kilopascal/kilopascals/kPa","cubic centimeter/cubic centimeters/cc","volt/volts/V","millivolt/millivolts/mV","kilovolt/kilovolts/kV","farad/farads/F","microfarad/microfarads/μF","joule/joules/J","kilojoule/kilojoules/kJ","ampere/amperes/A","milliampere/milliamperes/mA","watt/watts/W","kilowatt/kilowatts/kW","milliwatt/milliwatts/mW","megawatt/megawatts/MW","henry/henries/H"];
    var dic_unit_energy = ["volt/volts/V", "millivolt/millivolts/mV", "kilovolt/kilovolts/kV", "farad/farads/F", "microfarad/microfarads/μF", "joule/joules/J", "kilojoule/kilojoules/kJ", "ampere/amperes/A", "milliampere/milliamperes/mA", "watt/watts/W", "kilowatt/kilowatts/kW", "milliwatt/milliwatts/mW", "megawatt/megawatts/MW"];
    var dic_unit_small = ["centimeter/centimeters/cm", "milliliter/milliliters/mL", "millivolt/millivolts/mV", "microfarad/microfarads/μF", "milliampere/milliamperes/mA", "milliwatt/milliwatts/mW"];
    var dic_unit_pressure = ["decibel/decibels/dB", "pascal/pascals/Pa", "kilopascal/kilopascals/kPa"];
    var dic_unit_volume = ["gallon/gallons/gal", "bucket/buckets/bucket", "liter/liters/L", "teaspoon/teaspoons/tsp", "cup/cups/c", "quart/quarts/qt", "pint/pints/pt", "milliliter/milliliters/mL", "tablespoon/tablespoons/tbsp", "cubic centimeter/cubic centimeters/cc"];
    var dic_unit_potential = ["volt/volts/V", "millivolt/millivolts/mV", "kilovolt/kilovolts/kV"];
    var dic_unit_factor = ["centimeter/centimeters/cm", "kilometer/kilometers/km", "kilogram/kilograms/kg", "megaton/megatons/Mt", "milliliter/milliliters/mL", "kilopascal/kilopascals/kPa", "millivolt/millivolts/mV", "kilovolt/kilovolts/kV", "microfarad/microfarads/μF", "kilojoule/kilojoules/kJ", "milliampere/milliamperes/mA", "kilowatt/kilowatts/kW", "milliwatt/milliwatts/mW", "megawatt/megawatts/MW"];
    var dic_unit_large = ["kilometer/kilometers/km", "kilogram/kilograms/kg", "megaton/megatons/Mt", "kilopascal/kilopascals/kPa", "kilovolt/kilovolts/kV", "kilojoule/kilojoules/kJ", "kilowatt/kilowatts/kW", "megawatt/megawatts/MW"];
    var dic_unit_length = ["centimeter/centimeters/cm", "meter/meters/m", "kilometer/kilometers/km", "inch/inches/in", "foot/feet/ft", "yard/yards/y", "mile/miles/mi", "lightyear/lightyears/ly"];
    var dic_unit_power = ["watt/watts/W", "kilowatt/kilowatts/kW", "milliwatt/milliwatts/mW", "megawatt/megawatts/MW"];
    var dic_unit_current = ["ampere/amperes/A", "milliampere/milliamperes/mA"];
    var dic_unit_weight = ["pound/pounds/lb", "gram/grams/g", "kilogram/kilograms/kg", "ton/tons/t", "megaton/megatons/Mt", "ounce/ounces/oz"];
    var dic_unit_capacitance = ["farad/farads/F", "microfarad/microfarads/μF"];
    dic_unit = dic_unit.concat(dic_unit_energy,dic_unit_small,dic_unit_pressure,dic_unit_volume,dic_unit_potential,dic_unit_factor,dic_unit_large,dic_unit_length,dic_unit_power,dic_unit_current,dic_unit_weight,dic_unit_capacitance);
    var dic_verb=["whisper/whispering/whispered/whispers/whisperer/whispered/whispering","spelunk/spelunking/spelunked/spelunks/spelunker/spelunked/spelunking","invigorate/invigorating/invigorated/invigorates/invigorator/invigorated/invigoration","extrapolate/extrapolating/extrapolated/extrapolates/extrapolator/extrapolated/extrapolation","extrude/extruding/extruded/extrudes/extruder/extruded/extruding","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","articulate/articulating/articulated/articulates/articulator/articulated/articulation","transcribe/transcribing/transcribed/transcribes/transcriber/transcribed/transcribing","draft/drafting/drafted/drafts/drafter/drafted/drafting","tune/tuning/tuned/tunes/tuner/tuned/tunings","withdraw/withdrawing/withdrew/withdraws/withdrawer/withdrawn/withdrawing","strategize/strategizing/strategized/strategizes/strategizer/strategized/strategizing","zip/zipping/zipped/zips/zipper/zipped/zipping","extend/extending/extended/extends/extender/extended/extending","streamline/streamlining/streamlined/streamlines/streamliner/streamlined/streamlining","organize/organizing/organized/organizes/organizer/organized/organization","quantify/quantifying/quantified/quantifies/quantifier/quantified/quantification","grate/grating/grated/grates/grater/grated/grating","tape/taping/taped/tapes/taper/taped/taping","oil/oiling/oiled/oils/oiler/oiled/oiling","strap/strapping/strapped/straps/strapper/strapped/strapping","snoop/snooping/snooped/snoops/snooper/snooped/snooping","click/clicking/clicked/clicks/clicker/clicked/clicking","flap/flapping/flapped/flaps/flapper/flapped/flapping","cultivate/cultivating/cultivated/cultivates/cultivater/cultivated/cultivation","moan/moaning/moaned/moans/moaner/moaned/moaning","discipline/disciplining/disciplined/disciplines/discipliner/disciplined/discipline","rustle/rustling/rustled/rustles/rustler/rustled/rustling","examine/examining/examined/examines/examiner/examined/examination","fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling","stew/stewing/stewed/stews/stewer/stewed/stewing","stir/stirring/stirred/stirs/stirrer/stirred/stirring","hug/hugging/hugged/hugs/hugger/hugged/hugging","pop/popping/popped/pops/popper/popped/popping","hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping","sanitize/sanitizing/sanitized/sanitizes/sanitizer/sanitized/sanitization","clean/cleaning/cleaned/cleans/cleaner/cleaned/cleaning","touch/touching/touched/touches/toucher/touched/touching","vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration","strain/straining/strained/strains/strainer/strained/straining","kill/killing/killed/kills/killer/killed/killing","barbeque/barbequing/barbequed/barbeques/barbequer/barbequed/barbequing","gargle/gargling/gargled/gargles/gargler/gargled/gargling","crumple/crumpling/crumpled/crumples/crumpler/crumpled/crumpling","salt/salting/salted/salts/salter/salted/salting","season/seasoning/seasoned/seasons/seasoner/seasoned/seasoning","marinate/marinating/marinated/marinates/marinater/marinated/marination","pickle/pickling/pickled/pickles/pickler/pickled/pickling","polish/polishing/polished/polishes/polisher/polished/polishing","caress/caressing/caressed/caresses/caresser/caressed/caressing","stimulate/stimulating/stimulated/stimulates/stimulator/stimulated/stimulation","hunt/hunting/hunted/hunts/hunter/hunted/hunting","dishonor/dishonoring/dishonored/dishonors/dishonorer/dishonored/dishonoring","puff/puffing/puffed/puffs/puffer/puffed/puffing","suckle/suckling/suckled/suckles/suckler/suckled/suckling","squeeze/squeezing/squeezed/squeezes/squeezer/squeezed/squeezing","infest/infesting/infested/infests/infester/infested/infestation","tap/tapping/tapped/taps/tapper/tapped/tapping","probe/probing/probed/probes/proper/probed/probing","tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling","blast/blasting/blasted/blasts/blaster/blasted/blasting","shave/shaving/shaved/shaves/shaver/shaved/shaving","wrinkle/wrinkling/wrinkled/wrinkles/wrinkler/wrinkled/wrinkling","kiss/kissing/kissed/kisses/kisser/kissed/kissing","cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling","soak/soaking/soaked/soaks/soaker/soaked/soaking","grip/gripping/gripped/grips/gripper/gripped/gripping","jerk/jerking/jerked/jerks/jerker/jerked/jerking","scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing","mist/misting/misted/mists/mister/misted/misting","burn/burning/burned/burns/burner/burnt/burning","freeze/freezing/froze/freezes/freezer/frozen/freezing","dryfreeze/dryfreezing/dryfroze/dryfreezes/dryfreezer/dryfrozen/dryfreezing","bake/baking/baked/bakes/baker/baked/baking","deepfry/deepfrying/deepfried/deepfries/deepfrier/deepfried/deepfrying","swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing","flatten/flattening/flattened/flattens/flattener/flattened/flattening","glue/gluing/glued/glues/gluer/glued/gluing","rub/rubbing/rubbed/rubs/rubber/rubbed/rubbing","swipe/swiping/swiped/swipes/swiper/swiped/swiping","rot/rotting/rotted/rots/rotter/rotten/rotting","sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture","iron/ironing/ironed/irons/ironer/ironed/ironing","roll/rolling/rolled/rolls/roller/rolled/rolling","slit/slitting/slit/slits/slitter/slit/slitting","cut/cutting/cut/cuts/cutter/cut/cutting","loosen/loosening/loosened/loosens/loosener/loosened/loosening","tighten/tightening/tightened/tightens/tightener/tightened/tightening","penetrate/penetrating/penetrated/penetrates/penetrator/penetrated/penetration","strike/striking/struck/strikes/striker/stricken/striking","recycle/recycling/recycled/recycles/recycler/recycled/recycling","groom/grooming/groomed/grooms/groomer/groomed/grooming","hypnotize/hypnotizing/hypnotized/hypnotizes/hypnotist/hypnotized/hypnosis","dig/digging/dug/digs/digger/dug/digging","crush/crushing/crushed/crushes/crusher/crushed/crushing","cook/cooking/cooked/cooks/cooker/cooked/cooking","rattle/rattling/rattled/rattles/rattler/rattled/rattling","massage/massaging/massaged/massages/massager/massaged/massage","toke/toking/toked/tokes/toker/toked/toking","pull/pulling/pulled/pulls/puller/pulled/pulling","yank/yanking/yanked/yanks/yanker/yanked/yanking","dice/dicing/diced/dices/dicer/diced/dicing","chop/chopping/chopped/chops/chopper/chopped/chopping","boil/boiling/boiled/boils/boiler/boiled/boiling","uproot/uprooting/uprooted/uproots/uprooter/uprooted/uprooting","clip/clipping/clipped/clips/clipper/clipped/clipping","stroke/stroking/stroked/strokes/stroker/stroked/stroking","plaster/plastering/plastered/plasters/plasterer/plastered/plastering","scrunch/scrunching/scrunched/scrunches/scruncher/scrunched/scrunching","superglue/supergluing/superglued/superglues/supergluer/superglued/supergluing","embrace/embracing/embraced/embraces/embracer/embraced/embrace","smoke/smoking/smoked/smokes/smoker/smoked/smoking","moisten/moistening/moistened/moistens/moistener/moistened/moisturization","flick/flicking/flicked/flicks/flicker/flicked/flicking","scorch/scorching/scorched/scorches/scorcher/scorched/scorching","scold/scolding/scolded/scolds/scolder/scolded/scolding","punish/punishing/punished/punishes/punisher/punished/punishment","handle/handling/handled/handles/handler/handled/handling","manipulate/manipulating/manipulated/manipulates/manipulator/manipulated/manipulation","exploit/exploiting/exploited/exploits/exploiter/exploited/exploitation","misuse/misusing/misused/misuses/misuser/misused/misuse","breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding","pillage/pillaging/pillaged/pillages/pillager/pillaged/pillaging","eliminate/eliminating/eliminated/eliminates/eliminater/eliminated/elimination","waste/wasting/wasted/wastes/waster/wasted/wasting","grind/grinding/grinded/grinds/grinder/ground/grinding","fight/fighting/fought/fights/fighter/fighted/fighting","stuff/stuffing/stuffed/stuffs/stuffer/stuffed/stuffing","fume/fuming/fumed/fumes/fumer/fumed/fuming","stand/standing/stood/stands/stander/stood/standing","sit/sitting/sat/sits/sitter/sat/sitting","lay/laying/laid/lays/layer/laid/laying","crouch/crouching/crouched/crouches/croucher/crouched/crouching","squat/squatting/squatted/squats/squatter/squatted/squatting","slurp/slurping/slurped/slurps/slurper/slurped/slurping","lick/licking/licked/licks/licker/licked/licking","snort/snorting/snorted/snorts/snorter/snorted/snorting","eat/eating/ate/eats/eater/eaten/eating","suck/sucking/sucked/sucks/sucker/sucked/sucking","snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling","guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling","sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing","nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling","spurt/spurting/spurted/spurts/spurter/spurted/spurting","smear/smearing/smeared/smears/smearer/smeared/smearing","paint/painting/painted/paints/painter/painted/painting","shower/showering/showered/showers/showerer/showered/showering","sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering","drain/draining/drained/drains/drainer/drained/draining","smatter/smattering/smattered/smatters/smatterer/smattered/smattering","splatter/splattering/splattered/splatters/splatterer/splattered/splattering","spray/spraying/sprayed/sprays/sprayer/sprayed/spraying","jetspray/jetspraying/jetsprayed/jetsprays/jetsprayer/jetsprayed/jetspraying","squirt/squirting/squirted/squirts/squirter/squirted/squirting","sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling","drip/dripping/dripped/drips/dripper/dripped/dripping","piss/pissing/pissed/pisses/pisser/pissed/pissing","pour/pouring/poured/pours/pourer/poured/pouring","splash/splashing/splashed/splashes/splasher/splashed/splashing","tremble/trembling/trembled/trembles/trembler/trembled/trembling","waddle/waddling/waddled/woddles/woddler/waddled/waddling","wiggle/wiggling/wiggled/wiggles/wiggler/wiggled/wiggling","slam/slamming/slammed/slams/slammer/slammed/slamming","kick/kicking/kicked/kicks/kicker/kicked/kicking","smack/smacking/smacked/smacks/smacker/smacked/smacking","stomp/stomping/stomped/stomps/stomper/stomped/stomping","shoot/shooting/shot/shoots/shooter/shot/shooting","screw/screwing/screwed/screws/screwer/screwed/screwing","pump/pumping/pumped/pumps/pumper/pumped/pumping","hack/hacking/hacked/hacks/hacker/hacked/hacking","poke/poking/poked/pokes/poker/poked/poking","crank/cranking/cranked/cranks/cranker/cranked/cranking","serve/serving/served/serves/server/served/serving","force/forcing/forced/forces/forcer/forced/forcing","stick/sticking/stuck/sticks/sticker/stuck/sticking","move/moving/moved/moves/mover/moved/moving","bind/binding/bound/binds/binder/bound/binding","staple/stapling/stapled/staples/stapler/stapled/stapling","eject/ejecting/ejected/ejects/ejector/ejected/ejection","crunch/crunching/crunched/crunches/cruncher/crunched/crunching","squish/squishing/squished/squishes/squisher/squished/squishing","prod/prodding/prodded/prods/prodder/prodded/prodding","wedge/wedging/wedged/wedges/wedger/wedged/wedging","blow/blowing/blew/blows/blower/blown/blowing","knead/kneading/kneaded/kneads/kneader/kneaded/kneading","twist/twisting/twisted/twists/twister/twisted/twisting","throw/throwing/threw/throws/thrower/thrown/throwing","fly/flying/flew/flies/flier/flown/flying","shake/shaking/shook/shakes/shaker/shaken/shaking","bang/banging/banged/bangs/banger/banged/banging","press/pressing/pressed/presses/presser/pressed/pressing","inject/injecting/injected/injects/injector/injected/injection","slip/slipping/slipped/slips/slipper/slipped/slipping","rip/ripping/ripped/rips/ripper/ripped/ripping","joust/jousting/jousted/jousts/jouster/jousted/jousting","slouch/slouching/slouched/slouches/sloucher/slouched/slouching","walk/walking/walked/walks/walker/walked/walking","skip/skipping/skipped/skips/skipper/skipped/skipping","march/marching/marched/marches/marcher/marched/marching","run/running/ran/runs/runner/run/running","stampede/stampeding/stampeded/stampedes/stampeder/stampeded/stampeding","strut/strutting/strutted/struts/strutter/strutted/strutting","tiptoe/tiptoeing/tiptoed/tiptoes/tiptoer/tiptoed/tiptoeing","sprint/sprinting/sprinted/sprints/sprinter/sprinted/sprinting","gallop/galloping/galloped/gallops/galloper/galloped/galloping","crawl/crawling/crawled/crawls/crawler/crawled/crawling","trot/trotting/trotted/trots/trotter/trotted/trotting","pluck/plucking/plucked/plucks/plucker/plucked/plucking","bite/biting/bit/bites/biter/bitten/biting","fart/farting/farted/farts/farter/farted/farting","manhandle/manhandling/manhandled/manhandles/manhandler/manhandled/manhandling","maul/mauling/mauled/mauls/mauler/mauled/mauling","whip/whipping/whipped/whips/whipper/whipped/whipping","dominate/dominating/dominated/dominates/dominator/dominated/domination","punch/punching/punched/punches/puncher/punched/punching","headbutt/headbutting/headbutted/headbutts/headbutter/headbutted/headbutting","impale/impaling/impaled/impales/impaler/impaled/impalement","scratch/scratching/scratched/scratches/scratcher/scratched/scratching","grab/grabbing/grabbed/grabs/grabber/grabbed/grabbing","snip/snipping/snipped/snips/snipper/snipped/snipping","shatter/shattering/shattered/shatters/shatterer/shattered/shattering","slap/slapping/slapped/slaps/slapper/slapped/slapping","tickle/tickling/tickled/tickles/tickler/tickled/tickling","stab/stabbing/stabbed/stabs/stabber/stabbed/stabbing","strangle/strangling/strangled/strangles/strangler/strangled/strangulation","decapitate/decapitating/decapitated/decapitates/decapitater/decapitated/decapitation","behead/beheading/beheaded/beheads/beheader/beheaded/beheading","dangle/dangling/dangled/dangles/dangler/dangled/dangling","hang/hanging/hung/hangs/hanger/hanged/hanging","gouge/gouging/gouged/gouges/gouger/gouged/gouging","electrocute/electrocuting/electrocuted/electrocutes/electrocuter/electrocuted/electrocution","slash/slashing/slashed/slashes/slasher/slashed/slashing","hammer/hammering/hammered/hammers/hammerer/hammered/hammering","bludgeon/bludgeoning/bludgeoned/bludgeons/bludgeoner/bludgeoned/bludgeoning","pierce/piercing/pierced/pierces/piercer/pierced/piercing","skewer/skewering/skewered/skewers/skewerer/skewered/skewering","spank/spanking/spanked/spanks/spanker/spanked/spanking","vomit/vomiting/vomited/vomits/vomiter/vomited/vomiting","pinch/pinching/pinched/pinches/pincher/pinched/pinching","shove/shoving/shoved/shoves/shover/shoved/shoving","amputate/amputating/amputated/amputates/amputator/amputated/amputation","throttle/throttling/throttled/throttles/throttler/throttled/throttling","implode/imploding/imploded/implodes/imploder/imploded/implosion","explode/exploding/exploded/explodes/exploder/exploded/explosion","twang/twanging/twanged/twangs/twanger/twanged/twanging","veto/vetoing/vetoed/vetoes/vetoer/vetoed/vetoing","elect/electing/elected/elects/electer/elected/election","ratify/ratifying/ratified/ratifies/ratifier/ratified/ratification","amend/amending/amended/amends/amender/amended/amendment","impeach/impeaching/impeached/impeaches/impeacher/impeached/impeachment","inaugurate/inaugurating/inaugurated/inaugurates/inaugurater/inaugurated/inauguration","petition/petitioning/petitioned/petitions/petitioner/petitioned/petitioning","cremate/cremating/cremated/cremates/cremater/cremated/cremation","sue/suing/sued/sues/suer/sued/suing","prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution","convict/convicting/convicted/convicts/convicter/convicted/conviction","legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization","bathe/bathing/bathed/bathes/bather/bathed/bathing","sleepwalk/sleepwalking/sleepwalked/sleepwalks/sleepwalker/sleepwalked/sleepwalking","abduct/abducting/abducted/abducts/abductor/abducted/abduction","abolish/abolishing/abolished/abolishes/abolisher/abolished/abolishment","apprehend/apprehending/apprehended/apprehends/apprehender/apprehended/apprehension","assault/assaulting/assaulted/assaults/assaulter/assaulted/assault","attack/attacking/attacked/attacks/attacker/attacked/attack","authenticate/authenticating/authenticated/authenticates/authenticator/authenticated/authentication","choke/choking/choked/chokes/choker/choked/choking","commandeer/commandeering/commandeered/commandeers/commandeerer/commandeered/commandeering","conserve/conserving/conserved/conserves/conserver/conserved/conservation","crash/crashing/crashed/crashes/crasher/crashed/crashing","cram/cramming/crammed/crams/crammer/crammed/cramming","cripple/crippling/crippled/cripples/crippler/crippled/crippling","customize/customizing/customized/customizes/customizer/customized/customization","decorate/decorating/decorated/decorates/decorator/decorated/decoration","dissect/dissecting/dissected/dissects/dissector/dissected/dissection","dramatize/dramatizing/dramatized/dramatizes/dramatizer/dramatized/dramatization","feed/feeding/fed/feeds/feeder/fed/feeding","forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting","gnaw/gnawing/gnawed/gnaws/gnawer/gnawed/gnawing","harass/harassing/harassed/harasses/harasser/harassed/harassment","hoist/hostng/hoisted/hoists/hoister/hoisted/hoisting","hurl/hurling/hurled/hurls/hurler/hurled/hurling","injure/injuring/injured/injures/injurer/injured/injury","jingle/jingling/jingled/jingles/jingler/jingled/jingling","jimmy/jimmying/jimmied/jimmies/jimmier/jimmied/jimmying","kidnap/kidnapping/kidnapped/kidnaps/kidnapper/kidnapped/kidnapping","lecture/lecturing/lectured/lectures/lecturer/lectured/lecturing","lunge/lunging/lunged/lunges/lunger/lunged/lunging","jump/jumping/jumped/jumps/jumper/jumped/jumping","mangle/mangling/mangled/mangles/mangler/mangled/mangling","maim/maiming/maimed/maims/maimer/maimed/maiming","mutilate/mutilating/mutilated/mutilates/mutilater/mutilated/mutilation","nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing","nail/nailing/nailed/nails/nailer/nailed/nailing","nip/nipping/nipped/nips/nipper/nipped/nipping","preen/preening/preened/preens/preener/preened/preening","ride/riding/rode/rides/rider/ridden/riding","rob/robbing/robbed/robs/robber/robbed/robbery","sharpen/sharpening/sharpened/sharpens/sharpener/sharpened/sharpening","snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling","gush/gushing/gushed/gushes/gusher/gushed/gushing","puke/puking/puked/pukes/puker/puked/puking","donate/donating/donated/donates/donater/donated/donation","purify/purifying/purified/purifies/purifier/purified/purification","rapture/rapturing/raptured/raptures/rapturer/raptured/rapture","toast/toasting/toasted/toasts/toaster/toasted/toasting","liquidate/liquidating/liquidated/liquidates/liquidator/liquidated/liquidation","lather/lathering/lathered/lathers/latherer/lathered/lathering","masticate/masticating/masticated/masticates/masticater/masticated/mastication","chew/chewing/chewed/chews/chewer/chewed/chewing","rotate/rotating/rotated/rotates/rotator/rotated/rotation","push/pushing/pushed/pushes/pusher/pushed/pushing","chill/chilling/chilled/chills/chiller/chilled/chilling","report/reporting/reported/reports/reporter/reported/reporting","plunge/plunging/plunged/plunges/plunger/plunged/plunging","ram/ramming/rammed/rams/rammer/rammed/ramming","vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization","erect/erecting/erected/erects/erector/erected/erection","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","fertilize/fertilizing/fertilized/fertilizes/fertilizer/fertilized/fertilization","please/pleasing/pleased/pleases/pleaser/pleasted/pleasing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","mount/mounting/mounted/mounts/mounter/mounted/mounting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation","fellate/fellating/fellated/fellates/fellater/fellated/fellatio","titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking","turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration","grope/groping/groped/gropes/groper/groped/groping","twerk/twerking/twerked/twerks/twerker/twerked/twerking","defecate/defecating/defecated/defecates/defecator/defecated/defecation","urinate/urinating/urinated/urinates/urinator/urinated/urination","finger/fingering/fingered/fingers/fingerer/fingered/fingering"];
    var dic_verb_eat = ["slurp/slurping/slurped/slurps/slurper/slurped/slurping", "lick/licking/licked/licks/licker/licked/licking", "snort/snorting/snorted/snorts/snorter/snorted/snorting", "eat/eating/ate/eats/eater/eaten/eating", "suck/sucking/sucked/sucks/sucker/sucked/sucking", "snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling", "guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling", "gnaw/gnawing/gnawed/gnaws/gnawer/gnawed/gnawing", "nip/nipping/nipped/nips/nipper/nipped/nipping", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "chew/chewing/chewed/chews/chewer/chewed/chewing"];
    var dic_verb_move = ["lunge/lunging/lunged/lunges/lunger/lunged/lunging", "jump/jumping/jumped/jumps/jumper/jumped/jumping", "push/pushing/pushed/pushes/pusher/pushed/pushing", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration"];
    var dic_verb_insert = ["screw/screwing/screwed/screws/screwer/screwed/screwing", "poke/poking/poked/pokes/poker/poked/poking", "stick/sticking/stuck/sticks/sticker/stuck/sticking", "prod/prodding/prodded/prods/prodder/prodded/prodding", "wedge/wedging/wedged/wedges/wedger/wedged/wedging", "inject/injecting/injected/injects/injector/injected/injection", "cram/cramming/crammed/crams/crammer/crammed/cramming", "feed/feeding/fed/feeds/feeder/fed/feeding", "forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting", "nail/nailing/nailed/nails/nailer/nailed/nailing", "push/pushing/pushed/pushes/pusher/pushed/pushing", "plunge/plunging/plunged/plunges/plunger/plunged/plunging", "ram/ramming/rammed/rams/rammer/rammed/ramming", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting"];
    var dic_verb_sex = ["stroke/stroking/stroked/strokes/stroker/stroked/stroking", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "please/pleasing/pleased/pleases/pleaser/pleasted/pleasing", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "mount/mounting/mounted/mounts/mounter/mounted/mounting", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation", "fellate/fellating/fellated/fellates/fellater/fellated/fellatio", "titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking", "turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification"];
    var dic_verb_intransitive = ["moan/moaning/moaned/moans/moaner/moaned/moaning", "rustle/rustling/rustled/rustles/rustler/rustled/rustling", "fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling", "hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping", "vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration", "strain/straining/strained/strains/strainer/strained/straining", "tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling", "shave/shaving/shaved/shaves/shaver/shaved/shaving", "kiss/kissing/kissed/kisses/kisser/kissed/kissing", "cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling", "soak/soaking/soaked/soaks/soaker/soaked/soaking", "jerk/jerking/jerked/jerks/jerker/jerked/jerking", "scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing", "burn/burning/burned/burns/burner/burnt/burning", "freeze/freezing/froze/freezes/freezer/frozen/freezing", "bake/baking/baked/bakes/baker/baked/baking", "swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing", "flatten/flattening/flattened/flattens/flattener/flattened/flattening", "rot/rotting/rotted/rots/rotter/rotten/rotting", "sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture", "roll/rolling/rolled/rolls/roller/rolled/rolling", "cut/cutting/cut/cuts/cutter/cut/cutting", "dig/digging/dug/digs/digger/dug/digging", "cook/cooking/cooked/cooks/cooker/cooked/cooking", "rattle/rattling/rattled/rattles/rattler/rattled/rattling", "pull/pulling/pulled/pulls/puller/pulled/pulling", "yank/yanking/yanked/yanks/yanker/yanked/yanking", "boil/boiling/boiled/boils/boiler/boiled/boiling", "plaster/plastering/plastered/plasters/plasterer/plastered/plastering", "smoke/smoking/smoked/smokes/smoker/smoked/smoking", "flick/flicking/flicked/flicks/flicker/flicked/flicking", "scorch/scorching/scorched/scorches/scorcher/scorched/scorching", "breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding", "waste/wasting/wasted/wastes/waster/wasted/wasting", "fume/fuming/fumed/fumes/fumer/fumed/fuming", "stand/standing/stood/stands/stander/stood/standing", "sit/sitting/sat/sits/sitter/sat/sitting", "lay/laying/laid/lays/layer/laid/laying", "crouch/crouching/crouched/crouches/croucher/crouched/crouching", "squat/squatting/squatted/squats/squatter/squatted/squatting", "slurp/slurping/slurped/slurps/slurper/slurped/slurping", "lick/licking/licked/licks/licker/licked/licking", "snort/snorting/snorted/snorts/snorter/snorted/snorting", "eat/eating/ate/eats/eater/eaten/eating", "snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "spurt/spurting/spurted/spurts/spurter/spurted/spurting", "paint/painting/painted/paints/painter/painted/painting", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "drain/draining/drained/drains/drainer/drained/draining", "smatter/smattering/smattered/smatters/smatterer/smattered/smattering", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "drip/dripping/dripped/drips/dripper/dripped/dripping", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "bathe/bathing/bathed/bathes/bather/bathed/bathing", "snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling", "puke/puking/puked/pukes/puker/puked/puking", "lather/lathering/lathered/lathers/latherer/lathered/lathering", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "chew/chewing/chewed/chews/chewer/chewed/chewing", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration", "twerk/twerking/twerked/twerks/twerker/twerked/twerking", "defecate/defecating/defecated/defecates/defecator/defecated/defecation", "urinate/urinating/urinated/urinates/urinator/urinated/urination"];
    var dic_verb_liquid = ["spurt/spurting/spurted/spurts/spurter/spurted/spurting", "smear/smearing/smeared/smears/smearer/smeared/smearing", "paint/painting/painted/paints/painter/painted/painting", "shower/showering/showered/showers/showerer/showered/showering", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "drain/draining/drained/drains/drainer/drained/draining", "smatter/smattering/smattered/smatters/smatterer/smattered/smattering", "splatter/splattering/splattered/splatters/splatterer/splattered/splattering", "spray/spraying/sprayed/sprays/sprayer/sprayed/spraying", "jetspray/jetspraying/jetsprayed/jetsprays/jetsprayer/jetsprayed/jetspraying", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "drip/dripping/dripped/drips/dripper/dripped/dripping", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "pour/pouring/poured/pours/pourer/poured/pouring", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "gush/gushing/gushed/gushes/gusher/gushed/gushing", "puke/puking/puked/pukes/puker/puked/puking", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation", "defecate/defecating/defecated/defecates/defecator/defecated/defecation", "urinate/urinating/urinated/urinates/urinator/urinated/urination"];
    var dic_verb_transitive = ["invigorate/invigorating/invigorated/invigorates/invigorator/invigorated/invigoration", "extrapolate/extrapolating/extrapolated/extrapolates/extrapolator/extrapolated/extrapolation", "extrude/extruding/extruded/extrudes/extruder/extruded/extruding", "squelch/squelching/squelched/squelches/squelcher/squelched/squelching", "articulate/articulating/articulated/articulates/articulator/articulated/articulation", "transcribe/transcribing/transcribed/transcribes/transcriber/transcribed/transcribing", "draft/drafting/drafted/drafts/drafter/drafted/drafting", "tune/tuning/tuned/tunes/tuner/tuned/tunings", "withdraw/withdrawing/withdrew/withdraws/withdrawer/withdrawn/withdrawing", "strategize/strategizing/strategized/strategizes/strategizer/strategized/strategizing", "zip/zipping/zipped/zips/zipper/zipped/zipping", "extend/extending/extended/extends/extender/extended/extending", "streamline/streamlining/streamlined/streamlines/streamliner/streamlined/streamlining", "organize/organizing/organized/organizes/organizer/organized/organization", "quantify/quantifying/quantified/quantifies/quantifier/quantified/quantification", "grate/grating/grated/grates/grater/grated/grating", "tape/taping/taped/tapes/taper/taped/taping", "oil/oiling/oiled/oils/oiler/oiled/oiling", "strap/strapping/strapped/straps/strapper/strapped/strapping", "cultivate/cultivating/cultivated/cultivates/cultivater/cultivated/cultivation", "discipline/disciplining/disciplined/disciplines/discipliner/disciplined/discipline", "examine/examining/examined/examines/examiner/examined/examination", "stew/stewing/stewed/stews/stewer/stewed/stewing", "stir/stirring/stirred/stirs/stirrer/stirred/stirring", "hug/hugging/hugged/hugs/hugger/hugged/hugging", "pop/popping/popped/pops/popper/popped/popping", "sanitize/sanitizing/sanitized/sanitizes/sanitizer/sanitized/sanitization", "clean/cleaning/cleaned/cleans/cleaner/cleaned/cleaning", "touch/touching/touched/touches/toucher/touched/touching", "strain/straining/strained/strains/strainer/strained/straining", "kill/killing/killed/kills/killer/killed/killing", "barbeque/barbequing/barbequed/barbeques/barbequer/barbequed/barbequing", "gargle/gargling/gargled/gargles/gargler/gargled/gargling", "crumple/crumpling/crumpled/crumples/crumpler/crumpled/crumpling", "salt/salting/salted/salts/salter/salted/salting", "season/seasoning/seasoned/seasons/seasoner/seasoned/seasoning", "marinate/marinating/marinated/marinates/marinater/marinated/marination", "pickle/pickling/pickled/pickles/pickler/pickled/pickling", "polish/polishing/polished/polishes/polisher/polished/polishing", "caress/caressing/caressed/caresses/caresser/caressed/caressing", "stimulate/stimulating/stimulated/stimulates/stimulator/stimulated/stimulation", "hunt/hunting/hunted/hunts/hunter/hunted/hunting", "dishonor/dishonoring/dishonored/dishonors/dishonorer/dishonored/dishonoring", "puff/puffing/puffed/puffs/puffer/puffed/puffing", "suckle/suckling/suckled/suckles/suckler/suckled/suckling", "squeeze/squeezing/squeezed/squeezes/squeezer/squeezed/squeezing", "infest/infesting/infested/infests/infester/infested/infestation", "tap/tapping/tapped/taps/tapper/tapped/tapping", "probe/probing/probed/probes/proper/probed/probing", "blast/blasting/blasted/blasts/blaster/blasted/blasting", "shave/shaving/shaved/shaves/shaver/shaved/shaving", "wrinkle/wrinkling/wrinkled/wrinkles/wrinkler/wrinkled/wrinkling", "kiss/kissing/kissed/kisses/kisser/kissed/kissing", "cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling", "soak/soaking/soaked/soaks/soaker/soaked/soaking", "grip/gripping/gripped/grips/gripper/gripped/gripping", "jerk/jerking/jerked/jerks/jerker/jerked/jerking", "scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing", "mist/misting/misted/mists/mister/misted/misting", "burn/burning/burned/burns/burner/burnt/burning", "freeze/freezing/froze/freezes/freezer/frozen/freezing", "dryfreeze/dryfreezing/dryfroze/dryfreezes/dryfreezer/dryfrozen/dryfreezing", "bake/baking/baked/bakes/baker/baked/baking", "deepfry/deepfrying/deepfried/deepfries/deepfrier/deepfried/deepfrying", "swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing", "flatten/flattening/flattened/flattens/flattener/flattened/flattening", "glue/gluing/glued/glues/gluer/glued/gluing", "rub/rubbing/rubbed/rubs/rubber/rubbed/rubbing", "swipe/swiping/swiped/swipes/swiper/swiped/swiping", "sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture", "iron/ironing/ironed/irons/ironer/ironed/ironing", "roll/rolling/rolled/rolls/roller/rolled/rolling", "slit/slitting/slit/slits/slitter/slit/slitting", "cut/cutting/cut/cuts/cutter/cut/cutting", "loosen/loosening/loosened/loosens/loosener/loosened/loosening", "tighten/tightening/tightened/tightens/tightener/tightened/tightening", "penetrate/penetrating/penetrated/penetrates/penetrator/penetrated/penetration", "strike/striking/struck/strikes/striker/stricken/striking", "recycle/recycling/recycled/recycles/recycler/recycled/recycling", "groom/grooming/groomed/grooms/groomer/groomed/grooming", "hypnotize/hypnotizing/hypnotized/hypnotizes/hypnotist/hypnotized/hypnosis", "dig/digging/dug/digs/digger/dug/digging", "crush/crushing/crushed/crushes/crusher/crushed/crushing", "cook/cooking/cooked/cooks/cooker/cooked/cooking", "massage/massaging/massaged/massages/massager/massaged/massage", "toke/toking/toked/tokes/toker/toked/toking", "pull/pulling/pulled/pulls/puller/pulled/pulling", "yank/yanking/yanked/yanks/yanker/yanked/yanking", "dice/dicing/diced/dices/dicer/diced/dicing", "chop/chopping/chopped/chops/chopper/chopped/chopping", "boil/boiling/boiled/boils/boiler/boiled/boiling", "uproot/uprooting/uprooted/uproots/uprooter/uprooted/uprooting", "clip/clipping/clipped/clips/clipper/clipped/clipping", "stroke/stroking/stroked/strokes/stroker/stroked/stroking", "plaster/plastering/plastered/plasters/plasterer/plastered/plastering", "scrunch/scrunching/scrunched/scrunches/scruncher/scrunched/scrunching", "superglue/supergluing/superglued/superglues/supergluer/superglued/supergluing", "embrace/embracing/embraced/embraces/embracer/embraced/embrace", "smoke/smoking/smoked/smokes/smoker/smoked/smoking", "moisten/moistening/moistened/moistens/moistener/moistened/moisturization", "flick/flicking/flicked/flicks/flicker/flicked/flicking", "scorch/scorching/scorched/scorches/scorcher/scorched/scorching", "scold/scolding/scolded/scolds/scolder/scolded/scolding", "punish/punishing/punished/punishes/punisher/punished/punishment", "handle/handling/handled/handles/handler/handled/handling", "manipulate/manipulating/manipulated/manipulates/manipulator/manipulated/manipulation", "exploit/exploiting/exploited/exploits/exploiter/exploited/exploitation", "misuse/misusing/misused/misuses/misuser/misused/misuse", "breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding", "pillage/pillaging/pillaged/pillages/pillager/pillaged/pillaging", "eliminate/eliminating/eliminated/eliminates/eliminater/eliminated/elimination", "waste/wasting/wasted/wastes/waster/wasted/wasting", "grind/grinding/grinded/grinds/grinder/ground/grinding", "fight/fighting/fought/fights/fighter/fighted/fighting", "stuff/stuffing/stuffed/stuffs/stuffer/stuffed/stuffing", "eat/eating/ate/eats/eater/eaten/eating", "suck/sucking/sucked/sucks/sucker/sucked/sucking", "guzzle/guzzling/guzzled/guzzles/guzzler/guzzled/guzzling", "sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing", "nibble/nibbling/nibbled/nibbles/nibbler/nibbled/nibbling", "spurt/spurting/spurted/spurts/spurter/spurted/spurting", "smear/smearing/smeared/smears/smearer/smeared/smearing", "paint/painting/painted/paints/painter/painted/painting", "shower/showering/showered/showers/showerer/showered/showering", "sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering", "drain/draining/drained/drains/drainer/drained/draining", "splatter/splattering/splattered/splatters/splatterer/splattered/splattering", "spray/spraying/sprayed/sprays/sprayer/sprayed/spraying", "jetspray/jetspraying/jetsprayed/jetsprays/jetsprayer/jetsprayed/jetspraying", "squirt/squirting/squirted/squirts/squirter/squirted/squirting", "sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling", "drip/dripping/dripped/drips/dripper/dripped/dripping", "piss/pissing/pissed/pisses/pisser/pissed/pissing", "pour/pouring/poured/pours/pourer/poured/pouring", "splash/splashing/splashed/splashes/splasher/splashed/splashing", "sue/suing/sued/sues/suer/sued/suing", "prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution", "convict/convicting/convicted/convicts/convicter/convicted/conviction", "legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization", "bathe/bathing/bathed/bathes/bather/bathed/bathing", "cripple/crippling/crippled/cripples/crippler/crippled/crippling", "customize/customizing/customized/customizes/customizer/customized/customization", "decorate/decorating/decorated/decorates/decorator/decorated/decoration", "feed/feeding/fed/feeds/feeder/fed/feeding", "forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting", "harass/harassing/harassed/harasses/harasser/harassed/harassment", "hoist/hostng/hoisted/hoists/hoister/hoisted/hoisting", "nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing", "nail/nailing/nailed/nails/nailer/nailed/nailing", "preen/preening/preened/preens/preener/preened/preening", "ride/riding/rode/rides/rider/ridden/riding", "rob/robbing/robbed/robs/robber/robbed/robbery", "sharpen/sharpening/sharpened/sharpens/sharpener/sharpened/sharpening", "snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling", "donate/donating/donated/donates/donater/donated/donation", "purify/purifying/purified/purifies/purifier/purified/purification", "rapture/rapturing/raptured/raptures/rapturer/raptured/rapture", "toast/toasting/toasted/toasts/toaster/toasted/toasting", "liquidate/liquidating/liquidated/liquidates/liquidator/liquidated/liquidation", "masticate/masticating/masticated/masticates/masticater/masticated/mastication", "chew/chewing/chewed/chews/chewer/chewed/chewing", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "push/pushing/pushed/pushes/pusher/pushed/pushing", "chill/chilling/chilled/chills/chiller/chilled/chilling", "report/reporting/reported/reports/reporter/reported/reporting", "plunge/plunging/plunged/plunges/plunger/plunged/plunging", "ram/ramming/rammed/rams/rammer/rammed/ramming", "vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization", "erect/erecting/erected/erects/erector/erected/erection", "cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting", "fertilize/fertilizing/fertilized/fertilizes/fertilizer/fertilized/fertilization", "please/pleasing/pleased/pleases/pleaser/pleasted/pleasing", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "mount/mounting/mounted/mounts/mounter/mounted/mounting", "fuck/fucking/fucked/fucks/fucker/fucked/fucking", "fellate/fellating/fellated/fellates/fellater/fellated/fellatio", "titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking", "turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification", "grope/groping/groped/gropes/groper/groped/groping", "defecate/defecating/defecated/defecates/defecator/defecated/defecation"];
    var dic_verb_political = ["veto/vetoing/vetoed/vetoes/vetoer/vetoed/vetoing", "elect/electing/elected/elects/electer/elected/election", "ratify/ratifying/ratified/ratifies/ratifier/ratified/ratification", "amend/amending/amended/amends/amender/amended/amendment", "impeach/impeaching/impeached/impeaches/impeacher/impeached/impeachment", "inaugurate/inaugurating/inaugurated/inaugurates/inaugurater/inaugurated/inauguration", "petition/petitioning/petitioned/petitions/petitioner/petitioned/petitioning"];
    var dic_verb_legal = ["sue/suing/sued/sues/suer/sued/suing", "prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution", "convict/convicting/convicted/convicts/convicter/convicted/conviction", "legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization"];
    var dic_verb_violent = ["pluck/plucking/plucked/plucks/plucker/plucked/plucking", "bite/biting/bit/bites/biter/bitten/biting", "fart/farting/farted/farts/farter/farted/farting", "manhandle/manhandling/manhandled/manhandles/manhandler/manhandled/manhandling", "maul/mauling/mauled/mauls/mauler/mauled/mauling", "whip/whipping/whipped/whips/whipper/whipped/whipping", "dominate/dominating/dominated/dominates/dominator/dominated/domination", "punch/punching/punched/punches/puncher/punched/punching", "headbutt/headbutting/headbutted/headbutts/headbutter/headbutted/headbutting", "impale/impaling/impaled/impales/impaler/impaled/impalement", "scratch/scratching/scratched/scratches/scratcher/scratched/scratching", "grab/grabbing/grabbed/grabs/grabber/grabbed/grabbing", "snip/snipping/snipped/snips/snipper/snipped/snipping", "shatter/shattering/shattered/shatters/shatterer/shattered/shattering", "slap/slapping/slapped/slaps/slapper/slapped/slapping", "tickle/tickling/tickled/tickles/tickler/tickled/tickling", "stab/stabbing/stabbed/stabs/stabber/stabbed/stabbing", "strangle/strangling/strangled/strangles/strangler/strangled/strangulation", "decapitate/decapitating/decapitated/decapitates/decapitater/decapitated/decapitation", "behead/beheading/beheaded/beheads/beheader/beheaded/beheading", "dangle/dangling/dangled/dangles/dangler/dangled/dangling", "hang/hanging/hung/hangs/hanger/hanged/hanging", "gouge/gouging/gouged/gouges/gouger/gouged/gouging", "electrocute/electrocuting/electrocuted/electrocutes/electrocuter/electrocuted/electrocution", "slash/slashing/slashed/slashes/slasher/slashed/slashing", "hammer/hammering/hammered/hammers/hammerer/hammered/hammering", "bludgeon/bludgeoning/bludgeoned/bludgeons/bludgeoner/bludgeoned/bludgeoning", "pierce/piercing/pierced/pierces/piercer/pierced/piercing", "skewer/skewering/skewered/skewers/skewerer/skewered/skewering", "spank/spanking/spanked/spanks/spanker/spanked/spanking", "vomit/vomiting/vomited/vomits/vomiter/vomited/vomiting", "pinch/pinching/pinched/pinches/pincher/pinched/pinching", "shove/shoving/shoved/shoves/shover/shoved/shoving", "amputate/amputating/amputated/amputates/amputator/amputated/amputation", "throttle/throttling/throttled/throttles/throttler/throttled/throttling", "implode/imploding/imploded/implodes/imploder/imploded/implosion", "explode/exploding/exploded/explodes/exploder/exploded/explosion", "cremate/cremating/cremated/cremates/cremater/cremated/cremation", "assault/assaulting/assaulted/assaults/assaulter/assaulted/assault", "attack/attacking/attacked/attacks/attacker/attacked/attack", "authenticate/authenticating/authenticated/authenticates/authenticator/authenticated/authentication", "choke/choking/choked/chokes/choker/choked/choking", "commandeer/commandeering/commandeered/commandeers/commandeerer/commandeered/commandeering", "conserve/conserving/conserved/conserves/conserver/conserved/conservation", "crash/crashing/crashed/crashes/crasher/crashed/crashing", "cripple/crippling/crippled/cripples/crippler/crippled/crippling", "dissect/dissecting/dissected/dissects/dissector/dissected/dissection", "dramatize/dramatizing/dramatized/dramatizes/dramatizer/dramatized/dramatization", "harass/harassing/harassed/harasses/harasser/harassed/harassment", "injure/injuring/injured/injures/injurer/injured/injury", "jingle/jingling/jingled/jingles/jingler/jingled/jingling", "jimmy/jimmying/jimmied/jimmies/jimmier/jimmied/jimmying", "kidnap/kidnapping/kidnapped/kidnaps/kidnapper/kidnapped/kidnapping", "lecture/lecturing/lectured/lectures/lecturer/lectured/lecturing", "mangle/mangling/mangled/mangles/mangler/mangled/mangling", "maim/maiming/maimed/maims/maimer/maimed/maiming", "mutilate/mutilating/mutilated/mutilates/mutilater/mutilated/mutilation", "nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing", "nail/nailing/nailed/nails/nailer/nailed/nailing", "nip/nipping/nipped/nips/nipper/nipped/nipping", "rob/robbing/robbed/robs/robber/robbed/robbery", "vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization", "grope/groping/groped/gropes/groper/groped/groping"];
    var dic_verb_walk = ["snoop/snooping/snooped/snoops/snooper/snooped/snooping", "click/clicking/clicked/clicks/clicker/clicked/clicking", "flap/flapping/flapped/flaps/flapper/flapped/flapping", "joust/jousting/jousted/jousts/jouster/jousted/jousting", "slouch/slouching/slouched/slouches/sloucher/slouched/slouching", "walk/walking/walked/walks/walker/walked/walking", "skip/skipping/skipped/skips/skipper/skipped/skipping", "march/marching/marched/marches/marcher/marched/marching", "run/running/ran/runs/runner/run/running", "stampede/stampeding/stampeded/stampedes/stampeder/stampeded/stampeding", "strut/strutting/strutted/struts/strutter/strutted/strutting", "tiptoe/tiptoeing/tiptoed/tiptoes/tiptoer/tiptoed/tiptoeing", "sprint/sprinting/sprinted/sprints/sprinter/sprinted/sprinting", "gallop/galloping/galloped/gallops/galloper/galloped/galloping", "crawl/crawling/crawled/crawls/crawler/crawled/crawling", "trot/trotting/trotted/trots/trotter/trotted/trotting", "sleepwalk/sleepwalking/sleepwalked/sleepwalks/sleepwalker/sleepwalked/sleepwalking", "abduct/abducting/abducted/abducts/abductor/abducted/abduction", "abolish/abolishing/abolished/abolishes/abolisher/abolished/abolishment", "apprehend/apprehending/apprehended/apprehends/apprehender/apprehended/apprehension"];
    var dic_verb_motion = ["tremble/trembling/trembled/trembles/trembler/trembled/trembling", "waddle/waddling/waddled/woddles/woddler/waddled/waddling", "wiggle/wiggling/wiggled/wiggles/wiggler/wiggled/wiggling", "slam/slamming/slammed/slams/slammer/slammed/slamming", "kick/kicking/kicked/kicks/kicker/kicked/kicking", "smack/smacking/smacked/smacks/smacker/smacked/smacking", "stomp/stomping/stomped/stomps/stomper/stomped/stomping", "shoot/shooting/shot/shoots/shooter/shot/shooting", "screw/screwing/screwed/screws/screwer/screwed/screwing", "pump/pumping/pumped/pumps/pumper/pumped/pumping", "hack/hacking/hacked/hacks/hacker/hacked/hacking", "poke/poking/poked/pokes/poker/poked/poking", "crank/cranking/cranked/cranks/cranker/cranked/cranking", "serve/serving/served/serves/server/served/serving", "force/forcing/forced/forces/forcer/forced/forcing", "stick/sticking/stuck/sticks/sticker/stuck/sticking", "move/moving/moved/moves/mover/moved/moving", "bind/binding/bound/binds/binder/bound/binding", "staple/stapling/stapled/staples/stapler/stapled/stapling", "eject/ejecting/ejected/ejects/ejector/ejected/ejection", "crunch/crunching/crunched/crunches/cruncher/crunched/crunching", "squish/squishing/squished/squishes/squisher/squished/squishing", "prod/prodding/prodded/prods/prodder/prodded/prodding", "wedge/wedging/wedged/wedges/wedger/wedged/wedging", "blow/blowing/blew/blows/blower/blown/blowing", "knead/kneading/kneaded/kneads/kneader/kneaded/kneading", "twist/twisting/twisted/twists/twister/twisted/twisting", "throw/throwing/threw/throws/thrower/thrown/throwing", "fly/flying/flew/flies/flier/flown/flying", "shake/shaking/shook/shakes/shaker/shaken/shaking", "bang/banging/banged/bangs/banger/banged/banging", "press/pressing/pressed/presses/presser/pressed/pressing", "inject/injecting/injected/injects/injector/injected/injection", "slip/slipping/slipped/slips/slipper/slipped/slipping", "rip/ripping/ripped/rips/ripper/ripped/ripping", "twang/twanging/twanged/twangs/twanger/twanged/twanging", "cram/cramming/crammed/crams/crammer/crammed/cramming", "hurl/hurling/hurled/hurls/hurler/hurled/hurling", "lunge/lunging/lunged/lunges/lunger/lunged/lunging", "jump/jumping/jumped/jumps/jumper/jumped/jumping", "rotate/rotating/rotated/rotates/rotator/rotated/rotation", "thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting", "gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration", "twerk/twerking/twerked/twerks/twerker/twerked/twerking"];
    var dic_verb_pose = ["stand/standing/stood/stands/stander/stood/standing", "sit/sitting/sat/sits/sitter/sat/sitting", "lay/laying/laid/lays/layer/laid/laying", "crouch/crouching/crouched/crouches/croucher/crouched/crouching", "squat/squatting/squatted/squats/squatter/squatted/squatting"];
    dic_verb = dic_verb.concat(dic_verb_eat,dic_verb_move,dic_verb_insert,dic_verb_sex,dic_verb_intransitive,dic_verb_liquid,dic_verb_transitive,dic_verb_political,dic_verb_legal,dic_verb_violent,dic_verb_walk,dic_verb_motion,dic_verb_pose);
    var dic_verbimg=["shine/shining/shone/shines/shiner","gleam/gleaming/gleamed/gleams/gleamer","crumple/crumpling/crumpled/crumples/crumpler","sparkle/sparkling/sparkled/sparkles/sparkler","bloom/blooming/bloomed/blooms/bloomer","grow/growing/grew/grows/grower","shrink/shrinking/shrunk/shrinks/shrinker","glow/glowing/glowed/glows/glower","lighten/lightening/lightened/lightens/lightener","darken/darkening/darkened/darkens/darkener","steam/steaming/steamed/steams/steamer","flash/flashing/flashed/flashes/flasher","bubble/bubbling/bubbled/bubbles/bubbler","burn/burning/burned/burns/burner","flutter/fluttering/fluttered/flutters/flutterer","flap/flapping/flapped/flaps/flapper","ripple/rippling/rippled/ripples/rippler","smolder/smoldering/smoldered/smolders/smolderer","fizz/fizzing/fizzed/fizzes/fizzer","fester/festering/festered/festers/festerer","froth/frothing/frothed/froths/frother","rise/rising/rose/rises/riser","churn/churning/churned/churns/churner","shimmer/shimmering/shimmered/shimmers/shimmerer","blossom/blossoming/blossomed/blossoms/blossomer","wilt/wilting/wilted/wilts/wilter","twinkle/twinkling/twinkled/twinkles/twinkler","radiate/radiating/radiated/radiates/radiator","bloat/bloating/bloated/bloats/bloater","twist/twisting/twisted/twists/twister","wave/waving/waved/waves/waver","shudder/shuddering/shuddered/shudders/shudderer","shiver/shivering/shivered/shivers/shiverer","shake/shaking/shook/shakes/shaker","soften/softening/softened/softens/softener","harden/hardening/hardened/hardens/hardener","bleed/bleeding/bled/bleeds/bleeder","crack/cracking/cracked/cracks/cracker","blacken/blackening/blackened/blackens/blackener","whiten/whitening/whitened/whitens/whitener","wiggle/wiggling/wiggled/wiggles/wiggler"];
    dic_verbimg = dic_verbimg.concat();
    var dic_vocal=["mmmmmm","oooh","uhhhm","eeeeeeee","oof","wow","ouch","yikes","ahhhh","ugh","eeek","ahem","aargh","boo hoo","ha ha ha","muahahaha"];
    dic_vocal = dic_vocal.concat();
    var dic_with=["with","without","alongside","inside of","using","with the help of"];
    dic_with = dic_with.concat();
    var dic_x=["I'll be damned","bravo","geez","holy cow","good heavens","holy moley","ermahgerd","LOL","Bingo","ROFL","WTF","good lord","awesome","excellent","jolly good","this is the end","run for your lives","wicked","epic","damn","oh boy","boy oh boy oh boy","what in the world","what the hell","oh joy","woot","omgomgomg","no way","this can't be","mine eyes are deceiving me","gasp","oh my goodness","oh dear","oh my","dear me","dear dear","my my","my oh my","aw shucks","whoa","wow","oh wow","trololol","oho","oh glorious day","disgraceful","oh hell yes","hella good","hurrah","what","beautiful","ahhhhh mahh gahh","by golly","this is delicious","oh gog","K.O.","finish him","my leg","I'm gonna faint","alas","rats"];
    dic_x = dic_x.concat();
    var dic_yn=[];
    var dic_yn_yes = ["", "yes", "yayaya", "yep", "yeppers", "definitely", "absolutely", "without a doubt", "indeed", "affirmative", "undoubtedly", "undeniably", "yes/yes", "hell yes", "ya", "certainly", "obviously", "oh yes"];
    var dic_yn_no = ["I couldn't agree more", "no", "definitely not", "absolutely not", "no way", "impossible", "negative", "nope", "hell no", "nooooo", "not at all", "certainly not", "obviously not", "oh no", "most certainly not", "there's no way"];
    dic_yn = dic_yn.concat(dic_yn_yes,dic_yn_no);

    // <name-male> likes to <verb-transitive> <noun.plural> with <pron.poss-male> pet <noun-animal> on <time_noun.plural-dayofweek>.


    this.sentence = function () {
        return 'instance method';
    };
    this.capitalize = function (s) {
        return s[0].toUpperCase() + s.slice(1);
    };
    this.getTitle = function () {
        return titles.shuffle()[0];
    };
    this.getPossMale = function () {
        return pronouns_in_the_third_person[0].split("/")[3];
    };
    this.getNounAnimal = function () {
        return pronouns_in_the_third_person[0].split("/")[3];
    };

    this.getAdjective = function (plural) {
        var num = Math.floor(Math.random() * the_adjectives.length);
        return the_adjectives[num].split("/")[plural];
    };
    this.getVerb = function (plural) {
        var num = Math.floor(Math.random() * verbs.length);
        return verbs[num].split("/")[plural];
    };
    this.getColor = function (plural) {
        return colors.shuffle()[0].split("/")[plural];
    };
    this.getNoun = function (plural) {
        var num = Math.floor(Math.random() * nouns.length);
        return nouns[num].split("/")[plural];
    };
    this.getAmount = function () {
        return amount.shuffle()[0];
    };
    this.getRelationship = function (plural) {
        return relationships.shuffle()[0].split("/")[plural];
    };
    this.getTitleMale = function () {
        return titles_m.shuffle()[0];
    };
    this.getTitleFemale = function () {
        return titles_f.shuffle()[0];
    };

    this.getNameMale = function () {
        return first_names.shuffle()[0];
    };
    this.getNameFemale = function () {
        return first_names.shuffle()[0];
    };


    this.getYes = function () {
        return yes.shuffle()[0];
    };
    this.getNo = function () {
        return no.shuffle()[0];
    };
    this.getExclamation = function () {
        return exclamations.shuffle()[0];
    };
    this.getFirstName = function () {
        return first_names.shuffle()[0].split("/")[plural];
    };
    this.getLastName = function () {
        return last_names.shuffle()[0];
    };
    this.getFacialExpression = function () {
        return facial_expressions.shuffle()[0];
    };
    this.getFacialExpressionVerbed = function () {
        return facial_expressions_verbed.shuffle()[0];
    };
    this.getCoordinatingConjunction = function () {
        return conjunctions.shuffle()[0];
    };


    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches;
        var replacement = [], i=0;

        var adj_matched=adjplural_matched=noun_matched = nounplural_matched = firstname_matched = lastname_matched =
            title_matched = titlem_matched = titlef_matched = exclamation_matched = yes_matched = no_matched =
                amount_matched = colorplural_matched = color_matched = relationship_matched=
                    relationshipplural_matched=facialexpression_matched=facialexpressioned_matched=
                        conjunction_matched=verb1m=verb2m=namemm=namefm=verb3m=possm=false;

        while (matches = regex.exec(input)) {
            //console.log(matches.length);
            //console.log(matches);

            if (matches[1] == "pron.poss-male") {
                if(!possm) {
                    replacement = [];
                    i = result.match(/\<pron.poss-male\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getPossMale());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<pron.poss-male>/g, function () {
                        return replacement[i++];
                    });
                }
                possm = true;
            }
            if (matches[1] == "verb") {
                if(!verb1m) {
                    replacement = [];
                    i = result.match(/\<verb\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getVerb(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<verb>/g, function () {
                        return replacement[i++];
                    });
                }
                verb1m = true;
            }
            if (matches[1] == "verb-transitive") {
                if(!verb3m) {
                    replacement = [];
                    i = result.match(/\<verb-transitive\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getVerb(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<verb-transitive>/g, function () {
                        return replacement[i++];
                    });
                }
                verb3m = true;
            }
            if (matches[1] == "verb.ed") {
                if(!verb2m) {
                    replacement = [];
                    i = result.match(/\<verb.ed\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getVerb(2));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<verb.ed>/g, function () {
                        return replacement[i++];
                    });
                }
                verb2m = true;
            }
            if (matches[1] == "title") {
                if(!title_matched) {
                    replacement = [];
                    i = result.match(/\<title\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getTitle());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<title>/g, function () {
                        return replacement[i++];
                    });
                }
                title_matched = true;
            }
            if (matches[1] == "name-female") {
                if(!namefm) {
                    replacement = [];
                    i = result.match(/\<name-female\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getNameFemale());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<name-female>/g, function () {
                        return replacement[i++];
                    });
                }
                namefm = true;
            }
            if (matches[1] == "name-male") {
                if(!namemm) {
                    replacement = [];
                    i = result.match(/\<name-male\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getNameMale());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<name-male>/g, function () {
                        return replacement[i++];
                    });
                }
                namemm = true;
            }
            if (matches[1] == "title:male") {
                if(!titlem_matched) {
                    replacement = [];
                    i = result.match(/\<title.male\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getTitleMale());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<title.male>/g, function () {
                        return replacement[i++];
                    });
                }
                titlem_matched = true;
            }
            if (matches[1] == "yes") {
                if(!yes_matched) {
                    replacement = [];
                    i = result.match(/\<yes\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getYes());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<yes>/g, function () {
                        return replacement[i++];
                    });
                }
                yes_matched = true;
            }
            if (matches[1] == "no") {
                if(!no_matched) {
                    replacement = [];
                    i = result.match(/\<no\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getNo());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<no>/g, function () {
                        return replacement[i++];
                    });
                }
                no_matched = true;
            }
            if (matches[1] == "amount") {
                if(!amount_matched) {
                    replacement = [];
                    i = result.match(/\<amount\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getAmount());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<amount>/g, function () {
                        return replacement[i++];
                    });
                }
                no_matched = true;

            }
            if ((matches[1] == "adj")) {
                if(!adj_matched) {
                    replacement = [];
                    i = result.match(/\<adj\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getAdjective(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<adj>/g, function () {
                        return replacement[i++];
                    });
                }
                adj_matched = true;
            }
            if ((matches[1] == "adj.plural") || (matches[1] == "adj.plural")) {
                if(!adjplural_matched) {
                    replacement = [];
                    i = result.match(/\<adj.plural\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getAdjective(1));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<adj.plural>/g, function () {
                        return replacement[i++];
                    });
                }
                adjplural_matched = true;
            }
            if (matches[1] == "noun") {
                if(!noun_matched) {
                    replacement = [];
                    i = result.match(/\<noun\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getNoun(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<noun>/g, function () {
                        return replacement[i++];
                    });
                }
                noun_matched = true;
            }
            if (matches[1] == "noun.plural") {
                if(!nounplural_matched) {
                    replacement = [];
                    i = result.match(/\<noun.plural\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getNoun(1));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<noun.plural>/g, function () {
                        return replacement[i++];
                    });
                }
                nounplural_matched = true;
            }
            if (matches[1] == "exclamation") {
                if(!exclamation_matched) {
                    replacement = [];
                    i = result.match(/\<exclamation\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getExclamation());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<exclamation>/g, function () {
                        return replacement[i++];
                    });
                }
                exclamation_matched = true;
            }
            if (matches[1] == "firstname") {
                if(!firstname_matched) {
                    replacement = [];
                    i = result.match(/\<firstname\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getFirstName());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<firstname>/g, function () {
                        return replacement[i++];
                    });
                }
                firstname_matched = true;
            }
            if (matches[1] == "lastname") {
                if(!lastname_matched) {
                    replacement = [];
                    i = result.match(/\<lastname\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getLastName());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<lastname>/g, function () {
                        return replacement[i++];
                    });
                }
                lastname_matched = true;
            }
            if (matches[1] == "color") {
                if(!color_matched) {
                    replacement = [];
                    i = result.match(/\<color\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getColor(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<color>/g, function () {
                        return replacement[i++];
                    });
                }
                color_matched = true;
            }
            if (matches[1] == "color.plural") {
                if(!colorplural_matched) {
                    replacement = [];
                    i = result.match(/\<color.plural\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getColor(1));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<color.plural>/g, function () {
                        return replacement[i++];
                    });
                }
                colorplural_matched = true;
            }
            if (matches[1] == "relationship") {
                if(!relationship_matched) {
                    replacement = [];
                    i = result.match(/\<relationship\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getRelationship(0));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<relationship>/g, function () {
                        return replacement[i++];
                    });
                }
                relationship_matched = true;
            }
            if (matches[1] == "relationship.plural") {
                if(!relationshipplural_matched) {
                    replacement = [];
                    i = result.match(/\<relationship.plural\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getRelationship(1));
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<relationship.plural>/g, function () {
                        return replacement[i++];
                    });
                }
                relationshipplural_matched = true;
            }
            if (matches[1] == "facialexpression") {
                if(!facialexpression_matched) {
                    replacement = [];
                    i = result.match(/\<facialexpression\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getFacialExpression());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<facialexpression>/g, function () {
                        return replacement[i++];
                    });
                }
                facialexpression_matched = true;
            }
            if (matches[1] == "conjunction") {
                if(!conjunction_matched) {
                    replacement = [];
                    i = result.match(/\<conjunction\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getCoordinatingConjunction());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<conjunction>/g, function () {
                        return replacement[i++];
                    });
                }
                conjunction_matched = true;
            }


            if (matches[1] == "facial_expression.ed") {
                if(!facialexpressioned_matched) {
                    replacement = [];
                    i = result.match(/\<facial_expression.ed\>/g).length;
                    while (i > 0) {
                        replacement.push(this.getFacialExpressionVerbed());
                        i--;
                    }

                    i = 0;
                    result = result.replace(/\<facial_expression.ed>/g, function () {
                        return replacement[i++];
                    });
                }
                facialexpressioned_matched = true;
            }
            //console.log(matches[1]);
        }
        return this.capitalize(result);
    };


    this.vowel = function () {
    }
}
// a first class functional object
//
//simpleRant.prototype.sentence = function () {
//    return 'prototype method';
//};
//
//// Test
//rant = new simpleRant;
//var result = rant.rantConstructor('<yes>, I need a bunch of <adjective> <noun.plural>');
//console.log(result);
//var result = rant.rantConstructor('<exclamation>, <adjective> <noun.plural>');
//console.log(result);
//var result = rant.rantConstructor('<title> <firstname> <lastname>, <relationship> of <firstname>');
//var result = rant.rantConstructor('<firstname> said with a wry <facialexpression> and <bent_facial_expression>');
//console.log(result);
//var result = rant.rantConstructor('<color> <color.plural>');
//console.log(result);

/*

 API:
 <yes> <no>


 */



