<?php

namespace App;
use DB;

use Illuminate\Database\Eloquent\Model;

class ProductsRelated extends Model
{
    protected $table = "products_related";


    public static function getRelated($id)
    {
    	return DB::table('products_related')
    	->join('products', 'products_related.id_product', '=', 'products.id')
    	->select('products.name', 'products_related.id_product_related as related')
    	->where('products_related.id_product', $id)
    	->get();
    }
}
