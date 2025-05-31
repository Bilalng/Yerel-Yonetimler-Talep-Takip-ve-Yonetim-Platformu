<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use Filament\Forms;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Filament\Notifications\Notification;

class Profile extends Page implements Forms\Contracts\HasForms
{
    use Forms\Concerns\InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $title = 'Profilim';
    protected static string $view = 'filament.pages.profile';
    protected static bool $shouldRegisterNavigation = false;

    public ?array $updateForm = [];
    public ?array $passwordForm = [];
    public ?array $supportForm = [];

    public function mount(): void
    {
        $this->form->fill([
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
        ]);
    }

    protected function getForms(): array
    {
        return [
            'form',
        ];
    }

    public function updateProfile()
    {
        $this->validate([
            'email' => 'nullable|email|unique:users,email,' . auth()->id(),
            'phone' => 'nullable|unique:users,phone,' . auth()->id(),
        ]);

        $user = auth()->user();

        if ($this->updateForm['email'] !== $user->email) {
            $user->update([
                'email' => $this->updateForm['email'],
            ]);
        }

        if ($this->updateForm['phone'] !== $user->phone) {
            $user->update([
                'phone' => $this->updateForm['phone'],
            ]);
        }

        Notification::make()->success()->title('Profil güncellenmiştir.')->send();
    }

    public function updatePassword()
    {
        $data = $this->passwordForm;

        if (!Hash::check($data['current_password'], auth()->user()->password)) {
            Notification::make()->danger()->title('Mevcut şifre yanlış!')->send();
            return;
        }

        auth()->user()->update([
            'password' => Hash::make($data['new_password']),
        ]);

        Notification::make()->success()->title('Şifre güncellendi.')->send();
    }


    public function getUpdateFormSchema(): array
    {
        return [
            Forms\Components\TextInput::make('email')
                ->label('E-posta Adresi')
                ->email()
                ->default(auth()->user()->email),
            Forms\Components\TextInput::make('phone')
                ->label('Telefon Numarası')
                ->tel()
                ->default(auth()->user()->phone)
                ->required(),
        ];
    }

    public function getPasswordFormSchema(): array
    {
        return [
            Forms\Components\TextInput::make('current_password')->label('Mevcut Şifre')->password()->required(),
            Forms\Components\TextInput::make('new_password')->label('Yeni Şifre')->password()->required()->minLength(6),
        ];
    }

}
