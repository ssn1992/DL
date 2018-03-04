<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;



class ProjectsProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<=3;$i++)
        {
            DB::table("projects_products")->insert(
                [
                	"id_project" => $i,
                	"id_product" => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
