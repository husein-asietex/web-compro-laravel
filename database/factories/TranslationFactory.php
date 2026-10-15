<?php

namespace Database\Factories;

use App\Models\Page;
use App\Models\Product;
use App\Models\Translation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Translation>
 */
class TranslationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'locale' => fake()->randomElement(['en', 'id', 'pt']),
            'title' => fake()->sentence(4),
            'body' => fake()->paragraphs(2, true),
            'capacity' => null,
            'products' => null,
            'machinery' => null,
            'page_id' => Page::factory(),
            'product_id' => null,
        ];
    }

    public function forProduct(?Product $product = null): static
    {
        return $this->state(fn (array $attributes) => [
            'page_id' => null,
            'product_id' => $product?->getKey() ?? Product::factory(),
        ]);
    }
}
