<?php

use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::post('/guestbook', [PortfolioController::class, 'storeGuestbook'])->name('guestbook.store');
Route::get('/api/guestbook', [PortfolioController::class, 'getGuestbook'])->name('guestbook.index');
Route::post('/contact', [PortfolioController::class, 'storeContact'])->name('contact.store');
