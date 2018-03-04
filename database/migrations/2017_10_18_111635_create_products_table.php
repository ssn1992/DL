<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_category')->unsigned();
            $table->foreign('id_category')->references('id')->on('products_category');
            $table->string('name');
            $table->string('description');
            $table->string('weight');
            $table->string('pdf');
            $table->string('model')->nullable();
            $table->string('dimensions');
            $table->string('price_ww');
            $table->string('stock_ww');
            $table->string('price_usa');
            $table->string('stock_usa');
            $table->string('title_seo');
            $table->string('desc_seo');
            $table->string('keywords_seo');
            $table->string('video_url');
            $table->string('bulbs');
            $table->integer('position');
            $table->boolean('visible');
            $table->boolean('ul_certificate');
            $table->boolean('new');
            $table->boolean('contract');
            $table->integer('page_views')->default(0);
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
        Schema::dropIfExists('products');
    }
}
