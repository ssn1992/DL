<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;



class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            [
            "email" => 'admin@admin.pt',
            "name" => 'Admin',
            "password"=>bcrypt("1q1q1q"),
            "remember_token" => null,
            "id_type" => 1,
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
            "updated_at" => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
        $id = DB::table("users")->where("email","admin@admin.pt")->first();

        DB::table("roles")->insert([
            [
            "name"=>"Admin",
            "guard_name"=>"web",
            ]
        ]);
        $id_role = DB::table("roles")->where("name","admin")->first();

        DB::table("permissions")->insert([
            [
            "name"=>"Administer roles & permissions",
            "guard_name"=>"web",
            ]
        ]);

        $id_permission = DB::table("permissions")->where("name","Administer roles & permissions")->first();

        DB::table("role_has_permissions")->insert(
            [
                "permission_id"=>$id_permission->id,
                "role_id"=>$id_role->id,
            ]
        );

        DB::table("model_has_roles")->insert(
            [
                "role_id"=>$id_role->id,
                "model_id"=>$id->id,
                "model_type"=>"App\Models\User"
            ]
        );

        DB::table("model_has_permissions")->insert(
            [
                "permission_id"=>$id_permission->id,
                "model_id"=>$id->id,
                "model_type"=>"App\Models\Role"
            ]
        );
    }
}
