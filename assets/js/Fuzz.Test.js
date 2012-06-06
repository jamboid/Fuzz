var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Test = (function ($) {

    // Private variables
	var priv = {},		// Set private object
		api = {}, 		// Set public API object
		defaults = {};	// Set defaults object
	
	// Private Methods
	priv.countElements = function (elem){		
		return $(elem).length
	};
		
	// Public methods
	api.elementCheck = function (elements){
		var elementCount = priv.countElements(elements);
		console.log("There are " + elementCount + " of elements: " + elements); 		
	};
	
    // Public initialisation
	api.init = function () {

    };
	
	// Return the public api
	return api;

})(jQuery);

// Initialise
$(function() {
    Fuzz.Test.init();
});