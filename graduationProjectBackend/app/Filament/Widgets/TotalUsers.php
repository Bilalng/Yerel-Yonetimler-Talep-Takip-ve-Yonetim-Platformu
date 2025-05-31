<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;

class TotalUsers extends ChartWidget
{
    protected static ?string $heading = 'Aylık Kayıt oluşturan Kullanıcı Sayısı';

    protected static bool $isDiscovered = false;

    protected function getData(): array
    {
        $userCounts = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            $data[] = $userCounts[$i] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Aylık Kayıt Olan Kullanıcı Sayısı',
                    'data' => $data,
                ],
            ],
            'labels' => ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        ];

    }

    protected function getType(): string
    {
        return 'line';
    }



}
