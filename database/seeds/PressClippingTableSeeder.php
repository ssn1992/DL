<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class PressClippingTableSeeder extends Seeder
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
            DB::table("press_clipping")->insert(
                [
                    'img' => 'mediaSeeds/press_clipping/press_clipping_'.$i.'.png',
                    'alt' => 'press_clipping_'.$i.'.'.$i.'_alt',
                    'name' => 'teste name '.$i,
                    'details' => 'teste details '.$i,
                    'cover' => 0,
                    'position' => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('press_clipping')->where('name', 'teste name '.$i)->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {

                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'press_clipping_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test '.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('press_clipping_'.$id->id);
            }
        }


        for($i=1;$i<=5;$i++)
        {
            DB::table("press_clipping")->insert(
                [
                    'img' => 'mediaSeeds/press_clipping/press_clipping_'.$i.'.png',
                    'alt' => 'press_clipping_cover_'.$i.'.'.$i.'_alt',
                    'details' => 'teste details '.$i,
                    'cover' => 1,
                    'name' => 'teste name '.$i,
                    'position' => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('press_clipping')->where('name', 'teste name '.$i)->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {

                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'press_clipping_cover_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test cover'.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('press_clipping_cover_'.$id->id);
            }
        }
    }
}
