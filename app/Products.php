<?php

namespace App;
use DB;

use Illuminate\Database\Eloquent\Model;


class Products extends Model
{
    protected $table = "products";


    public static function productsCategory()
    {
        return DB::table('products')
            ->join('products_category', 'products.id_category', '=', 'products_category.id')
            ->select('products.*', 'products_category.category as categoryName')
            ->get();
    }



    public static function getAll()
    {
    	return DB::table('products')
    		->join('products_category', 'products.id_category', '=', 'products_category.id')
    		->join('products_gallery', 'products.id', '=', 'products_gallery.id_product')
    		->select('products.*', 'products_category.category as categoryName', 'products_gallery.img', 'products_gallery.alt')
    		->orderBy('products_category.id')
    		->orderBy('products.position')
    		->get();
            
    }



    public function images()
    {
    	return $this->hasMany(ProductsGallery::class, 'id_product');
    }


    public function categories()
    {
    	return $this->belongsTo(ProductsCategory::class, 'id_category');
    }


    public function related()
    {
    	return $this->hasMany(ProductsRelated::class, 'id_product');
    }

}
