<?php

namespace App\Http\Controllers\Services\ProductService;

use App\Models\Services\ProductService\Product;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    //  Obtener todos los productos
    public function index()
    {
        return response()->json(Product::all(), 200);
    }

    public function getUserData($userId)
    {
        $client = new Client();
        
        // URL del user-service en el contenedor Docker
        $response = $client->get('http://user-service:8001/api/users/' . $userId);

        // Verificamos el cuerpo de la respuesta
        $userData = json_decode($response->getBody()->getContents(), true);
        
        // Retornamos los datos del usuario en el producto-service
        return response()->json($userData);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $request->merge([
            'user_id' => $request->input('user_id', 1),
        ]);
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'user_id' => 'nullable|numeric',
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($product, 200);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'nullable|string',
            'user_id' => 'nullable|numeric',
        ]);

        $product->update($request->all());

        return response()->json($product, 200);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Producto eliminado correctamente'], 200);
    }
}
