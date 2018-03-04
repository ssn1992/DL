<?php
Auth::routes();
/**
 *
 */
Route::get('/')->middleware('lang');
Route::group(['prefix' => '{lang}', 'middleware' => 'lang'], function () {
    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    /*
     |--------------------------------------------------------------------------
     | Views routes
     |--------------------------------------------------------------------------
     |
    */

    // Home Page
    Route::get('/', 'HomeController@index')->name('home');

    // Videos Page
    Route::get('/video', function () {
        return view('video.video');
    });

    // About Page
    Route::view('/about', 'about.about');

    // Press-area Page
    Route::view('/press-area', 'press-area.home');

    // Ebooks Page
    Route::view('/ebooks', 'ebooks.ebooks');

    // Timeline Page
    Route::view('/time-line', 'time-line.time-line');

    Route::get('/home', 'HomeController@index')->name('home');

    Route::get('get-lang', 'ListsController@getLanguages');
    Route::post('seo-prod', 'ListsController@getProductSeo');
});

/*
 |--------------------------------------------------------------------------
 | Admin routes
 |--------------------------------------------------------------------------
 |
 */
Route::group(['prefix' => 'admin-area', 'middleware' => ['auth', 'isAdmin']], function () {

    // Console
    Route::view('console', 'backoffice.console.console');
    Route::post('console-command', "SelfManagementController@commandexec");

    // Dashboard
    Route::view('/dashboard', 'backoffice.dashboard.index');


    Route::get('products', 'ListsController@getProduct');

    /*
     |--------------------------------------------------------------------------
     | Users Roles and permissions routes
     |--------------------------------------------------------------------------
     |
     */
    Route::resource('users', 'UserController');
    Route::resource('roles', 'RoleController');
    Route::resource('permissions', 'PermissionController');

    /*
     |--------------------------------------------------------------------------
     | Backoffice Forms
     |--------------------------------------------------------------------------
     |
     */
    Route::view('user', 'backoffice.user.add');

    Route::view('products/add', 'backoffice.products.add');
    Route::view('products/actions', 'backoffice.products.actions');

    Route::view('projects/add', 'backoffice.projects.add');
    Route::view('projects/actions', 'backoffice.projects.actions');

    Route::view('ebooks/add', 'backoffice.ebooks.add');
    Route::view('ebooks/actions', 'backoffice.ebooks.actions');

    Route::view('banners/add', 'backoffice.banners.add');
    Route::view('banners/actions', 'backoffice.banners.actions');

    Route::view('sliders/add', 'backoffice.sliders.add');
    Route::view('sliders/actions', 'backoffice.sliders.actions');

    Route::view('videos/add', 'backoffice.videos.add');
    Route::view('videos/actions', 'backoffice.videos.actions');

    Route::view('press-releases/add', 'backoffice.press-releases.add');
    Route::view('press-releases/actions', 'backoffice.press-releases.actions');

    Route::view('press-clipping/add', 'backoffice.press-clipping.add');
    Route::view('press-clipping/actions', 'backoffice.press-clipping.actions');

    Route::view('contacts/add', 'backoffice.contacts.add');
    Route::view('contacts/actions', 'backoffice.contacts.actions');

    Route::view('events/add', 'backoffice.events.add');
    Route::view('events/actions', 'backoffice.events.actions');

    Route::get('seo/add', 'SeoController@view');
    Route::view('seo/actions', 'backoffice.seo.actions');

    Route::view('catalogue/add', 'backoffice.catalogue.add');
    Route::view('catalogue/actions', 'backoffice.catalogue.actions');

    Route::view('materials/add', 'backoffice.materials.add');
    Route::view('materials/actions', 'backoffice.materials.actions');

    Route::post('edit-prod', 'ProductsController@edit');
    Route::post('edit-proj', 'ProjectsController@edit');
    Route::post('edit-ebook', 'EbooksController@edit');
    Route::post('edit-release', 'PressController@editReleases');
    Route::post('edit-clipping', 'PressController@editClipping');
    Route::post('edit-contact', 'ContactsController@edit');

    route::post('test', 'ProductsController@edit');
});

