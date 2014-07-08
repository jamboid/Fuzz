// Site.map.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.map = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var mapSel = ".cpRegionSelector",

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Creates an Object object
         * @constructor
         */
        MapManager = function (element) {

          var $thisMap = $(element),
              $mapLinks = $thisMap.find('a'),
              mapCurrentActiveRegion = $thisMap.find('.regionSelectorList a.active').eq(0).data('map-state'),

          /**
           * Set hover events on links to control state of map
           * @function
           */
          bindHoverEventsOnLinks = function () {
            $mapLinks.each(function(){

              var thisLinkStateData = $(this).data('map-state');

              $(this).hover(function () {
                if($thisMap.hasClass(thisLinkStateData) === false){
                  $thisMap.addClass(thisLinkStateData);
                }
              }, function () {
                $thisMap.removeClass(thisLinkStateData);
              });
            });
          },

          /**
           * Set default state of map
           * @function
           */
           setMapDefaultState = function () {
             var stateToAdd = mapCurrentActiveRegion + "Active";

             $thisMap.addClass(stateToAdd);
           },

          /**
           * Bind custom message events for this object
           * @function
           */
          bindCustomMessageEvents = function () {
            // $thisMainNav.on('', function (e) {
            //   e.preventDefault();
            // });
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {

          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {
            bindCustomMessageEvents();
            subscribeToEvents();
            setMapDefaultState();
            bindHoverEventsOnLinks();
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
          //Site.events.createDelegatedEventListener('click', sel, 'toggleMainNav');

        },

        /**
         * init function for this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.map initialised");

          // Initialise Objects objects based on DOM objects
          $(mapSel).each(function () {
            var thisMapManager = new MapManager(this);
            thisMapManager.init();
          });

          // Add delegate event listeners for this module
          //delegateEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));