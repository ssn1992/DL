<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class EbooksTableSeeder extends Seeder
{
    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
    }
    /**
     * Run the database seeds.
     *
     * @return voi
     */
    public function run()
    {

        $languagesList = ['en','fr', 'de', 'ru', 'it'];


        for($i=1;$i<=5;$i++)
        {
            DB::table("ebooks")->insert(
                [
                    "name" => 'ebook_'.$i.'.'.$i.'_name',
                    "details" => 'ebook_'.$i.'.'.$i.'_details',
                    'img' => 'mediaSeeds/ebooks/ebook_'.$i.'.png',
                    'alt' => 'ebook_'.$i.'.'.$i.'_alt',
                    'pdf' => 'mediaSeeds/pdfs/Products.pdf',
                    'position' => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );


            $id = DB::table('ebooks')->where('pdf', 'mediaSeeds/pdfs/Products.pdf')->where('position', $i)->first();


            // translations

            foreach ($languagesList as $key => $lang) 
            {
                // name ebook


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'ebook_'.$id->id,
                    'key' => $id->id.'_name',
                    'value' => $id->id.' The Best Dining Room Chandelier ieas',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // details ebook

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'ebook_'.$id->id,
                    'key' => $id->id.'_details',
                    'value' => '<strong>'.$id->id.' Delightfull,</strong> brings you a collection of the best Dining Room ieas collected in a complete ebook with all the information you might need! Download it now and get to know all our pieces like the  <strong> Amy Chandelier </strong> or the <strong>Galliano Chandelier.</strong>',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // alt ebook

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'ebook_'.$id->id,
                    'key' => $id->id.'_alt',
                    'value' => 'alt test '.$id->id,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('ebook_'.$id->id);
            }
        }

        
        
    }
}
