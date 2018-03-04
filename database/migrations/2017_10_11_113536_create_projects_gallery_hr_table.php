<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsGalleryHrTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects_gallery_hr', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_project')->unsigned();
            $table->foreign('id_project')->references('id')->on('projects');
            $table->string('img');
            $table->string('alt');
            $table->integer('position');
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
        Schema::dropIfExists('projects_gallery_hr');
    }
}
