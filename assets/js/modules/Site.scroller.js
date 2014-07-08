// Site.scroller.js

/*

This module adds functionality for a responsive horizontal carousel.

*/

var Site = Site || {};

// Site namespace
Site.scroller = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var defaults = {
          // Selectors for scroller plugin
          selControls: ".scrollControls",
          selControl : "[data-action]",
          selScrollerContent : ".scrollContent",
          selScrollerItem : ".scrollItem",
          selScrollerItemFirst : ".scrollItem:first-child",
          selPlugin : "[data-plugin=scroller]"
        },

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Creates a Scroller object to manage a responsive scroller component
         * @constructor
         */
        Scroller = function (elem) {
          var $thisScroller = $(elem),
              scrollerConfig = $thisScroller.data('config') || {},
              timeUnit = scrollerConfig.timeUnit || 250, // Set in data-config attribute, or use default
              maxScroll = scrollerConfig.maxScroll || 4, // Set in data-config attribute, or use default
              $scrlItemContainer = $(defaults.selScrollerContent, $thisScroller),
              $scrlItems = $(defaults.selScrollerContent, $thisScroller),
              inTransition = false,
              animate = true,
              controls = $(defaults.selControls, $thisScroller),
              scrlWidth,
              itemWidth,
              itemsToScroll,
              scrollTime,
              moveWidth,
              timeOut = false,

              // Set dimensions and other parameters for scroll. Called on page load and whenever window is resized
              setupLayout = function () {
                scrlWidth = $scrlItemContainer.width();
                itemWidth = $thisScroller.find("li").eq(0).width();
                // Set the number of items to scroll
                itemsToScroll = Math.round(scrlWidth / itemWidth);

                // Set maximum number of items to scroll
                if (itemsToScroll > maxScroll) {
                  itemsToScroll = maxScroll;
                }

                // Set the scroll time, based on the number of items being scrolled
                scrollTime = itemsToScroll * timeUnit;
                // Set the width to scroll
                moveWidth = itemsToScroll * itemWidth;

                if (itemsToScroll > maxScroll) {
                  itemsToScroll = maxScroll;
                }

                // Debug log
                Site.utils.cl("maxScroll: " + maxScroll + ", " + "Items to scroll: " + itemsToScroll);
                Site.utils.cl("Scroll width: " + scrlWidth + ", " + "Item Width: " + itemWidth);
                Site.utils.cl("Items to scroll: " + itemsToScroll + ", " + "Number of items: " + $scrlItems.length + ", " + "Distance to scroll: " + moveWidth);

                // If total number of items is greater than visible items, show controls...
                if ($scrlItems.length > itemsToScroll) {
                  $(scrollerConfig.selControl, controls).show();
                } else {
                  $(scrollerConfig.selControl, controls).hide();
                }
              },

              // Animate/Move the scroller in the desired direction
              moveScroller = function (direction) {

                var itemsToClone;

                if (inTransition === false) {
                  inTransition = true;
                  if (direction === 'next') {
                    itemsToClone = $(defaults.selScrollerItem, $thisScroller).slice(0, itemsToScroll).clone();
                    $scrlItemContainer.append(itemsToClone);

                    if (animate === false) {
                      $(defaults.selScrollerItem, $thisScroller).slice(0, itemsToScroll).remove();
                      inTransition = false;
                    } else {
                      $(defaults.selScrollerItemFirst, $scrlItemContainer).animate({ marginLeft: -moveWidth }, scrollTime, function () {
                        $(this).removeAttr("style");
                        $(defaults.selScrollerItem, $thisScroller).slice(0, itemsToScroll).remove();
                        inTransition = false;
                      });
                    }
                  } else if (direction === 'previous') {
                    itemsToClone = $(defaults.selScrollerItem, $thisScroller).slice(-itemsToScroll).clone();
                    if (animate === false) {
                      $scrlItemContainer.prepend(itemsToClone);
                      $(defaults.selScrollerItem, $thisScroller).slice(-itemsToScroll).remove();
                      inTransition = false;
                    } else {
                      $(itemsToClone).eq(0).css("margin-left", -moveWidth);
                      $scrlItemContainer.prepend(itemsToClone);
                      $(defaults.selScrollerItemFirst, $scrlItemContainer).animate({ marginLeft: 0 }, scrollTime, function () {
                        $(this).removeAttr("style");
                        $(defaults.selScrollerItem, $thisScroller).slice(-itemsToScroll).remove();
                        inTransition = false;
                      });
                    }
                  }
                }
              },

              //** Set-up Object Events **//

              // Bind Custom Events to allow Object messaging
              bindCustomMessageEvents = function () {

                // Bind moveScroller event listener for moving the scroller by control clicks
                $thisScroller.on('moveScroller', function (e) {
                  e.preventDefault();
                  // If event target is a control and has a "data-action" attribute,
                  // advance the scroller in the direction the attribute states
                  if($(e.target).attr('data-action') !== undefined) {
                    moveScroller($(e.target).attr('data-action'));
                  }
                });

                // Bind moveScrollerNext event listener for external control of scroller
                $thisScroller.on('moveScrollerNext', function (e) {
                  e.preventDefault();
                  // If event target is a control, advance the scroller in the control direction
                  moveScroller('next');
                });

                // Bind moveScrollerPrevious event listener for external control of scroller
                $thisScroller.on('moveScrollerPrevious', function (e) {
                  e.preventDefault();
                  // If event target is a control, advance the scroller in the control direction
                  moveScroller('previous');
                });

                // Bind updateLayout event listener for updating scroller on global layoutChange message
                $thisScroller.on('updateLayout', function (e) {
                  e.preventDefault();

                  setupLayout();
                });

                // Bind Hammer touch library events to scroller to allow swipe control
                $thisScroller.hammer();
              },

              // Subscribe object to Global Messages
              subscribeToEvents = function () {
                // Subscrive to layoutchange event to trigger scroller's updateLayout method
                $.subscribe('page/resize', function () {$(this).trigger('updateLayout');} , $thisScroller);
              };

            //** Object initialisation **//

            this.init = function () {

              // Debug log for configuration
              Site.utils.cl(scrollerConfig);
              Site.utils.cl(scrollerConfig.timeUnit);
              Site.utils.cl("timeUnit: " + timeUnit);

              // Rules for animating scroller:
              // If browser is IE7, don't animate transitions
              if ($("html.ie7").length > 0) {
                animate = false;
              }

              // Call initialisation methods
              setupLayout();
              bindCustomMessageEvents();
              subscribeToEvents();

            };
        },

  ///////////////
  // Functions //
  ///////////////

        /**
         * Create delegate event listeners for this module
         * @function
         */
        delegateEvents = function () {
          // Delegate 'click' events on scroller controls
          Site.events.createDelegatedEventListener('click', '.scrollControls [data-action]', 'moveScroller');
          Site.events.createDelegatedEventListener('swipeleft', '[data-plugin=scroller]', 'moveScrollerNext');
          Site.events.createDelegatedEventListener('swiperight', '[data-plugin=scroller]', 'moveScrollerPrevious');
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {

          // Create Scroller object(s)
          $(defaults.selPlugin).each(function () {
            var thisScroller = new Scroller(this);
            thisScroller.init();
          });

          // Delegate events for this module's objects
          delegateEvents();

          Site.utils.cl("Site.Scroller.init called");
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
        init: init
    };

}(jQuery));