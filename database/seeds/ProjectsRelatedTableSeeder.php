<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;


class ProjectsRelatedTableSeeder extends Seeder
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
            DB::table("projects_related")->insert(
                [
                	"id_project" => $i,
                	"id_proj_related" => $i+1,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
