<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;

class MarketsTableSeeder extends Seeder
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


        
        DB::table("markets")->insert(
            [
                "market" => 'USA',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'FRANCE',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'UK',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'GERMANY',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'ITALY',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'MIDDLE EAST',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'RUSSIA',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'CHINA & PORTUGAL',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'WORLD',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("markets")->insert(
            [
                "market" => 'EUROPE',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        //$id = DB::table('markets')->where('market', 'market_'.$i.'.'.$i.'_name')->first();


        // translations

        // foreach ($languagesList as $key => $lang) 
        // {
        //     // market name


        //     DB::table('ltm_translations')->insert([

        //         'status' => 0,
        //         'locale' => $lang,
        //         'group' => 'market_'.$id->id,
        //         'key' => $id->id.'_name',
        //         'value' => $id->id.'Market: inde the night'.$i,
        //         "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
        //         "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        //     ]);


        //     $this->manager->exportTranslations('market_'.$id->id);
        // }
        
    }
}
