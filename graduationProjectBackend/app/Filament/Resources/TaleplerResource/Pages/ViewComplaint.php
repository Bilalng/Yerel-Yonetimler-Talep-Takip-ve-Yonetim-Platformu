<?php

namespace App\Filament\Resources\TaleplerResource\Pages;

use App\Filament\Resources\TaleplerResource;
use Filament\Actions;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\Tabs;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\ViewRecord;
use Filament\Support\Enums\Alignment;

class ViewComplaint extends ViewRecord
{
    protected static string $resource = TaleplerResource::class;

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            Tabs::make('Test1')
            ->tabs([
                Tabs\Tab::make('Başlık Ve Açıklama')
                    ->icon('heroicon-m-bell')
                    ->schema([
                        TextEntry::make('title')
                            ->label('Başlık'),

                        TextEntry::make('description')
                            ->label('Açıklama'),
                    ])
                    ->columns(2)
                    ->icon('lucide-info'),

                Tabs\Tab::make('Birim ve Fotoğraf')
                    ->icon('heroicon-m-bell')
                    ->schema([
                        TextEntry::make('service.title')
                            ->label('Birim'),
                        ImageEntry::make('photo')
                            ->simpleLightbox(fn($record) => $record?->image ?? "http://127.0.0.1:8000/storage/01JSCEJXZEPXC4M1TMG2WWPMS6.png", defaultDisplayUrl: true)
                            ->label('Yüklenen Fotoğraf')
                            ->size(400)
                            ->alignment(Alignment::Center),
                    ])
                    ->columns(2)
                    ->icon('lucide-info')
            ]),
        ])
            ->columns(1);
    }
}
