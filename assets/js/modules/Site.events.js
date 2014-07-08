// Site.events.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.events = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var $body = $('body').eq(0),

  ///////////////
  // Functions //
  ///////////////

        /**
         * Bind custom Global events that will result in a "Publish" message being broadcast
         * @function
         */
        bindGlobalMessages = function () {
          // Handle 'layoutchange' event bubbled to <body> element
          $body.on('layoutchange', function () {
            $.publish('layout/change');
          });

          // Handle page scroll or (debounced) resize
          $(window).on('scroll', function () {
            $.publish('page/scroll');
          });

          $(window).on('debouncedresize', function () {
            $.publish('page/resize');
          });

          // Register Hammer touch events on body
          // This lets you treat these touch events as the normal delegate events
          //$body.hammer();

        },

        /**
         * Simple factory function to trigger a global message upon a delegated event
         * - note that preventDefault and stopPropagation are not called
         * @function
         * @parameter eventType (string)
         * @parameter selector (string)
         * @parameter message (string)
         *
         */
        createGlobalMessenger = function (eventType, selector, message) {
          $body.on(eventType, selector, function (e) {
            $.publish(message);
          });
        },

        /**
         * Simple factory function to bind a common delegated event listener to the <body> element
         * @function
         * @parameter eventType (string)
         * @parameter selector (string)
         * @parameter eventToTrigger (string)
         */
        createDelegatedEventListener = function (eventType, selector, eventToTrigger) {
          $body.on(eventType, selector, function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(e.target).trigger(eventToTrigger);
          });
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.events initialised");
          bindGlobalMessages();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init,
      createDelegatedEventListener: createDelegatedEventListener,
      createGlobalMessenger: createGlobalMessenger
    };

}(jQuery));
