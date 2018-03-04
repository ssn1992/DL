<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;


class ContactsMarketsTableSeeder extends Seeder
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
            DB::table("contacts_markets")->insert(
                [
                	"id_market" => $i,
                	"id_contact" => $i,
                    "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
                    "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
                ]
            );
        }
    }
}
