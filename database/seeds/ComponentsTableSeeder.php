<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class ComponentsTableSeeder extends Seeder
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

        $components = ['Body', 'Shade', 'Base', 'Bulb Holder', 'Counterweight', 'Wire', 'Canopy', 'Top Cover'];

        $i =1;

        foreach ($components as $key => $component)
        {
        	DB::table("components")->insert(
	            [
	                "component" => 'component_'.$i.'.'.$i.'_name',
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
	                'group' => 'component_'.$i,
	                'key' => $i.'_name',
	                'value' => $component,
	                "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

	            ]);



	            $this->manager->exportTranslations('component_'.$i);
	        }

	        $i++;
        }
      


        
        
    }
}
