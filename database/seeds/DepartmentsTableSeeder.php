<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;

class DepartmentsTableSeeder extends Seeder
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


        
        DB::table("contacts_dep")->insert(
            [
                "department" => 'CEO',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("contacts_dep")->insert(
            [
                "department" => 'COO',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("contacts_dep")->insert(
            [
                "department" => 'SALES DIRECTOR',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("contacts_dep")->insert(
            [
                "department" => 'PRESS',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("contacts_dep")->insert(
            [
                "department" => 'MARKETING',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );


        DB::table("contacts_dep")->insert(
            [
                "department" => 'CONTENT',
                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        );



        // $id = DB::table('contacts_dep')->where('department', 'dep_'.$i.'.'.$i.'_name')->first();


        // // translations

        // foreach ($languagesList as $key => $lang) 
        // {
        //     // department name


        //     DB::table('ltm_translations')->insert([

        //         'status' => 0,
        //         'locale' => $lang,
        //         'group' => 'dep_'.$id->id,
        //         'key' => $id->id.'_name',
        //         'value' => $id->id.'Department in the row yeaaa: '.$i,
        //         "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
        //         "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

        //     ]);


        //     $this->manager->exportTranslations('dep_'.$id->id);
        // }
        
    }
}
