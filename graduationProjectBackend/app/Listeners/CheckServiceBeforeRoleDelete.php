<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\RolDeleting;
use App\Models\Service;
class CheckServiceBeforeRoleDelete
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RolDeleting $event)
    {
        $role = $event->role;

        $services = Service::where('role_id', $role->id)->get();

        if ($services->isNotEmpty()) {
            Log::error('Role silinemedi, bu role ait birimler mevcut: ' . $role->name);
            throw new \Exception('Bu role ait birimler mevcut, rol silinemez.');
        }
    }
}
