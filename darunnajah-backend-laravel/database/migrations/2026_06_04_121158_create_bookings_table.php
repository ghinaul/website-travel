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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');    // Nama pemesan
            $table->string('email');            // Email pemesan
            $table->string('whatsapp_number');   // No WhatsApp
            $table->string('service_package');   // Paket travel yang dipilih
            $table->string('status')->default('pending'); // Status otomatis pending
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
