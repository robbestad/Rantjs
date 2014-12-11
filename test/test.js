var assert = require("assert");
//var should = require("should");
var rant = require("./../simpleRant");

describe('Get Sentence', function () {
    it('should return a sentence when calling several keywords', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yes>, I need a bunch of <adjective> <noun.plural>')
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
        var result = r.rantConstructor('<name-male>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Female Name', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<name-female>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Yes', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Multiple Yeses', function () {
    it('should return a positive string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<yes> <yes> <yes> <yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get No', function () {
    it('should return a negative string', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<no>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Single Month', function () {
    it('should return a string when calling a month', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<time-month>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get All Month Nouns', function () {
    it('should return all mounth nouns', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<time>|<time-month>|<time-month.plural>|')
            .replace(new RegExp("<.*>","g"),"");
        var count=result.match(/\|+/g).length;
        assert(count,assert.equal(3,count));
    })
});

describe('Get plural time', function () {
    it('should return a string when a time noun with flags: plural and month', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<time-month.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});
describe('Get day of week', function () {
    it('should return a string with day of the week', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<time-dayofweek>')
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

describe('All nouns', function () {
    it('should return three nouns', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<noun-animal>|<noun>|<noun.plural>|')
            .replace(new RegExp("<.*>","g"),"");
        var count=result.match(/\|+/g).length;
        assert(count,assert.equal(3,count));
    })
});

describe('Get exclamation', function () {
    it('should return an exclamation', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<exclamation>')
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
        var result = r.rantConstructor('<relationship>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get relationship plural', function () {
    it('should return a plural relationship', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<relationship.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get conjunction', function () {
    it('should return a conjunction', function () {
        var r = new rant.SimpleRant();
        var result = r.rantConstructor('<conjunction>')
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

