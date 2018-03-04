<?php

namespace App\Http\Controllers;

use App\ProductsCategory;

class CategoriesController extends Controller
{
    /*
        *********** GET IMAGES BLOCK CATEGORIES ***********
    */

    public function getCategories()
    {
        $category = ProductsCategory::all();

        $data = $category->map(function($category){
            return [
                'name'  => $category->category,
                'image' => $category->img,
                'link'  => $category->link,
            ];
        });

        return response()->json(['data' => $data]);
    }
}
