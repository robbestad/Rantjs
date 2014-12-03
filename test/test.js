var assert = require("assert");
var should = require("should");
var rant = require("./../simpleRant");
//console.dir(rant);
//console.dir(rant.simpleRant);
//console.dir(rant.simpleRant.rantConstructor);

describe('GetSingleMonth', function () {
    it('should return a string when calling a month', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<time_noun-month> <time_noun-month>');
        return result;
    })
});


describe('GetMonth', function () {
    it('should return a string when calling a month', function () {
        var r = new rant.simpleRant();
        var result = r.rantConstructor('<time_noun-month> <time_noun-month>');
        return result;
    })
});

