var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Scroller = (function ($) {

    // Variables
	var priv = {},		// Set private object
		api = {}, 		// Set public API object
		defaults = {};	// Set defaults object
	
	// Private Methods
    
    // Setup scrollers
    priv.setupScrollers = function(){
		$('[data-plugin="scroller"]').each(function(){
			priv.setResScroller(this);
		});
	};
		
	// Set up Responsive Scroller
	priv.setResScroller = function (scroller) {
		var thisScroller = scroller,
		scrlItemContainer = $("ul", thisScroller),
		scrlItems = $("li", thisScroller),
		// Initial widths and numbers of visible items
		scrlWidth, itemWidth, itemsToScroll, scrollTime, moveWidth,
		inTransition = false,
		totalItems = scrlItems.length,
		currItem = 0,
		itemToLoad,
		controls = $(".scrollControls", thisScroller),
		//thisScroller.append(controls);
		
		// Set dimensions for scroll
		setupLayout = function() {
			scrlItems = $("li", thisScroller),
			scrlWidth = scrlItemContainer.width(),
			itemWidth = scrlItems.eq(0).width(),
			// Set the number of items to scroll
			itemsToScroll = Math.round(scrlWidth / itemWidth),
			// Set the scroll time, based on the number of items being scrolled
			scrollTime = itemsToScroll * 250,
			// Set a fixed time for any number of items
			//scrollTime = 300,
			// Set the width to scroll
			moveWidth = itemsToScroll * itemWidth;
			// If total number of items is greater than visible items, show controls...
			if (scrlItems.length > itemsToScroll) {
				$("[data-action]", controls).show();
			}
			// ...otherwise, hide controls
			else {
				$("[data-action]", controls).hide();
			}
		};
		
		// Click events on controls
		$('[data-action]', controls).on('click', function (event) {
			event.preventDefault();
			var itemsToClone,
			direction = $(this).attr('data-action');
			
			if (!inTransition) {
				inTransition = true;
				if (direction == 'next') {
					itemsToClone = $("li", thisScroller).slice(0, itemsToScroll).clone();
					scrlItemContainer.append(itemsToClone);
					$("li:first-child", scrlItemContainer).animate({ marginLeft: -moveWidth }, scrollTime, function () {
						$(this).removeAttr("style");
						$("ul li", thisScroller).slice(0, itemsToScroll).remove();
						inTransition = false;
					});
				}
				else {
					itemsToClone = $("li", thisScroller).slice(-itemsToScroll).clone();
					itemsToClone.eq(0).css("margin-left", -moveWidth);
					scrlItemContainer.prepend(itemsToClone);
					$("li:first-child", scrlItemContainer).animate({ marginLeft: 0 }, scrollTime, function () {
						//$(this).removeAttr("style");
						$("ul li", thisScroller).slice(-itemsToScroll).remove();
						inTransition = false;
					});
				}
			}
		});

		$(window).resize(setupLayout);

		setupLayout();
    };		
	// Public methods
	api.whereAmI = function(){
		console.log("This is the API for the Fuzz.Scroller object");		
	}
    // Public initialisation
	api.init = function () {
		priv.setupScrollers();
		console.log("Fuzz.Scroller.init called");
    };
	
	// Return the public api
	return api;
	
})(jQuery); 

// Initialize
$(function() {
    Fuzz.Scroller.init();
}); 