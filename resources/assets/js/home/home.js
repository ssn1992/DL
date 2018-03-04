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

// To Top Component instance
require('../components/to-top/toTop');

/**
 * Categories Component instance
 */
const categoriesComponent = require('../components/categories/request/home/categories');

/**
 * Projects Component instance
 */
const projectsComponent = require('../components/projects/request/home/projects');

/**
 * Instagram Component instance
 */
const instagramComponent = require('../components/instagram/instagram');

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
        console.log("Home Area started..");

        // Slider init
        _slider();

        // Categories component init
        categoriesComponent.start();

        // Instagram component init
        instagramComponent.start();

        // Projects component init
        projectsComponent.start();
    }
};

self.start();