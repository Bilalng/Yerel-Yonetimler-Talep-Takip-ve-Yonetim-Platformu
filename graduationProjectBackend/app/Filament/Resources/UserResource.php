<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Actions\EditAction;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Spatie\Permission\Models\Role;


class UserResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-m-users';

    protected static ?string $navigationGroup = 'Yönetim Paneli';


    public static function form(Form $form): Form
    {

        return $form
            ->schema([
                Section::make('Kişisel Bilgiler')
                    ->schema([
                        Forms\Components\TextInput::make('tc')->label("TC Kimlik No")->required()->rules(['required', 'numeric', 'digits:11']),
                        Forms\Components\TextInput::make('name')->required()->label('İsim'),
                        Forms\Components\TextInput::make('surname')->required()->label('Soy İsim'),
                    ])->columns(3),
                Section::make('Kişisel Bilgiler')
                    ->schema([
                        Forms\Components\TextInput::make('phone')->required()->label('Telefon Numarası'),
                        Forms\Components\TextInput::make('email')->email()->required()->label('Email'),
                        Forms\Components\TextInput::make('password')->label('Şifre')
                    ->password()
                    ->required(),
            ])->columns(3),

                Section::make('Rol Seçiniz')
                    ->schema([
                        Select::make('roles')
                            ->label('Rol Seç')
                            ->options(Role::all()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->native("false"),
                    ])
            ]);

    }


    public static function table(Table $table): Table
    {

        return $table
            ->columns([
                Tables\Columns\TextColumn::make('tc')->label('TC Kimlik No'),
                Tables\Columns\TextColumn::make('name')->label('İsim'),
                Tables\Columns\TextColumn::make('surname')->label('Soy İsim'),
                Tables\Columns\TextColumn::make('phone')->label('Telefon Numarası'),
                Tables\Columns\TextColumn::make('email')->label('Email'),
                Tables\Columns\TextColumn::make('roles.name')
                    ->label('Rol')
                    ->badge()
                    ->color(fn($state) => match ($state) {
                        'admin' => 'danger',
                        'editor' => 'warning',
                        'user' => 'success',
                        'COKERTME' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getModelLabel(): string
    {
        return 'Kullanıcılar';
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }

    public static function afterCreate($record): void
    {
        if ($record->roles()->count() === 0) {
            $record->assignRole('Vatandaş');
        }
    }

    public static function canAccess(): bool
    {
        return auth()->user()?->hasRole('admin');
    }
}
