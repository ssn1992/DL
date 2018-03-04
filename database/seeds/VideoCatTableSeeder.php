<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class VideoCatTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("videos_cat")->insert([
            
            "category" => 'Video Category',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            
        ]);

        $id = DB::table("videos_cat")->select('id')->first();

        DB::table('videos')->insert([
        	
        		'id_category' => $id->id,
        		'title' => 'Video Title',
                'details' => 'Video Details',
        		'url' => 'v=S9bCLPwzSC0',
        		'position' => 0,
        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            	"updated_at" => Carbon::now()->format('Y-m-d H:i:s')
        	
        ]);
    }
}
