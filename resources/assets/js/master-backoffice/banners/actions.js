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
 * Request Tables
 * @type {string}
 * @private
 */
var _requestTables = ["banners-actions-table"];

/**
 * Request Page
 * @type {string}
 * @private
 */
var _requestPage = "Banners";

/**
 * Tables Component instance
 */
const tablesComponent = require('../../components/tables/tables');

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
        console.log("Banners Actions Area started..");

        // Tables component init
        tablesComponent.start(_requestTables, _requestPage);
    }
};

self.start();