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
 * Instagram Instance
 */
import ToTop from './ToTop.vue';

// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * To Top
 *
 * Create a ToTop
 *
 */
var _toTop = function () {
    // Create all requested instances
    new Vue({
        el: '#to-top',
        mixins: [ToTop],

        beforeCreate() {
        },
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

self.start = function() {
    if(!_isInit) {
        console.log("To top Plugin started..");
        // Init To Top Plugin
        _toTop();
    }
};

this.start();