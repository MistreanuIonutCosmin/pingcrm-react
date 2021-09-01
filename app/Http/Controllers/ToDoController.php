<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Http\Resources\ToDoCollection;
use Illuminate\Support\Facades\Redirect;
use App\Models\ToDo;

class ToDoController extends Controller
{
    public function index()
    {
        return Inertia::render('ToDos/Index', [
            'filters' => Request::all('search', 'trashed'),
            'todos' => new ToDoCollection(
                Auth::user()->account->todos()
                    ->orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function storeFromToDoModal()
    {
        Auth::user()->account->todos()->create(
            Request::validate([
                'name' => ['required', 'max:500'],
            ])
        );

        return Redirect::back()->with('success', 'ToDo created.');
    }

    public function destroy(ToDo $todo)
    {
        $todo->delete();

        // https://inertiajs.com/redirects "303 response code"
        return Redirect::back(303)->with('success', 'ToDo deleted.');
    }
}
