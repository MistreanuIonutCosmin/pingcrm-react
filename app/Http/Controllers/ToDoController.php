<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Http\Resources\OrganizationCollection;
use Illuminate\Support\Facades\Redirect;

class ToDoController extends Controller
{
    public function index()
    {
        return Inertia::render('ToDos/Index', [
            'filters' => Request::all('search', 'trashed'),
            'organizations' => new OrganizationCollection(
                Auth::user()->account->organizations()
                    ->orderBy('name')
                    ->filter(Request::only('search', 'trashed'))
                    ->paginate()
                    ->appends(Request::all())
            ),
        ]);
    }

    public function storeFromToDoModal()
    {
        // Auth::user()->account->organizations()->create(
        //     Request::validate([
        //         'name' => ['required', 'max:100'],
        //         'email' => ['nullable', 'max:50', 'email'],
        //     ])
        // );

        return Redirect::back()->with('success', 'ToDo created.');
    }
}
