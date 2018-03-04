<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class CatalogueTableSeeder extends Seeder
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
            DB::table("catalogue")->insert(
                [
                    "catalogue" => 'catalogue_'.$i.'.'.$i.'_catalogue',
                    'img' => 'mediaSeeds/catalogue/catalogue_'.$i.'.png',
                    'alt' => 'catalogue_'.$i.'.'.$i.'_alt',
                    'pdf' => 'mediaSeeds/pdfs/Products.pdf',
                    'link' => 'link/okok'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('catalogue')->where('catalogue', 'catalogue_'.$i.'.'.$i.'_catalogue')->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {
                // catalogue 


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'catalogue_'.$id->id,
                    'key' => $id->id.'_catalogue',
                    'value' => $id->id.' The Best Dining Room Chandelier ieas',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'catalogue_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test '.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('catalogue_'.$id->id);
            }
        }
    }
}
