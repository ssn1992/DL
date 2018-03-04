<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobsCandidatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs_candidates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->string('city');
            $table->string('postCode');
            $table->string('country');
            $table->string('state')->nullable();
            $table->string('gender');
            $table->dateTime('birthdate');
            $table->string('nacionality');
            $table->string('academicDegree');
            $table->string('workExp');
            $table->string('currentCompany')->nullable();
            $table->string('currentSector')->nullable();
            $table->string('currentRole')->nullable();
            $table->dateTime('currentStartDate')->nullable();
            $table->string('prevCompany')->nullable();
            $table->string('prevSector')->nullable();
            $table->string('prevRole')->nullable();
            $table->dateTime('prevStartDate')->nullable();
            $table->dateTime('prevEndDate')->nullable();
            $table->string('driveLicense');
            $table->string('travel');
            $table->string('cv');
            $table->string('school');
            $table->string('linkdin');
            $table->string('portfolioLink')->nullable();
            $table->string('portfolioFile')->nullable();
            $table->string('photo')->nullable();
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
        Schema::dropIfExists('jobs_candidates');
    }
}
