<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;


class UsersTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users_type")->insert([
            [
            "type" => 'Admin',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);

        DB::table("users_type")->insert([
            [
            "type" => 'Content',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);

        DB::table("users_type")->insert([
            [
            "type" => 'Press',
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
