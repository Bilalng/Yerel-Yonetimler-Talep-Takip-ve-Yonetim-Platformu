<?php

namespace Database\Factories;
use Faker\Generator as Faker;

use App\Models\Service;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complaint>
 */
class ComplaintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create('tr_TR');

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'service_id' => Service::inRandomOrder()->first()?->id,
            'status_id' => Status::inRandomOrder()->first()?->id,
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(2),
            'photo' => fake()->image('public/storage/images', 640, 480, null, false),
            'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}
