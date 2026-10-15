<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\AccountController;
use App\Http\Controllers\Dashboard\ContentCollectionController;
use App\Http\Controllers\Dashboard\ContentCollectionPublicationController;
use App\Http\Controllers\Dashboard\ContentLibraryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\MediaApprovalController;
use App\Http\Controllers\Dashboard\MediaAssetController;
use App\Http\Controllers\Dashboard\PageController as DashboardPageController;
use App\Http\Controllers\Dashboard\PagePublicationController;
use App\Http\Controllers\Dashboard\ProductController as DashboardProductController;
use App\Http\Controllers\Dashboard\ProductPublicationController;
use App\Http\Controllers\Dashboard\RevisionController;
use App\Http\Controllers\Dashboard\SiteSettingController;
use App\Http\Controllers\Dashboard\SiteSettingPublicationController;
use App\Http\Controllers\Dashboard\UserActivationController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Public\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::prefix('{locale}')
    ->whereIn('locale', ['en', 'id', 'pt'])
    ->group(function (): void {
        Route::get('/', [PageController::class, 'home'])->name('public.home');
        Route::get('/about', [PageController::class, 'show'])->defaults('slug', 'about')->name('public.about');
        Route::get('/products', [ProductController::class, 'index'])->name('public.products.index');
        Route::get('/products/{product}', [ProductController::class, 'show'])->name('public.products.show');
        Route::get('/marketing-contact', [PageController::class, 'marketingContacts'])->name('public.marketing-contact');
        Route::get('/career', [PageController::class, 'show'])->defaults('slug', 'career')->name('public.career');
        Route::get('/contact', [PageController::class, 'show'])->defaults('slug', 'contact')->name('public.contact');
    });

Route::get('/login', LoginController::class)->middleware('guest')->name('login');

Route::prefix('dashboard')
    ->middleware(['auth', 'active', 'can:access-dashboard'])
    ->group(function (): void {
        Route::get('/', DashboardController::class)->name('dashboard');
        Route::get('/content', [ContentLibraryController::class, 'index'])->name('dashboard.content.index');
        Route::get('/content/pages/{page:slug}', [DashboardPageController::class, 'edit'])->name('dashboard.pages.edit');
        Route::put('/content/pages/{page:slug}', [DashboardPageController::class, 'update'])->name('dashboard.pages.update');
        Route::post('/content/pages/{page:slug}/publication', PagePublicationController::class)->name('dashboard.pages.publish');
        Route::get('/content/products/{product:slug}', [DashboardProductController::class, 'edit'])->name('dashboard.products.edit');
        Route::put('/content/products/{product:slug}', [DashboardProductController::class, 'update'])->name('dashboard.products.update');
        Route::post('/content/products/{product:slug}/publication', ProductPublicationController::class)->name('dashboard.products.publish');
        Route::get('/content/collections/{contentCollection}', [ContentCollectionController::class, 'edit'])->name('dashboard.collections.edit');
        Route::put('/content/collections/{contentCollection}', [ContentCollectionController::class, 'update'])->name('dashboard.collections.update');
        Route::post('/content/collections/{contentCollection}/publication', ContentCollectionPublicationController::class)->name('dashboard.collections.publish');
        Route::get('/settings/{siteSetting}', [SiteSettingController::class, 'edit'])->name('dashboard.settings.edit');
        Route::put('/settings/{siteSetting}', [SiteSettingController::class, 'update'])->name('dashboard.settings.update');
        Route::post('/settings/{siteSetting}/publication', SiteSettingPublicationController::class)->name('dashboard.settings.publish');
        Route::get('/media', [MediaAssetController::class, 'index'])->name('dashboard.media.index');
        Route::post('/media', [MediaAssetController::class, 'store'])->name('dashboard.media.store');
        Route::post('/media/{mediaAsset}/approval', MediaApprovalController::class)->name('dashboard.media.approve');
        Route::get('/users', [UserController::class, 'index'])->name('dashboard.users.index');
        Route::post('/users', [UserController::class, 'store'])->name('dashboard.users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('dashboard.users.update');
        Route::patch('/users/{user}/activation', UserActivationController::class)->name('dashboard.users.activation');
        Route::get('/account', [AccountController::class, 'edit'])->name('dashboard.account.edit');
        Route::put('/account/password', [AccountController::class, 'update'])->name('dashboard.account.update');
        Route::get('/revisions', RevisionController::class)->name('dashboard.revisions.index');
    });
