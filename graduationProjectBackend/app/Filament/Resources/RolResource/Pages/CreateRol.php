<?php

namespace App\Filament\Resources\RolResource\Pages;

use App\Filament\Resources\RolResource;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Filament\Resources\Pages\CreateRecord;

class CreateRol extends CreateRecord
{
    protected static string $resource = RolResource::class;

    protected function handleRecordCreation(array $data): Role
    {
        $created_role = Role::create([
            "name" => $data['name'],
        ]);
        $permissions = Permission::whereIn('id', $data['permission'])->get();

        $created_role->syncPermissions($permissions);
        return $created_role;
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
