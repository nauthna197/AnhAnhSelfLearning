<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    protected $table = 'vocabularies';

    protected $fillable = ['name','mean','type','description','synonym'];

    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:m',
    ];
}
