// Site.layout.js

// Check if base layout is defined so it isn't overwritten
var Site = Site || {};

// Create child layout
Site.layout = (function ($) {
  "use strict";

  ///////////////
  // Variables //
  ///////////////

  var responsiveSize = 'small',


  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a ResponsiveLayoutManager object to manage general layout state
       * @constructor
       */
      ResponsiveLayoutManager = function () {
        var

        /**
         * Set and update the responsiveSize variable based on current screen width
         * @function
         */
        updateResponsiveSize = function () {
          var screenWidth = $(window).width(),
              screenSizeIs = {
                "small": 600,
                "medium": 800,
                "large": 1200,
                "xlarge": 1600
              };

          switch(true) {
            case(screenWidth <= screenSizeIs.small):
              responsiveSize = 'small';
              break;
            case(screenWidth <= screenSizeIs.medium):
              responsiveSize = 'medium';
              break;
            case(screenWidth <= screenSizeIs.large):
              responsiveSize = 'large';
              break;
            case(screenWidth <= screenSizeIs.xlarge):
              responsiveSize = 'xlarge';
              break;
            case(screenWidth > screenSizeIs.xlarge):
              responsiveSize = 'xxlarge';
              break;
          }
        },

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('debouncedresize', function () { updateResponsiveSize(); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
          updateResponsiveSize();
        };
      },

      /**
       * Creates a ResponsiveTextManager object to manage responsive text
       * - uses the FitText jQuery plugin so make sure this is included in the src/assets/js/libs folder
       * @constructor
       */
      ResponsiveTextManager = function () {
        var fitTextSel = '.cpResult .result',

        setFitText = function () {
          $(fitTextSel).fitText(0.4, { minFontSize: '100px', maxFontSize: '180px' });
        };


        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          setFitText();
        };
      },

      /**
       * Creates a ScrollManager object to manage scrolling events
       * @constructor
       */
      ScrollManager = function () {

        var $pageFooter = $('.stFooter').eq(0),
            footerReached = false,

        /**
         * Check if the page footer has been reached when the page is scrolled
         * @function
         */
        checkIfFooterHasBeenReached = function () {

          if(Site.utils.isElementInView($pageFooter) && !footerReached){
            footerReached = true;
            Site.analytics.trackPageEvent('Page Navigation','scroll','Footer reached');
          }
        },

        /**
         * Subscribe object to Global Messages
         * @function
         */
        subscribeToEvents = function () {
          $.subscribe('scroll', function () { checkIfFooterHasBeenReached(); });
        };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          subscribeToEvents();
        };
      },

  ///////////////
  // Functions //
  ///////////////

      /**
       * Return the value of the responsiveSize variable
       * @function
       */
      getResponsiveSize = function () {
        return responsiveSize;
      },

      /**
       * Initialise this module
       * @function
       */
      init = function () {
        Site.utils.cl("Site.layout initialised");

        // Create a new ResponsiveLayoutManager object
        var thisResponsiveLayoutManager = new ResponsiveLayoutManager();
        thisResponsiveLayoutManager.init();

        // Create a new ResponsiveTextManager object
        var thisResponsiveTextManager = new ResponsiveTextManager();
        thisResponsiveTextManager.init();

        // Create a new ScrollManager object
        var thisScrollManager = new ScrollManager();
        thisScrollManager.init();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init,
    getResponsiveSize: getResponsiveSize
  };
}(jQuery));