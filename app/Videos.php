<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Videos extends Model
{
    protected $table = "videos";

    // public function post()
    // {
    // 	return $this->belongsTo('App\VideosCat');
    // }


    public function videosEdit($id)
    {
    	return DB::table('videos')
    	->leftJoin('videos_cat', 'videos.id_category', '=', 'videos_cat.id')
    	->select('videos.id', 'videos.title', 'videos.url', 'videos_cat.category')
    	->where('videos.id', $id)
    	->first();
    }


    public static function getVideos()
    {
        return DB::table('videos')
        ->leftJoin('videos_cat', 'videos.id_category', '=', 'videos_cat.id')
        ->select('videos.*', 'videos_cat.category')
        ->get();
    }
}
