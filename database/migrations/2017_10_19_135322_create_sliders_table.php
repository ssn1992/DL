<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sliders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_page')->unsigned();
            $table->foreign('id_page')->references('id')->on('pages');
            $table->string('title');
            $table->string('details');
            $table->dateTime('begin_date');
            $table->dateTime('end_date');
            $table->string('img');
            $table->string('alt');
            $table->string('btn_text')->nullable();
            $table->string('btn_link')->nullable();
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
        Schema::dropIfExists('sliders');
    }
}
