// Site.loading.js

/**
 * Site
 * @namespace
 */
var Site = Site || {};

/**
 * Site.loading
 * @namespace
 */
Site.loading = (function ($) {
  "use strict";

  ///////////////
  // Variables //
  ///////////////

    var $body = $('body'),
        loadDelay = 100,

  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a LoadingManager object to manage display of the page once loaded.
       * @constructor
       */
      LoadingManager = function () {

        /* Scope variables */
        var

        /**
         * Adds a class to the HTML body tag to allow control display of the page
         * @function
         */
        pageIsLoaded = function () {
          // Add class for CSS styling
          $body.addClass('pageLoaded');
          // Publish message for JS modules
          $.publish('page/loaded');
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          // Set flags that page has loaded after a defined delay to allow page rendering
          var pageLoadTimeout = setTimeout(pageIsLoaded,loadDelay);
        };
      },

  ///////////////
  // Functions //
  ///////////////

      /**
       * Initialised this module
       * @function
       */
      init = function () {
        Site.utils.cl("Site.loading initialised");

        // Initialise LoadingManager object
        var thisLoadingManager = new LoadingManager(this);
        thisLoadingManager.init();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init
  };

}(jQuery));
