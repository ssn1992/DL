<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopbyroomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopbyroom', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_division')->unsigned();
            $table->foreign('id_division')->references('id')->on('shopbyroom_divisions');
            $table->string('name');
            $table->string('img');
            $table->string('alt');
            $table->integer('position');
            $table->boolean('visible');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopbyroom');
    }
}
