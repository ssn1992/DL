<?php

namespace App\Http\Controllers;

use App\Products;
use Illuminate\Http\Request;
use App\Materials;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use File;
use App\ProductsGallery;
use App\ProductsGalleryHr;
use App\ProductsMaterialsComponents;
use App\Components;
use App\Http\Middleware\LangMiddleware;
use Mockery\Exception;
use App\ProductsRelated;
use App;
use App\ProjectsProducts;

class ProductsController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function view()
    {
        return view('backoffice.products.index');
    }

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


//************************************ VIEW PRODUCTS LIST ************************************//

    public function index()
    {
        $products = Products::productsCategory();

        $data = $products->map(function($products){
            return [
                'id'            => $products->id,
                'Date'          => "$products->created_at",
                'Name'          => $products->name,
                'category'      => $products->categoryName,
                'Visible'       => (bool)$products->visible,
                'UlCertificate' => (bool)$products->ul_certificate,
                'New'           => (bool)$products->new,
                'Contract'      => (bool)$products->contract,
                'PriceWW'       => $products->price_ww,
                'PriceUSA'      => $products->price_usa
            ];
        });

        if($products->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'products',
                    'tableName' => 'Products',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'products',
                    'tableName' => 'Products',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }
        
        
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

        try {

            $this->validate($request, [
                'name'       => 'required',
                'weight'     => 'required',
                'dimensions' => 'required',
                'bulbs'      => 'required',
                'nameSeo' => 'required',
                'descSeo' => 'required',
                'keywordsSeo' => 'required',
                'priceWW' => 'required',
                'stockWW' => 'required',
                'priceUsa' => 'required',
                'stockUsa' => 'required',
                'videoUrl' => 'required',
                'description' => 'required',
                'imageAlt'     => 'required',
                'imageHrAlt'     => 'required',
                'cat' => 'required',
                'pdf' => 'required',
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $position = Products::count() + 1;

            $product = new Products;
            $product->id_category = $request->cat;
            $product->name = $request->name;
            $product->description = 'temp';
            $product->weight = $request->weight;
            $product->pdf = 'temp';
            $product->model = null;
            $product->dimensions = $request->dimensions;
            $product->price_ww = $request->priceWW;
            $product->stock_ww = $request->stockWW;
            $product->price_usa = $request->priceUsa;
            $product->stock_usa = $request->stockUsa;
            $product->title_seo = 'temp';
            $product->desc_seo = 'temp';
            $product->keywords_seo = 'temp';
            $product->video_url = $request->videoUrl;
            $product->bulbs = 'temp';
            $product->position = $position;
            $product->visible = json_decode($request->visible);
            $product->ul_certificate = json_decode($request->certificate);
            $product->new = json_decode($request->new);
            $product->contract = json_decode($request->contract);
            $product->save();



            $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                               md5(date('ymdhis')) .
                               '.' .
                               request()->pdf->getClientOriginalExtension();

                    
            $basePathImages = 'images/products/'.$product->id.'/';
            $basePathImagesHr = 'imagesHr/products/'.$product->id.'/';
            $basePathPdf = 'pdfs/products/'.$product->id.'/en/';

            $product->description = 'product_'.$product->id.'.'.$product->id.'_description';
            $product->title_seo = 'product_'.$product->id.'.'.$product->id.'_titleSeo';
            $product->desc_seo = 'product_'.$product->id.'.'.$product->id.'_descSeo';
            $product->keywords_seo = 'product_'.$product->id.'.'.$product->id.'_keywordsSeo';
            $product->bulbs = 'product_'.$product->id.'.'.$product->id.'_bulbs';
            $product->pdf = 'product_'.$product->id.'.'.$product->id.'_pdf';
            $product->save();

            request()->pdf->move($basePathPdf, $pdfName);



             /*
                3D File
            */

                if($request->model)
                {
                    $modelName = pathinfo(request()->model->getClientOriginalName(), PATHINFO_FILENAME) .
                               md5(date('ymdhis')) .
                               '.' .
                               request()->model->getClientOriginalExtension();
                    $basePathModel = 'models/products/'.$product->id.'/';

                    $product->model = $basePathModel.$modelName;
                    $product->save();

                    request()->model->move($basePathModel, $modelName);
                }

            /*
                End 3D File
            */


            for($i=0;$i < $request->counterImage;$i++)
            {
                $imageName = pathinfo(request()->image[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             $i .
                             '.' .
                             request()->image[$i]->getClientOriginalExtension();

                $position = ProductsGallery::where('id_product', $product->id)->count();

                $image = new ProductsGallery;
                $image->id_product = $product->id;
                $image->img = $basePathImages.$imageName;
                $image->alt = 'temp';
                $image->position = $position;
                $image->save();

                $image->alt = 'product_'.$product->id.'.'.$image->id.'_altImage';
                $image->save();

                request()->image[$i]->move($basePathImages, $imageName);


                foreach ($languagesList as $key => $lang) 
                {

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = 'product_'.$product->id;
                    $translate->key = $image->id.'_altImage';
                    $translate->value = $request->imageAlt;
                    $translate->save();
                }
            }

            for($i=0;$i < $request->counterImageHr;$i++)
            {
                $imageName = pathinfo(request()->imageHr[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             $i .
                             '.' .
                             request()->imageHr[$i]->getClientOriginalExtension();

                $position = ProductsGalleryHr::where('id_product', $product->id)->count();

                $imageHr = new ProductsGalleryHr;
                $imageHr->id_product = $product->id;
                $imageHr->img = $basePathImagesHr.$imageName;
                $imageHr->alt = 'temp';
                $imageHr->position = $position;
                $imageHr->save();

                $imageHr->alt = 'product_'.$product->id.'.'.$imageHr->id.'_altImageHr';
                $imageHr->save();

                request()->imageHr[$i]->move($basePathImagesHr, $imageName);

                foreach ($languagesList as $key => $lang) 
                {

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = 'product_'.$product->id;
                    $translate->key = $imageHr->id.'_altImageHr';
                    $translate->value = $request->imageHrAlt;
                    $translate->save();
                }

            }


            /*
                MATERIALS + COMPONENTS
            */

            $components = ['body', 'shade', 'base', 'bulbHolder', 'counterweight', 'wire', 'canopy', 'topCover'];

            foreach ($components as $key => $component) 
            {
                $id = $key + 1;

                if($request->input($component) != null)
                {
                    $comp = $request->input($component);
                    
                    $materials = explode(',', $comp);

                    foreach ($materials as $value) {

                        $material = new ProductsMaterialsComponents;
                        $material->id_product = $product->id;
                        $material->id_material = $value;
                        $material->id_component = $id;
                        $material->save();
                    }
                    
                }
            }


            /*
                END MATERIALS + COMPONENTS
            */

            if (!empty($request->relatedProducts)) {
                $relatedPayload = explode(',', $request->relatedProducts);

                if ($relatedPayload) {
                    foreach ($relatedPayload as $key => $related) {
                        $prodsRelated = new ProductsRelated;
                        $prodsRelated->id_product = $product->id;
                        $prodsRelated->id_product_related = $related;
                        $prodsRelated->save();
                    }
                }
            }


            foreach ($languagesList as $key => $lang) 
            {

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_description';
                $translate2->value = $request->description;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_titleSeo';
                $translate2->value = $request->nameSeo;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_descSeo';
                $translate2->value = $request->descSeo;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_keywordsSeo';
                $translate2->value = $request->keywordsSeo;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_bulbs';
                $translate2->value = $request->bulbs;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'product_'.$product->id;
                $translate2->key = $product->id.'_pdf';
                $translate2->value = $basePathPdf.$pdfName;
                $translate2->save();

                $translate4 = new Translations;
                $translate4->status = 0;
                $translate4->locale = $lang;
                $translate4->group = "product_" . $product->id;
                $translate4->key = $product->id . '_visible';
                $translate4->value = 1;
                $translate4->save();

            }

            $this->manager->exportTranslations('product_'.$product->id);


        }
        catch(Exception $e)
        {
            return response()->json($e, 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show(Products $products)
    {
        //
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.products.edit');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        try {

            $id = $request->id;

            $product = Products::where('id', $id)->get();

            $images = ProductsGallery::where('id_product', $id)->get();

            $imagesHr = ProductsGalleryHr::where('id_product', $id)->get();

            $materials = ProductsMaterialsComponents::where('id_product',$id)->get();

            $components = ['body', 'shade', 'base', 'bulbHolder', 'counterweight', 'wire', 'canopy', 'topCover'];


                if ($images->count() > 0) {
                    $data_images = $images->map(function ($images) {
                        return [
                            'id' => $images->id,
                            'image' => $images->img,
                            'alt' => $images->alt,
                        ];
                    });
                } else {
                    $data_images = $images;
                }

            if($product->count() > 0)
            {
                $data_prod = $product->map(function($product){
                    return [
                        'id'           => $product->id,
                        'name'         => $product->name,
                        'description'  => $product->description,
                        'weight'       => $product->weight,
                        'pdf'          => $product->pdf,
                        'dimensions'   => $product->dimensions,
                        'price_ww'     => $product->price_ww,
                        'stock_ww'     => $product->stock_ww,
                        'price_usa'    => $product->price_usa,
                        'stock_usa'    => $product->stock_usa,
                        'video_url'    => 'https://www.youtube.com/watch?v=' . $product->video_url,
                        'bulbs'        => $product->bulbs,
                        'visible'      => (bool)$product->visible,
                        'certificate'  => (bool)$product->ul_certificate,
                        'new'          => (bool)$product->new,
                        'contract'     => (bool)$product->contract,
                        'desc_seo'     => $product->desc_seo,
                        'keywords_seo' => $product->keywords_seo,
                        'title_seo'    => $product->title_seo,
                        'valter'       => $product->model,
                        'id_category'  => $product->id_category
                    ];
                });
            }
            else
            {
                $data_prod = $product;
            }

            /*
                IMAGES
            */


            if ($imagesHr->count() > 0) {
                $data_imagesHr = $imagesHr->map(function ($imagesHr) {
                    return [
                        'id' => $imagesHr->id,
                        'image' => $imagesHr->img,
                        'alt' => $imagesHr->alt,
                    ];
                });
            } else {
                $data_imagesHr = $imagesHr;
            }

            if($images->count() > 0)
            {
                $data_images = $images->map(function($images){
                    return [
                        'id'    => $images->id,
                        'image' => $images->img,
                        'alt'   => $images->alt,
                    ];
                });
            }
            else
            {
                $data_images = $images;
            }

            /*
                IMAGES HR
            */

            if($imagesHr->count() > 0)
            {
                $data_imagesHr = $imagesHr->map(function($imagesHr){
                    return [
                        'id'  => $imagesHr->id,
                        'image'    => $imagesHr->img,
                        'alt' => $imagesHr->alt,
                    ];
                });
            }
            else
            {
                $data_imagesHr = $imagesHr;
            }



            /*
                MATERIALS BY COMPONENT
            */


            $listComponents = [];
            $i = 1;

            $comp = array();

            foreach ($components as $key => $comps)
            {
                $materials = ProductsMaterialsComponents::select('id_material')->where('id_product',$id)->where('id_component', $i)->get();
                foreach ($materials as $key => $mat)
                {
                    $comp[$key] = $mat->id_material;
                }

                $listComponents[$comps] = $comp;
                $comp = [];

                $i++;
            }


            $listRelated = array();

            /*
                RELATED PRODS
            */


            if(ProductsRelated::where('id_product', $id)->exists())
            {
                $related = ProductsRelated::getRelated($id);

                foreach ($related as $key => $rel)
                {
                    $prod[$key] = $rel->related;
                }

                $listRelated = $prod;
            }


            return response()->json([
                'product'          => $data_prod['0'],
                'images'           => $data_images,
                'imagesHr'         => $data_imagesHr,
                'materials'        => $listComponents,
                'relatedProducts'  => $listRelated
            ]);

        } catch(Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        try {

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $id   = $request->id;
            $lang = $request->language;

            if($lang == 'en')
            {
                $product = Products::find($id);
                $product->id_category = $request->cat;
                $product->name = $request->name;
                $product->weight = $request->weight;
                $product->dimensions = $request->dimensions;
                $product->price_ww = $request->priceWW;
                $product->stock_ww = $request->stockWW;
                $product->price_usa = $request->priceUsa;
                $product->stock_usa = $request->stockUsa;
                $product->video_url = $request->videoUrl;
                $product->visible = json_decode($request->visible);
                $product->ul_certificate = json_decode($request->certificate);
                $product->new = json_decode($request->new);
                $product->contract = json_decode($request->contract);
                $product->save();


                $basePathImages = 'images/products/'.$product->id.'/';
                $basePathImagesHr = 'imagesHr/products/'.$product->id.'/';
                

                $product->description = 'product_'.$product->id.'.'.$product->id.'_description';
                
                $product->save();




                
                if($request->counterImage > 0)
                {
                    for($i=0;$i < $request->counterImage;$i++)
                    {
                        $imageName = pathinfo(request()->image[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                                     md5(date('ymdhis')) .
                                     $i .
                                     '.' .
                                     request()->image[$i]->getClientOriginalExtension();

                        $position = ProductsGallery::where('id_product', $product->id)->count();

                        $image = new ProductsGallery;
                        $image->id_product = $product->id;
                        $image->img = $basePathImages.$imageName;
                        $image->alt = 'temp';
                        $image->position = $position;
                        $image->save();

                        $image->alt = 'product_'.$product->id.'.'.$image->id.'_altImage';
                        $image->save();

                        request()->image[$i]->move($basePathImages, $imageName);


                        foreach ($languagesList as $key => $lang) 
                        {

                            $translate = new Translations;
                            $translate->status = 0;
                            $translate->locale = $lang;
                            $translate->group = 'product_'.$product->id;
                            $translate->key = $image->id.'_altImage';
                            $translate->value = $request->imageAlt;
                            $translate->save();
                        }
                    }
                }


                if($request->counterImageHr > 0)
                {

                    for($i=0;$i < $request->counterImageHr;$i++)
                    {
                        $imageName = pathinfo(request()->imageHr[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                                     md5(date('ymdhis')) .
                                     $i .
                                     '.' .
                                     request()->imageHr[$i]->getClientOriginalExtension();

                        $position = ProductsGalleryHr::where('id_product', $product->id)->count();

                        $imageHr = new ProductsGalleryHr;
                        $imageHr->id_product = $product->id;
                        $imageHr->img = $basePathImagesHr.$imageName;
                        $imageHr->alt = 'temp';
                        $imageHr->position = $position;
                        $imageHr->save();

                        $imageHr->alt = 'product_'.$product->id.'.'.$imageHr->id.'_altImageHr';
                        $imageHr->save();


                        request()->imageHr[$i]->move($basePathImagesHr, $imageName);

                        foreach ($languagesList as $key => $lang) 
                        {

                            $translate = new Translations;
                            $translate->status = 0;
                            $translate->locale = $lang;
                            $translate->group = 'product_'.$product->id;
                            $translate->key = $imageHr->id.'_altImageHr';
                            $translate->value = $request->imageHrAlt;
                            $translate->save();
                        }

                    }

                }

                /*
                    3D File
                */

                if($request->model != null && $request->model != 'null')
                {
                    if(!Products::where('id', $request->id)->where('model', $request->model)->exists())
                    {
                        $modelName = pathinfo(request()->model->getClientOriginalName(), PATHINFO_FILENAME) .
                                   md5(date('ymdhis')) .
                                   '.' .
                                   request()->model->getClientOriginalExtension();
                        $basePathModel = 'models/products/'.$product->id.'/';

                        $product->model = $basePathModel.$modelName;
                        $product->save();

                        request()->model->move($basePathModel, $modelName);
                    }
                }



                /*
                    MATERIALS + COMPONENTS
                */

                for($i=0;$i<$request->countComponents;$i++)
                {
                    $component = new ProductsMaterialsComponents;
                    $component->id_product = $product->id;
                    $component->id_material = $request->material[$i];
                    $component->id_component = $request->component[$i];
                    $component->save();
                }





                /*
                    RELATED
                */

                if (!empty($request->relatedProducts)) {
                    if(ProductsRelated::where('id_product', $request->id)->exists())
                    {
                        ProductsRelated::where('id_product', $request->id)->delete();
                    }

                    $relatedPayload = explode(',', $request->relatedProducts);


                    foreach ($relatedPayload as $key => $related)
                    {
                        $prodsRelated = new ProductsRelated;
                        $prodsRelated->id_product = $product->id;
                        $prodsRelated->id_product_related = $related;
                        $prodsRelated->save();
                    }
                }
                else
                {
                    if(ProductsRelated::where('id_product', $request->id)->exists())
                    {
                        ProductsRelated::where('id_product', $request->id)->delete();
                    }
                }
            }

            


            if($request->pdf != null && $request->pdf != 'null')
            {
                $basePathPdf = 'pdfs/products/'.$product->id.'/'.$lang.'/';
                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                               md5(date('ymdhis')) .
                               '.' .
                               request()->pdf->getClientOriginalExtension();

                if(file_exists($basePathPdf.$pdfName))
                {
                    \File::delete(public_path($basePathPdf.$pdfName));
                }

                request()->pdf->move($basePathPdf, $pdfName);
            }


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_description')->firstOrFail();
            $translate2->value = $request->description;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_titleSeo')->firstOrFail();
            $translate2->value = $request->nameSeo;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_descSeo')->firstOrFail();
            $translate2->value = $request->descSeo;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_keywordsSeo')->firstOrFail();
            $translate2->value = $request->keywordsSeo;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_bulbs')->firstOrFail();
            $translate2->value = $request->bulbs;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'product_'.$id)->where('key', $id.'_pdf')->firstOrFail();
            $translate2->value = $basePathPdf.$pdfName;
            $translate2->save();


            $this->manager->exportTranslations('product_'.$id);

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return response()->json($e, 409);
        }
    }


    public function updateImages(Request $request)
    {
        try{
            $translate = Translations::where('locale', $request->lang)
                        ->where('group' , 'product_'.$request->productId)
                        ->where('key' , $request->imageId.'_altImage')
                        ->firstOrFail();

            $translate->value = $request->imageAlt;
            $translate->save();

            $this->manager->exportTranslations('product_'.$request->productId);

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }


    public function updateImagesHr(Request $request)
    {

        try{
           $translate = Translations::where('locale', $request->lang)
                        ->where('group' , 'product_'.$request->productId)
                        ->where('key' , $request->imageId.'_altImageHr')
                        ->firstOrFail();
            $translate->value = $request->imageHrAlt;
            $translate->save();

            $this->manager->exportTranslations('product_'.$request->productId);

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

        
    }


    public function destroyImages(Request $request)
    {
        try {

            $image = ProductsGallery::where('id', $request->imageId)->where('id_product', $request->productId)->firstOrFail();

            \File::delete(public_path($image->img));
            ProductsGallery::where('id', $request->imageId)->where('id_product', $request->productId)->delete();

            Translations::where('group', 'product_'.$request->productId)
                        ->where('key', $request->imageId.'_altImage')
                        ->delete();

            $this->manager->cleanTranslations();

            return response()->json('Success', 200);

        } catch(\Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function destroyImagesHr(Request $request)
    {
        try {

            $image = ProductsGalleryHr::where('id', $request->imageId)->where('id_product', $request->productId)->firstOrFail();

            \File::delete(public_path($image->img));
            ProductsGalleryHr::where('id', $request->imageId)->where('id_product', $request->productId)->delete();


            Translations::where('group', 'product_'.$request->productId)
                        ->where('key', $request->imageId.'_altImageHr')
                        ->delete();

            $this->manager->cleanTranslations();

            return response()->json('Success', 200);

        } catch(\Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function destroyModel(Request $request)
    {
        try {


            \File::delete(public_path($request->model));

            $product = Products::where('id', $request->productId)->firstOrFail();
            $product->model = null;
            $product->save();

            return response()->json('Success', 200);

        } catch(\Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products, Request $request)
    {
        try{

            $id = $request->id;

            \File::deleteDirectory(public_path('images/products/'.$id));
            \File::deleteDirectory(public_path('imagesHr/products/'.$id));
            \File::deleteDirectory(public_path('pdfs/products/'.$id));
            \File::deleteDirectory(public_path('models/products/'.$id));

            ProductsGallery::where('id_product', $id)->delete();
            ProductsGalleryHr::where('id_product', $id)->delete();
            
            ProductsMaterialsComponents::where('id_product', $id)->delete();

            if(ProductsRelated::where('id_product', $id)->exists())
                ProductsRelated::where('id_product', $id)->delete();

            if(ProjectsProducts::where('id_product', $id)->exists())
                ProjectsProducts::where('id_product', $id)->delete();


            Translations::where('group', 'product_'.$id)->delete();

            Products::where('id', $id)->delete();


            $this->manager->cleanTranslations();

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }
}
