const { mix } = require('laravel-mix');

/**
 * Webpack mix map
 *
 *
mix.webpackConfig({
    devtool: "inline-source-map"
});
 **/

/**Mix-Variable**/
/****************/
/******/mix/*****/
/****************/

/*
 |--------------------------------------------------------------------------
 | Master dependencies
 |--------------------------------------------------------------------------
 */
/**-JS-**/
.js('resources/assets/js/master/main/master.js', 'public/js/master')

/**-SASS-**/
.sass('resources/assets/sass/master/master.scss', 'public/css/master')
/**-SASS-**/
.sass('resources/assets/sass/master/bootstrap.scss', 'public/css/bootstrap')

/*
|--------------------------------------------------------------------------
| Press area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/press-area/home.js', 'public/js/press-area')

/*
 |--------------------------------------------------------------------------
 | Home dependencies
 |--------------------------------------------------------------------------
 */
/**-JS-**/
.js('resources/assets/js/home/home.js', 'public/js/home')

/*
|--------------------------------------------------------------------------
| About dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/about/about.js', 'public/js/about')

/*
 |--------------------------------------------------------------------------
 | Video Page dependencies
 |--------------------------------------------------------------------------
 */
.sass('resources/assets/sass/views/video-page/video-page.scss', 'public/css/video-page')

/*
 |--------------------------------------------------------------------------
 | Time Line Page dependencies
 |--------------------------------------------------------------------------
 */
.sass('resources/assets/sass/views/time-line/time-line.scss', 'public/css/time-line')


/*
 |--------------------------------------------------------------------------
 | Admin area dependencies
 |--------------------------------------------------------------------------
 */
/**-JS-**/
.js('resources/assets/js/master-backoffice/main/master.js', 'public/js/master-backoffice')
.js('resources/assets/js/master-backoffice/dashboard/dashboard.js', 'public/js/master-backoffice')
/**-SASS-**/
.sass('resources/assets/sass/master-backoffice/master.scss', 'public/css/master-backoffice')

/*
|--------------------------------------------------------------------------
| Login area dependencies
|--------------------------------------------------------------------------
*/
/**-SASS-**/
.sass('resources/assets/sass/master-backoffice/login.scss', 'public/css/master-backoffice')

/*
|--------------------------------------------------------------------------
| Products area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/products/add.js', 'public/js/master-backoffice/products')
.js('resources/assets/js/master-backoffice/products/edit.js', 'public/js/master-backoffice/products')
.js('resources/assets/js/master-backoffice/products/actions.js', 'public/js/master-backoffice/products')

/*
 |--------------------------------------------------------------------------
 | Project area dependencies
 |--------------------------------------------------------------------------
 */
/**-JS-**/
.js('resources/assets/js/master-backoffice/projects/add.js', 'public/js/master-backoffice/projects')
.js('resources/assets/js/master-backoffice/projects/edit.js', 'public/js/master-backoffice/projects')
.js('resources/assets/js/master-backoffice/projects/actions.js', 'public/js/master-backoffice/projects')

/*
|--------------------------------------------------------------------------
| Ebooks area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/ebooks/add.js', 'public/js/master-backoffice/ebooks')
.js('resources/assets/js/master-backoffice/ebooks/edit.js', 'public/js/master-backoffice/ebooks')
.js('resources/assets/js/master-backoffice/ebooks/actions.js', 'public/js/master-backoffice/ebooks')

/*
|--------------------------------------------------------------------------
| Banners area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/banners/add.js', 'public/js/master-backoffice/banners')
.js('resources/assets/js/master-backoffice/banners/edit.js', 'public/js/master-backoffice/banners')
.js('resources/assets/js/master-backoffice/banners/actions.js', 'public/js/master-backoffice/banners')

/*
|--------------------------------------------------------------------------
| Sliders area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/sliders/add.js', 'public/js/master-backoffice/sliders')
.js('resources/assets/js/master-backoffice/sliders/edit.js', 'public/js/master-backoffice/sliders')
.js('resources/assets/js/master-backoffice/sliders/actions.js', 'public/js/master-backoffice/sliders')

/*
|--------------------------------------------------------------------------
| Videos area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/videos/add.js', 'public/js/master-backoffice/videos')
.js('resources/assets/js/master-backoffice/videos/edit.js', 'public/js/master-backoffice/videos')
.js('resources/assets/js/master-backoffice/videos/actions.js', 'public/js/master-backoffice/videos')

/*
|--------------------------------------------------------------------------
| Press Releases area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/press-releases/add.js', 'public/js/master-backoffice/press-releases')
.js('resources/assets/js/master-backoffice/press-releases/edit.js', 'public/js/master-backoffice/press-releases')
.js('resources/assets/js/master-backoffice/press-releases/actions.js', 'public/js/master-backoffice/press-releases')

/*
|--------------------------------------------------------------------------
| Press Cliping area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/press-clipping/add.js', 'public/js/master-backoffice/press-clipping')
.js('resources/assets/js/master-backoffice/press-clipping/edit.js', 'public/js/master-backoffice/press-clipping')
.js('resources/assets/js/master-backoffice/press-clipping/actions.js', 'public/js/master-backoffice/press-clipping')

/*
|--------------------------------------------------------------------------
| Press Contacts area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/contacts/add.js', 'public/js/master-backoffice/contacts')
.js('resources/assets/js/master-backoffice/contacts/edit.js', 'public/js/master-backoffice/contacts')
.js('resources/assets/js/master-backoffice/contacts/actions.js', 'public/js/master-backoffice/contacts')

/*
|--------------------------------------------------------------------------
| Events area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/events/add.js', 'public/js/master-backoffice/events')
.js('resources/assets/js/master-backoffice/events/edit.js', 'public/js/master-backoffice/events')
.js('resources/assets/js/master-backoffice/events/actions.js', 'public/js/master-backoffice/events')

/*
|--------------------------------------------------------------------------
| Seo area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/seo/add.js', 'public/js/master-backoffice/seo')
.js('resources/assets/js/master-backoffice/seo/edit.js', 'public/js/master-backoffice/seo')
.js('resources/assets/js/master-backoffice/seo/actions.js', 'public/js/master-backoffice/seo')

/*
|--------------------------------------------------------------------------
| Catalogue area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/catalogue/add.js', 'public/js/master-backoffice/catalogue')
.js('resources/assets/js/master-backoffice/catalogue/edit.js', 'public/js/master-backoffice/catalogue')
.js('resources/assets/js/master-backoffice/catalogue/actions.js', 'public/js/master-backoffice/catalogue')

/*
|--------------------------------------------------------------------------
| Material area dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/materials/add.js', 'public/js/master-backoffice/materials')
.js('resources/assets/js/master-backoffice/materials/edit.js', 'public/js/master-backoffice/materials')
.js('resources/assets/js/master-backoffice/materials/actions.js', 'public/js/master-backoffice/materials')

/*
|--------------------------------------------------------------------------
| Console dependencies
|--------------------------------------------------------------------------
*/
/**-JS-**/
.js('resources/assets/js/master-backoffice/console/console.js', 'public/js/console');