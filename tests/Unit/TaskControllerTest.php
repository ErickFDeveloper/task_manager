<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_task()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test task description',
            'status' => 'pending',
            'expiration_date' => now()->addDay(),
        ]);

        $this->assertDatabaseHas('tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test task description',
            'status' => 'pending',
        ]);

        $response->assertRedirect(route('tasks.index'));
    }

    public function test_update_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->put("/tasks/{$task->id}", [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => 'in_progress',
            'expiration_date' => now()->addDay(),
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => 'in_progress',
        ]);

        $response->assertRedirect(route('tasks.index'));
    }

    public function test_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete("/tasks/{$task->id}");

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);

        $response->assertRedirect(route('tasks.index'));
    }
}
