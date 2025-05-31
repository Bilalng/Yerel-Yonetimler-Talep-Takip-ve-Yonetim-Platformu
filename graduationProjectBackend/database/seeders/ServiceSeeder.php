<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;


class ServiceSeeder extends Seeder
{

    public function run(): void
    {
        $services = [
            ['title' => 'Fen İşleri Müdürlüğü', 'role_id' => 3],
            ['title' => 'Temizlik İşleri Müdürlüğü','role_id' => 4],
            ['title' => 'Zabıta Müdürlüğü','role_id' => 5],
            ['title' => 'Çevre Koruma ve Kontrol Müdürlüğü','role_id' => 6],
            ['title' => 'Sosyal Hizmetler Müdürlüğü','role_id' => 7],
            ['title' => 'Kültür ve Sosyal İşler Müdürlüğü','role_id' => 8],
            ['title' => 'Mali Hizmetler Müdürlüğü','role_id' => 9],
            ['title' => 'Park ve Bahçeler Müdürlüğü','role_id' => 10],
            ['title' => 'Sağlık İşleri Müdürlüğü','role_id' => 11],
            ['title' => 'Diğer', 'role_id' => 12],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
