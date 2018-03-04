<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Banners extends Model
{
    protected $table = "banners";


    public static function getBanners()
    {
    	return DB::table('banners')
    	->leftJoin('products_category', 'banners.id_category', '=', 'products_category.id')
    	->leftJoin('pages', 'banners.id_page', '=', 'pages.id')
    	->select('products_category.category as categoryName', 'banners.*', 'pages.page')
    	->get();
    }
}
