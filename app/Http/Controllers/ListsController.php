<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Materials;
use App\Projects;
use App\ProductsCategory;
use App\Slider;
use App\Pages;
use App\VideosCat;
use App\ContactsDep;
use App\Markets;
use App\Products;
use App\Components;
use App\Http\Middleware\LangMiddleware;
use App\Banners;
use App\PressReleases;
use App\PressClipping;
use App\Events;
use App\ProductsGallery;

class ListsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }




    /*
    *********** GET PAGES ***********
    */

    public function getPages()
    {
        $page = Pages::all();

        $pages = $page->map(function($page){
            return [
                'value'    => $page->id,
                'label'    => $page->page,
            ];
        });


        return response()->json(['pages' => ['data' => $pages]]);
    }



     /*
    *********** GET VIDEOS CATEGORIES ***********
    */


    public function getVideosCat()
    {
        $categories = VideosCat::all();

        $categories = $categories->map(function($categories){
            return [
                'value' => $categories->id,
                'label' => $categories->category,
            ];
        });


        return response()->json(['cats' => ['data' => $categories]]);
    }



     /*
    *********** GET CONTACTS DEPARTMENTS ***********
    */


    public function getContactsDepartments()
    {
        $department = ContactsDep::all();

        $departments = $department->map(function($department){
            return [
                'value' => $department->id,
                'label' => $department->department,
            ];
        });

        return response()->json(['department' =>['data' => $departments]]);

    }


     /*
    *********** GET CONTACTS MARKETS ***********
    */


    public function getContactsMarkets()
    {
        $market = Markets::all();

        $markets = $market->map(function($market){
            return [
                'value' => $market->id,
                'label' => $market->market,
            ];
        });

        return response()->json(['market' => ['data' => $markets]]);

    }


     /*
    *********** GET LANGUAGES AVAILABLE ***********
    */


    public function getLanguages()
    {
        $lang = new LangMiddleware;
        $languagesList = $lang->languagesList();


         return response()->json(['data' => $languagesList]);
    }



     /*
    *********** GET INFO FOR HEADER ON PRODUCT PAGE ***********
    */


     public function getProductSeo(Request $request)
     {
        $id = $request->id;

        $product = Products::where('id', $id)->get();

        if($product->count() > 0) 
        {
            $data_prod = $product->map(function($product){
                return [
                    'id'          => $product->id,  
                    'name'        => $product->name,
                    'description' => $product->description,
                    'titleSeo'    => $product->title_seo,
                    'descSeo'     => $product->desc_seo,
                    'keywordsSeo' => $product->keywords_seo
                ];
            });    
        }
        else
        {
            $data_prod = $product;
        }

        return response()->json([
            'product' => $data_prod
        ]);
     }


    /*
   ********* GET INFO FOR HEADER ON PRODUCT PAGE *********
   */

    public function getProductCategory()
    {
        $category = ProductsCategory::all();

        $data_category = $category->map(function($category){
            return [
                'value' => $category->id,
                'label' => $category->category,
            ];
        });

        return response()->json(['cat' => ['data' => $data_category]]);
    }


     /*
   ********* GET PRODUCTS COMPONENTS TO BACKOFFICE *********
   */

    public function getProductsComponents()
    {
        $components = Components::all();

        $data_components = $components->map(function($components){
            return [
                'value' => $components->id,
                'label' => $components->component,
            ];
        });

        return response()->json(['component' => ['data' => $data_components]]);
    }

    public function getProductsMaterials()
    {
        $materials = Materials::all();

        $dataMaterials = $materials->map(function($components){
            return [
                'value' => $components->id,
                'label' => $components->material,
            ];
        });

        return response()->json(['material' => ['data' => $dataMaterials]]);
    }


    /*
        GET BANNERS MODULE
    */


    public function getBanner(Request $request)
    {
        $lang = new LangMiddleware;

        $now = Carbon::now()->format('Y-m-d H:i:s');

        $locale = $lang->getLocale();

        $banners = Banners::where('id_page', $request->page)
                    ->where('begin_date', '<=', $now)
                    ->where('end_date', '>=', $now)
                    ->get();

        $dataBanners = $banners->map(function($banners) use ($locale){

            return [
                'id'      => $banners->id,
                'title'   => $banners->title,
                'details' => $banners->details,
                'image'   => $banners->img,
                'alt'     => $banners->alt,
                'btnText' => $banners->btn_text,
                'btnLink' => $locale.'/'.$banners->btn_link
            ];
        });


        return response()->json(['banner' => ['data' => $dataBanners]]);
    }



    /*
        GET PRESS RELEASES
    */


    public function getPressReleases()
    {
        $press_releases = PressReleases::orderBy('position')->get();

        $dataReleases = $press_releases->map(function($press_releases){
            return [
                'id'      => $press_releases->id,
                'name'    => $press_releases->name,
                'details' => $press_releases->details,
                'image'   => $press_releases->img,
                'alt'     => $press_releases->alt,
                'pdf'     => $press_releases->pdf
            ];
        });


        return response()->json(['release' => ['data' => $dataReleases]]);
    }



    /*
        GET PRESS CLIPPING
    */


    public function getPressClipping()
    {
        $press_clipping = PressClipping::where('cover', 0)->orderBy('position')->get();

        $dataClipping = $press_clipping->map(function($press_clipping){
            return [
                'id'      => $press_clipping->id,
                'name'    => $press_clipping->name,
                'details' => $press_clipping->details,
                'image'   => $press_clipping->img,
                'alt'     => $press_clipping->alt
            ];
        });


        return response()->json(['clipping' => ['data' => $dataClipping]]);
        
    }



    /*
        GET PRESS COVER
    */


    public function getPressCover()
    {
        $press_cover = PressClipping::where('cover', 1)->orderBy('position')->get();

        $dataCover = $press_cover->map(function($press_cover){
            return [
                'id'      => $press_cover->id,
                'name'    => $press_cover->name,
                'details' => $press_cover->details,
                'image'   => $press_cover->img,
                'alt'     => $press_cover->alt
            ];
        });


        return response()->json(['cover' => ['data' => $dataCover]]);
    }



    /*
        GET EBOOKS
    */


    public function ebooksList()
    {
        $ebooks = Ebooks::orderBy('position')->get();

        $dataEbooks = $ebooks->map(function($ebooks){
            return [
                'id'      => $ebooks->id,
                'name'    => $ebooks->name,
                'details' => $ebooks->details,
                'pdf'     => $ebooks->pdf,
                'image'   => $ebooks->img,
                'alt'     => $ebooks->alt
            ];
        });


        return response()->json(['ebook' => ['ebooks' => $dataEbooks]]);
    }



    /*
        GET EVENTS
    */


    public function eventsList()
    {
        $events = Events::orderBy('started', 'asc')->get();

        $dataEvents = $events->map(function($events){
            return [
                'id'       => $events->id,
                'name'     => $events->title,
                'subTitle' => $events->subTitle,
                'text'     => $events->text,
                'image'    => $events->img,
                'alt'      => $events->alt
            ];
        });


        return response()->json(['event' => ['events' => $dataEvents]]);
    }


    public function test()
    {
        return view('php-info');
    }

    public function languagesList()
    {
        $lang = new LangMiddleware;
        $languagesList = $lang->languagesList();


        return response()->json(['languages' => $languagesList]);
    }

    /*
        GET Related Products
    */


    public function relatedProductsList()
    {
        $products = Products::all();

        $dataProducts = $products->map(function($products){
            return [
                'value' => $products->id,
                'label' => $products->name,
            ];
        });


        return response()->json(['relatedProducts' => $dataProducts]);
    }


    /*
        GET Related Projects
    */

    public function relatedProjectsList()
    {
        $projects = Projects::all();

        $dataProjects = $projects->map(function($projects){
            return [
                'value' => $projects->id,
                'label' => $projects->name,
            ];
        });


        return response()->json(['relatedProjects' => $dataProjects]);
    }


    
    /*
        GET SLIDERS
    */


    public function sliders(Request $request)
    {
        $lang = new LangMiddleware;

        $now = Carbon::now()->format('Y-m-d H:i:s');

        $locale = $lang->getLocale();

        $sliders = Slider::where('id_page', $request->page)
                    ->where('begin_date', '<=', $now)
                    ->where('end_date', '>=', $now)
                    ->get();

        $dataSliders = $sliders->map(function($sliders) use ($locale){

            return [
                'id'      => $sliders->id,
                'title'   => $sliders->title,
                'details' => $sliders->details,
                'image'   => $sliders->img,
                'alt'     => $sliders->alt,
                'btnText' => $sliders->btn_text,
                'btnLink' => $locale.'/'.$sliders->btn_link
            ];
        });


        return response()->json(['slider' => ['data' => $dataSliders]]);
    }



    /*
        *********** GET IMAGES BLOCK CATEGORIES ***********
    */

    public function getCategories()
    {
        $lang = new LangMiddleware;

        $locale = $lang->getLocale();

        $category = ProductsCategory::all();

        $data = $category->map(function($category) use ($locale){
            return [
                'name'  => $category->category,
                'image' => $category->img,
                'link'  => $category->link,
            ];
        });

        return response()->json(['data' => $data]);
    }



    /*
        GET ALL PRODUCTS
    */

    public function getAllProducts()
    {
        $lang = new LangMiddleware;

        $locale = $lang->getLocale();


        //$products = Products::getAll();

        $products = Products::with([
                    'categories',
                    'images'

                ])
                ->where('visible', 1)
                ->get();

        

        $dataProducts = $products->map(function($products) use ($locale){
            return [
                'id'       => $products->id,
                'name'     => $products->name.' | '.$products->categories->category,
                'image'    => $products->images[0]->img,
                'imageAlt' => $products->images[0]->alt
            ];
        });



        return response()->json(['product' => ['data' => $dataProducts]]);
    }



    /*
        GET CATEGORIES PRODUCTS
    */

    public function getCatProducts(Request $request)
    {
        $lang = new LangMiddleware;

        $locale = $lang->getLocale();


        //$products = Products::getAll();

        $products = Products::with([
                    'categories',
                    'images'

                ])
                ->where('id_category', $request->cat)
                ->where('visible', 1)
                ->get();

        

        $dataProducts = $products->map(function($products) use ($locale){
            return [
                'id'       => $products->id,
                'name'     => $products->name.' | '.$products->categories->category,
                'image'    => $products->images[0]->img,
                'imageAlt' => $products->images[0]->alt
            ];
        });



        return response()->json(['product' => ['data' => $dataProducts]]);
    }



    /*
        GET PRODUCT
    */

    public function getProduct(Request $request)
    {
        $lang = new LangMiddleware;

        $locale = $lang->getLocale();

        $id = $request->id;

        $products = Products::where('id', $id)->where('visible', 1)->get();

        $images = ProductsGallery::where('id_product', $id)->orderBy('position')->get();

        

        $dataProducts = $products->map(function($products) use ($locale){
            return [
                'id'          => $products->id,
                'name'        => $products->name.' | '.$products->categories->category,
                'description' => $products->description,
                'weight'      => $products->weight,
                'model'       => $products->model,
                'dimensions'  => $products->dimensions,
                'priceWW'     => $products->price_ww,
                'priceUSA'    => $products->price_usa,
                'titleSeo'    => $products->title_seo,
                'descSeo'     => $products->desc_seo,
                'keywordsSeo' => $products->keywords_seo,
                'bulbs'       => $products->bulbs,
                'certificate' => (bool)$products->ul_certificate,
                'new'         => (bool)$products->new,
                'contract'    => (bool)$products->contract
            ];
        });


        $dataImages = $images->map(function($images){
            return [
                'id'       => $images->id,
                'iamge'    => $images->img,
                'imageAlt' => $images->alt
            ];
        });


        $productRelated = Products::with([
                        'categories',
                        'images',
                        'related'
                        ])
                        ->where('id', $id)
                        ->where('visible', 1)
                        ->take(5)
                        ->get();



        $dataRelated = $productRelated->map(function($productRelated){
            return [
                'id'       => $productRelated->id_product_related,
                'name'     => $productRelated->name,
                'category' => $productRelated->categories->category,
                'image'    => $productRelated->images[0]->img,
                'imageAlt' => $productRelated->images[0]->alt
            ];
        });



        return response()->json([
            'product' => ['data'        => $dataProducts], 
            'image'   => ['dataImage'   => $dataImages],
            'related' => ['dataRelated' => $dataRelated]
        ]);
    }

}