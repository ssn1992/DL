<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $this->call(UsersTableSeeder::class);
        $this->call(UsersTypeTableSeeder::class);
        $this->call(MarketsTableSeeder::class);
        $this->call(DepartmentsTableSeeder::class);
        $this->call(ComponentsTableSeeder::class);
        $this->call(SeoTableSeeder::class);
        $this->call(PagesTableSeeder::class);
        $this->call(ProductsCategoryTableSeeder::class);

        
        /*
        $this->call(EbooksTableSeeder::class);
        $this->call(ProjectsTableSeeder::class);
        $this->call(SlidersTableSeeder::class);
        $this->call(VideoCatTableSeeder::class);
        $this->call(BannersTableSeeder::class);
        $this->call(ProductsTableSeeder::class);
        $this->call(BannersTableSeeder::class);
        $this->call(ContactsTableSeeder::class);
        $this->call(ContactsMarketsTableSeeder::class);
        $this->call(ProductsRelatedTableSeeder::class);
        $this->call(ProjectsProductsTableSeeder::class);
        $this->call(ProjectsRelatedTableSeeder::class);
        $this->call(PressReleasesTableSeeder::class);
        $this->call(PressClippingTableSeeder::class);
        $this->call(EventsTableSeeder::class);
        $this->call(LinkGenerateTableSeeder::class);
        $this->call(CatalogueTableSeeder::class);
        $this->call(ShopbyroomTableSeeder::class);
        $this->call(JobsTableSeeder::class);
        $this->call(MaterialsTableSeeder::class);*/

        
    }
}
