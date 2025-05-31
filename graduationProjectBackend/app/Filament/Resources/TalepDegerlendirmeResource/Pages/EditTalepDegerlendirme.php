<?php

namespace App\Filament\Resources\TalepDegerlendirmeResource\Pages;

use App\Filament\Resources\TalepDegerlendirmeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTalepDegerlendirme extends EditRecord
{
    protected static string $resource = TalepDegerlendirmeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
