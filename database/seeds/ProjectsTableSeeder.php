<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class ProjectsTableSeeder extends Seeder
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


    	for($i=1;$i<5;$i++)
    	{
    		DB::table("projects")->insert([
            
	            "name" => 'project_'.$i.'.'.$i.'_name',
	            "subTitle" => 'project_'.$i.'.'.$i.'_subTitle',
	            "details" => 'project_'.$i.'.'.$i.'_details',
	            'position' => $i,
	            'pdf' => 'mediaSeeds/pdfs/xpto.pdf',
	            'autor' => 'Project Author'.$i,
	            'location' => 'Project Location'.$i,
	            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	            
	        ]);

            $id = DB::table("projects")->where('autor', 'Project Author'.$i)->first();

	        DB::table('projects_gallery')->insert([
	        	
	        		'id_project' => $id->id,
	        		'img' => 'mediaSeeds/images/'.$i.'.jpg',
	        		'alt' => 'project_'.$id->id.'.'.$id->id.'_altImage',
	        		'position' => '0',
	        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            	"updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	        	
	        ]);

	   
	        DB::table('projects_gallery_hr')->insert([
	        	
	        		'id_project' => $id->id,
	        		'img' => 'mediaSeeds/images/xpto.jpg',
	        		'alt' => 'project_'.$id->id.'.'.$id->id.'_altImageHr',
	        		'position' => 0,
	        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            	"updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	        	
	        ]);


	        // translations

            foreach ($languagesList as $key => $lang)
            {
                // name


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'project_'.$id->id,
                    'key' => $id->id.'_name',
                    'value' => 'Project Name'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // subtitle

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'project_'.$id->id,
                    'key' => $id->id.'_subTitle',
                    'value' => 'Project Sub Title'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // details 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'project_'.$id->id,
                    'key' => $id->id.'_details',
                    'value' => 'Project Details'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'project_'.$id->id,
                    'key' => $id->id.'_altImage',
                    'value' => 'Project alt image'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // alt HR

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'project_'.$id->id,
                    'key' => $id->id.'_altImageHr',
                    'value' => 'Project alt image hr'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('project_'.$id->id);

            }
    	}
        
    }
}
