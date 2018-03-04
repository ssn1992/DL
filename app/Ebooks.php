<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Ebooks extends Model
{
    protected $table = "ebooks";


    public function ebookEdit($id)
    {
    	return DB::table('ebooks')
    	->where('id', $id)
    	->get();
    }
}
