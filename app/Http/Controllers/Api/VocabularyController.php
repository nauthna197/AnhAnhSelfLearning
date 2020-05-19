<?php

namespace App\Http\Controllers\Api;

use App\Utils;
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

    public function getGroupByDate(Request $request)
    {
        $data = Vocabulary::orderBy('created_at', 'desc')->get();
        $dataGrouped = $data->groupBy(function ($item, $key) {
            return $item->created_at->format('d-m-Y');
        });
        return ['status' => 1, 'data' => $dataGrouped];
    }

    public function searchFromGoogle(Request $request)
    {
        $word = $request->get('word');
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', "https://api.dictionaryapi.dev/api/v1/entries/en/$word");
        return $response->getBody();
    }

    public function get(Request $request)
    {
        $queryVoca = Vocabulary::query();
        return Utils::applyCriteria($queryVoca)
            ->get();
    }
}
