// Site.showhide.js

// Check if base namespace is defined
var Site = Site || {};

// Site.layout namespace
Site.showhide = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var defaults = {
          selPlugin : "[data-plugin=showhide]",
          selAction : "[data-plugin=showhide] [data-action=toggle]",
          selContent : "[data-content=showhide]"
        },

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Creates a Nipper object to manage a show/hide component
         * NOTE: The term "Nipper" is Copyright © Rob Graham (@restlesslake)
         * @constructor
         */
        Nipper = function (elem) {
          var $thisNipper = $(elem),
              $thisContent = $thisNipper.find(defaults.selContent).eq(0),
              config = $thisNipper.data('plugin-config'),
              animate = config.animate || false,
              speed = config.speed || 200,
              startState = config.open || false,

              transitionComplete = function () {
                // Fire event to be heard by global delegate (Site.events.js)
                $.publish('layout/change');
              },

              // Toggle Show/Hide control
              toggleControl = function () {
                if($thisNipper.hasClass('isClosed')){
                  if(animate === true){
                    $thisContent .slideDown(speed, function () {
                      transitionComplete();
                    });
                    $thisNipper.removeClass('isClosed').addClass('isOpen');
                  } else {
                    $thisContent.show();
                    $thisNipper.removeClass('isClosed').addClass('isOpen');
                    transitionComplete();
                  }

                } else {
                  if(animate === true){
                    $thisContent.slideUp(speed, function () {

                      transitionComplete();
                    });
                    $thisNipper.addClass('isClosed').removeClass('isOpen');
                  } else {
                    $thisContent.hide();
                    $thisNipper.addClass('isClosed').removeClass('isOpen');
                    transitionComplete();
                  }
                }
              },

              setInitialState = function () {
                if (startState === false){
                  $thisNipper.addClass('isClosed');
                }
              },

              bindCustomMessageEvents = function () {
                $thisNipper.on('toggleShowHide', function (e) {
                  e.preventDefault();
                  toggleControl();
                });
              };

          this.init = function () {
            bindCustomMessageEvents();
            setInitialState();
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
          Site.events.createDelegatedEventListener('click', defaults.selAction, 'toggleShowHide');
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.showhide.init called");

          // Setup show/hide components
          $(defaults.selPlugin).each(function () {
            var thisNipper = new Nipper(this);
            thisNipper.init();
          });

          // Delegate module events
          delegateEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));
