var Fuzz = Fuzz || {};

// Fuzz namespace
Fuzz.Scroller = (function ($) {

    // Setup scrollers
    var setupScrollers = function() {
            $('[data-plugin="scroller"]').each(function () {
                var config = $(this).data("config");
                setScroller(this, config);
            });
        },
        // Set up scroller
        setScroller = function (scroller, config) {
            var thisScroller = scroller,
                scrollerConfig = config || {},
                timeUnit = scrollerConfig.timeUnit || 250, // Set in data-config attribute, or use default
                maxScroll = scrollerConfig.maxScroll || 4, // Set in data-config attribute, or use default
                scrlItemContainer = $("ul", thisScroller),
                scrlItems = $("li", thisScroller),
                inTransition = false,
                animate = true,
                totalItems = scrlItems.length,
                controls = $(".scrollControls", thisScroller),
                scrlWidth,
                itemWidth,
                itemsToScroll,
                scrollTime,
                moveWidth,
                itemToLoad,
                // Function: setLayout
                // Set dimensions and other parameters for scroll. Called on page load and whenever window is resized
                setupLayout = function () {
                    scrlWidth = scrlItemContainer.width();
                    itemWidth = $(thisScroller).find("li").eq(0).width();
                    // Set the number of items to scroll
                    itemsToScroll = Math.round(scrlWidth / itemWidth);

                    // Set maximum number of items to scroll
                    if (itemsToScroll > maxScroll) {
                        itemsToScroll = maxScroll;
                    }

                    // Set the scroll time, based on the number of items being scrolled
                    scrollTime = itemsToScroll * timeUnit;
                    // Set the width to scroll
                    moveWidth = itemsToScroll * itemWidth;

                    if (itemsToScroll > maxScroll) {
                        itemsToScroll = maxScroll;
                    }

                    // Debug log
                    Fuzz.cl("maxScroll: " + maxScroll + ", " + "Items to scroll: " + itemsToScroll);
                    Fuzz.cl("Scroll width: " + scrlWidth + ", " + "Item Width: " + itemWidth);
                    Fuzz.cl("Items to scroll: " + itemsToScroll + ", " + "Number of items: " + scrlItems.length + ", " + "Distance to scroll: " + moveWidth);

                    // If total number of items is greater than visible items, show controls...
                    if (scrlItems.length > itemsToScroll) {
                        $("[data-action]", controls).show();
                    } else {
                        $("[data-action]", controls).hide();
                    }
                };
            // Debug log for configuration
            Fuzz.cl(scrollerConfig);
            Fuzz.cl(scrollerConfig.timeUnit);
            Fuzz.cl("timeUnit: " + timeUnit);

            // Rules for animating scroller:
            // If browser is IE7, don't animate transitions
            if ($("html.ie7").length > 0) {
                animate = false;
            }

            // Click events on controls
            $('[data-action]', controls).on('click', function (event) {
                event.preventDefault();
                var itemsToClone,
                    direction = $(this).attr('data-action');

                if (inTransition === false) {
                    inTransition = true;
                    if (direction === 'next') {
                        itemsToClone = $("li", thisScroller).slice(0, itemsToScroll).clone();
                        scrlItemContainer.append(itemsToClone);

                        if (animate === false) {
                            $("ul li", thisScroller).slice(0, itemsToScroll).remove();
                            inTransition = false;
                        } else {
                            $("li:first-child", scrlItemContainer).animate({ marginLeft: -moveWidth }, scrollTime, function () {
                                $(this).removeAttr("style");
                                $("ul li", thisScroller).slice(0, itemsToScroll).remove();
                                inTransition = false;
                            });
                        }
                    } else {
                        itemsToClone = $("li", thisScroller).slice(-itemsToScroll).clone();
                        if (animate === false) {
                            scrlItemContainer.prepend(itemsToClone);
                            $("ul li", thisScroller).slice(-itemsToScroll).remove();
                            inTransition = false;
                        } else {
                            $(itemsToClone).eq(0).css("margin-left", -moveWidth);
                            scrlItemContainer.prepend(itemsToClone);
                            $("li:first-child", scrlItemContainer).animate({ marginLeft: 0 }, scrollTime, function () {
                                $(this).removeAttr("style");
                                $("ul li", thisScroller).slice(-itemsToScroll).remove();
                                inTransition = false;
                            });
                        }
                    }
                }
            });

            // Reset layout if window is resized
            var timeOut = false;
            $(window).resize(function(){
                if(timeOut !== false)
                clearTimeout(timeOut);
                timeOut = setTimeout(setupLayout, 200);
            });
            // Set layout on page load
            setupLayout();
        };
        // Initialisation
    init = function () {
        setupScrollers();
        Fuzz.cl("Fuzz.Scroller.init called");
    };

    // Return the public api
    return {
        init: init
    };

}(jQuery));