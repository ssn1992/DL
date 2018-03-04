<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsCandidatesLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs_candidates_languages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_candidate')->unsigned();
            $table->foreign('id_candidate')->references('id')->on('jobs_candidates');
            $table->string('language');
            $table->string('level');
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
        Schema::dropIfExists('jobs_candidates_languages');
    }
}
