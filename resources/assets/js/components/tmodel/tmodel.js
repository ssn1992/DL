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
 * Forms Instance
 */
import Tmodel from './Tmodel.vue';

// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Forms
 *
 * Create Forms
 *
 */
var _TmodelComponent = function () {
    // Create all requested instances
    new Vue({
        el: '#tmodel',
        mixins: [Tmodel],

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
        // Init Forms Component
        _TmodelComponent();

        console.log('cenas');
    }
};