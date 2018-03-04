<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideosCat extends Model
{
    protected $table = "videos_cat";

    public function videos()
    {
    	return $this->hasMany('App\Videos');
    }
}
