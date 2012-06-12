var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Navigation = (function ($) {

    // Variables
	var priv = {},		// Set private object
		api = {}, 		// Set public API object
		defaults = {};	// Set defaults object
	
	// Private Methods
    
	// Set up main navigation show/hide functionality
	priv.setMainNav = function () {
	  // Add event handler for main nav responsive toggle
	  $(".cpMainNav h2").on("click",function(event){
		  $(this).closest(".cpMainNav").toggleClass("show");
		  event.preventDefault();
	  });
    };
		
	// Public methods

    // Public initialisation
	api.init = function () {
		priv.setMainNav();
		console.log("Fuzz.Navigation.init called");
    };
	
	// Return the public api
	return api;
	
})(jQuery); 

// Initialize
$(function() {
    Fuzz.Navigation.init();
}); 