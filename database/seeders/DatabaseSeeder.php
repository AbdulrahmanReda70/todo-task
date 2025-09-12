<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create some test users
        User::factory(5)->create();

        // Create a specific test user
        User::factory()->create([
            'email' => 'test@example.com',
        ]);

        // Seed tasks for all users
        $this->call([
            TaskSeeder::class,
        ]);
    }
}
