<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SiteSetting::query()->updateOrCreate(
            ['id' => 'site'],
            [
                'catalog_url' => 'https://e-catalog.asietex.web.id',
                'catalog_on' => true,
                'catalog_label_en' => 'Explore e-catalog',
                'catalog_label_id' => 'Buka e-catalog',
                'catalog_label_pt' => 'Ver e-catalog',
                'catalog_placements' => ['home', 'product', 'footer'],
                'catalog_open_new_tab' => true,
                'draft' => null,
            ],
        );
    }
}
