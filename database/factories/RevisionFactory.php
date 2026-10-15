<?php

namespace Database\Factories;

use App\Models\Revision;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Revision>
 */
class RevisionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'entity' => fake()->randomElement(['page', 'product', 'content_collection', 'site_setting']),
            'entity_id' => (string) fake()->randomNumber(),
            'action' => fake()->randomElement(['draft_saved', 'published', 'approved']),
            'user_id' => User::factory(),
        ];
    }
}