/*
 |--------------------------------------------------------------------------
 | *--- Axios routes ---*
 |--------------------------------------------------------------------------
/*
 |--------------------------------------------------------------------------
 | Projects
 |--------------------------------------------------------------------------
 |
 |--------------------------------------------------------------------------
 | Get routes
 |--------------------------------------------------------------------------
 |
/* Get-projects-featured
 * Return Projects featured List
 * Response JSON
 */
Route::post('get-projects-featured', 'ProjectsController@getFeaturedProjects');
    Route::post('add-offer', 'JobsController@store');
    Route::post('add-candidate', 'JobsController@storeCandidates');
    Route::post('add-event', 'EventsController@store');

    // Dashboard
    Route::get('dashboard', function () {
        return view('backoffice.dashboard.index');
    });

Route::get('get-prod', 'ProductsController@index');
    Route::get('get-proj', 'ProjectsController@index');
    Route::get('get-ebook', 'EbooksController@index');
    Route::get('get-releases', 'PressController@releasesList');
    Route::get('get-clipping', 'PressController@clippingList');
    Route::get('get-contacts', 'ContactsController@index');

/*
 |--------------------------------------------------------------------------
 | Post routes
 |--------------------------------------------------------------------------
 |
/*
 * Add-project
 * Return response JSON
 */
Route::post('add-project', 'ProjectsController@store');

/*
 |--------------------------------------------------------------------------
 | Product
 |--------------------------------------------------------------------------
 |
/*
 * Add-product
 * Return response JSON
 */
Route::post('add-product', 'ProductsController@store');

/*
 |--------------------------------------------------------------------------
 | Ebooks
 |--------------------------------------------------------------------------
 |
/*
 * Add-ebook
 * Return response JSON
 */
Route::post('add-ebook', 'EbooksController@store');

/*
 |--------------------------------------------------------------------------
 | Banners
 |--------------------------------------------------------------------------
 |
/*
 * Add-banners
 * Return response JSON
 */
Route::post('add-banner', 'BannersController@store');

/*
 |--------------------------------------------------------------------------
 | Slider
 |--------------------------------------------------------------------------
 |
/*
 * Add-sliders
 * Return response JSON
 */
Route::post('add-slider', 'SlidersController@store');

/*
 |--------------------------------------------------------------------------
 | Video
 |--------------------------------------------------------------------------
 |
/*
 * Add-sliders
 * Return response JSON
 */
Route::post('add-video', 'VideosController@store');

/*
 |--------------------------------------------------------------------------
 | Press-release
 |--------------------------------------------------------------------------
 |
/*
 * Add-sliders
 * Return response JSON
 */
Route::post('add-press-release', 'PressController@releasesStore');

/*
 |--------------------------------------------------------------------------
 | Press-clipping
 |--------------------------------------------------------------------------
 |
/*
 * Add-sliders
 * Return response JSON
 */
Route::post('add-press-clipping', 'PressController@clippingStore');

/*
 |--------------------------------------------------------------------------
 | Contacts
 |--------------------------------------------------------------------------
 |
/*
 * Add-sliders
 * Return response JSON
 */
Route::post('add-contact', 'ContactsController@store');

/*
 |--------------------------------------------------------------------------
 | Events
 |--------------------------------------------------------------------------
 |
/*
 * Add-event
 * Return response JSON
 */
Route::post('add-event', 'EventsController@store');

/*
 |--------------------------------------------------------------------------
 | Seo
 |--------------------------------------------------------------------------
 |
/*
 * Add-seo
 * Return response JSON
 */
Route::post('add-seo', 'SeoController@store');

/*
 |--------------------------------------------------------------------------
 | Catalogue
 |--------------------------------------------------------------------------
 |
/*
 * Add-catalogue
 * Return response JSON
 */
Route::post('add-catalogue', 'CatalogueController@store');

/*
 |--------------------------------------------------------------------------
 | Material
 |--------------------------------------------------------------------------
 |
/*
 * Add-catalogue
 * Return response JSON
 */
Route::post('add-material', 'MaterialsController@store');

/*
 |--------------------------------------------------------------------------
 | Closed lists
 |--------------------------------------------------------------------------
 |
/*
 * Get-categories
 * Return response JSON
 */
Route::post('get-categories', 'ListsController@getCategories');

