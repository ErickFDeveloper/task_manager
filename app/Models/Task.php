<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\user;

class Task extends Model
{
    use HasFactory;

    public $timestamps = true;  

    protected $fillable = [
        'title',
        'description',
        'status',
        'expiration_date',
        'user_id'
    ];

    /**
     * [Obtener el usuario creador de la tarea] 
    */ 
    public function user ()
    {
        return $this->belongsTo(User::class);
    }
}
