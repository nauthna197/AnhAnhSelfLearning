<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('vocabulary/create','Api\VocabularyController@store');

Route::get('vocabulary/get-group-by-date','Api\VocabularyController@getGroupByDate');

Route::get('vocabulary/service-search','Api\VocabularyController@searchFromGoogle');

Route::get('vocabulary/get','Api\VocabularyController@get');