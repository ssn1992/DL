<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;


class JobsTableSeeder extends Seeder
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

        DB::table("jobs_category")->insert([
                
            "category" => 'jobs_category_1.1_category',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        DB::table("jobs_category")->insert([
                
            "category" => 'jobs_category_2.2_category',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        DB::table("jobs_location")->insert([
                
            "location" => 'Porto',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        DB::table("jobs_location")->insert([
                
            "location" => 'Lisbon',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        DB::table("jobs_department")->insert([
                
            "department" => 'jobs_department_1.1_department',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        DB::table("jobs_department")->insert([
                
            "department" => 'jobs_department_2.2_department',                   
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
        ]);

        for($i=1;$i<=2;$i++)
        {
            

            DB::table("jobs_offer")->insert([
                
                    "id_category" => $i,
                    'id_location' => $i,
                    'id_department' => $i,
                    'title' => 'jobs_offer_'.$i.'.'.$i.'_title',
                    'subTitle' => 'jobs_offer_'.$i.'.'.$i.'_subTitle',
                    'description' => 'jobs_offer_'.$i.'.'.$i.'_description',
                    'responsabilities' => 'jobs_offer_'.$i.'.'.$i.'_responsabilities',
                    'requirements' => 'jobs_offer_'.$i.'.'.$i.'_requirements',
                    'visible' => 1,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
            ]);


            DB::table("jobs_candidates")->insert([
                
                    'firstName' => 'teste first Name',
                    'lastName' => 'teste last Name',
                    'email' => 'teste_'.$i.'@teste.com',
                    'phone' => '+351123321123',
                    'address' => 'address teste location',
                    'city' => 'rebilhães',
                    'postCode' => '3211-132',
                    'country' => 'United States',
                    'state' => 'California',
                    'gender' => 'male',
                    'birthdate' => Carbon::now()->format('Y-m-d H:i:s'),
                    'nacionality' => 'tugalife',
                    'academicDegree' => 'master',
                    'workExp' => 'yes',
                    'currentCompany' => 'teste current company',
                    'currentSector' => 'carnes',
                    'currentRole' => 'boss',
                    'currentStartDate' => Carbon::now()->format('Y-m-d H:i:s'),
                    'prevCompany' => 'teste prev company',
                    'prevSector' => 'pastelaria',
                    'prevRole' => 'boss',
                    'prevStartDate' => Carbon::now()->format('Y-m-d H:i:s'),
                    'prevEndDate' => Carbon::now()->format('Y-m-d H:i:s'),
                    'driveLicense' => 'yes',
                    'travel' => 'yes',
                    'cv' => 'mediaSeeds/pdfs/xpto.pdf',
                    'school' => 'life school',
                    'linkdin' => 'example/xpto',
                    'portfolioLink' => 'example/xpto',
                    'portfolioFile' => 'mediaSeeds/pdfs/xpto.pdf',
                    'photo' => 'mediaSeeds/candidate_'.$i.'/photo.png',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                
            ]);


            for($j=1;$j<=2;$j++)
        	{


	            DB::table("jobs_responses")->insert([
	                
	                    "id_offer" => $i,
	                    'id_candidate' => $j,
	                    'status' => 'waiting',
	                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	                
	            ]);

          	}

            // translations

            foreach ($languagesList as $key => $lang) 
            {
                // category 


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_category_'.$i,
                    'key' => $i.'_category',
                    'value' => $i.' Category '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('jobs_category_'.$i);

                // department 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_department_'.$i,
                    'key' => $i.'_department',
                    'value' => 'name department '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('jobs_department_'.$i);

                // offer title 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_offer_'.$i,
                    'key' => $i.'_title',
                    'value' => 'title teste '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // offer subTitle 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_offer_'.$i,
                    'key' => $i.'_subTitle',
                    'value' => 'subTitle teste '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // offer description 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_offer_'.$i,
                    'key' => $i.'_description',
                    'value' => 'description teste '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // offer responsabilities 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_offer_'.$i,
                    'key' => $i.'_responsabilities',
                    'value' => 'responsabilities teste '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // offer requirements 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'jobs_offer_'.$i,
                    'key' => $i.'_requirements',
                    'value' => 'requirements teste '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                $this->manager->exportTranslations('jobs_offer_'.$i);
            }


        }
    }
}
