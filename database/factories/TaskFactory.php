<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(2),
            'status' => fake()->randomElement(['completed', 'pending', 'in-progress']),
            'due_date' => fake()->optional(0.7)->dateTimeBetween('now', '+30 days')?->format('Y-m-d'),
        ];
    }

    /**
     * Indicate that the task is completed.
     */
    public function completed(): static
    {
        return $this->state(fn() => [
            'status' => 'completed',
        ]);
    }

    /**
     * Indicate that the task is pending.
     */
    public function pending(): static
    {
        return $this->state(fn() => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that the task is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn() => [
            'status' => 'in-progress',
        ]);
    }
}
