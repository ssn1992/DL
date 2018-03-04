<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ContactsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=1;$i<=5;$i++)
        {
            DB::table("contacts")->insert(
                [
                	"id_dep" => $i,
                    "name" => 'teste name '.$i,
                    "email" => 'teste email '.$i,
                    "skype" => 'teste skype '.$i,
                    "phone" => 'teste phone '.$i,
                    'img' => 'mediaSeeds/contacts/contact_'.$i.'.png',
                    'alt' => 'contact teste',
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
