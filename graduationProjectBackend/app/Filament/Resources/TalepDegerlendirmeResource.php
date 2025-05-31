<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TalepDegerlendirmeResource\Pages;
use App\Filament\Resources\TalepDegerlendirmeResource\RelationManagers;
use App\Models\Survey;
use App\Models\VerifytheComplaint;
use Filament\Facades\Filament;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use App\Models\Complaint;
use Illuminate\Database\Eloquent\Model;
use function Sodium\library_version_minor;

class TalepDegerlendirmeResource extends Resource
{
    protected static ?string $model = VerifytheComplaint::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'İçerik Yönetimi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('complaint.title')->label("Şikayet Başlığı"),
                Tables\Columns\TextColumn::make('reason_for_refuse')->label("Red Sebebi")
                    ->badge()
                    ->limit(10)
                    ->color('danger'),
                Tables\Columns\TextColumn::make('reason_for_verify')->label("Kabul Açıklaması")
                    ->badge()
                    ->limit(10)
                    ->color('success'),
                Tables\Columns\TextColumn::make('complated_photo')->label("Fotoğraf")
                    ->limit(10)
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('oylama_orani')
                    ->label('Memnuniyet Oranı')
                    ->state(function ($record) {
                        $surveys = Survey::where('complaint_id', $record->complaint_id)->get();
                        $total = $surveys->count();

                        if ($total === 0) {
                            return 'Henüz Oy Yok';
                        }

                        $yes = $surveys->where('answer', 1)->count(); // 1 = Evet
                        $no = $total - $yes;

                        $percentYes = round(($yes / $total) * 100);
                        $percentNo = 100 - $percentYes;

                        return "%{$percentYes} Evet, %{$percentNo} Hayır ({$yes} Evet, {$no} Hayır)";
                    }),
                Tables\Columns\TextColumn::make('created_at')->label("Yüklenme Tarih")
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')->label("Güncellenme Tarih")
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('vote')
                        ->label('Oyla')
                        ->icon('heroicon-o-check')
                        ->url(fn(VerifytheComplaint $record): string => route('filament.admin.resources.talep-degerlendirmes.vote', $record)),
                    Tables\Actions\EditAction::make(),
                ])
            ])->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);

    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }
    public static function canDelete(Model $record): bool
    {
        return Filament::auth()->user()->hasRole('admin');
    }

    public static function canDeleteAny(): bool
    {
        return auth()->user()->hasRole('admin');
    }

    public static function getModelLabel(): string
    {
        return 'Talep Değerlendirme';
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTalepDegerlendirmes::route('/'),
            'create' => Pages\CreateTalepDegerlendirme::route('/create'),
            'vote' => Pages\VotingonComplaint::route('/{record}'),
            'edit' => Pages\EditTalepDegerlendirme::route('/{record}/edit'),
        ];
    }
}
