// Site.modal.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.modal = (function ($) {
    "use strict";

  ///////////////
  // Variables //
  ///////////////

    var modalSel = ".modalSource",
        modalCloseSel = '.cpModal .close',
        modalContinueSel = '.cpModal .continueLink a',
        modalContentSel = '.modalContent',
        modalScreenSel = '.modalScreen',
        modalTemplate = '<div class="modalContent"><div id="confirmation-popup" class="cpModal cp"><div class="in modalContentContainer"><div class="close"><a href="#">Close</a></div></div></div></div>',
        modalScreenTemplate = "<div class='modalScreen'></div>",
        $window = $(window),
        $body = $('body'),

        modalLinkSel = ".modalLink",

  /////////////
  // Classes //
  /////////////

        /**
         * Constructor for a Modal object that manages modal dialog for displaying site information and external iframes
         * @constructor
         * @parameter element (Object)
         * @parameter modalTyle (String) - can be either 'inpage' or 'iframe'
         */
        Modal = function (element, modalType) {

          var $modalSource = $(element),
              thisModalType = modalType,
              $thisModal = $(modalTemplate),
              $modalScreen = $(modalScreenTemplate),
              $closeButton = $thisModal.find(modalCloseSel),

          /**
           * Display a piece of page content in a modal window
           * @function
           */
          displayContentInModal = function () {
            if (thisModalType === 'iframe'){
              $thisModal.addClass('iframeModal');
            }
            $thisModal.find('.modalContentContainer').append($modalSource);
            $body.append($thisModal).append($modalScreen);
            positionModal();
          },

          /**
           * Display a page link in an iframe as a modal
           * @function
           */
          displayPageLinkInModal = function () {
            $thisModal.addClass('iframeModal');
            $thisModal.find('.modalContentContainer').append($modalSource);
            $body.append($thisModal).append($modalScreen);
            positionModal();
          },

          /**
           * Positions the modal optimally within the viewport
           * @function
           */
          positionModal = function () {
            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                modalWidth = $thisModal.width(),
                modalHeight = $thisModal.height(),
                topPos = ((windowHeight-modalHeight)/2)-10,
                leftPos = ((windowWidth/2)-(modalWidth/2));


            if(topPos < 0){
              topPos = 0;
            }

            if(leftPos < 0){
              leftPos = 0;
            }

            $thisModal.css('top',topPos).css('left', leftPos).addClass('displayed');
          },

          /**
           * Close the modal
           * @function
           */
          closeModal = function () {
            // Merge objects so they can be faded out as one
            $thisModal.fadeOut(function () {
              $thisModal.remove();
            });

            $modalScreen.fadeOut(function () {
              $modalScreen.remove();
            });
          },

          /**
           * Add event handlers for this object
           * @function
           */
          bindCustomMessageEvents = function () {

            $thisModal.on('closeModal', function (e) {
              e.preventDefault();
              closeModal();
            });

            $thisModal.on('updatelayout', function (e) {
              e.preventDefault();
              Site.utils.cl('Cart Modal: layout updated');
              positionModal();
            });

            $modalScreen.on('closeModal', function (e) {
              e.preventDefault();
              closeModal();
            });
          },

          /**
           * Subscribe object to Global Messages
           * @function
           */
          subscribeToEvents = function () {
            $.subscribe('debouncedresize', function () {$(this).trigger('updatelayout');},$thisModal);
          };

          /**
           * Initialise this object
           * @function
           */
          this.init = function () {

            displayContentInModal();

            /*
if (thisModalType === 'inpage') {
              displayPageContentInModal();
            } else if (thisModalType === 'iframe') {
              displayPageLinkInModal();
            }
*/

            bindCustomMessageEvents();
            subscribeToEvents();
          };
        },

        /**
         * Constructor for a Modal Link object that manages links on the page that should be opened in a modal iframe
         * @constructor
         * @parameter element (Object)
         */
        ModalLink = function (element) {
          var $thisModalLink = $(element),
              modalLinkURL = $thisModalLink.attr('href'),
              $modalLinkContent = $('<div class="iframe">'),

          /**
           * Create an iframe using the modal link URL
           * @function
           */
          createIframeContent = function () {
            var $iframeScaffold = $('<iframe></iframe>');

            $iframeScaffold.attr('href',modalLinkURL).attr('width',600).attr('height',400);

            Site.utils.cl($iframeScaffold);

            $modalLinkContent.append($iframeScaffold);

            createModal();
          },

          createModal = function () {
             var thisNewModal = new Modal($modalLinkContent, 'iframe');
             thisNewModal.init();
          },

          /**
           * Bind custom message events for this object
           * @function
           */
          bindCustomMessageEvents = function () {
            $thisModalLink.on('click', function (e) {
              e.preventDefault();
              createIframeContent();
            });
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
          Site.events.delegateEventFactory('click', modalCloseSel, 'closeModal');
          Site.events.delegateEventFactory('click', modalContinueSel, 'closeModal');
          Site.events.delegateEventFactory('click', modalScreenSel, 'closeModal');
        },

        /**
         * init function for this module
         * @function
         */
        init = function () {
          Site.utils.cl("Site.modal initialised");

          // Initialise Modal object for page-load content
          $(modalSel).each(function () {
            var thisModal = new Modal(this, 'inpage');
            thisModal.init();
          });

          // Initialise ModalLink objects for all modal links on page
          $(modalLinkSel).each(function () {
            var thisModalLink = new ModalLink(this);
            thisModalLink.init();
          });

          // Add delegate event listeners for this module
          delegateEvents();
        };

  ///////////////////////
  // Return Public API //
  ///////////////////////

    return {
      init: init
    };

}(jQuery));