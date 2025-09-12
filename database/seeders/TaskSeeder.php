<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $users = User::factory(3)->create();
        }

        // Create tasks for each user
        $users->each(function ($user) {
            // Create 5-10 random tasks per user
            Task::factory()
                ->count(fake()->numberBetween(5, 10))
                ->for($user)
                ->create();

            // Create some specific task examples
            Task::factory()->for($user)->completed()->create([
                'title' => 'Complete project documentation',
                'description' => 'Write comprehensive documentation for the todo app project.',
            ]);

            Task::factory()->for($user)->pending()->create([
                'title' => 'Review code changes',
                'description' => 'Review and test the latest code changes before deployment.',
            ]);

            Task::factory()->for($user)->inProgress()->create([
                'title' => 'Implement new features',
                'description' => 'Add new functionality to the application based on user feedback.',
            ]);
        });
    }
}
