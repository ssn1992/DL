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
var _page;

/**
 * Request
 * @type String
 * @private
 */
var _request;

/**
 * Tables instance
 */
import Tables from './Tables.vue';

/**
 *
 * Create a Table component
 *
 * @param response
 * @return {{columns, data, tableName: (*|null)}}
 * @private
 */
var _table = function() {
    // Create all requested instances
    for (var i = 0, len = _request.length; i < len; i++) {
        window.actionsTable = new Vue({
            el: '#' + _request[i],
            mixins: [Tables],

            mounted() {
                console.log(_page);

                // After mounted request data
                this.tablesRequest(_request[i], false, _page);
            },
        });
    }
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
self.start = function(request, page) {
    _page = page;
    _request = request;

    if(!_isInit) {
        console.log("Table Component started..");

         // Init search component
        _table();
    }
};