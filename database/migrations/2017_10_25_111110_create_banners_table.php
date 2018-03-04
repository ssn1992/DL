<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_category')->unsigned()->nullable();
            $table->foreign('id_category')->references('id')->on('products_category');
            $table->integer('id_page')->unsigned()->nullable();
            $table->foreign('id_page')->references('id')->on('pages');
            $table->string('title');
            $table->string('details');
            $table->dateTime('begin_date');
            $table->dateTime('end_date');
            $table->string('img');
            $table->string('alt');
            $table->string('btn_text');
            $table->string('btn_link');
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
        Schema::dropIfExists('banners');
    }
}
