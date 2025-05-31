<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Spatie\Permission\Models\Role;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Termwind\Components\Dd;
use App\Models\User;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function handleRecordUpdate(User|Model $record, array $data): User
    {
        $record->update($data);
        $role = Role::findOrFail($data['roles']);
        $record->syncRoles($role->name);
        $this->redirect($this->previousUrl ?? request()->header('Referer'));
        return $record;
    }
}
