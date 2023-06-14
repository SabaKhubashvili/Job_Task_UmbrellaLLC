<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{

    public function store(Request $request)
    {
        if (
            !$request->title ||
            !$request->description ||
            !$request->price
        ) {
            return response()->json(['message' => 'Not enough data'], 500);
        }
    
        $product = new Product;
        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->images = json_encode($request->images);
        $product->save();
  
        if ($request->tags){
                $product->tags()->attach($request->tags); 
        }
    
        return response()->json(['message' => 'Successfully created product'], 201);
    }
    
    public function show(int $id)
    {
        $product = Product::with('tags')->Find($id);

        if(!$product){
           return response()->json(['message' => 'Product not found'], 404);
        }

        $decodedImages = json_decode($product->images, true);
        $product->images = $decodedImages;

    
        return $product;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $product = Product::find($id);

        if(!$product){
            return response()->json(['message'=>'Product not found'],404);
        }
        $product->tags()->detach();
        $product->delete();
        return response()->json(['message'=>'Sucesfully deleted product'],202 );
    }
}
