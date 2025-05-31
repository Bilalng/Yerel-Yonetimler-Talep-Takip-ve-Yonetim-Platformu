<?php

namespace App\Filament\Resources\ServiceResource\Pages;

use App\Filament\Resources\ServiceResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Spatie\Permission\Models\Role;
use App\Models\Service;

class CreateService extends CreateRecord
{
    protected static string $resource = ServiceResource::class;

    protected function handleRecordCreation(array $data): Service
    {
        if (!isset($data['role_id'])) {
            $role = Role::firstOrCreate(['name' => $data['title']]);

            $createdService = Service::create([
               'title' => $data['title'],
               'role_id' => $role->id,
            ]);
        }
        return $createdService;
    }
    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

}
