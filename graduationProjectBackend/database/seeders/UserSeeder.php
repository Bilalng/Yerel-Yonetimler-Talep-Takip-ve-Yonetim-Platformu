<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'tc' => '20933834978',
                'name' => 'admin',
                'surname' => 'admin',
                'email' => 'admin@gmail.com',
                'phone' => '05445738244',
                'password' => bcrypt('123456789'),
                'role' => 'admin',
            ],
            [
                'tc' => '12345678912',
                'name' => 'Bilal',
                'surname' => 'Gökşen',
                'email' => 'bilal@gmail.com',
                'phone' => '05425269985',
                'password' => bcrypt('123456789'),
                'role' => 'Vatandaş',
            ]
        ];

        foreach ($users as $user) {
            $created_user = User::create([
                'tc' => $user['tc'],
                "name" => $user["name"],
                "surname" => $user["surname"],
                "email" => $user["email"],
                "phone" => $user["phone"],
                "password" => $user["password"],
            ]);

            $created_user->assignRole($user['role']);
        }
    }
}
