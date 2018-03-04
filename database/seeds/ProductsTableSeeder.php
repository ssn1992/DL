<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Translations;
use Barryvdh\TranslationManager\Manager;

class ProductsTableSeeder extends Seeder
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
        	DB::table('products')->insert([
        		'id_category' => $i,
        		'name' => 'product_'.$i.'.'.$i.'_name',
        		'description' => 'product_'.$i.'.'.$i.'_description',
        		'weight' => '12 cm',
        		'pdf' => 'mediaSeeds/pdfs/xpto.pdf',
                'model' => 'mediaSeeds/models/xpto.obj',
        		'dimensions' => '123 12122',
        		'price_ww' => '1010',
        		'stock_ww' => '2',
        		'price_usa' => '2010',
        		'stock_usa' => '1',
        		'title_seo' => 'product_'.$i.'.'.$i.'_titleSeo',
        		'desc_seo' => 'product_'.$i.'.'.$i.'_descSeo',
        		'keywords_seo' => 'product_'.$i.'.'.$i.'_keywordsSeo',
        		'video_url' => 'v=IPfJnp1guPc',
        		'bulbs' => 'xxx',
        		'position' => $i,
        		'visible' => 1,
        		'ul_certificate' => 0,
        		'new' => 1,
        		'contract' => 0,
        		'page_views' => 0,
        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
        	]);
        

        	$id = DB::table("products")->where('name', 'product_'.$i.'.'.$i.'_name')->first();

	        DB::table('products_gallery')->insert([
	        	
	        		'id_product' => $id->id,
	        		'img' => 'mediaSeeds/images/'.$i.'.jpg',
	        		'alt' => 'product_'.$id->id.'.'.$id->id.'_altImage',
	        		'position' => $i,
	        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            	"updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	        	
	        ]);

	   
	        DB::table('products_gallery_hr')->insert([
	        	
	        		'id_product' => $id->id,
	        		'img' => 'mediaSeeds/images/xpto.jpg',
	        		'alt' => 'product_'.$id->id.'.'.$id->id.'_altImageHr',
	        		'position' => $i,
	        		"created_at" => Carbon::now()->format('Y-m-d H:i:s'),
	            	"updated_at" => Carbon::now()->format('Y-m-d H:i:s')
	        	
	        ]);

	   



            foreach ($languagesList as $key => $lang) 
            {
                // name 


                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_name',
                    'value' => 'Product Name'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // subtitle

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_description',
                    'value' => 'Product Description '.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                // title seo 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_titleSeo',
                    'value' => 'Product Title SEO'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                
                // desc seo 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_descSeo',
                    'value' => 'Product DESC SEO'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                
                // keywords seo 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_keywordsSeo',
                    'value' => 'Product Keywords SEO'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // alt 

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_altImage',
                    'value' => 'Product alt image'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);


                // alt HR

                DB::table('ltm_translations')->insert([

                    'status' => 0,
                    'locale' => $lang,
                    'group' => 'product_'.$id->id,
                    'key' => $id->id.'_altImageHr',
                    'value' => 'Product alt image hr'.$i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')

                ]);

                $this->manager->exportTranslations('product_'.$id->id);

            }
        }
    }
}
