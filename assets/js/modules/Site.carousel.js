// Site.carousel.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.carousel = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var defaults = {},
        carouselSel = "[data-plugin=carousel]",

  //////////////////
  // Constructors //
  //////////////////

        /**
         * Carousel object constructor
         * @constructor
         */
        Carousel = function (elem) {
          var $thisCarousel = $(elem),
              $slideContainer = $thisCarousel.find('.slides').eq(0),
              $slides = $thisCarousel.find('.slide'),
              numOfSlides = $slides.length,
              config = $thisCarousel.data('config'),
              interval = config.interval || 5000,
              transition = config.transition || 1000,
              $currentSlide, $nextSlide, $firstSlide, currentHeight, cycleTimeout,
              carouselPaused = config.paused || true,

              setCycle = function () {
                if(!carouselPaused) {
                  cycleTimeout = setTimeout(advanceCarousel, interval);
                }
              },

              advanceCarousel = function () {
                // Fade in next slide to sit over current slide
                $nextSlide.fadeIn(transition, function () {
                  $currentSlide.removeClass('current');
                  $nextSlide.addClass('current').removeClass('next');
                  Site.utils.resetStyles($nextSlide);
                  $currentSlide = $nextSlide;

                  // Set next slide
                  var currentPos = $slides.index($currentSlide);
                  if((currentPos+1) < numOfSlides){
                    $nextSlide = $currentSlide.next();
                    $nextSlide.addClass('next');
                  } else {
                    $nextSlide = $firstSlide;
                    $nextSlide.addClass('next');
                  }

                  // Set the carousel to loop through the slides
                  setCycle();
                });
              },

              // Switch the auto-cycling of the carousel on and off
              toggleAutoCycle = function () {
                if(!carouselPaused) {
                  carouselPaused = true;
                  clearTimeout(cycleTimeout);
                } else {
                  carouselPaused = false;
                  setCycle ();
                }
              },

              // Bind Custom Events to allow Object messaging
              bindCustomMessageEvents = function () {
                $thisCarousel.on('toggleAutoCycle', function (e) {
                  e.preventDefault();
                  toggleAutoCycle();
                });
              },

              // Setup the carousel to an initial state
              setInitialState = function () {
                $firstSlide = $slides.eq(0);
                $currentSlide = $firstSlide;
                $nextSlide = $currentSlide.next();
                //currentHeight = $currentSlide.height();
                //$slideContainer.css('height',currentHeight);
                $currentSlide.addClass('current');
                $nextSlide.addClass('next');
                bindCustomMessageEvents();
                setCycle();
              };

          this.init = function () {
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
          // Delegate 'click' event to start/stop cycling of carousel
          Site.events.createDelegatedEventListener('click', '[data-plugin=carousel] .slide a', 'toggleAutoCycle');
        },

        /**
         * Initialise this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.carousel initialised");

          $(carouselSel).each(function () {
            //buildCarousel(this);
            var thisCarousel = new Carousel(this);
            thisCarousel.init();
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
