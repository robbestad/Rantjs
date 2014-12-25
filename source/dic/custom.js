dic.amount = amount={};
var amount_all  = ["a few", "a bunch of", "some", "many more"];
dic.amount.all = amount_all;
dic.tokens.push("amount");

dic.faced = faced={};
var faced_all  = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
dic.faced.all = faced_all;
dic.tokens.push("faced");

dic.pron_female = pron_female={};
var pron_female_all  =  ["her/she/herself/her/hers"];
dic.pron_female.all = pron_female_all;
dic.tokens.push("pron_female");

dic.alien = {};
var alien_race  = ["Badoon/Badoons","Brood/The Broods","Celestials/The Celestials","Kree/The Kree"];
dic.alien.all = alien_race;
dic.alien.races = alien_race;
dic.alien.subs=["plural"];
dic.tokens.push("alien");