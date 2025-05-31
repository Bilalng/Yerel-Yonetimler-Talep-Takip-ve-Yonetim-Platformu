<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VerifytheComplaint extends Model
{
    protected $table = 'verifythecomplaint';

    protected $fillable = [
        'complaint_id',
        'reason_for_refuse',
        'reason_for_verify',
        'complated_photo',
        'satisfaction',
    ];

    public function complaint() : belongsTo
    {
        return $this->belongsTo(Complaint::class, 'complaint_id');
    }

    public function surveys() : HasMany
    {
        return $this->hasMany(Survey::class, 'complaint_id', 'complaint_id');
    }

}
