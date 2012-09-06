var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Test = (function ($) {
    "use strict";
    // Private variables
    var api = {},       // Set public API object
        defaults = {},  // Set defaults object
        countElements = function (elem) {
            return $(elem).length;
        },

        // Public methods
        elementCheck = function (elements) {
            var elementCount = countElements(elements);
            Fuzz.cl("There are " + elementCount + " of elements: " + elements);
        },

        // Public initialisation
        init = function () {
            Fuzz.cl("Fuzz.Test initialised");
        };

    // Return the public api
    return {
        init: init,
        elementCheck: elementCheck
    };

}(jQuery));

// Initialise
$(function() {
    Fuzz.Test.init();
});