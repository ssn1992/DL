<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class PressReleasesTableSeeder extends Seeder
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
            DB::table("press_releases")->insert(
                [
                    'img' => 'mediaSeeds/press_releases/press_releases_'.$i.'.png',
                    'alt' => 'press_releases_'.$i.'.'.$i.'_alt',
                    'name' => 'name link '.$i,
                    'details' => 'details link '.$i,
                    'pdf' => 'mediaSeeds/pdfs/Products.pdf',
                    'position' => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('press_releases')->where('pdf', 'mediaSeeds/pdfs/Products.pdf')->where('position', $i)->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {

                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'press_releases_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test '.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('press_releases_'.$id->id);
            }
        }
    }
}
