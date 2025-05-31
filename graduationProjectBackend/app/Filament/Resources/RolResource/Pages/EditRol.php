<?php

namespace App\Filament\Resources\RolResource\Pages;

use App\Filament\Resources\RolResource;
use Spatie\Permission\Models\Role;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;


class EditRol extends EditRecord
{
    protected static string $resource = RolResource::class;

    protected function handleRecordUpdate(Role|Model $record, array $data): Role
    {
        $record->update($data);
        $permissionIds = array_map('intval', $data['permission']);
        $record->givePermissionTo($permissionIds);
        $this->redirect($this->previousUrl ?? request()->header('Referer'));
        return $record;
    }

}
