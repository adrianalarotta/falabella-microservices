<?php

namespace App\Http\Controllers\Services\OrderService;


use Illuminate\Http\Request;
use App\Models\Services\OrderService\Order;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function __construct()
{
    //$this->middleware('auth:sanctum'); 
}

public function store(Request $request)
{
    $order = Order::create([
        'user_id' => $request->user_id, 
        'products' => json_encode($request->products),
        'total_price' => $request->total_price,
        'status' => 'pendiente',
    ]);
    return response()->json($order, 201);
}

public function index()
{
    return response()->json(Order::all());
}



    public function show($id)
{
    $order = Order::where('user_id', auth()->id())->findOrFail($id);
    return response()->json($order);
}

public function update(Request $request, $id)
{
    $order = Order::where('user_id', auth()->id())->findOrFail($id);
    $order->update($request->only(['status']));
    return response()->json($order);
}

public function destroy($id)
{
    $order = Order::where('user_id', auth()->id())->findOrFail($id);
    $order->delete();
    return response()->json(['message' => 'Orden eliminada']);
}



}

