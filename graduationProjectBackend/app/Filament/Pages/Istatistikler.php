<?php

namespace App\Filament\Pages;


use App\Filament\Widgets\CozulenTalep;
use App\Filament\Widgets\SolvedbyUnitComplaint;
use App\Filament\Widgets\TalepDagilimi;
use App\Filament\Widgets\TotalUsers;
use Filament\Pages\Page;

class Istatistikler extends Page
{
    protected static ?string $navigationIcon = 'carbon-chart-evaluation';

    protected static string $view = 'filament.pages.istatistikler';
    protected static ?string $navigationLabel = 'İstatistikler';
    protected static ?string $navigationGroup = 'Raporlar';

    protected function getHeaderWidgets(): array
    {
        $user = auth()->user();
        $widgets = [];

        // Rol bazlı görünmesini istediğin widgetlar
        if ($user->hasRole([
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
        ])) {
            $widgets[] = \App\Filament\Widgets\TalepDagilimi::class;
            $widgets[] = \App\Filament\Widgets\TotalUsers::class;
            $widgets[] = \App\Filament\Widgets\SolvedbyUnitComplaint::class;
        }

        // Bu tüm kullanıcılar için görünür olacak
        $widgets[] = \App\Filament\Widgets\CozulenTalep::class;

        return $widgets;
    }
}
