/*!
 * extendFunction.js - The easiest way to overwrite other functions with additional functionality
 *
 * github.com/devinrhode2/extendFunction.js
 *
 * Copyright (c) 2013 extendFunction.js contributors
 * MIT Licensed
 */
(function(){
    var window = this; // this === window in the browser, this === global in node.
    var undefined;

    function extendFunction(fnRef, addedFunctionality) {
        // not doing 'use strict' because it changes what `this` means, and extendFunction
        // should be as seamless as possible
        // http://scriptogr.am/micmath/post/should-you-use-strict-in-your-production-javascript
        // however, if a global 'use strict' is leaked, you can expect we just use the `this`
        // keyword.. (I wish I could solve your bugs for you, but I can't here)

        var originalFunction;

        // type check like underscore/lodash.
        // (..advanced: we could assume it's a function and correct ourselves if it's a string, but that's a little gnarly for a prime use case)
        if (Object.prototype.toString.call(fnRef) == '[object String]') {

            // Example: split 'jQuery.ajax' into ['jQuery', 'ajax']
            var propertyArray = fnRef.split('.');

            // start with the global object, and iteratively access each property,
            // re-assigning to originalFunction each time
            // For example, this dynamic code:
            //  originalFunction = window; originalFunction = originalFunction[prop]; originalFunction = originalFunction[nextProp]; ..
            // Could ultimately boil down to this static code:
            //  originalFunction = window.$.fn.jQueryPluginFunction;
            originalFunction = window;

            // so while there are properties left to access..
            while (propertyArray.length) {
                try {
                    originalFunction = originalFunction[propertyArray.shift()];

                    //  if  originalFunction[propArray[0]]       is      undefined,
                    // then originalFunction[propArray[0]][propArray[1]] will throw because this is essentially doing window.undefined.undefined
                } catch (cantReadPropOfUndefined) {
                    // And now we've caught that exception. originalFunction should still just === undefined (essentially like window.undefined aka originalFunction.notDefinedProperty)
                    if (originalFunction === undefined) {
                        // ...but don't we want to prevent having originalFunction.undefined in the first place?
                        // Nope, we just assume good input for efficiency, but catch the exception here when it happens.
                        return sendUncaughtExcepton(
                            new TypeError('window.' + fnRef + ' is undefined and therefore cannot be extended as a function.')
                        );
                    } else {
                        // ...who knows what happened!
                        return sendUncaughtExcepton(cantReadPropOfUndefined);
                    }
                }
            }
        } else {
            // else fnRef is actually the originalFunction, or at least we'll assume so and catch the error if it isn't
            originalFunction = fnRef;
        }

        //originalFunction should now be a function. (If it isn't we'll catch that error specifically)

        function extendedFunction() {
            // TODO: write a test that verifies `this` refers to what it should refer too.
            // For example, if you do extendFunction('$.ajax', function(){ this === window.$; });
            var args = Array.prototype.slice.call(arguments);

            // EXTEND originalFunction TO TRACK IF IT WAS CALLED
            var wasOriginalCalled = false;
            var untrackedOriginal = originalFunction;
            originalFunction = function () {
                wasOriginalCalled = true;
                try {
                    // should we store this above and then use that variable? I don't know
                    return untrackedOriginal.apply(this, Array.prototype.slice.call(arguments));
                    // we use standard dynamic `arguments` instead of `args` because they are not necessarily always the same
                    // if a user modifies the arguments they call originalFunction with (extendFunction(function(args, originalFunction){ .. ) then we have to respect that
                } catch (e) {
                    // above we assumed originalFunction was a function if it wasn't a string (for efficiency) - here, we catch and correct if it wasn't a function.
                    if (Object.prototype.toString.call(untrackedOriginal) != '[object Function]') {
                        // to throw or not to throw?
                        sendUncaughtExcepton(new TypeError([
                            fnRef + ' is not a function. ',
                            fnRef + '\'s toString is:' + untrackedOriginal,
                            'It\'s type is:' + typeof untrackedOriginal
                        ].join('\n')));
                    }
                    return sendUncaughtExcepton(e); //always send browser provided error:
                }
            };

            // If the users additionalFunctionality function will call originalFunction asynchronously,
            // they can tell us NOT to call it
            function dontCallOriginal() {
                wasOrignalCalled = true; // Original is going to be called, so we're just going to say it was already
            }

            var originalReturn;
            var newReturn = addedFunctionality.call(this, args, originalFunction, dontCallOriginal);
            if (!wasOriginalCalled) {
                originalReturn = originalFunction.apply(this, args);
                wasOriginalCalled = false; // reset in case a function dynamically calls the originalFunction (??)
            }

            return (newReturn === undefined ?
                originalReturn
                :
                newReturn
            );
        }

        // Copy properties over:
        for (var prop in originalFunction) {
            if (Object.prototype.hasOwnProperty.call(originalFunction, prop)) {
                extendedFunction[prop] = originalFunction[prop];
            }
        }

        //maintain/preserve prototype and constructor chains. Note: we're not actually creating a new class.
        extendedFunction.prototype   = originalFunction.prototype;
        extendedFunction.constructor = originalFunction.constructor;
        extendedFunction.name        = originalFunction.name || 'httpBitLyDevinsFunctionNamingConvention';
        // if check non-standard function properties:
        if (typeof originalFunction.length !== 'undefined') { // if 0, then extendedFunction.length already === 0
            extendedFunction.length = originalFunction.length; //extendedFunction doesn't list arguments!
        }
        if (originalFunction.__proto__) {
            extendedFunction.__proto__ = originalFunction.__proto__;
        }
        if (propertyArray && propertyArray.length === 0) {
            eval('(typeof window !== "undefined" ? window : global).' + fnRef + ' = ' + extendedFunction.toString());
        } else {
            return extendedFunction;
        }
    }


    // Export/define function just like lodash

    /** Used to determine if values are of the language type Object */
    var objectTypes = {
        'function': true,
        'object': true
    };

    /** Used as a reference to the global object */
    var root = (objectTypes[typeof window] && window) || this;

    /** Detect free variable `exports` */
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

    /** Detect free variable `module` */
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports` */
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

    /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
        root = freeGlobal;
    }

    // some AMD build optimizers like r.js check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // define as a named module like jQuery and underscore.js
        define("extendFunction", [], function () {
            return extendFunction;
        });
    }
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    else if (freeExports && freeModule) {
        // in Node.js or RingoJS
        if (moduleExports) {
            freeModule.exports = extendFunction;
        }
        // in Narwhal or Rhino -require
        else {
            freeExports.extendFunction = extendFunction;
        }
    }
    else {
        // in a browser or Rhino
        root.extendFunction = extendFunction;
    }
}).call(this);