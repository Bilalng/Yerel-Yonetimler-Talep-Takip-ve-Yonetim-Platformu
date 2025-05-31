<?php

namespace App\Filament\Resources\TaleplerResource\Pages;

use App\Filament\Resources\TaleplerResource;
use App\Models\Complaint;
use App\Models\VerifytheComplaint;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use App\Models\Service;
use Illuminate\Database\Eloquent\Model;


class EditTalepler extends EditRecord
{
    protected static string $resource = TaleplerResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function handleRecordUpdate(Model $record, array $data): Model
    {
        $record->update($data);

        if (isset($data['complated_photo']) && $data['complated_photo'] instanceof UploadedFile) {
            $path = $data['complated_photo']->store('completed_photos', 'public');
            $data['complated_photo'] = $path;
        }

        if (isset($data['status_id']) && in_array($data['status_id'], [4, 5])) {
            VerifytheComplaint::create([
                'complaint_id' => $record->id,
                'reason_for_refuse' => $data['rejection_reason'] ?? null,
                'reason_for_verify' => $data['completion_note'] ?? null,
                'complated_photo' => $data['complated_photo'] ?? null,
            ]);
        }

        return $record;
    }


    protected function afterDelete(): void
    {
        $serviceId = $this->record->service_id;
        if ($serviceId) {
            Service::where('id', $serviceId)->decrement('count');
        }
    }

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
