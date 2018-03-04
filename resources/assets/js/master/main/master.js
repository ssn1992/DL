
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// Base Template
require('nouislider/distribute/nouislider');
require('../plugins/jquery.magnific-popup.min');
require('../plugins/wNumb');
require('slick-carousel');
require('isotope-layout/dist/isotope.pkgd');
require('velocity-animate');
require('../plugins/preloader.min.js');
require('../template/scripts');

// Bind Trans Laravel for Vue js
Vue.prototype.trans = (key) => {
    return _.get(window.trans, key, key);
};

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.

Vue.component('example', require('../../components/Example.vue'));

const app = new Vue({
    el: '#app'
});
 */