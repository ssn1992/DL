<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $table = "sliders";


    public static function getSliders()
    {
    	return DB::table('sliders')
    	->leftJoin('pages', 'sliders.id_page', '=', 'pages.id')
    	->select('sliders.*', 'pages.page')
    	->get();
    }
}
