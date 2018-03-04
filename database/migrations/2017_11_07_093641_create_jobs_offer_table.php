<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsOfferTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs_offer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_category')->unsigned();
            $table->foreign('id_category')->references('id')->on('jobs_category');
            $table->integer('id_location')->unsigned();
            $table->foreign('id_location')->references('id')->on('jobs_location');
            $table->integer('id_department')->unsigned();
            $table->foreign('id_department')->references('id')->on('jobs_department');
            $table->string('title');
            $table->string('subTitle');
            $table->string('description');
            $table->string('responsabilities');
            $table->string('requirements');
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
        Schema::dropIfExists('jobs_offer');
    }
}
