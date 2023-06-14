<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Tag;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TagController;

//* Getting
Route::get('/getAllProducts', function () {
    $products = Product::with('tags')->latest()->get();




    $decodedProducts = $products->map(function ($product) {
        $decodedImages = json_decode($product->images, true);
        $product->images = $decodedImages;
        return $product;
    });

    return $decodedProducts;
});


Route::get('/getAllTags',function(){
    $tags = Tag::all();

    return $tags;
});

Route::get('/getSingleProduct/{id}',[ProductController::Class,'show']);

Route::get('/getPrices',function(){
    $highest = Product::orderByDesc('price')->value('price');
    $lowest = Product::orderBy('price')->value('price');

    return [$highest, $lowest];
});

Route::post('/getFavorites', function(Request $request) {

    $favorites = $request->favorites;
    $products = Product::with('tags')->whereIn('id', $favorites)->get();

    $decodedProducts = $products->map(function ($product) {
        $decodedImages = json_decode($product->images, true);
        $product->images = $decodedImages;
        return $product;
    });
    return $products;
});
//* Delete Product

Route::delete('/deleteProduct/{id}',[productController::Class,'destroy']);

//* Creating
Route::post('/createProduct',[ProductController::Class,'store']);
Route::post('/createTag',[TagController::Class,'store']);
