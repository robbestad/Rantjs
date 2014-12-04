function simpleRant() {


    this.sentence = function () {
        return 'instance method';
    };
    this.capitalize = function (s) {
        return s[0].toUpperCase() + s.slice(1);
    };
    this.getTitle = function () {
        var num = Math.floor(Math.random() * dic_title.length);
        return dic_title[num];
    };
    this.getPossMale = function () {
        return dic_pron_male[0].split("/")[3];
    };
    this.getNounAnimal = function () {
        var num = Math.floor(Math.random() * dic_noun_animal.length);
        return dic_noun_animal[num].split("/")[3];
    };
    this.getCountry = function() {
        var num = Math.floor(Math.random() * dic_country.length);
        return dic_country[num];
    };

    this.getAdjective = function (plural) {
        var num = Math.floor(Math.random() * dic_adj.length);
        return dic_adj[num].split("/")[plural];
    };

    this.getTimeNoun = function (plural) {
        var num = Math.floor(Math.random() * dic_timenoun.length);
        return dic_timenoun[num].split("/")[plural];
    };

    this.getTimeDayOfWeek = function (plural) {
        var num = Math.floor(Math.random() * dic_timenoun_dayofweek.length);
        return dic_timenoun_dayofweek[num].split("/")[plural];
    };
    this.getTimeOfDay = function (plural) {
        var num = Math.floor(Math.random() * dic_timenoun_timeofday.length);
        return dic_timenoun_timeofday[num].split("/")[plural];
    };
    this.getTimeOfMonth = function (plural) {
        var num = Math.floor(Math.random() * dic_timenoun_month.length);
        return dic_timenoun_month[num].split("/")[plural];
    };





    this.getVerb = function (plural) {
        var num = Math.floor(Math.random() * dic_verb.length);
        return dic_verb[num].split("/")[plural];
    };
    this.getColor = function (plural) {
        var num = Math.floor(Math.random() * dic_color.length);
        return dic_color[num].split("/")[plural];
    };
    this.getNoun = function (plural) {
        var num = Math.floor(Math.random() * dic_noun.length);
        return dic_noun[num].split("/")[plural];
    };
    this.getNounByType = function (nountype,plural) {
        if(nountype == "animal"){
            var num = Math.floor(Math.random() * dic_noun_animal.length);
            return dic_noun_animal[num].split("/")[plural];
        }

        return "";
    };
    this.getAmount = function () {
        var num = Math.floor(Math.random() * amount.length);
        return amount[num];
    };
    this.getRelationship = function (plural) {
        var num = Math.floor(Math.random() * dic_rel.length);
        return dic_rel[num].split("/")[plural];
    };
    this.getTitleMale = function () {
        var num = Math.floor(Math.random() * dic_title.length);
        return dic_title[num];
    };
    this.getTitleFemale = function () {
        var num = Math.floor(Math.random() * dic_title.length);
        return dic_title[num];
    };

    this.getNameMale = function () {
        var num = Math.floor(Math.random() * dic_name_male.length);
        return dic_name_male[num];
    };
    this.getNameFemale = function () {
        var num = Math.floor(Math.random() * dic_name_female.length);
        return dic_name_female[num];
    };


    this.getYes = function () {
        var num = Math.floor(Math.random() * dic_yn_yes.length);
        return dic_yn_yes[num];
    };
    this.getNo = function () {
        var num = Math.floor(Math.random() * dic_yn_no.length);
        return dic_yn_no[num];
    };
    this.getExclamation = function () {
        var num = Math.floor(Math.random() * dic_emo.length);
        return dic_emo[num];
    };
    this.getFirstName = function () {
        var num = Math.floor(Math.random() * dic_name.length);
        return dic_name[num].split("/")[plural];
    };
    this.getLastName = function () {
        var num = Math.floor(Math.random() * dic_name.length);
        return dic_name[num];
    };
    this.getFacialExpression = function () {
        var num = Math.floor(Math.random() * dic_face.length);
        return dic_face[num];
    };

    this.getCoordinatingConjunction = function () {
        var num = Math.floor(Math.random() * dic_conj.length);
        return dic_conj[num];
    };


    this.rantConstructor = function (input) {
        var result = input;
        var regex = /\<(.*?)\>/g;
        var matches;
        var replacement = [], i=0;

        var adj_matched=adj1m=noun0m = noun1m = firstnm = lastnm =
            title_matched = titlem_matched = titlef_matched = exclamation_matched = yes_matched = no_matched =
                amount_matched = colorplural_matched = color_matched = mtch_rel=noun3m=adj2m=
                    relationshipplural_matched=facialexpression_matched=facialexpressioned_matched=
                        conjunction_matched=verb1m=verb2m=namemm=namefm=verb3m=possm=time1m=false;

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
                if(!adj1m) {
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
                adj1m = true;
            }


            if (matches[1] == "noun") {
                if(!noun0m) {
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
                noun0m = true;
            }

            if(matches[1].match('noun-animal')) {
                if(!noun3m) {
                    replacement = [];
                    var re = new RegExp( matches[1], 'g');
                    i = result.match(re).length;
                    var plural=0;
                    if(matches[1].match('plural','g')){
                        plural=1;
                    }

                    while (i > 0) {
                        replacement.push(this.getNounByType('animal',plural));
                        i--;
                    }

                    var re = new RegExp('<'+matches[1]+'>', 'g');
                    result = result.replace(re, function () {
                        return replacement[i++];
                    });
                }
                noun3m = true;
            }

            if(matches[1].match('adj(|.plural)$')) {
                if(!adj2m) {
                    replacement = [];
                    var re = new RegExp( matches[1], 'g');
                    i = result.match(re).length;
                    var plural=0;
                    if(matches[1].match('plural','g')){
                        plural=1;
                    }

                    while (i > 0) {
                        replacement.push(this.getAdjective(plural));
                        i--;
                    }

                    var re = new RegExp('<'+matches[1]+'>', 'g');
                    result = result.replace(re, function () {
                        return replacement[i++];
                    });
                }
                adj2m = true;
            }


            if(matches[1].match('time_noun(|.plural)(|dayofweek)')) {
                if(undefined == timenounplural) var timenounplural=false;
                if(!timenounplural) {
                    timenounplural = true;
                    replacement = [];
                    var re = new RegExp( matches[1], 'g');
                    i = result.match(re).length;
                    var plural=0;
                    if(matches[1].match('plural','g')){
                        plural=1;
                    }

                    while (i > 0) {
                        if(matches[1].match('timeofday','g')){
                            replacement.push(this.getTimeOfDay(plural));
                        } else
                        if(matches[1].match('month','g')){
                            replacement.push(this.getTimeOfMonth(plural));
                        } else
                        if(matches[1].match('dayofweek','g')){
                            replacement.push(this.getTimeDayOfWeek(plural));
                        } else {
                            replacement.push(this.getTimeNoun(plural));
                        }
                        i--;
                    }

                    var re = new RegExp('<'+matches[1]+'>', 'g');
                    result = result.replace(re, function () {
                        return replacement[i++];
                    });
                }
            }






            if (matches[1] == "noun.plural") {
                if(!noun1m) {
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
                noun1m = true;
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
                if(!firstnm) {
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
                firstnm = true;
            }
            if (matches[1] == "lastname") {
                if(!lastnm) {
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
                lastnm = true;
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
                if(!mtch_rel) {
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
                mtch_rel = true;
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


            if (matches[1] == "facialexpression.ed") {
                //if(!facialexpressioned_matched) {
                replacement = [];
                i = result.match(/\<facialexpression.ed\>/g).length;
                while (i > 0) {
                    replacement.push(this.getFacialExpressionVerbed());
                    i--;
                }

                i = 0;
                result = result.replace(/\<facialexpression.ed>/g, function () {
                    return replacement[i++];
                });
                //}
                //facialexpressioned_matched = true;
            }
            //console.log(matches[1]);
        }
        return this.capitalize(result);
    };


    this.vowel = function () {
    }
}


if('undefined' != typeof module){
    module.exports.simpleRant = simpleRant;
}