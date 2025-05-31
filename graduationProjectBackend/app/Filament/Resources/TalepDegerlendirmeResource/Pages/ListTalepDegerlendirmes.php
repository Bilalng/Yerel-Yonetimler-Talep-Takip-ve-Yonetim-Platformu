<?php

namespace App\Filament\Resources\TalepDegerlendirmeResource\Pages;

use App\Filament\Resources\TalepDegerlendirmeResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTalepDegerlendirmes extends ListRecords
{
    protected static string $resource = TalepDegerlendirmeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
