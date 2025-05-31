<?php

namespace App\Filament\Resources\TaleplerResource\Pages;

use App\Filament\Resources\TaleplerResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Complaint;
class ListTaleplers extends ListRecords
{
    protected static string $resource = TaleplerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
    protected function getTableQuery(): Builder
    {
        if(auth()->user()->hasRole('admin')){
            return Complaint::query();
        }
        if (auth()->user()->hasRole('Vatandaş')) {
            return Complaint::query()->where('user_id', auth()->id());
        }

        return Complaint::query()->whereHas('service', function ($query) {
            $query->where('role_id', auth()->user()->roles->first()->id);
        });
    }


    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }

}
