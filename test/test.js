var assert = require("assert");
var rant= require("../source/core/index");

describe('Get Upper', function () {
    it('should return upper', function () {
        var result =  require("../source/core/getCase")('[case:upper]');
        assert(result,assert.equal("upper",result));
    })
});
describe('Get Lower', function () {
    it('should return lower', function () {
        var result =  require("../source/core/getCase")('[case:lower]');
        assert(result,assert.equal("lower",result));
    })
});
describe('Get Titlecase', function () {
    it('should return title case', function () {
        var result =  require("../source/core/getCase")('[case:title]');
        assert(result,assert.equal("title",result));
    })
});
describe('Get Word Case', function () {
    it('should return word case', function () {
        var result =  require("../source/core/getCase")('[case:word]');
        assert(result,assert.equal("word",result));
    })
});
describe('Get First Case', function () {
    it('should return first case', function () {
        var result =  require("../source/core/getCase")('[case:first]');
        assert(result,assert.equal("first",result));
    })
});
describe('Get Sentence Case', function () {
    it('should return Sentence case', function () {
        var result =  require("../source/core/getCase")('[case:sentence]');
        assert(result,assert.equal("sentence",result));
    })
});

describe('Get Sentence Cased Sentence', function () {
    it('should return Sentence case', function () {
        var result =  require("../source/core/capitalize")('this is a test','upper');
        assert(result,assert.equal("THIS IS A TEST",result));
    })
});

describe('Get a concept', function () {
    it('should return a concept', function () {
        var dic =  require("../source/core/en_US");
        assert(dic().abstract.concept,assert.notEqual(0,dic().abstract.concept.length));
    })
});


describe('Repeatertest', function () {
    it('should return a repeated sentence', function () {
        result=rant("[sep:s][rep:3]{my <noun hole> is leaking}");
        var regex = /leaking/g;
        var spaces = regex.exec(result);
        assert(spaces,assert.notEqual(-1,spaces.index));
    })
});

