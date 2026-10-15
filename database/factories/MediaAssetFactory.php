<?php

namespace Database\Factories;

use App\Models\MediaAsset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MediaAsset>
 */
class MediaAssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => fake()->imageUrl(),
            'alt_en' => fake()->sentence(),
            'alt_id' => fake()->sentence(),
            'alt_pt' => fake()->sentence(),
            'credit' => fake()->optional()->name(),
            'approved' => false,
            'page_id' => null,
            'product_id' => null,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => ['approved' => true]);
    }
}
