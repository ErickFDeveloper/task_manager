<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {   
        $tasks = Task::with('user')
            ->where('user_id', Auth::id())
            ->latest()->get();

        return Inertia::render('Tasks', [
            'tasks' => $tasks ? 
                $tasks : [],
        ]);
    }

    public function store(Request $request)
    {
        try {
            /** Validar datos de entrada */ 
            $request->validate([
                'title' => 'required|max:255',
                'description' => 'required|string',
                'expiration_date' => 'required',
                'status' => 'required|string',
            ]);

            /** Insertar datos en la tabla */ 
            $request->user()->tasks()->create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'expiration_date' => $request->expiration_date,
            ]);
            
            return redirect()->route('tasks.index');

        } catch (Exception $e) {
            if ($e instanceof ValidationException) {
                return redirect()->back()
                    ->withErrors($e->validator->errors())
                    ->withInput();
            } else {
               return redirect()->back();
            }
        }
    }

    public function update( Request $request, $taskId )
    {
        try {
            /** Validar datos de entrada */ 
            $request->validate([
                'title' => 'required|max:255',
                'description' => 'required|string',
                'status' => 'required',
                'expiration_date' => 'required',
            ]);

            $task = Task::find($taskId);

            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'expiration_date' => $request->expiration_date,
                'user_id' => Auth::id()
            ]);

            return redirect()->route('tasks.index');

        } catch (\Exception $exception) {
            return redirect()->back();
        }
    }

    public function destroy( $taskId )
    {
        try {
            $task = Task::find($taskId);

            if (!$task) 
                return response()->json([
                    'status' => false,
                    'message' => 'Tarea no encontrada!',
                ]);

            $task->delete();

            return redirect()->route('tasks.index');

        } catch (\Exception $exception) {
            return redirect()->back();
        }
    }
}
