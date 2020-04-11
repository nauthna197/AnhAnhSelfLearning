<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Vocabulary;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VocabularyController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->all();
        Vocabulary::create($data);
        return 'success';
    }

    public function get(Request $request)
    {
        $data = Vocabulary::all();
        $dataGrouped = $data->groupBy(function($item,$key){
            return $item->created_at->format('d-m-Y');
        })->reverse();
        return ['status' => 1, 'data' => $dataGrouped];
    }
}
