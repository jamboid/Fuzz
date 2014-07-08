// Site.navigation.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child navigation
Site.navigation = (function ($) {
    "use strict";
  ///////////////
  // Variables //
  ///////////////

  var selNav = ".cp_MainNav",
      selWrapper = ".wrapper",
      selNavToggle = ".nvToggle [data-action=toggle]",
      selNavMenu = "ul.menu",
      transitionTime = 200,

      selInPageLink = 'a.inPageLink',

      $body = $('body').eq(0),

  //////////////////
  // Constructors //
  //////////////////

      /**
       * Creates a MainNavMenu object to manage a responsive main navigation menu
       * @constructor
       */
      MainNavMenu = function (elem) {
        var $thisMainNav = $(elem),
            $menu = $thisMainNav.find(selNavMenu).eq(0),
            $menuToggle = $thisMainNav.find('[data-action=toggle]').eq(0),
            singleCellRatio = Site.grid.getSingleCellRatio(),
            screenWidth, menuMinHeight,

            /**
             * Show/Hide main navigation menu when in mobile/small-screen configuration
             * @function
             */
            toggleMainNav = function () {

              if ($body.hasClass("navVisible") === true) {
                $body.removeClass("navVisible");
              } else {
                //$.publish('showMainNav');
                $body.addClass("navVisible");
              }
            },

            /**
             * Close Nav Menu if it is open
             * @function
             */
            closeMainNav = function () {
              if ($body.hasClass("navVisible") === true) {
                $body.removeClass("navVisible");
              }
            },

            /**
             * Open Nav Menu if it is closed
             * @function
             */
            openMainNav = function () {
              if ($body.hasClass("navVisible") === false) {
                $body.addClass("navVisible");
              }
            },

            /**
             * Clone main nav menu into a slide menu container and append it inside the <body> tag
             * @function
             */
            createSlideMenu = function () {
              var $slideMenu = $('<div class="cp_SlideMenu">').append($menu.clone().addClass('mnSlide'));
              $body.append($slideMenu);
            },

            /**
             * Update the minimum height of the nav menu based on the width of the viewport
             * @function
             */
            updateMinHeight = function () {
              screenWidth = $(window).width();
              menuMinHeight = (screenWidth * singleCellRatio) - $menuToggle.height();
              $menu.css('min-height', menuMinHeight);
            },

            /**
             * Subscribe object to Global Messages
             * @function
             */
            subscribeToEvents = function () {
              $.subscribe('page/resize', function () { $(this).trigger('updatelayout');} , $thisMainNav);
              $.subscribe('navigation/close', function () { $(this).trigger('closeMainNav');} , $thisMainNav);
            },

            /**
             * Add event handler for main navigation toggle
             * @function
             */
            bindCustomMessageEvents = function () {
              $thisMainNav.on('toggleMainNav', function (e) {
                e.preventDefault();
                toggleMainNav();
              });

              $thisMainNav.on('openMainNav', function (e) {
                e.preventDefault();
                openMainNav();
              });

              $thisMainNav.on('closeMainNav', function (e) {
                e.preventDefault();
                closeMainNav();
              });

              $thisMainNav.on('updatelayout', function (e) {
                e.preventDefault();
                //updateMinHeight();
              });
            };

        /**
         * Initialise this object
         * @function
         */
        this.init = function () {
          bindCustomMessageEvents();
          subscribeToEvents();
          createSlideMenu();
          //updateMinHeight();
        };
      },

      /**
       * Creates an InPageLink object to manage a deep-link navigation item
       * @constructor
       */
      InPageLink = function (elem) {
        var $thisInPageLink = $(elem),
            link = $thisInPageLink.attr('href'),
            queryTerm = $thisInPageLink.data('query'),

        // Get #id from URL and rebuild URL with a query string
        buildQueryUrlFromAnchorUrl = function (anchorUrl) {
          var thisUrl = anchorUrl,
              index = thisUrl.indexOf('#'),
              baseUrl, hash, query;

          if (index > 0) {
            baseUrl = thisUrl.substring(0, index);
            hash = thisUrl.substring(index + 1);
            query = baseUrl + "?" + queryTerm + '=' + hash;

          } else {
            query = thisUrl;
          }

          return query;
        },

        // Go the page using a modified URL
        goToLink = function () {
          window.location = buildQueryUrlFromAnchorUrl(link);
        },

        // Add event handler for main navigation toggle
        bindCustomMessageEvents = function () {
          $thisInPageLink.on('inpagelink', function (e) {
            e.preventDefault();
            goToLink();
          });
        };

        this.init = function () {
          bindCustomMessageEvents();
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

        // Create delegated event listeners
        if(Modernizr.touch) {
          Site.events.createDelegatedEventListener('click', selNavToggle, 'toggleMainNav');
        } else {
          Site.events.createDelegatedEventListener('click', selNavToggle, 'toggleMainNav');
        }

        Site.events.createDelegatedEventListener('click', selInPageLink, 'inpagelink');

        // Create global messengers
        Site.events.createGlobalMessenger('click', selWrapper, 'navigation/close');
      },

      /**
       * Initialise this module
       * @function
       */
      init = function () {
        Site.utils.cl("Site.navigation initialised");
        $(selNav).each(function () {
          var newNav = new MainNavMenu(this);
          newNav.init();
        });

        $(selInPageLink).each(function () {
          var thisInPageLink = new InPageLink(this);
          thisInPageLink.init();
        });

        delegateEvents();
      };

  ///////////////////////
  // Return Public API //
  ///////////////////////

  return {
    init: init
  };
}(jQuery));