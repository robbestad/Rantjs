var assert = require("assert");
//var should = require("should");
var rant = require("./simpleRant");


describe('Repeatertest', function () {
    it('should return a repeated sentence', function () {
        var r = new rant.SimpleRant();
        var regex = /(\{.*?\})/;
        var res="";
        var inputStream="[rep:3]{<noun hole>}";
        var curlymatch = regex.exec(inputStream);
        result=r.braceParser(inputStream,curlymatch[1],[3],["s"]);
        assert.equal(result,'<noun hole> <noun hole> <noun hole> ');
    })
});

describe('Get Sentence', function () {
    it('should return a sentence when calling several keywords', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yes>, I need a bunch of <adj> <noun.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Verb', function () {
    it('should return a verb', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<verb>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Transitive Verb', function () {
    it('should return a transitive verb', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<verb-transitive>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get Verb.ed', function () {
    it('should return a verb.ed', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<verb.ed>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Personal Pronoun', function () {
    it('should return a pronoun', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<pron.poss-male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get Title', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<title>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Male Title', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<title-male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Male Name', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<firstname male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Female Name', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<firstname female>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Yes', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yn yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Multiple Yeses', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yn yes> <yn yes> <yn yes> <yn yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get No', function () {
    it('should return a negative string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yn no>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Single Month', function () {
    it('should return a string when calling a month', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<timenoun month>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get All Month Nouns', function () {
    it('should return all mounth nouns', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<timenoun>|<timenoun dayofmonth>|<timenoun dayofmonth plural>|')
            .replace(new RegExp("<.*>","g"),"");
        var count=result.match(/\|+/g).length;
        assert(count,assert.equal(3,count));
    })
});

describe('Get plural time', function () {
    it('should return a string when a time noun with flags: plural and month', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<timenoun dayofmonth plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});
describe('Get day of week', function () {
    it('should return a string with day of the week', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<timenoun dayofweek>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get adverb', function () {
    it('should return an adverb', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<adv>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get sexy adverb', function () {
    it('should return a sexy adverb', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<adv-sexy>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get emotional adverb', function () {
    it('should return a emotional adverb', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<adv-emotion>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get adjective', function () {
    it('should return an adjective', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<adj>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get plural adjective', function () {
    it('should return a plural adjective', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<adj.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get noun', function () {
    it('should return a noun', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get plural noun', function () {
    it('should return a plural noun', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get animal', function () {
    it('should return an animal', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-animal>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get tool', function () {
    it('should return a tool', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-tool>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get surface', function () {
    it('should return a surface', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-surface>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get furniture', function () {
    it('should return a furniture', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-furniture>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});


describe('Get noun round', function () {
    it('should return a round', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-round>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun body', function () {
    it('should return a body', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-body>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun liquid', function () {
    it('should return a liquid', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-liquid>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun insect', function () {
    it('should return a insect', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-insect>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun clothes', function () {
    it('should return a clothes', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-clothes>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun plant', function () {
    it('should return a plant', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-plant>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun person', function () {
    it('should return a person', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-person>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun long', function () {
    it('should return a long', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-long>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun ball', function () {
    it('should return a ball', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-ball>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun article', function () {
    it('should return a article', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-article>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun drug', function () {
    it('should return a drug', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-drug>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun fruit', function () {
    it('should return a fruit', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-fruit>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun container', function () {
    it('should return a container', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-container>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun instrument', function () {
    it('should return a instrument', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-instrument>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun sex', function () {
    it('should return a sex', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-sex>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun job', function () {
    it('should return a job', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-job>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun weapon', function () {
    it('should return a weapon', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-weapon>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun hole', function () {
    it('should return a hole', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-hole>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun food', function () {
    it('should return a food', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-food>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun vehicle', function () {
    it('should return a vehicle', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-vehicle>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun animal', function () {
    it('should return a animal', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-animal>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('Get noun shape', function () {
    it('should return a shape', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-shape>')
            .replace(new RegExp("<.*>","g"),"");

        assert(result,assert.hasContent);
    })
});

describe('All nouns', function () {
    it('should return all nouns', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-animal> <noun> <noun.plural>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);

    })
});

describe('Say something', function () {
    it('should return a say', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<say>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get color', function () {
    it('should return a color', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<color>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get color plural', function () {
    it('should return a plural color', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<color.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get relationship', function () {
    it('should return a relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<rel>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});


describe('Get neutral relationship', function () {
    it('should return a neutral relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<rel neutral>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get female relationship', function () {
    it('should return a male relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<rel female>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});
describe('Get male relationship', function () {
    it('should return a male relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<rel male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get relationship plural', function () {
    it('should return a plural relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<rel plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get conjunction', function () {
    it('should return a conjunction', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<conj>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get face', function () {
    it('should return a face', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<face>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get faced', function () {
    it('should return a face.d', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<face.d>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get offensive sentence', function () {
    it('should return an offensive sentence', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('The <adj> <noun> <adv> <verb.ed> the <adj> <noun> on the <noun-surface>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);
    })
});

describe('Get another offensive sentence', function () {
    it('should return an offensive sentence', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('I like my <noun-shape>-shaped <noun-body.plural>');
        var count=result.match(/\<|\>/g);
        assert.equal(null,count);
    })
});


// TAGS


// CASES

describe('Make sentence case', function () {
    it('should return a sentence cased string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('[case:sentence]i. like. big. butts');
        assert.equal(result,'I. Like. Big. Butts');
    })
});

describe('Make upper case', function () {
    it('should return an upper cased string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('[case:upper]i like big butts');
        assert.equal(result,'I LIKE BIG BUTTS');
    })
});

describe('Make lower case', function () {
    it('should return an upper cased string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('[case:lower]I LIKE BIG BUTTS');
        assert.equal(result,'i like big butts');
    })
});

describe('Make word case', function () {
    it('should return a word cased string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('[case:word]I LIKE BIG BUTTS');
        assert.equal(result,'I Like Big Butts');
    })
});

describe('Make title case', function () {
    it('should return a title cased string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('[case:title]I LIKE ALL THE BIG BUTTS');
        assert.equal(result,'I Like All the Big Butts');
    })
});
