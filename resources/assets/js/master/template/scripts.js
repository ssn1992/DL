// Mobile menu init
$(document).ready(function($) {

	// Initialize Slidebars
	// var menuInitHeight
    //const slidebars = require('slidebars');

    var controller = new slidebars();
    controller.init();

    $( '.offcanvas-toggle' ).on( 'click', function ( event ) {

        // Set initial menu height value
        menuInitHeight = $( '.offcanvas-navigation .menu' ).height()
        // Stop default action and bubbling
        event.stopPropagation();
        event.preventDefault();

        // Toggle the Slidebar with id 'id-2'
        controller.toggle( 'id-1' );
    } );
});
