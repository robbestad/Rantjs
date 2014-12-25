/**
 *
 *      jQuery.scrollFade - Fade in elements as you scroll through the page.
 *      Depends on jQuery.onScreen (http://github.com/Folis/jquery.onscreen)
 *     
 *      Author: Richard Blechinger (http://fol.is / @F0lis)
 *      License: MIT
 *     
 */
 
(function( $ ) {
        $.fn.scrollFade = function(options) {
            var that = $(this);

            options = options || {};
            if (options.offset === undefined)
                options.offset = 200;
            if (options.movement === undefined)
                options.movement = 50;


            that.css("position", "relative");
            that.css("top", options.movement + "px");

            that.onScreen(function() {
                that.stop().animate({ 
                    opacity: 1,
                    '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)',
                    filter: "alpha(opacity=100)",
                    top: 0
                }, 500);
            }, function() {
                that.stop().animate({ 
                    opacity: 0,
                     '-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)',
                    filter: "alpha(opacity=0)",
                    top: options.movement + "px"
                }, 500);
            }, options.offset);

        };
}( jQuery ));

