<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;

class BannersTableSeeder extends Seeder
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


        $productsCategory = DB::table("products_category")->first();

        for($i=1;$i<=5;$i++)
        {
            DB::table("banners")->insert([
	            "id_category" => $productsCategory->id,
                "id_page" => null,
                'title' => 'banner_'.$i.'.'.$i.'_title',
                'details' => 'banner_'.$i.'.'.$i.'_details',
                'begin_date' => Carbon::now()->format('Y-m-d H:i:s'),
                'end_date' => Carbon::now()->format('Y-m-d H:i:s'),
                'img' => 'mediaSeeds/slider/'.$i.'.jpg',
                'alt' => 'banner_'.$i.'.'.$i.'_alt',
                'btn_text' => 'banner_'.$i.'.'.$i.'_btnText',
                'btn_link' => 'link/teste',
	            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	            
	        ]);

            $id = DB::table('banners')->where('img', 'mediaSeeds/slider/'.$i.'.jpg')->first();

	        // translations

            foreach ($languagesList as $key => $lang) 
            {
                // title


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'banner_'.$id->id,
                    'key' => $id->id.'_title',
                    'value' => 'title '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // details

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'banner_'.$id->id,
                    'key' => $id->id.'_details',
                    'value' => 'details '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // alt

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'banner_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'image Alt'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // btn text

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'banner_'.$id->id,
                    'key' => $id->id.'_btnText',
                    'value' => 'Button Text '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('banner_'.$id->id);
            }


    	}
    }
}
