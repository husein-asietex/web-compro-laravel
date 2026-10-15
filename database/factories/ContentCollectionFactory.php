<?php

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\ContentCollection;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContentCollection>
 */
class ContentCollectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'key' => fake()->unique()->slug(2),
            'data' => [],
            'draft' => null,
            'status' => ContentStatus::Draft,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => ['status' => ContentStatus::Published]);
    }
}