/*
 * Get-categories
 * Return response JSON
 */
Route::post('get-categories-videos', 'ListsController@getVideosCat');

/*
 * cats-products-list
 * Return response JSON
 */
Route::post('cats-products-list', 'ListsController@getProductCategory');

/*
 * Pages-list
 * Return response JSON
 */
Route::post('pages-list', 'ListsController@getPages');

/*
 * Department-list
 * Return response JSON
 */
Route::post('department-list', 'ListsController@getContactsDepartments');

/*
 * Market-list
 * Return response JSON
 */
Route::post('market-list', 'ListsController@getContactsMarkets');

/*
 * Components-list
 * Return response JSON
 */
Route::post('products-component-list', 'ListsController@getProductsComponents');

/*
 * Material-list
 * Return response JSON
 */
Route::post('products-material-list', 'ListsController@getProductsMaterials');

/*
 * Related-Products-list
 * Return response JSON
 */
Route::post('related-products-list', 'ListsController@relatedProductsList');

/*
 * Related-Projects-list
 * Return response JSON
 */
Route::post('related-projects-list', 'ListsController@relatedProjectsList');

/*
 |--------------------------------------------------------------------------
 | Tables
 |--------------------------------------------------------------------------
 |
/*
 * Products-table
 * Return response JSON
 */
Route::post('tables/products-actions-table', 'ProductsController@index');
Route::post('tables/products-actions-table/delete', 'ProductsController@destroy');

Route::get('admin-area/products/actions/edit/{lang}/{id}', 'ProductsController@editView');
Route::post('admin-area/products/actions/edit/{id}', 'ProductsController@edit');
Route::post('admin-area/edit-product', 'ProductsController@update');
Route::post('admin-area/edit-product-image', 'ProductsController@updateImages');
Route::post('admin-area/edit-product-imageHr', 'ProductsController@updateImagesHr');
Route::post('admin-area/delete-product-image', 'ProductsController@destroyImages');
Route::post('admin-area/delete-product-imageHr', 'ProductsController@destroyImagesHr');
Route::post('admin-area/delete-product-model', 'ProductsController@destroyModel');

/*
 * Projects-table
 * Return response JSON
 */
Route::post('tables/projects-actions-table', 'ProjectsController@index');
Route::post('tables/projects-actions-table/delete', 'ProjectsController@destroy');

Route::get('admin-area/projects/actions/edit/{lang}/{id}', 'ProjectsController@editView');
Route::post('admin-area/projects/actions/edit/{id}', 'ProjectsController@edit');
Route::post('admin-area/edit-project', 'ProjectsController@update');
Route::post('admin-area/edit-project-image', 'ProjectsController@updateImages');
Route::post('admin-area/edit-project-imageHr', 'ProjectsController@updateImagesHr');
Route::post('admin-area/delete-project-image', 'ProjectsController@destroyImages');
Route::post('admin-area/delete-project-imageHr', 'ProjectsController@destroyImagesHr');

/*
 * Ebooks-table
 * Return response JSON
 */
Route::post('tables/ebooks-actions-table', 'EbooksController@index');
Route::post('tables/ebooks-actions-table/delete', 'EbooksController@destroy');

Route::get('admin-area/ebooks/actions/edit/{lang}/{id}', 'EbooksController@editView');
Route::post('admin-area/ebooks/actions/edit/{id}', 'EbooksController@edit');
Route::post('admin-area/edit-ebooks', 'EbooksController@update');
Route::post('admin-area/edit-ebooks-image', 'EbooksController@updateImage');

/*
 * Banners-table
 * Return response JSON
 */
Route::post('tables/banners-actions-table', 'BannersController@index');
Route::post('tables/banners-actions-table/delete', 'BannersController@destroy');

Route::get('admin-area/banners/actions/edit/{lang}/{id}', 'BannersController@editView');
Route::post('admin-area/banners/actions/edit/{id}', 'BannersController@edit');
Route::post('admin-area/edit-banners', 'BannersController@update');
Route::post('admin-area/edit-banners-image', 'BannersController@updateImage');

/*
 * Sliders-table
 * Return response JSON
 */
