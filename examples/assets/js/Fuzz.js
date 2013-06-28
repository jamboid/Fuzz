// Check if namespace is defined
var Fuzz = Fuzz || {};

// Fuzz namespace
//
// Base namespace for the Fuzz Framework
Fuzz = (function ($) {
    "use strict";
    // Variables
    var defaults = {},
        // Set debug mode to outline framework elements
        setDebugMode = function () {
            var debugButton = '<div class="debugToggle">Debug mode</div>';
            $('body').append(debugButton);
            $(".debugToggle").on("click", function (event) {
                event.preventDefault();
                $("body").toggleClass("debugMode");
            });
        },
        // Public methods           
        showElementWidth = function (element) {
            Fuzz.cl($(element).width());
        },

        // Console.log function with check for browsers that don't support it
        cl = function (logMessage) {
            if(window.console){
                if(console.log){
                console.log(logMessage);
                }   
            }
        },
        // Public initialisation
        init = function () {
            setDebugMode();
            Fuzz.Scroller.init();
            cl("Fuzz.init called");
        };

    // Return Public API    
    return {
        init: init,
        cl: cl,
        showElementWidth: showElementWidth
    };

}(jQuery));

// Initialize
$(function() {
    Fuzz.init()
}); 
