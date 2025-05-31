<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RolResource\Pages;
use App\Filament\Resources\RolResource\RelationManagers;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Filament\Forms;
use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Select;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;


class RolResource extends Resource
{
    protected static ?string $model = Role::class;

    protected static ?string $navigationIcon = 'eos-role-binding';

    protected static ?string $navigationGroup = 'Yönetim Paneli';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->label('Rol Adı'),

                Tabs::make('İzinler')
                    ->tabs(
                        collect(Permission::all()->groupBy(function ($permission) {
                            return explode(' ', $permission->name)[0] ?? 'Diğer';
                        }))
                            ->map(function ($permissions, $group) {
                                return Tab::make($group)
                                    ->schema([
                                        CheckboxList::make('permission')
                                            ->label('')
                                            ->options($permissions->pluck('name', 'id')->toArray())
                                            ->columns(2)
                                            ->default(fn ($record) => $record ? $record->permissions->pluck('id')->toArray() : []),
                                    ]);
                            })
                            ->toArray()
                    )
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('İsim'),
                Tables\Columns\TextColumn::make('created_at')->label('Oluşturulma Tarihi'),
                Tables\Columns\TextColumn::make('updated_at')->label('Güncellenme Tarihi'),
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
        return 'Roller';
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
            'index' => Pages\ListRols::route('/'),
            'create' => Pages\CreateRol::route('/create'),
            'edit' => Pages\EditRol::route('/{record}/edit'),
        ];
    }

    public static function canAccess(): bool
    {
        return auth()->user()?->hasRole('admin');
    }
}
