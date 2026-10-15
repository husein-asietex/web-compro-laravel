<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Models\ContentCollection;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            'pages' => [
                'total' => Page::count(),
                'published' => Page::query()->published()->count(),
                'draft' => Page::where('status', ContentStatus::Draft)->count(),
            ],
            'products' => [
                'total' => Product::count(),
                'published' => Product::query()->published()->count(),
                'draft' => Product::where('status', ContentStatus::Draft)->count(),
            ],
            'collections' => [
                'total' => ContentCollection::count(),
                'published' => ContentCollection::query()->published()->count(),
            ],
            'media' => [
                'total' => MediaAsset::count(),
                'approved' => MediaAsset::where('approved', true)->count(),
                'pending' => MediaAsset::where('approved', false)->count(),
            ],
            'users' => [
                'total' => User::count(),
                'active' => User::where('active', true)->count(),
            ],
        ];

        return Inertia::render('dashboard/index', compact('stats'));
    }
}
