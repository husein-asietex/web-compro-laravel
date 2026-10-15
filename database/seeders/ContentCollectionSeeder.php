<?php

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\ContentCollection;
use Illuminate\Database\Seeder;

class ContentCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collections = [
            'about-company' => ['items' => [['title' => 'Our company', 'description' => 'Dummy company profile content.']]],
            'home-social-proof' => ['items' => [['label' => 'Markets served', 'value' => '10+']]],
            'career-openings' => ['items' => [['title' => 'Sample position', 'location' => 'Indonesia']]],
            'marketing-contacts' => ['items' => [['name' => 'Sample contact', 'email' => 'marketing@example.com']]],
        ];

        foreach ($collections as $key => $data) {
            ContentCollection::query()->updateOrCreate(
                ['key' => $key],
                ['data' => $data, 'draft' => null, 'status' => ContentStatus::Published],
            );
        }
    }
}
