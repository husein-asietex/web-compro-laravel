<?php

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(),
            'sort_order' => fake()->unique()->numberBetween(1, 10000),
            'capacity' => fake()->sentence(3),
            'products' => [fake()->word()],
            'machinery' => fake()->sentence(),
            'video_en' => null,
            'video_id' => null,
            'video_pt' => null,
            'gallery' => [],
            'status' => ContentStatus::Draft,
            'draft' => null,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => ['status' => ContentStatus::Published]);
    }
}
