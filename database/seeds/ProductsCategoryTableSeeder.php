<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductsCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("products_category")->insert([

            "category" => 'Suspension',
            'img' => 'mediaSeeds/categories/cat-suspension.png',
            'link' => 'category/suspension',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);


        DB::table("products_category")->insert([

            "category" => 'Floor',
            'img' => 'mediaSeeds/categories/cat-floor.png',
            'link' => 'category/floor',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);


        DB::table("products_category")->insert([

            "category" => 'Table',
            'img' => 'mediaSeeds/categories/cat-table.png',
            'link' => 'category/table',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);


        DB::table("products_category")->insert([

            "category" => 'Wall',
            'img' => 'mediaSeeds/categories/cat-wall.png',
            'link' => 'category/wall',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);


        DB::table("products_category")->insert([

            "category" => 'Graphic',
            'img' => 'mediaSeeds/categories/cat-graphic.png',
            'link' => 'category/graphic',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);


        DB::table("products_category")->insert([

            "category" => 'Furniture',
            'img' => 'mediaSeeds/categories/cat-furniture.jpg',
            'link' => 'category/furniture',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        ]);

    }
}
