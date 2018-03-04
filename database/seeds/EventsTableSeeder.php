<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;



class EventsTableSeeder extends Seeder
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
            DB::table("events")->insert(
                [
                    "title" => 'event_'.$i.'.'.$i.'_title',
                    "subTitle" => 'event_'.$i.'.'.$i.'_subTitle',
                    'text' => 'event_'.$i.'.'.$i.'_text',
                    'img' => 'mediaSeeds/events/event_'.$i.'.png',
                    'alt' => 'event_'.$i.'.'.$i.'_alt',
                    'started' => Carbon::now()->format('Y-m-d H:i:s'),
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('events')->where('title', 'event_'.$i.'.'.$i.'_title')->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {
                // title event


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'event_'.$id->id,
                    'key' => $id->id.'_title',
                    'value' => $id->id.' The Best Dining Room Chandelier ieas',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // subTitle event

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'event_'.$id->id,
                    'key' => $id->id.'_subTitle',
                    'value' => 'subTitle '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // text event

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'event_'.$id->id,
                    'key' => $id->id.'_text',
                    'value' => '<strong>'.$id->id.' Delightfull,</strong> brings you a collection of the best Dining Room ieas collected in a complete ebook with all the information you might need! Download it now and get to know all our pieces like the  <strong> Amy Chandelier </strong> or the <strong>Galliano Chandelier.</strong>',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // alt event

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'event_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test '.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('event_'.$id->id);
            }
        }
    }
}
