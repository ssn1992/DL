<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopbyroomTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopbyroom_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_shopbyroom')->unsigned();
            $table->foreign('id_shopbyroom')->references('id')->on('shopbyroom');
            $table->integer('id_product')->unsigned();
            $table->foreign('id_product')->references('id')->on('products');
            $table->string('tag_x');
            $table->string('tag_y');
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
        Schema::dropIfExists('shopbyroom_tags');
    }
}
