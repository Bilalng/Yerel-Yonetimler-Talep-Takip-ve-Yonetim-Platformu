<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $role_citizen = Role::create(['name' => 'Vatandaş']);
        $role_fen_isleri = Role::create(['name' => 'Fen İşleri Müdürlüğü']);
        $role_temizlik_isleri = Role::create(['name' => 'Temizlik İşleri Müdürlüğü']);
        $role_zabita = Role::create(['name' => 'Zabıta Müdürlüğü']);
        $role_cevre_koruma = Role::create(['name' => 'Çevre Koruma ve Kontrol Müdürlüğü']);
        $role_sosyal_hizmetler = Role::create(['name' => 'Sosyal Hizmetler Müdürlüğü']);
        $role_kultur_sosyal = Role::create(['name' => 'Kültür ve Sosyal İşler Müdürlüğü']);
        $role_mali_hizmetler = Role::create(['name' => 'Mali Hizmetler Müdürlüğü']);
        $role_park_bahce = Role::create(['name' => 'Park ve Bahçeler Müdürlüğü']);
        $role_saglik_isleri = Role::create(['name' => 'Sağlık İşleri Müdürlüğü']);
        $role_diger = Role::create((['name' => 'Diğer']));


        $permission_delete_user = Permission::create(['name' => 'Kullanıcı Sil']);
        $permission_show_user = Permission::create(['name' => 'Kullanıcı Görüntüle']);
        $permission_edit_user = Permission::create(['name' => 'Kullanıcı Düzenle']);
        $permission_add_user = Permission::create(['name' => 'Kullanıcı Ekle']);
        $permission_delete_request = Permission::create(['name' => 'Talep Sil']);
        $permission_add_request = Permission::create(['name' => 'Talep Ekle']);
        $permission_confirm_request = Permission::create(['name' => 'Talep Onayla']);
        $permission_edit_request = Permission::create(['name' => 'Talep Düzenle']);
        $permission_show_request = Permission::create(['name' => 'Talep Görüntüle']);
        $permission_add_role = Permission::create(['name' => 'Rol Ekle']);
        $permission_delete_role = Permission::create(['name' => 'Rol Sil']);
        $permission_show_role = Permission::create(['name' => 'Rol Görüntüle']);
        $permission_edit_role = Permission::create(['name' => 'Rol Düzenle']);
        $permission_add_permission = Permission::create(['name' => 'İzin Ekle']);
        $permission_edit_permission = Permission::create(['name' => 'İzin Düzenle']);
        $permission_delete_permission = Permission::create(['name' => 'İzin Sİl']);
        $permission_show_permission = Permission::create(['name' => 'İzin Göster']);

        $permission_admin = [
            $permission_delete_user, $permission_show_user, $permission_edit_user,
            $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request, $permission_edit_request,
            $permission_show_request, $permission_add_role, $permission_delete_role, $permission_show_role,
            $permission_edit_role, $permission_add_permission, $permission_edit_permission, $permission_delete_permission,
            $permission_show_permission,
        ];
        $permission_citizen = [
            $permission_add_request, $permission_edit_request,
        ];
        $permission_fen_isleri = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request,  $permission_show_request,
        ];
        $permission_zabita = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_temizlik = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_cevre_koruma = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_sosyal_hizmetler = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_kultur_sosyal = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request,  $permission_show_request,

        ];
        $permission_mali_hizmetler = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_park_bahce = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];
        $permission_saglik_isleri = [
            $permission_show_user, $permission_edit_user, $permission_add_user,
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request,
        ];

        $permission_diger = [
            $permission_delete_request, $permission_add_request, $permission_confirm_request,
            $permission_edit_request, $permission_show_request
        ];

        $role_admin->syncPermissions($permission_admin);
        $role_citizen->syncPermissions($permission_citizen);
        $role_fen_isleri->syncPermissions($permission_fen_isleri);
        $role_zabita->syncPermissions($permission_zabita);
        $role_temizlik_isleri->syncPermissions($permission_temizlik);
        $role_cevre_koruma->syncPermissions($permission_cevre_koruma);
        $role_sosyal_hizmetler->syncPermissions($permission_sosyal_hizmetler);
        $role_kultur_sosyal->syncPermissions($permission_kultur_sosyal);
        $role_mali_hizmetler->syncPermissions($permission_mali_hizmetler);
        $role_park_bahce->syncPermissions($permission_park_bahce);
        $role_saglik_isleri->syncPermissions($permission_saglik_isleri);
        $role_diger->syncPermissions($permission_diger);


    }
}
