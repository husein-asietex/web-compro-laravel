<?php

use App\Enums\ContentStatus;
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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('status')->default(ContentStatus::Draft->value);
            $table->json('draft')->nullable();
            $table->timestamps();

            $table->index(['status', 'updated_at']);
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->unique();
            $table->string('capacity', 500)->nullable();
            $table->json('products');
            $table->text('machinery')->nullable();
            $table->text('video_en')->nullable();
            $table->text('video_id')->nullable();
            $table->text('video_pt')->nullable();
            $table->json('gallery');
            $table->string('status')->default(ContentStatus::Draft->value);
            $table->json('draft')->nullable();
            $table->timestamps();

            $table->index(['status', 'sort_order']);
        });

        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 2);
            $table->text('title');
            $table->text('body');
            $table->string('capacity', 500)->nullable();
            $table->json('products')->nullable();
            $table->text('machinery')->nullable();
            $table->foreignId('page_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['page_id', 'locale']);
            $table->unique(['product_id', 'locale']);
        });

        Schema::create('content_collections', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->json('data');
            $table->json('draft')->nullable();
            $table->string('status')->default(ContentStatus::Draft->value);
            $table->timestamps();

            $table->index(['status', 'updated_at']);
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('catalog_url')->default('https://e-catalog.asietex.web.id');
            $table->boolean('catalog_on')->default(true);
            $table->string('catalog_label_en')->default('Explore e-catalog');
            $table->string('catalog_label_id')->default('Buka e-catalog');
            $table->string('catalog_label_pt')->default('Ver e-catalog');
            $table->json('catalog_placements');
            $table->boolean('catalog_open_new_tab')->default(true);
            $table->json('draft')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::dropIfExists('content_collections');
        Schema::dropIfExists('translations');
        Schema::dropIfExists('products');
        Schema::dropIfExists('pages');
    }
};
