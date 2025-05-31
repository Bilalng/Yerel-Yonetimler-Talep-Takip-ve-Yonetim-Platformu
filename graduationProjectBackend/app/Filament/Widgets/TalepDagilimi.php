<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Service;
use Filament\Support\RawJs;


class TalepDagilimi extends ChartWidget
{
    protected static ?string $heading = 'Taleplerin Birimlere Dağılımı';

    protected static bool $isDiscovered = false;

    protected function getData(): array
    {
        $unitLabels = [];
        $unitCounts = [];

        $services = Service::withCount('complaint')->get();

        foreach ($services as $service) {
            $unitLabels[] = $service->title;
            $unitCounts[] = $service->count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Şikayet Sayısı',
                    'data' => $unitCounts,
                    'maxBarThickness' => 60,
                    'minBarLength' => 1,
                ],
            ],
            'labels' => $unitLabels,
        ];
    }
    protected function getType(): string
    {
        return 'bar';
    }

}
