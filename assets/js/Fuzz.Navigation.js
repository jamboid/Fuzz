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
/*
	//var content = $('.mainNav nav');
	content.inner = $('.mainNav nav ul'); // inner div needed to get size of content when closed
	
	// css transition callback
	content.on('transitionEnd webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function(e){
	    if(content.hasClass('open')){
	    	content.css('max-height', 9999); // try setting this to 'none'... I dare you!
	    }
	});
	
	$('.mainNav h2').on('click', function(event){
	    
	    event.preventDefault();
	    content.toggleClass('open closed');
	    content.contentHeight = content.outerHeight();
	    
	    if(content.hasClass('closed')){
	    	
	    	// disable transitions & set max-height to content height
	    	content.removeClass('transitions').css('max-height', content.contentHeight);
	    	setTimeout(function(){
	    		
	    		// enable & start transition
	    		content.addClass('transitions').css({
	    			'max-height': 0,
	    			'opacity': 0
	    		});
	    		
	    	}, 10); // 10ms timeout is the secret ingredient for disabling/enabling transitions
	    	// chrome only needs 1ms but FF needs ~10ms or it chokes on the first animation for some reason
	    	
	    }
	    else if(content.hasClass('open')){  
	    	
	    	content.contentHeight += content.inner.outerHeight(); // if closed, add inner height to content height
	    	content.css({
	    		'max-height': content.contentHeight,
	    		'opacity': 1
	    	});
	    	
	    }
	});​
*/

	  // Add event handler for main nav responsive toggle
	  $(".mainNav h2").on("click",function(event){
		  $(this).closest(".mainNav").toggleClass("show");
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