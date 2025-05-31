<?php

namespace App\Filament\Resources;

use App\Filament\Pages\DetailsOfComplaint;
use App\Filament\Resources\TaleplerResource\Pages;
use App\Filament\Resources\TaleplerResource\RelationManagers;
use App\Models\Complaint;
use App\Models\Status;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Facades\Filament;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;


class TaleplerResource extends Resource
{
    protected static ?string $model = Complaint::class;
    protected static ?string $label = 'Talepler';
    protected static ?string $navigationIcon = 'heroicon-s-clipboard-document-list';

    protected static ?string $navigationGroup = 'İçerik Yönetimi';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Başlık ve Açıklama Bilgileri')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->label('Başlık'),

                        Forms\Components\TextInput::make('description')
                            ->required()
                            ->label('Açıklama')
                    ])
                    ->collapsible()
                    ->columns(2)
                ,

                Section::make('Birim ve Durum Bilgileri')
                    ->schema([
                        Forms\Components\Hidden::make('status_id')
                            ->default(1)
                            ->visibleOn('create'),

                        Forms\Components\Select::make('status_id')
                            ->label('Durum')
                            ->options(Status::all()->pluck('title', 'id'))
                            ->searchable()
                            ->preload()
                            ->reactive()
                            ->disabled(!Filament::auth()->user()->hasRole([
                                'admin',
                                'Fen İşleri Müdürlüğü',
                                'Temizlik İşleri Müdürlüğü',
                                'Zabıta Müdürlüğü',
                                'Çevre Koruma ve Kontrol Müdürlüğü',
                                'Sosyal Hizmetler Müdürlüğü',
                                'Kültür ve Sosyal İşler Müdürlüğü',
                                'Mali Hizmetler Müdürlüğü',
                                'Park ve Bahçeler Müdürlüğü',
                                'Sağlık İşleri Müdürlüğü',
                                'Diğer'
                            ]))
                            ->visibleOn('edit')
                            ->visible(fn() => Filament::auth()->user()->hasRole([
                                'admin',
                                'Fen İşleri Müdürlüğü',
                                'Temizlik İşleri Müdürlüğü',
                                'Zabıta Müdürlüğü',
                                'Çevre Koruma ve Kontrol Müdürlüğü',
                                'Sosyal Hizmetler Müdürlüğü',
                                'Kültür ve Sosyal İşler Müdürlüğü',
                                'Mali Hizmetler Müdürlüğü',
                                'Park ve Bahçeler Müdürlüğü',
                                'Sağlık İşleri Müdürlüğü',
                                'Diğer'
                            ])),

                        Forms\Components\Select::make('service_id')
                            ->label('Birim')
                            ->relationship('service', 'title')
                            ->required(),

                        Forms\Components\FileUpload::make('photo')->nullable()->label('Fotoğraf')
                        ->visibleOn('create')
                        ,
                    ])
                    ->visible(fn() => Filament::auth()->user()->hasRole([
                        'admin',
                        'Fen İşleri Müdürlüğü',
                        'Temizlik İşleri Müdürlüğü',
                        'Zabıta Müdürlüğü',
                        'Çevre Koruma ve Kontrol Müdürlüğü',
                        'Sosyal Hizmetler Müdürlüğü',
                        'Kültür ve Sosyal İşler Müdürlüğü',
                        'Mali Hizmetler Müdürlüğü',
                        'Park ve Bahçeler Müdürlüğü',
                        'Sağlık İşleri Müdürlüğü',
                        'Diğer'
                    ]))
                    ->collapsible()
                    ->compact()
                    ->columns(2)
                ,

                Section::make('Red Veya Kabul Sebebi')
                    ->schema([
                        Forms\Components\FileUpload::make('complated_photo')
                            ->label('Fotoğraf')
                            ->visible(fn(Forms\Get $get) => $get('status_id') == 4),

                        Forms\Components\Textarea::make('completion_note')
                            ->label('Yapılan İş Açıklaması')
                            ->visible(fn(Forms\Get $get) => $get('status_id') == 4),

                        Forms\Components\TextInput::make('rejection_reason')
                            ->label('Red Sebebi')
                            ->visible(fn(Forms\Get $get) => $get('status_id') == 5),
                    ])
                    ->visible(fn(Forms\Get $get) =>
                        in_array($get('status_id'), [4, 5]) &&
                        Filament::auth()->user()->hasRole([
                            'admin',
                            'Fen İşleri Müdürlüğü',
                            'Temizlik İşleri Müdürlüğü',
                            'Zabıta Müdürlüğü',
                            'Çevre Koruma ve Kontrol Müdürlüğü',
                            'Sosyal Hizmetler Müdürlüğü',
                            'Kültür ve Sosyal İşler Müdürlüğü',
                            'Mali Hizmetler Müdürlüğü',
                            'Park ve Bahçeler Müdürlüğü',
                            'Sağlık İşleri Müdürlüğü',
                            'Diğer'
                        ])
                    )
                    ->collapsible()
                    ->columns(2)
                ,
                Forms\Components\FileUpload::make('photo')
                    ->label('Fotoğraf')
            ]);

    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')->label("Talep Eden Kişi")->limit(15)->sortable(),
                Tables\Columns\TextColumn::make('service.title')->label("Talep Tipi")->limit(15),
                TextColumn::make('status.title')
                    ->limit(25)
                    ->label('Durum')
                    ->formatStateUsing(function ($state, $record) {
                        $icon = match ($record->status_id) {
                            1 => '⏰', // Saat
                            2 => '🔄', // Devam Ediyor
                            3 => '🔄', //  Devam Ediyor
                            4 => '✅', // Tamamlandı
                            5 => '❌',
                            default => '❓',
                        };

                        return "{$icon} {$state}";
                    })
                    ->badge()
                    ->color(fn($record) => match ($record->status_id) {
                        1 => 'gray',
                        2 => 'warning',
                        3 => 'warning',
                        4 => 'success',
                        5 => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('title')->label("Talep Başlığı")->limit(25),
                Tables\Columns\TextColumn::make('description')->label("Açıklama")->limit(25)
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('photo')->label("Fotoğraf")->limit(15)
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')->label("Talep Tarihi")->limit(15)
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make()
                        ->modalSubmitAction(false),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTaleplers::route('/'),
            'create' => Pages\CreateTalepler::route('/create'),
            'view' => Pages\ViewComplaint::route('/{record}'),
            'edit' => Pages\EditTalepler::route('/{record}/edit'),

        ];
    }
}
