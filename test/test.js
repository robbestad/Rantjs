var assert = require("assert");
//var should = require("should");
var rant = require("./../simpleRant");

describe('Get Sentence', function () {
    it('should return a sentence when calling several keywords', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<yes>, I need a bunch of <adjective> <noun.plural>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Yes', function () {
    it('should return a positive string', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<yes>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get No', function () {
    it('should return a negative string', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<no>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Single Month', function () {
    it('should return a string when calling a month', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<time_noun-month> <time_noun-month>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Facial Expression', function () {
    it('should return a verbed string when calling a facial expresson', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<facialexpression>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get Verbed Facial Expression', function () {
    it('should return a string when calling a facial expresson', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<facialexpression.ed>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

describe('Get plural time', function () {
    it('should return a string when a time noun with flags: plural and month', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<time_noun.plural-month>')
            .replace(new RegExp("<.*>","g"),"");
        assert(result,assert.hasContent);
    })
});

