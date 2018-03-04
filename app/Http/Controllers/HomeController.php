<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Projects;
use App\ProductsCategory;
use App\Slider;
use App\Pages;
use App\Banners;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banner  = Banners::where('id_page', 1)->first();
        $sliders = Slider::all();

        return view('home.home', ["sliders" => $sliders, "banner" => $banner]);
    }

    /*
    *********** UPDATE HOMEPAGE BLOCKS ORDER ***********
    */
    
    public function homepageOrder(Request $request)
    {
        try
        {
            foreach ($request->order as $key => $order) {
                dd($order);
            }
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }


    
    /*
    *********** GET IMAGES BLOCK CATEGORIES ***********
    */

    public function getFeatureCategories()
    {
        $category = ProductsCategory::all();

        $categories = $category->map(function($category){
            return [
                'category'    => $category->category,
                'image'    => $category->img,
                'link' => $category->link,
            ];
        });


        return response()->json(['categories' => $categories]);
    }


}


