<?php

namespace App\Filament\Widgets;

use App\Models\Complaint;
use Filament\Widgets\ChartWidget;

class SolvedbyUnitComplaint extends ChartWidget
{
    protected static ?string $heading = 'Birimlere Göre Çözülen Talep Sayısı';
    protected static bool $isDiscovered = false;

    protected function getData(): array
    {
        $solvedComplaints = Complaint::where('status_id', 4)
            ->selectRaw('service_id, COUNT(*) as count')
            ->groupBy('service_id')
            ->with('service')
            ->get();

        $labels = [];
        $data = [];

        foreach ($solvedComplaints as $item) {
            $labels[] = $item->service?->title ?? 'Bilinmeyen Servis';
            $data[] = $item->count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Çözülen Talep Sayısı',
                    'data' => $data,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }


}
