<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsMarketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts_markets', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_market')->unsigned();
            $table->foreign('id_market')->references('id')->on('markets');
            $table->integer('id_contact')->unsigned();
            $table->foreign('id_contact')->references('id')->on('contacts');
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
        Schema::dropIfExists('contacts_markets');
    }
}
