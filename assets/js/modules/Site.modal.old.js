// Site.modal.js

// Functions for modal/popup content panels

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.modal = (function ($) {
    "use strict";

    var modalSel = '.openModal',
        modalMode = true,
        precache = true,
        modalPanel,
        modalScreen,
        setModalMode = function (state) {
          var newState = state;
          if(newState === true || newState === false){
            modalMode = newState;
          }
        },

        // modal Object containing content and event bindings for a modal content link
        Modal = function (content, mode) {
          var thisContent = content,
              thisMode = mode,
              thisLinkURL = $(thisContent).attr('href'),
              thisLinkIsModal = true,
              panelContent = $('<div class="panelContent"><div>'),
              panelClose = $('<a class="closePanel" data-action="close"><span>Close</span> X</a>'),
              isContentCached = false,

              getPanelContent = function (linkURL , precacheMode) {
                // If content is not already cached...
                if (!isContentCached){
                  var inPrecacheMode = precacheMode;

                  Site.utils.cl(linkURL);

                  $.ajax({
                    url: linkURL,
                    success: function(data) {
                      panelContent = $(data).find('#modalContent');
                      Site.utils.cl(panelContent);
                      isContentCached = true;
                      if (!inPrecacheMode) {
                        buildModalPanel();
                        // Track modal panel opening as GA Pageview
                        Site.analytics.trackPageView(thisLinkURL);
                      }
                    },
                    failure: function () {
                      if (inPrecacheMode) {
                        // Precaching has failed, but we will try again if the link is clicked
                      } else {
                        // Go to page directly
                        window.location.href = this.url;
                      }
                    }
                  });
                }
              },

              precacheContent = function () {
                  if ($(thisContent).hasClass('precache')) {
                      getPanelContent(thisContent, true);
                  }
              },

              // Initialise any JS plugins that have been loaded into the modal window.
              // Each should provide a function to do this.
              initialiseModalPlugins = function () {

                  // Check if panel content is a plugin and initiate as required...
                  if($('[data-plugin=scroller]').length > 0){
                    Site.scroller.setupScrollers();
                  }
                  if($('[data-plugin=gallery]').length > 0){
                    Site.gallery.replacePlaceholderImages();
                  }
                  $(".cpCaseStudy .impact .figure").bigtext({
                    childSelector: '> h2'
                  });
              },

              buildModalPanel = function () {

                  var container = $(thisContent).closest('.rg');
                  $('.modalScreen').addClass('isPlaced');
                  $('.modalScreen').addClass('isVisible');
                  var contentPos = $('#pageContent').offset().top;
                  var windowPos = $(window).scrollTop();
                  if (windowPos > contentPos) {
                    $("html, body").animate({ scrollTop: $('#pageContent').offset().top - 10 }, 500);
                  }

                  Site.utils.cl("buildModalPanel: the panel content is:");
                  Site.utils.cl(panelContent);
                  $('.rgMainContent > *, .rgOtherContent').not('#modalWindow').fadeOut(0,function () {
                    $(this).addClass('isHidden');
                    Site.utils.resetStyles(this);
                  });

                  Site.utils.resetStyles(container);
                  $('#modalWindow').empty().append(panelContent).append(panelClose);

                  $(container).find('.in').addClass('isOpaque');
                  initialiseModalPlugins();

              },

              bindEvents = function () {

                $(thisContent).bind('click', function(e){
                  if (thisLinkIsModal === true) {
                    e.preventDefault();

                    Site.utils.cl("Modal link clicked");

                    var clickedLink = this;

                    if (isContentCached === false) {
                      getPanelContent(thisLinkURL, false);
                    } else {
                      buildModalPanel();
                      // Track modal panel opening as GA Pageview
                      Site.analytics.trackPageView(thisLinkURL);
                    }
                  } else {

                  }
                });
              };

              this.init = function () {

                if (thisMode === "link") {
                  Site.utils.cl(this.panelContent);
                  bindEvents(this.panelContent);
                  if(precache){
                    precacheContent();
                  }
                } else if (thisMode === "prefab") {

                  panelContent = thisContent;
                  Site.utils.cl(panelContent);

                  isContentCached = true;
                  buildModalPanel();
                  // Track modal panel opening as GA Pageview
                  if(thisLinkURL) {
                    Site.analytics.trackPageView(thisLinkURL);
                  }
                }
              };
        },

        closeModal = function () {

          Site.utils.cl("closeModal called");

          // Reset any scroller control in the modal panel
          $('#modalWindow [data-plugin=scroller] .current').removeClass('current');

          $('.modalScreen').removeClass('isPlaced').removeClass('isVisible');
          $('#modalWindow .in').removeClass('isOpaque');
          $('#modalWindow').empty();
          Site.utils.resetStyles('#modalWindow');
          $('.rgMainContent > *, .rgOtherContent').removeClass('isHidden');
        },

        // Check page has query string
        checkQueryStringForModalPath = function () {

          var queryString = Site.utils.getURLQueryString(),
              modal;

          if(queryString) {
            modal = queryString.modal;

            if(modal){
              openModalFromQueryString(modal);
            } else {
              Site.utils.cl("No modal QS available");
            }
          }
        },

        // Open a modal window on page load, using query string to select which one
        openModalFromQueryString = function (queryString) {
          var thisQueryString = queryString,
              sel = '.openModal[href="' + thisQueryString + '"]';
          $(sel).click();
        },

        // Bind events related to the reused Modal Panel and Screen
        bindGlobalModalEvents = function () {

          // Clicking/Tapping on either the modal screen or close button closes the modal panel
          $('.modalScreen').on('click', function (e) {
            e.preventDefault();
            closeModal();
          });

          $('#modalWindow').on('click', '.closePanel', function (e) {
            e.preventDefault();
            closeModal();
          });
        },

        // Create modal objects for each modal link on the page
        setupModalLinks = function () {
          $(modalSel).each(function(){
            var newModal = new Modal(this, "link");
            newModal.init();
          });
          checkQueryStringForModalPath();
        },

        // Setup the Modal panel that content will be loaded into
        setupModalPanel = function () {
          modalPanel = $('.rgModalPanel').eq(0);
          if (modalPanel.length > 0 && modalMode === true) {
            modalScreen = $('<a href="#" class="modalScreen"></a>');
            $('body').append(modalScreen).addClass('hasModal');

            setupModalLinks();
            bindGlobalModalEvents();
          }
        },

        // Display preformatted content in a modal window
        showContentInModal = function (content) {
          Site.utils.cl("showContentInModal called...");
          var prefabModal = new Modal(content, 'prefab');
          prefabModal.init();
        },

        init = function () {
            Site.utils.cl("Site.modal initialised");
            setupModalPanel();
        };

    // Return Public API
    return {
        init: init,
        setModalMode: setModalMode,
        closeModal: closeModal,
        showContentInModal: showContentInModal
    };

}(jQuery));