describe('Get Sentence', function () {
    it('should return a sentence when calling several keywords', function () {
        var result = rant('<yes>, I need a bunch of <adj> <noun.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Verb', function () {
    it('should return a verb', function () {
        var result = rant('<verb>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Transitive Verb', function () {
    it('should return a transitive verb', function () {
        
        var result = rant('<verb-transitive>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Verb.ed', function () {
    it('should return a verb.ed', function () {

        var result = rant('<verb.ed>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Personal Pronoun', function () {
    it('should return a pronoun', function () {

        var result = rant('<pron.poss-male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get Title', function () {
    it('should return a positive string', function () {

        var result = rant('<title>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Male Title', function () {
    it('should return a positive string', function () {

        var result = rant('<title-male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Male Name', function () {
    it('should return a positive string', function () {

        var result = rant('<firstname male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Female Name', function () {
    it('should return a positive string', function () {

        var result = rant('<firstname female>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Yes', function () {
    it('should return a positive string', function () {

        var result = rant('<yn yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Multiple Yeses', function () {
    it('should return a positive string', function () {

        var result = rant('<yn yes> <yn yes> <yn yes> <yn yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get No', function () {
    it('should return a negative string', function () {

        var result = rant('<yn no>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Single Month', function () {
    it('should return a string when calling a month', function () {

        var result = rant('<timenoun month>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get All Month Nouns', function () {
    it('should return all mounth nouns', function () {

        var result = rant('<timenoun>|<timenoun dayofmonth>|<timenoun dayofmonth plural>|')
            .replace(new RegExp("<.*>","g"),"");
        var count=result.match(/\|+/g).length;
        assert(count,assert.equal(3,count));
    })
});

describe('Get plural time', function () {
    it('should return a string when a time noun with flags: plural and month', function () {

        var result = rant('<timenoun dayofmonth plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});
describe('Get day of week', function () {
    it('should return a string with day of the week', function () {

        var result = rant('<timenoun dayofweek>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get adverb', function () {
    it('should return an adverb', function () {

        var result = rant('<adv>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get sexy adverb', function () {
    it('should return a sexy adverb', function () {

        var result = rant('<adv-sexy>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get emotional adverb', function () {
    it('should return a emotional adverb', function () {

        var result = rant('<adv-emotion>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get adjective', function () {
    it('should return an adjective', function () {

        var result = rant('<adj>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get plural adjective', function () {
    it('should return a plural adjective', function () {

        var result = rant('<adj.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get noun', function () {
    it('should return a noun', function () {

        var result = rant('<noun>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get plural noun', function () {
    it('should return a plural noun', function () {

        var result = rant('<noun.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get animal', function () {
    it('should return an animal', function () {

        var result = rant('<noun-animal>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get tool', function () {
    it('should return a tool', function () {

        var result = rant('<noun-tool>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get surface', function () {
    it('should return a surface', function () {

        var result = rant('<noun-surface>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get furniture', function () {
    it('should return a furniture', function () {

        var result = rant('<noun-furniture>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});


describe('Get noun round', function () {
    it('should return a round', function () {

        var result = rant('<noun-round>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun body', function () {
    it('should return a body', function () {

        var result = rant('<noun-body>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun liquid', function () {
    it('should return a liquid', function () {

        var result = rant('<noun-liquid>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun insect', function () {
    it('should return a insect', function () {

        var result = rant('<noun-insect>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun clothes', function () {
    it('should return a clothes', function () {

        var result = rant('<noun-clothes>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun plant', function () {
    it('should return a plant', function () {

        var result = rant('<noun-plant>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun person', function () {
    it('should return a person', function () {

        var result = rant('<noun-person>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun long', function () {
    it('should return a long', function () {

        var result = rant('<noun-long>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun ball', function () {
    it('should return a ball', function () {

        var result = rant('<noun-ball>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun article', function () {
    it('should return a article', function () {

        var result = rant('<noun-article>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun drug', function () {
    it('should return a drug', function () {

        var result = rant('<noun-drug>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun fruit', function () {
    it('should return a fruit', function () {

        var result = rant('<noun-fruit>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun container', function () {
    it('should return a container', function () {

        var result = rant('<noun-container>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun instrument', function () {
    it('should return a instrument', function () {

        var result = rant('<noun-instrument>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun sex', function () {
    it('should return a sex', function () {

        var result = rant('<noun-sex>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun job', function () {
    it('should return a job', function () {

        var result = rant('<noun-job>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun weapon', function () {
    it('should return a weapon', function () {

        var result = rant('<noun-weapon>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun hole', function () {
    it('should return a hole', function () {

        var result = rant('<noun-hole>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun food', function () {
    it('should return a food', function () {

        var result = rant('<noun-food>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun vehicle', function () {
    it('should return a vehicle', function () {

        var result = rant('<noun-vehicle>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun animal', function () {
    it('should return a animal', function () {

        var result = rant('<noun-animal>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun shape', function () {
    it('should return a shape', function () {

        var result = rant('<noun-shape>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('All nouns', function () {
    it('should return all nouns', function () {

        var result = rant('<noun-animal> <noun> <noun.plural>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);

    })
});

describe('Say something', function () {
    it('should return a say', function () {

        var result = rant('<say>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get color', function () {
    it('should return a color', function () {

        var result = rant('<color>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get color plural', function () {
    it('should return a plural color', function () {

        var result = rant('<color.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get relationship', function () {
    it('should return a relationship', function () {

        var result = rant('<rel>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get neutral relationship', function () {
    it('should return a neutral relationship', function () {

        var result = rant('<rel neutral>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get female relationship', function () {
    it('should return a male relationship', function () {

        var result = rant('<rel female>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});
describe('Get male relationship', function () {
    it('should return a male relationship', function () {

        var result = rant('<rel male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get relationship plural', function () {
    it('should return a plural relationship', function () {

        var result = rant('<rel plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get conjunction', function () {
    it('should return a conjunction', function () {

        var result = rant('<conj>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get face', function () {
    it('should return a face', function () {

        var result = rant('<face>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get faced', function () {
    it('should return a face.d', function () {

        var result = rant('<face.d>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get offensive sentence', function () {
    it('should return an offensive sentence', function () {

        var result = rant('The <adj> <noun> <adv> <verb.ed> the <adj> <noun> on the <noun-surface>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);
    })
});

describe('Get another offensive sentence', function () {
    it('should return an offensive sentence', function () {

        var result = rant('I like my <noun-shape>-shaped <noun-body.plural>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);
    })
});


// TAGS


// CASES

describe('Make sentence case', function () {
    it('should return a sentence cased string', function () {

        var result = rant('[case:sentence]i. like. big. butts');
        assert.equal(result,'I. Like. Big. Butts');
    })
});

describe('Make upper case', function () {
    it('should return an upper cased string', function () {

        var result = rant('[case:upper]i like big butts');
        assert.equal(result,'I LIKE BIG BUTTS');
    })
});

describe('Make lower case', function () {
    it('should return an upper cased string', function () {

        var result = rant('[case:lower]I LIKE BIG BUTTS');
        assert.equal(result,'i like big butts');
    })
});

describe('Make word case', function () {
    it('should return a word cased string', function () {

        var result = rant('[case:word]I LIKE BIG BUTTS');
        assert.equal(result,'I Like Big Butts');
    })
});

describe('Make title case', function () {
    it('should return a title cased string', function () {

        var result = rant('[case:title]I LIKE ALL THE BIG BUTTS');
        assert.equal(result,'I Like All the Big Butts');
    })
});
