<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SiteSetting>
 */
class SiteSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->slug(1),
            'catalog_url' => 'https://e-catalog.asietex.web.id',
            'catalog_on' => true,
            'catalog_label_en' => 'Explore e-catalog',
            'catalog_label_id' => 'Buka e-catalog',
            'catalog_label_pt' => 'Ver e-catalog',
            'catalog_placements' => ['home', 'product', 'footer'],
            'catalog_open_new_tab' => true,
            'draft' => null,
        ];
    }
}