Route::post('tables/sliders-actions-table', 'SlidersController@index');
Route::post('tables/sliders-actions-table/delete', 'SlidersController@destroy');

Route::get('admin-area/sliders/actions/edit/{lang}/{id}', 'SlidersController@editView');
Route::post('admin-area/sliders/actions/edit/{id}', 'SlidersController@edit');
Route::post('admin-area/edit-sliders', 'SlidersController@update');
Route::post('admin-area/edit-sliders-image', 'SlidersController@updateImage');

/*
 * Videos-table
 * Return response JSON
 */
Route::post('tables/videos-actions-table', 'VideosController@index');
Route::post('tables/videos-actions-table/delete', 'VideosController@destroy');

Route::get('admin-area/videos/actions/edit/{lang}/{id}', 'VideosController@editView');
Route::post('admin-area/videos/actions/edit/{id}', 'VideosController@edit');
Route::post('admin-area/edit-videos', 'VideosController@update');
/*
 * Press-Releases-table
 * Return response JSON
 */
Route::post('tables/press-releases-actions-table', 'PressController@releasesList');
Route::post('tables/press-releases-actions-table/delete', 'PressController@releasesDestroy');

Route::get('admin-area/press-releases/actions/edit/{lang}/{id}', 'PressController@editViewPressRealease');
Route::post('admin-area/press-releases/actions/edit/{id}', 'PressController@releasesEdit');
Route::post('admin-area/edit-press-releases', 'PressController@releasesUpdate');
Route::post('admin-area/edit-press-releases-image', 'PressController@updateReleaseImage');

/*
 * Press-Clipping-table
 * Return response JSON
 */
Route::post('tables/press-clipping-actions-table', 'PressController@clippingList');
Route::post('tables/press-clipping-actions-table/delete', 'PressController@clippingDestroy');
Route::post('tables/press-clipping-actions-table/actions/edit', 'PressController@clippingEdit');

Route::get('admin-area/press-clipping/actions/edit/{lang}/{id}', 'PressController@editViewPressClipping');
Route::post('admin-area/press-clipping/actions/edit/{id}', 'PressController@clippingEdit');
Route::post('admin-area/edit-press-clipping', 'PressController@clipppingUpdate');
Route::post('admin-area/edit-press-clipping-image', 'PressController@updateClippingImage');

/*
 * Contacts-table
 * Return response JSON
 */
Route::post('tables/contacts-actions-table', 'ContactsController@index');
Route::post('tables/contacts-actions-table/delete', 'ContactsController@destroy');
Route::post('tables/contacts-actions-table/actions/edit', 'ContactsController@edit');

Route::get('admin-area/contacts/actions/edit/{lang}/{id}', 'ContactsController@editView');
Route::post('admin-area/contacts/actions/edit/{id}', 'ContactsController@edit');
Route::post('admin-area/edit-contacts', 'ContactsController@update');
Route::post('admin-area/edit-contacts-image', 'ContactsController@updateImage');

/*
 * Events-table
 * Return response JSON
 */
Route::post('tables/events-actions-table', 'EventsController@index');
Route::post('tables/events-actions-table/delete', 'EventsController@destroy');
Route::post('tables/events-actions-table/actions/edit', 'EventsController@edit');

Route::get('admin-area/events/actions/edit/{lang}/{id}', 'EventsController@editView');
Route::post('admin-area/events/actions/edit/{id}', 'EventsController@edit');
Route::post('admin-area/edit-events', 'EventsController@update');
Route::post('admin-area/edit-events-image', 'EventsController@updateImage');

/*
 * Seo-table
 * Return response JSON
 */
Route::post('tables/seo-actions-table', 'SeoController@index');
Route::post('tables/seo-actions-table/delete', 'SeoController@destroy');
Route::post('tables/seo-actions-table/actions/edit', 'SeoController@edit');

Route::get('admin-area/seo/actions/edit/{lang}/{id}', 'SeoController@editView');
Route::post('admin-area/seo/actions/edit/{id}', 'SeoController@edit');
Route::post('admin-area/edit-seo', 'SeoController@update');

/*
 * Catalogue-table
 * Return response JSON
 */
