# Rantjs

An implementation of [Rant][1] by TheBerkin

<img src="http://res.cloudinary.com/sven-anders-robbestad/image/upload/c_scale,w_350/v1418975366/rantjs_0.8.4.png">

The project is available via npm (do _npm install rantjs_). 

For implementation details, please visit the [npmjs page][3]

[Click here for an interactive demo][2]

[Click here for a writeup on my blog][4]

## Usage

    var rant = require("rantjs");
    var sentence=rant('<firstname male> likes to <verb-transitive> <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.');

    console.log(sentence); // 'Sean likes to chop parrots with his pet cat on Saturdays.'


## Development Plan

Easy way to choose alternative dictionaries

Indefinite article (a/an) automation

Overwriting (targets)

~~Capitalisation~~

~~Looping (repeaters)~~

Conditionals

## Contributions

Contributions are welcome. Feel free to submit an issue/pull request. The following areas are
of particular interest:

Documentation (wiki/code)

Fixing bugs

Optimization

Functions in the development plan

New language features

Testing. Currently, this is the result of the coverage report:

    Statements   : 96.44% ( 461/478 )
    Branches     : 67.65% ( 46/68 )
    Functions    : 100% ( 18/18 )
    Lines        : 97.24% ( 458/471 )

Ideally, it should be 100% on everything

## New in version 0.9.1

  Rewrote Rantjs for CommonJS. 
  
  Removed several gulp tasks (concat, minify)
 
  Refactored the tests
 
  Renamed the app internally
 
  New usage syntax (not compatible with 0.8.x)
 
  You can now call Rantjs directly from require:
  
    var sentence=require("rantjs")("<firstname male> likes to <verb-transitive> 
    <noun.plural> with <pron poss male> pet <noun-animal> on <timenoun dayofweek plural>.");
 
  Added randomization:
  
    require("rantjs")("A random string: [rep:8][sep:\N]{\C}");
    //A random string: XUACJGOGN

## New in version 0.8.6

  Added support for [rep:x]

  Usage:

    [case:title][sep:\n][rep:3]{I like <noun animal plural> but not <noun animal plural>}

    // I Like Ogres but not Turtles
    // I Like Bulls but not Horses
    // I Like Poodles but not Owls

   Note: [sep:\n] dictates newlines. Alternatively, you can specify \s for space.

## New in version 0.8.5

  Added support for [case]-tag.

  Usage:

    [case:upper]<firstname male>

  Variants:

    [case:none|default|word|upper|lower|case|sentence]



[1]: https://github.com/TheBerkin/Rant
[2]: https://rantjs.herokuapp.com/
[3]: https://www.npmjs.com/package/rantjs
[4]: http://www.robbestad.com/2014/12/procedurally-generated-text-with-rantjs.html
