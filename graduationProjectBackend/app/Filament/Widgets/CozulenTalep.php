<?php

namespace App\Filament\Widgets;

use App\Models\Complaint;
use Filament\Widgets\ChartWidget;

class CozulenTalep extends ChartWidget
{
    protected static ?string $heading = 'Aylık Çözülen Talep Sayısı';

    protected static bool $isDiscovered = false;


    protected function getData(): array
    {
        $data = [];

        $solvedComplaints = Complaint::where('status_id', 4)
            ->selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('count', 'month');

        for ($i = 1; $i <= 12; $i++) {
            $data[] = $solvedComplaints[$i] ?? 0;
        }
        return [
            'datasets' => [
                [
                    'label' => 'Aylık Çözülen Talep Sayısı',
                    'data' => $data,
                ],
            ],
            'labels' => ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