Route::post('tables/catalogue-actions-table', 'CatalogueController@index');
Route::post('tables/catalogue-actions-table/delete', 'CatalogueController@destroy');
Route::post('tables/catalogue-actions-table/actions/edit', 'CatalogueController@edit');

Route::get('admin-area/catalogue/actions/edit/{lang}/{id}', 'CatalogueController@editView');
Route::post('admin-area/catalogue/actions/edit/{id}', 'CatalogueController@edit');
Route::post('admin-area/edit-catalogue', 'CatalogueController@update');
Route::post('admin-area/edit-catalogue-image', 'CatalogueController@updateImage');

/*
 * Materials-table
 * Return response JSON
 */
Route::post('tables/materials-actions-table', 'MaterialsController@index');
Route::post('tables/materials-actions-table/delete', 'MaterialsController@destroy');

Route::get('admin-area/materials/actions/edit/{lang}/{id}', 'MaterialsController@editView');
Route::post('admin-area/materials/actions/edit/{id}', 'MaterialsController@edit');
Route::post('admin-area/edit-materials', 'MaterialsController@update');
Route::post('admin-area/edit-materials-image', 'MaterialsController@updateImage');

/*
 * Lang-list
 * Return response JSON
 */
Route::post('languages-list', 'ListsController@languagesList');
Route::post('set-language', 'LanguageController@setLanguage');
Route::post('get-language', 'LanguageController@getLanguage');

/*
|--------------------------------------------------------------------------
| Services mocks test EndPoints
|--------------------------------------------------------------------------
|
*/
Route::post('pages-list2', function () {
    $pages = json_decode('{
        "data": [
              {
                "value": 1,
                "label": "Home Page"
              },
              {
                "value": 2,
                "label": "Others"
              }
         ]
    }');

    return ["pages" =>$pages];
});
Route::post('cats-list2', function () {
    $cats = json_decode('{
        "data": [
              {
                "value": 1,
                "label": "Featured"
              },
              {
                "value": 2,
                "label": "Top"
              },
              {
                "value": 3,
                "label": "top cenas"
              },
              {
                "value": 4,
                "label": "top cenas"
              },
              {
                "value": 5,
                "label": "top cenas"
              },
              {
                "value": 6,
                "label": "top cenas"
              },
              {
                "value": 7,
                "label": "top cenas"
              },
              {
                "value": 8,
                "label": "top cenas"
              }
         ]
    }');

    return ["cats" =>$cats];
});
Route::post('get-example', function () {
    $example = json_decode('{
        "value": "ebooks.details"
        
    }');

    return ["example" => $example];
});

Route::post('get-projects-featured', 'HomeController@getFeaturedProjects');        // Add project
Route::post('add-project', 'ProjectsController@store');

Route::post('get-projects-featured', 'ProjectsController@getFeaturedProjects');

Route::post('tables/products-actions-table', 'ProductsController@index');





Route::post('tables/products-actions-table2', function () {
    $table = json_decode('{
        
            "tableName": "Products Actions",
            "tableId": "productsActions",
            
                  "data": [
                        {
                            "id" : 1,
                            "firstName": "Arthur",
                            "Last Name": "Lacy Mcfadden",
                            "city": "Alvito",
                            "Birth Date": "2017201720172017/AugAug/MonMon",
                            "Company": "Sollicitudin Adipiscing Ligula Industries",
                            "Address": "2676 Magna Street",
                            "Country": "Dominican Republic",
                            "Phone": "08 44 02 14 40",
                            "Region": "Lazio"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        },
                        {
                            "id" : 2,
                            "firstName": "Tobias",
                            "Last Name": "India Stanley",
                            "city": "Galway",
                            "Birth Date": "2018201820182018/AprApr/SunSun",
                            "Company": "Ligula Elit Pretium Industries",
                            "Address": "1505 Quis Rd.",
                            "Country": "Virgin Islands, United States",
                            "Phone": "02 60 81 09 47",
                            "Region": "Connacht"
                        }
                    ],
                   
           "columns": [
                "id",
                 "First Name" ,
                 "Last Name" ,
                 "city" ,
                 "Birth Date" ,
                 "Company" ,
                 "Address" ,
                 "Country" ,
                 "Phone" ,
                 "Region" 
            ]
    }');

    return ["table" => $table];
});

