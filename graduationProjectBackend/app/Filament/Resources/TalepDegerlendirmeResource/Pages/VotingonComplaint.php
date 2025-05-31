<?php

namespace App\Filament\Resources\TalepDegerlendirmeResource\Pages;

use App\Filament\Resources\TalepDegerlendirmeResource;
use Filament\Forms\Components\Radio;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Concerns\InteractsWithInfolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;
use Filament\Resources\Pages\Page;
use Filament\Support\Enums\Alignment;
use App\Models\Survey;
use Filament\Notifications\Notification;
use Filament\Forms\Components\Section as FormSection;


class VotingonComplaint extends Page implements HasForms
{
    use InteractsWithRecord;
    use InteractsWithInfolists;
    use InteractsWithForms;

    protected static string $resource = TalepDegerlendirmeResource::class;

    protected static ?string $navigationIcon = 'heroicon-o-check-circle';

    protected static string $view = 'filament.resources.talep-degerlendirme-resource.pages.votingon-complaint';

    public ?array $data = [];

    public function mount(int|string $record): void
    {

        $this->record = $this->resolveRecord($record);
        $this->data = ['feedback' => $this->record->answer];
    }

    public function getFormSchema(): array
    {
        return [
            FormSection::make('Anket')
            ->schema([
                Radio::make('feedback')
                    ->label('Bu işlem sizi memnun etti mi?')
                    ->options([
                        1 => 'İşlem Doğru',
                        0 => 'İşlem Hatalı',
                    ])
                    ->required(),
            ])->collapsible()
        ];
    }
    public function getProductInfoList(Infolist $infolist): Infolist
    {
        return $infolist
            ->record($this->record)
            ->schema([
                Section::make('Talep Bilgileri')
                    ->schema([
                        TextEntry::make('complaint.title')->label('Başlık'),
                        TextEntry::make('complaint.description')->label('Açıklama'),
                    ])
                    ->columns(2)
                    ->icon('lucide-info')
                    ->collapsible(),

                Section::make('Açıklama ve Fotoğraf')
                    ->schema([
                        TextEntry::make('reason_for_verify')->label('Doğrulama Nedeni'),
                        ImageEntry::make('complated_photo')
                            ->label('Fotoğraf')
                            ->simpleLightbox()
                            ->size(400)
                            ->alignment(Alignment::Center),
                    ])
                    ->columns(2)
                    ->icon('lucide-image')
                    ->collapsible(),
            ]);
    }

    public function submit(): void
    {
        $data = $this->form->getState();

        // Aynı kullanıcı daha önce bu şikayet için oy kullandı mı kontrolü
        $exists = Survey::where('user_id', auth()->id())
            ->where('complaint_id', $this->record->complaint_id)
            ->exists();

        if ($exists) {
            Notification::make()
                ->title('Bu şikayet için zaten oy kullandınız.')
                ->danger()
                ->send();
            return;
        }

        // 1. Yeni oyu Survey tablosuna kaydet
        Survey::create([
            'user_id' => auth()->id(),
            'complaint_id' => $this->record->complaint_id,
            'answer' => $data['feedback'],
        ]);

        // 2. Tüm oyların ortalamasını al ve verifythecomplaint tablosuna yaz
        $average = Survey::where('complaint_id', $this->record->complaint_id)->avg('answer');

        $this->record->update([
            'satisfaction' => $average,
        ]);

        Notification::make()
            ->title('Oyunuz başarıyla kaydedildi.')
            ->success()
            ->send();
    }


    protected function getFormStatePath(): string
    {
        return 'data';
    }

    protected function getActions(): array
    {
        return [
            \Filament\Actions\Action::make('submit')
                ->label('Gönder')
                ->action('submit')
                ->color('success'),
        ];
    }

}
