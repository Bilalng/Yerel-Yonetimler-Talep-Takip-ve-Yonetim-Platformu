<?php

namespace App\Filament\Resources\TaleplerResource\Pages;

use App\Filament\Resources\TaleplerResource;
use App\Models\Complaint;
use App\Models\Service;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateTalepler extends CreateRecord
{
    protected static string $resource = TaleplerResource::class;


    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->id();

        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
