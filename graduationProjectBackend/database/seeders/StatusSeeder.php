<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $status = [
            ['title' => 'Talebiniz Alındı'],
            ['title' => 'Talebiniz Onaylandı'],
            ['title' => 'Talebiniz İşlemde'],
            ['title' => 'Talebiniz Gerçekleştirildi'],
            ['title' => 'Talebiniz Reddedildi'],
        ];

        foreach($status as $value){
            Status::create($value);
        }
    }
}
