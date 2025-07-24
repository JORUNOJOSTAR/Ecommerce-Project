<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->string('first_name', 45);
            $table->string('last_name', 45);
            $table->string('email', 45);
            $table->string('phone', 45);
            $table->string('address1', 45);
            $table->string('address2', 45)->nullable();
            $table->string('city', 45);
            $table->string('state', 45);
            $table->string('zipcode', 45);
            $table->string('country_code', 45);
            $table->timestamps();
            
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('country_code')->references('code')->on('countries');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
