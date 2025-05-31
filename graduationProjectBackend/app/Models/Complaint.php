<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class Complaint extends Model
{
    use HasFactory;
    use HasRoles;

    protected $table = 'complaint';

    protected $fillable = [
        'user_id',
        'service_id',
        'status_id',
        'title',
        'description',
        'photo'
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function verify(): HasMany
    {
        return $this->hasMany(VerifytheComplaint::class, 'complaint_id');
    }

    public function survey(): HasMany
    {
        return $this->hasMany(Survey::class, 'complaint_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $service = Service::where('id', $model->service_id)->first();
            $service->increment('count');
            $model['status_id'] = 1;
        });

        static::deleting(function ($model) {
            $service = Service::where('id', $model->service_id)->first();
            if ($service->count <= 0) {
                $service->count = 0;
                $service->save();
            } else {
                $service->decrement('count');
            }

            VerifytheComplaint::where('complaint_id', $model->id)->delete();

            // İlişkili survey kayıtlarını sil
            Survey::where('complaint_id', $model->id)->delete();

        });
    }

    public static function count()
    {
        $count = Complaint::all();
        return $count->count();
    }

}
