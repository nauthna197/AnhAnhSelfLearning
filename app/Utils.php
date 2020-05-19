<?php


namespace App;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

class Utils
{
    public static function applyCriteria(Builder $query){
        $params = request()->all();

        if(Arr::get($params,'from_date')){
            $query->where('created_at','>=',$params['from_date']);
        }
        if(Arr::get($params,'to_date')){
            $query->where('created_at','<',$params['to_date']);
        }

        $orderBy = Arr::get($params,'order_by','created_at');
        $query->orderBy($orderBy,Arr::get($params,'type_order','desc'));

        return $query;
    }
}