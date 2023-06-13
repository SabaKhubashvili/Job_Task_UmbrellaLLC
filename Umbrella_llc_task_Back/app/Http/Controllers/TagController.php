<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;


class TagController extends Controller
{

    public function store(Request $request)
    {
        if(!$request->name){
            return response()->json(['message'=>'Name is required'],500);
        };

        $tag = new Tag;
        $tag->name = $request->name;
        $tag->save();

        return response()->json(['message'=>'Sucesfully Created Tag'],201);
    }


    public function show(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }
}
