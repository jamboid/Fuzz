var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Navigation = (function ($) {
    "use strict";
    // Set up main navigation show/hide functionality
    var bindMainNavEvents = function () {
          // Add event handler for main nav responsive toggle
            $(".cpMainNav h2").on("click", function (event) {
                $(this).closest(".cpMainNav").toggleClass("show");
                event.preventDefault();
            });
        },
        // initialisation
        init = function () {
            bindMainNavEvents();
            Fuzz.cl("Fuzz.Navigation.init called");
        };

    // Return the public api
    return {
        init: init
    };

}(jQuery));

// Initialize
$(function() {
    Fuzz.Navigation.init();
}); 