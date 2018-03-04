<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class LinkGenerateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<=5;$i++)
        {
            DB::table("link_generate")->insert(
                [
                	"url" => 'mediaSeeds/files/xpto_'.$i.'.pdf',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
