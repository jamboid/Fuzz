// Site.namespace.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.forms = (function ($) {
    "use strict";
    // Variables
    var isPlaceholderSupported,

        // Set placeholder attribute using label text
        setPlaceholders = function () {
          $('.form-item').each(function(){
            var formElem = $(this).find('input, textarea').not('input[type=submit]').eq(0),
                formLabel = $(this).find('label').eq(0),
                formLabelText = $(formLabel).text(),
                mandSpan = $(formLabelText).find('.form-required');
                formLabelText = $(formLabel).text();
                $(formElem).attr('placeholder', formLabelText);
          });

          // Now the placeholders have been set, make sure the fallback is in place for
          // browsers that don't have native support for the attribute
          isPlaceholderSupported = Site.utils.placeholderIsSupported();

          if(!isPlaceholderSupported){
            setPlaceholderFallback();
          }
        },

        // Add placeholder-like behaviour for form fields in browsers that don't support it
        setPlaceholderFallback = function () {
          // Create default text for text field on page load
          var createText = function (defVal, thisObj) {
            if (thisObj.attr("value") === defVal || thisObj.attr("value").length === 0) {
              thisObj.attr("value", defVal);
              thisObj.addClass("empty");
            }
          },

          // Remove default text on focus. Ignore user-inserted text
          removeText = function (defVal, thisObj) {
            var currVal = thisObj.attr("value");
            if (currVal === defVal) {
              thisObj.attr("value", "");
              thisObj.removeClass("empty");
            }
          },

          // Restore default text on focus. Ignore user-inserted text
          restoreText = function (defVal, thisObj) {
            var currVal = thisObj.attr("value");
            if (currVal !== undefined && currVal !== '') {
              thisObj.attr("value", currVal);
            } else if (currVal === undefined || currVal === '') {
              thisObj.attr("value", defVal);
              thisObj.addClass("empty");
            }
          };

          Site.utils.cl(isPlaceholderSupported);

          if (!isPlaceholderSupported){

            Site.utils.cl('Placeholder not supported');
            // Get inputs with a placeholder attribute set
            $("input[placeholder], textarea[placeholder]").each(function() {
              var labelVal = $(this).attr("placeholder");
              $(this).each(function() {
                  createText(labelVal, $(this));
              });
              // Removal of text on user-focus
              $(this).focus(function() {
                  removeText(labelVal, $(this));
              });
              // Restoration of default text on input blur, if no user input.
              $(this).blur(function() {
                  restoreText(labelVal, $(this));
              });
            });
          }
        },

        init = function () {
          Site.utils.cl("Site.forms initialised");
        };

    // Return Public API
    return {
      init: init
    };

}(jQuery));