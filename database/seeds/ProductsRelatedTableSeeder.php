<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;



class ProductsRelatedTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<=4;$i++)
        {
            DB::table("products_related")->insert(
                [
                	"id_product" => $i,
                	"id_product_related" => $i+1,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
