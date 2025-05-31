<x-filament::page>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {{-- Sol: Kullanıcı Bilgisi --}}
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 class="text-lg font-bold mb-4">Kullanıcı Bilgileri</h2>
            <p><strong>İsim:</strong> {{ auth()->user()->name }}</p>
            <p><strong>E-posta:</strong> {{ auth()->user()->email }}</p>
            <p><strong>Telefon:</strong> {{ auth()->user()->phone ?? 'Belirtilmemiş' }}</p> <!-- Telefon numarası burada görüntüleniyor -->
            <p><strong>Kayıt Tarihi:</strong> {{ auth()->user()->created_at->format('d.m.Y') }}</p>
        </div>
    </div>
</x-filament::page>
