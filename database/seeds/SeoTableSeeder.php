<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class SeoTableSeeder extends Seeder
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

        DB::table("seo")->insert(
            [
                "title" => 'seo_1.1_title',
                "keywords" => 'seo_1.1_keywords',
                "description" => 'seo_1.1_description',
                "campaignHeader" => null,
                "campaignBody" => null,
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        $languagesList = ['en','fr', 'de', 'ru', 'it'];

        foreach ($languagesList as $key => $lang) 
        {

            DB::table('ltm_translations')->insert([

                'status' => 0,
                'locale' => $lang,
                'group' => 'seo_1',
                'key' => '1_title',
                'value' => 'insert seo title',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

            ]);


            DB::table('ltm_translations')->insert([

                'status' => 0,
                'locale' => $lang,
                'group' => 'seo_1',
                'key' => '1_keywords',
                'value' => 'insert seo keywords',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

            ]);


            DB::table('ltm_translations')->insert([

                'status' => 0,
                'locale' => $lang,
                'group' => 'seo_1',
                'key' => '1_description',
                'value' => 'insert seo description',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

            ]);


            $this->manager->exportTranslations('seo_1');
        }
    }
}
