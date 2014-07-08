// Site.filter.js

// Check if base namespace is defined so it isn't overwritten
var Site = Site || {};

// Create child namespace
Site.filter = (function($) {
    "use strict";
    // Variables
    var defaults = {
          plugin: '[data-plugin=filterList]',
          pluginFilterList: '[data-filter-list=list]',
          pluginFilterControl: '[data-filter-list=filter]',
          filterSel: '.cp_Filter .filterCategories li, .cp_Filter .filterReset',
          categorySel: '.indexCategory .delta',
          letterSel: '.cp_Filter--a-to-z [data-filter]',
          itemSel: '.categoryList li',
          transitionSpeed: 500
        },
        // Mode of filtering - options are 'inclusive','exclusive'
        filterMode = 'inclusive',
        // Bind Filter Events
        bindFilterEvents = function(filterList) {

            var filterControls = $(filterList).find(defaults.filterSel),
                listItems = $(filterList).find(defaults.itemSel),
                listCategories = $(filterList).find(defaults.categorySel),
                // Variable to hold active filters to apply to list of items
                activeFilters, activeCategories = [],
                // Count of items in transition, so we can block additional clicks during this
                itemsInTransition = 0,

                // Update list of items according to chosen filters
                updateFilteredItems = function() {

                    // Match items with one or more categories
                    $(activeFilters).each(function() {
                      var filterCategory = $(this).data("filter");
                      activeCategories.push(filterCategory);
                    });
                    Site.utils.cl(activeCategories);
                    matchItemsWithCategories(activeCategories, listItems, filterMode);

                    // Reset active categories array
                    activeCategories = [];

                    // Match items with multiple categories
                    Site.utils.cl(activeFilters);

                    // mark unmatched items that are visible for DELETION!!!
                    $(listItems).filter(':not(.matched):not(.hidden)').addClass('toHide');

                    // Transition to new display

                    // Hide Category Section if there are no visible items in it
                    $(listCategories).filter(':visible').each(function() {
                        var thisSection = this;

                        // If there are no 'matched' items in this section hide the section heading too
                        if ($(thisSection).parent().find('.matched').length === 0) {
                            itemsInTransition++;
                            $(thisSection).hide(defaults.transitionSpeed, function() {
                                $(thisSection).addClass('hidden');
                                Site.utils.resetStyles(thisSection);
                                itemsInTransition--;
                            });
                        }
                    });

                    // Show Category Section if there are no visible items in it
                    $(listCategories).filter('.hidden').each(function() {

                        var thisSection = this;

                        // If there are 'matched' items in this section show the hidden heading too
                        if ($(thisSection).parent().find('.matched').length > 0) {
                            itemsInTransition++;
                            $(thisSection).show(defaults.transitionSpeed, function() {
                                $(thisSection).removeClass('hidden');
                                Site.utils.resetStyles(thisSection);
                                itemsInTransition--;
                            });
                        }
                    });

                    // If item is 'matched' and visible -> Remove 'matched' class, add 'active' class
                    $('.matched:visible').addClass('active').removeClass('matched');

                    // If item is matched and hidden -> show
                    $('.matched.hidden').each(function() {

                        itemsInTransition++;

                        $(this).show(defaults.transitionSpeed, function() {
                            $(this).addClass('active').removeClass('matched').removeClass('hidden');
                            Site.utils.resetStyles(this);
                            itemsInTransition--;
                        });
                    });

                    // If item is to hide and visible -> hide
                    $('.toHide:visible').each(function() {

                        itemsInTransition++;

                        $(this).hide(defaults.transitionSpeed, function() {
                            $(this).removeClass('active').addClass('hidden');
                            resetFilterStates(this);
                            Site.utils.resetStyles(this);
                            itemsInTransition--;
                        });
                    });

                },
                // Reset list to display all and filters to deactivate all
                resetFilter = function() {
                    Site.utils.cl("Reset all items to visible");

                    $(listItems).filter('.hidden').each(function() {

                        itemsInTransition++;

                        $(this).show(defaults.transitionSpeed, function() {
                            $(this).removeClass('hidden');
                            resetFilterStates(listItems);
                            Site.utils.resetStyles(listItems);
                            itemsInTransition--;
                        });
                    });


                    $(listCategories).filter('.hidden').each(function() {

                        itemsInTransition++;

                        $(this).show(defaults.transitionSpeed, function() {
                            $(this).removeClass('hidden');
                            Site.utils.resetStyles(listCategories);
                            itemsInTransition--;
                        });
                    });
                },
                updateFilterMode = function() {
                    // Set filter mode button
                    var filterModeLabel;

                    if (filterMode == 'inclusive') {
                        filterModeLabel = "Inclusive";
                    } else {
                        filterModeLabel = "Exclusive";
                    }

                    $(filterList).find('.filterMode a span').text(filterModeLabel);
                },
                updateFilterList = function(filter) {

                    var thisFilter = filter;

                    if (itemsInTransition > 0) {
                        Site.utils.cl(itemsInTransition);
                        return;
                    } else {

                        // remove all transitional classes from the list items
                        resetFilterStates(listItems);

                        // If control activated is the Mode toggle do nothing
                        if ($(thisFilter).hasClass('filterMode')) {

                        }
                        // If control activated is the reset button remove all active classes
                        if ($(thisFilter).hasClass('filterReset')) {
                            Site.utils.cl("Reset clicked");
                            // Remove all active classes to trigger filter reset
                            $(filterControls).removeClass('active');
                            // Otherwise add/remove 'active' class to activated control
                        } else {
                            $(thisFilter).toggleClass('active');
                        }
                        // get all the "active" filters from the list
                        activeFilters = $(filterControls).filter('.active');

                        // If no filters are active, reset the filters
                        if ($(activeFilters).length === 0) {
                            resetFilter();
                            // Otherwise update items to match filters
                        } else {
                            updateFilteredItems();
                        }
                    }
                };
            // Event listener for click on filter control (including Reset button)
            $(filterControls).on('click', function(event) {
                event.preventDefault();
                updateFilterList(this);
            });

            // Event listener for click on Filter Mode toggle
            $(filterList).find('.filterMode').on('click', function(event) {
                event.preventDefault();
                if (filterMode == 'inclusive') {
                    filterMode = 'exclusive';
                } else {
                    filterMode = 'inclusive';
                }

                updateFilterMode();
                updateFilterList(this);

            });

            // Set initial filter mode
            updateFilterMode();
        },
        // Match items with one or more categories
        // - adds a "matched" class to all items with a given category or categories
        matchItemsWithCategories = function(categories, fullList, mode) {
            var filterCategories = categories,
                thisFullList = fullList,
                thisMode = mode;

            Site.utils.cl(filterCategories);

            $(thisFullList).each(function() {
                var thisItem = this,
                    itemCategories = $(this).data('categories'),
                    match = false,
                    // Variable to indicate if an exclusive match has failed
                    // 'true' value also allows 'inclusive' mode match test to succeed
                    exclusiveMatch = true;

                // Convert array to string to get around weird IE9- bug
                itemCategories = itemCategories.toString();

                Site.utils.cl('to string:');
                Site.utils.cl(itemCategories);


                // If the filter catergory matches one of the categories the item is tagged with...
                $.each(filterCategories, function() {

                    // If filter category is found in string of item categories...
                    if (itemCategories.indexOf(this) > -1) {
                        // Mark the item as matched

                        Site.utils.cl(itemCategories.indexOf(thisItem));

                        Site.utils.cl(this);
                        Site.utils.cl(itemCategories);

                        match = true;
                    } else {
                        // If category match fails and we are in 'exclusive' mode
                        // set exclusiveMatch var to false and fail whole matching attempt
                        if (thisMode == 'exclusive') {
                            exclusiveMatch = false;
                        }
                    }
                });

                if (match && exclusiveMatch) {
                    $(thisItem).addClass('matched').removeClass('toHide');
                }
            });
        },
        resetFilterStates = function(items) {
            $(items).removeClass('matched').removeClass('toHide').removeClass('active');
        },
        buildFilterList = function(filterList) {
            Site.utils.cl("Build filter list...");
            var thisFilterList = filterList;
            bindFilterEvents(thisFilterList);
        },
        setupFilterLists = function() {
            $(defaults.plugin).each(function() {
                buildFilterList(this);
            });
        },
        init = function() {
            setupFilterLists();
            Site.utils.cl("Site.filter initialised");
        };

    // Return Public API
    return {
        init: init
    };

}(jQuery));
