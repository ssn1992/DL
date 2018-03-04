// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'

/**
 * Categories Component instance
 */
const sliderComponent = require('../components/sliders/about/requests/about/slider');


// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Silder
 *
 * Init slider
 *
 */
var _slider = function () {
    $(window).on('load', function() {
        $('.items-carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 9000,
            nextArrow: '<i class="slick-next material-icons chevron_right"></i>',
            prevArrow: '<i class="slick-prev material-icons chevron_left"></i>',
            autoplay: true,
            autoplaySpeed: 8000,
            fade: true,
            cssEase: 'linear'
        });
    });

};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @public
 */
this.start = function() {
    if(!_isInit) {
        console.log("About started..");

        // Init Main slider
        _slider();

        // Slider component init
        sliderComponent.start();
    }
};

self.start();