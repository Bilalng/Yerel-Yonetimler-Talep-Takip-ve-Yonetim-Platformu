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
        Schema::create('verifythecomplaint', function (Blueprint $table) {
            $table->id();
            $table->foreignId('complaint_id')->references('id')->on('complaint')->onDelete('cascade');
            $table->string('reason_for_refuse')->nullable();
            $table->string('reason_for_verify')->nullable();
            $table->string('complated_photo')->nullable();
            $table->float('satisfaction')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verifythecomplaint');
    }
};
