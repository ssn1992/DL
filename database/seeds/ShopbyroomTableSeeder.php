<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class ShopbyroomTableSeeder extends Seeder
{
    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languagesList = ['en','fr', 'de', 'ru', 'it'];

        for($i=1;$i<=5;$i++)
        {
            DB::table("shopbyroom_divisions")->insert([
                
                    "division" => 'shopbyroom_'.$i.'.'.$i.'_division',                   
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
            ]);

            DB::table("shopbyroom")->insert([
                
                    "id_division" => $i,
                    'name' => 'shopbyroom_'.$i.'.'.$i.'_name',
                    'img' => 'mediaSeeds/shopbyroom/'.$i.'.jpg',
                    'alt' => 'shopbyroom_'.$i.'.'.$i.'_alt',
                    'position' => $i,
                    'visible' => 1,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
            ]);

            for($j=1;$j<=3;$j++)
        	{


	            DB::table("shopbyroom_tags")->insert([
	                
	                    "id_shopbyroom" => $i,
	                    'id_product' => $j,
	                    'tag_x' => 'xxx',
	                    'tag_y' => 'yyy',
	                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	                
	            ]);

          	}

            // translations

            foreach ($languagesList as $key => $lang) 
            {
                // division 


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'shopbyroom_'.$i,
                    'key' => $i.'_division',
                    'value' => $i.' Division '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // name 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'shopbyroom_'.$i,
                    'key' => $i.'_name',
                    'value' => 'name shopbyroom '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'shopbyroom_'.$i,
                    'key' => $i.'_alt',
                    'value' => 'alt shopbyroom '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                $this->manager->exportTranslations('shopbyroom_'.$i);
            }


        }
    }
}
