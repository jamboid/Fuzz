// Site.utils.js

// Check if base namespace is defined
var Site = Site || {};

// Site.helpers namespace
Site.utils = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var debugMode = true,

  ///////////////
  // Functions //
  ///////////////

        /**
         * Console.log function with check for browsers that don't support it
         * @function
         */
        logMessage = function (logMessage) {
          if (debugMode === true) {
            if (window.console) {
              if (console.log) {
                console.log(logMessage);
              }
            }
          }
        },

        /**
         * Get maximum height of a set of elements
         * @function
         */
        getMaxHeight = function (elements) {
          var theseElements = elements,
              maxHeight = 0,
              currentHeight = 0;
          $(theseElements).css('min-height', 0);
          $(theseElements).each(function () {
            currentHeight = $(this).height();
            if (currentHeight > maxHeight){
              maxHeight = currentHeight;
            }
          });
          return maxHeight;
        },

        /**
         * Equalise the minimum heights of a set of elements
         * @function
         */
        equaliseMinHeights = function (elements) {
          var theseElements = elements,
              maxHeight = getMaxHeight(theseElements);

          getMaxHeight(theseElements);
          $(theseElements).css('min-height', maxHeight);
        },

        /**
         * Check if placeholder attribute is supported
         * @function
         */
        placeholderIsSupported = function () {
          var test = document.createElement('input');
          return ('placeholder' in test);
        },

        /**
         * Read a page's GET URL query string variables and return them as an associative array.
         * @function
         */
        getURLQueryString = function () {
          var vars = [], hash;
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
          }
          return vars;
        },

        /**
         * Check if element is currently displayed in the viewport - returns bool
         * @function
         */
        isElementInView = function (element) {
          var $element = $(element),
              $window = $(window),
              windowHeight = $window.height(),
              scrollTop = $window.scrollTop(),
              elementOffset = $element.offset(),
              elementTop = elementOffset.top,
              elementHeight = $element.height();

          if ( elementTop < (scrollTop + windowHeight)  && (elementTop + elementHeight) > scrollTop ) {
            return true;
          } else if ( (elementTop + elementHeight) > scrollTop && (elementTop + elementHeight) < (scrollTop + windowHeight) ) {
            return true;
          } else {
            return false;
          }
        },

        /**
         * Remove the style attribute from an element
         * @function
         */
        resetStyles = function (element) {
          $(element).removeAttr("style");
        },

        /**
         * Add "odd" and "even" classes
         * @function
         */
        addOddAndEvenClasses = function (elements) {
          var $theseElements = $(elements);
          $theseElements.filter(':nth-child(2n-1)').addClass('odd');
          $theseElements.filter(':nth-child(2n)').addClass('even');
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.utils.init called");
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      cl: logMessage,
      resetStyles: resetStyles,
      equaliseMinHeights: equaliseMinHeights,
      placeholderIsSupported: placeholderIsSupported,
      getURLQueryString: getURLQueryString,
      isElementInView: isElementInView,
      addOddAndEvenClasses: addOddAndEvenClasses,
      init: init
    };

}(jQuery));
