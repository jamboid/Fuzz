// Check if namespace is defined
var Fuzz = Fuzz || {};

// Fuzz namespace
//
// Base namespace for the Fuzz Framework
Fuzz = (function ($) {
	
	// Variables
	var priv = {},		// Set private object
		api = {}, 		// Set public API object
		defaults = {};	// Set defaults object

	// Private methods //
			
	// Set debug mode to outline framework elements
	priv.setDebugMode = function () {
		var debugButton = '<div class="debugToggle">Debug mode</div>';
		$('body').append(debugButton);
		$(".debugToggle").on("click",function(event){
		  $("body").toggleClass("debugMode");
		  event.preventDefault();
		});
	};
	
	// Public methods
			
	api.showElementWidth = function (element){
		console.log($(element).width());	
	}
			
    // Public initialisation
	api.init = function () { 
		priv.setDebugMode();
		//console.log("Fuzz.init called");
	};
	
	// Return Public API	
	return api;

})(jQuery); 

// Initialize
$(function() {
    Fuzz.init()
}); 
