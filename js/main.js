var mainModule = (function($, window) {

    var curPage;

    init = function(page) {
        curPage = page;
        addNavListeners();
        switch (page) {
            case 'home':
                initializeGallery();
                break;
            case 'series':
                initializeGallery();
                break;
        }

    }

    initializeGallery = function(){
        var $grid = $('.grid');
        $grid.imagesLoaded( function() {
            console.log('loaded');

            $grid.masonry({
                columnWidth: 195,
                itemSelector: '.thumb',
                gutter: 75,
                isInitLayout: false
            });

            $grid.masonry( 'on', 'layoutComplete', onGalleryInitialized);

            $grid.masonry('layout');

        });
    }

    onGalleryInitialized = function(instance, gridItems){
        console.log(instance,gridItems);
        $('.grid').addClass('ready');
        if (curPage == "series"){
            addSeriesListeners();
        }
    }

    addSeriesListeners = function() {
        $('.series-item-link').on('click', onClickSeriesItem);
    }

    addNavListeners = function() {
        $('.nav-link.subitems').on('click', toggleSubnav);
    }

    onClickSeriesItem = function(e) {
        var $clickedSeriesItem = $(this);
        showSeriesItemDetail($clickedSeriesItem);
    }

    showSeriesItemDetail = function($clickedSeriesItem) {
        showSeriesItemViewer();
        showSeriesRight();
        addSeriesNavListeners();
    }

    hideSeriesItemDetail = function() {
        hideSeriesItemViewer();
        hideSeriesRight();
        removeSeriesNavListeners();
    }

    showSeriesItemViewer = function() {
        $('.series-thumbs').removeClass('active');
        $('.series-item-viewer').addClass('active');
    }

    hideSeriesItemViewer = function() {
        $('.series-thumbs').addClass('active');
        $('.series-item-viewer').removeClass('active');
    }

    showSeriesRight = function() {
        $('.series-right').addClass('active');
    }

    hideSeriesRight = function() {
        $('.series-right').removeClass('active');
    }

    addSeriesNavListeners = function() {
        $('.series-btn').on('click', onClickSeriesNavBtn);
        $('.series-item-lg').on('click',onClickSeriesItemLg);
    }

    removeSeriesNavListeners = function() {
        $('.series-btn').off('click',onClickSeriesNavBtn);
        $('.series-item-lg').off('click',onClickSeriesItemLg);
    }

    onClickSeriesNavBtn = function(e){
        $seriesNavBtn = $(this);
        if ($seriesNavBtn.hasClass('left')){
            showPreviousSeriesItem();
        } else  if ($seriesNavBtn.hasClass('right')){
            showNextSeriesItem();
        }  if ($seriesNavBtn.hasClass('grid')){
            hideSeriesItemDetail();
        }
    }

    onClickSeriesItemLg = function(){
        hideSeriesItemDetail();
    }

    showPreviousSeriesItem = function(){
        console.log('prev');
    }

    showNextSeriesItem = function(){
        console.log('next');
    }

    toggleSubnav = function(e) {
        var $clickedNavItem = $(this);
        var $clickedLevel = $(this).closest('.level');

        var clickedIndex = parseInt($clickedLevel.attr('data-index'));
        var isActive = $clickedNavItem.hasClass('active');

        if (isActive) {
            hideSubnav($clickedNavItem, $clickedLevel, clickedIndex);
        } else {
            showSubnav($clickedNavItem, $clickedLevel, clickedIndex);
        }

    }

    hideSubnav = function($clickedNavItem, $clickedLevel, clickedIndex) {
        var newIndex = clickedIndex + 1;
        var $newLevel = $('.level[data-index="' + newIndex + '"]');

        $newLevel.removeClass('active');
        $clickedNavItem.removeClass('active');

    }

    showSubnav = function($clickedNavItem, $clickedLevel, clickedIndex) {

        var newIndex = clickedIndex + 1;
        var $newLevel = $('.level[data-index="' + newIndex + '"]');

        $clickedNavItem.addClass('active');
        $newLevel.addClass('active');


    }

    return {
        init: init,
    };

})(jQuery, window);
