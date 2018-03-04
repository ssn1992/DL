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
 * Request
 * @type String
 * @private
 */
var _request;

/**
 * Instagram Instance
 */
import Instagram from './Instagram.vue';

// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Instagram
 *
 * Create Instagram
 *
 */
var _instagram = function () {
    // Create all requested instances
    new Vue({
        el: '#instagram',
        mixins: [Instagram],

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
 * @required
 * @param request
 * @type array
 *
 * @public
 */

self.start = function() {
    if(!_isInit) {
        // Init Instagram Component
        _instagram();
    }
};