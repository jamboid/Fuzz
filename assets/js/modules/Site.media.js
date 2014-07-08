// Site.media.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.media = (function ($) {
    "use strict";
    // Variables
    var lazyVideoSel = '[data-plugin=lazyVideo]',
        lazyVideoActionSel = '[data-plugin=lazyVideo] a',

        // Lazy Video class
        LazyVideo = function (elem) {
          var $thisLazyVideo = $(elem),
              videoID = $thisLazyVideo.attr('data-video-id'),
              placeholder = $thisLazyVideo.find('a'),
              loadingMethod = $thisLazyVideo.data('loading'),
              videoEmbed = $('<object width="400" height="300" type="movie" data="http://www.youtube.com/v/' + videoID + '?version=3&amp;hl=en_US&amp;rel=0"><param name="movie" value="http://www.youtube.com/v/'+ videoID + '?version=3&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><embed src="http://www.youtube.com/v/'+ videoID + '?version=3&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>'),

              loadLazyVideo = function () {
                $(placeholder).remove();
                $thisLazyVideo.append(videoEmbed).addClass('videoLoaded');
              },

              loadLazyVideoIfInView = function () {
                if(Site.utils.isElementInView($thisLazyVideo)){
                  loadLazyVideo();
                }
              },

              //** Set-up Object Events **//

              // Add event handler for main navigation toggle
              bindCustomMessageEvents = function () {
                $thisLazyVideo.on('loadLazyMedia', function (e) {
                  e.preventDefault();
                  if (!$thisLazyVideo.hasClass('videoLoaded')) {
                    loadLazyVideoIfInView();
                  }
                });
              },

              // Subscribe object to Global Messages
              subscribeToEvents = function () {
                if(loadingMethod !== 'click') {
                  $.subscribe('page/scroll', function () {$(this).trigger('loadLazyMedia');},$thisLazyVideo);
                  $.subscribe('page/resize', function () {$(this).trigger('loadLazyMedia');},$thisLazyVideo);
                  $.subscribe('layout/change', function () {$(this).trigger('loadLazyMedia');},$thisLazyVideo);
                  $.subscribe('page/load', function () {$(this).trigger('loadLazyMedia');},$thisLazyVideo);
                }
              };


              this.init = function () {
                Site.utils.cl(loadingMethod);

                if(loadingMethod === 'click') {
                  // Do nothing
                }
                // If video is set to display when container is in view
                else if (loadingMethod === 'view') {
                  // Load image if it is in view
                  loadLazyVideoIfInView();
                }
                // Otherwise load the image on page load
                else {
                  loadLazyVideo();
                }

                bindCustomMessageEvents();
                subscribeToEvents();

              };
        },

        // Set Event Listeners for events associated with this module
        delegateEvents = function () {
          Site.events.createDelegatedEventListener('click', lazyVideoActionSel, 'loadLazyMedia');
        },

        setLazyVideos = function () {
          $(lazyVideoSel).each(function (){
            var thisLazyVideo = new LazyVideo(this);
            thisLazyVideo.init();
          });

          delegateEvents();

        },

        init = function () {
          Site.utils.cl("Site.media initialised");
          setLazyVideos();
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));