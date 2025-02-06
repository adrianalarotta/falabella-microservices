<?php

namespace App\Http\Controllers\Services\UserService;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Services\UserService\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function index()
{
    $users = User::all();  
    return response()->json($users);
}

    // Método para registrar un nuevo usuario
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json(['message' => 'User created successfully!', 'user' => $user], 201);
    }

    // Método para el inicio de sesión
    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if ($user && Hash::check($validatedData['password'], $user->password)) {
            $token = $user->createToken('MyApp')->plainTextToken;  // Crear un token con Sanctum

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
            ]);
        }

        // Si la autenticación falla
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Método para obtener el perfil del usuario autenticado
    public function profile(Request $request)
    {
        return response()->json($request->user());  
    }

    // Método para cerrar sesión (revocar token)
    public function logout(Request $request)
{
    $user = $request->user();

    //eliminar todos los tokens de acceso del usuario
    $user->tokens()->delete();

    return response()->json(['message' => 'Sesión cerrada exitosamente'], 200);
}
}
