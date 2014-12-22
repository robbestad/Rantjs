# Rantjs

An implementation of [Rant][1] by TheBerkin

<img src="http://res.cloudinary.com/sven-anders-robbestad/image/upload/c_scale,w_350/v1418975366/rantjs_0.8.4.png">

This project is still in its early stages, but the lexer is now complete.

The project is available via npm (do _npm install rantjs_). 

For implementation details, please visit the [npmjs page][3]

[Click here for an interactive demo][2]

[Click here for a writeup on my blog][4]

## Development Plan

Easy way to choose alternative dictionaries

Indefinite article (a/an) automation

Overwriting (targets)

Looping (repeaters)

Conditionals

## Contributions

Contributions are welcome. Feel free to submit an issue/pull request. The following areas are
of particular interest:

Documentation (wiki/code)

Fixing bugs

Optimization

Functions in the development plan

New language features


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
