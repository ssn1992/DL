<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsResponsesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs_responses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_offer')->unsigned();
            $table->foreign('id_offer')->references('id')->on('jobs_offer');
            $table->integer('id_candidate')->references('id')->on('jobs_candidates');
            $table->string('status');
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
        Schema::dropIfExists('jobs_responses');
    }
}
