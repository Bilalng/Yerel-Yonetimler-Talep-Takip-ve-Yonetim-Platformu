<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Role;
use App\Models\Complaint;

class Service extends Model
{
    protected $table = 'service';

    protected $fillable = [
        'title',
        'count',
        'role_id'
    ];

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function complaint() : HasMany
    {
        return $this->hasMany(Complaint::class, 'service_id');
    }

    protected static function boot(){
        parent::boot();

        static::deleting(function($model) {
            $orphans = Complaint::where('service_id', $model->id)->get();

            $replacement_service = Service::where('title', 'Diğer')->first();

            if (!$replacement_service) {
                throw new \Exception('"Diğer" başlıklı yedek servis bulunamadı.');
            }

            foreach($orphans as $data){
                $data->service_id = $replacement_service->id;
                $data->save();
            }

            $model->role()->delete();
        });
    }


}
