<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@asietex.test'],
            [
                'name' => 'Asietex Admin',
                'password' => Hash::make('password'),
                'role' => Role::Admin,
                'active' => true,
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'staff@asietex.test'],
            [
                'name' => 'Asietex Staff',
                'password' => Hash::make('password'),
                'role' => Role::Staff,
                'active' => true,
                'email_verified_at' => now(),
            ],
        );
    }
}
