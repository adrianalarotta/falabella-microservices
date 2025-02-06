<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// routes/api.php

use App\Http\Controllers\Services\ProductService\ProductController;
use App\Http\Controllers\Services\UserService\UserController;
use App\Http\Controllers\Services\OrderService\OrderController;

// Rutas para ProductService
Route::prefix('products')->group(function () {
    Route::apiResource('', ProductController::class); 
    Route::get('/user/{userId}', [ProductController::class, 'getUserData']); 
});


// Rutas para UserService
Route::prefix('users')->group(function () {
    // Ruta para registrar un usuario
    Route::post('register', [UserController::class, 'register']); 
    
    // Ruta para iniciar sesión
    Route::post('login', [UserController::class, 'login']); 
    
    // Ruta para obtener el perfil del usuario
    Route::get('profile', [UserController::class, 'profile'])
        ->middleware('auth:sanctum');  
    
    // Ruta para cerrar sesión
    Route::post('logout', [UserController::class, 'logout'])
        ->middleware('auth:sanctum');  
    
    // Ruta para obtener todos los usuarios (requiere autenticación)
    Route::get('/', [UserController::class, 'index'])->middleware('auth:sanctum'); 
});


// Rutas para OrderService
Route::prefix('orders')->group(function () {
    // Ruta para crear una nueva orden
    Route::post('/', [OrderController::class, 'store']); 
    
    // Ruta para obtener la lista de órdenes
    Route::get('/', [OrderController::class, 'index']); 
});

