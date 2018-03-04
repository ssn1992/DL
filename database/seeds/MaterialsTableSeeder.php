<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;

class MaterialsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
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

        

        for($i =1; $i<=5; $i++)
        {

	    	DB::table("materials")->insert(
	            [
	                "material"   => 'material_'.$i.'.'.$i.'_name',
	                'img' 		 => 'temp',
	                'alt'		 => 'alt temp',
	                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	            ]
	        );

	        // translations

	        foreach ($languagesList as $key => $lang)
	        {

	            DB::table('ltm_translations')->insert([

	                'status' => 0,
	                'locale' => $lang,
	                'group' => 'material_'.$i,
	                'key' => $i.'_name',
	                'value' => 'material_'.$i,
	                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

	            ]);



	             DB::table('ltm_translations')->insert([

	                'status' => 0,
	                'locale' => $lang,
	                'group' => 'material_'.$i,
	                'key' => $i.'_alt',
	                'value' => 'Alt material_'.$i,
	                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

	            ]);



	            $this->manager->exportTranslations('material_'.$i);
	        }
        }

    }
   
}
