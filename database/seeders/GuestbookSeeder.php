<?php

namespace Database\Seeders;

use App\Models\GuestbookMessage;
use Illuminate\Database\Seeder;

class GuestbookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $messages = [
            [
                'name' => 'Fajar Pratama',
                'avatar' => '👨‍💻',
                'message' => 'Keren banget animasi 3D Lanyard sama dark stylenya mas Aryo! Transisinya halus pol! 🔥',
                'created_at' => now()->subHours(3),
            ],
            [
                'name' => 'Siti Rahmawati',
                'avatar' => '👩‍🚀',
                'message' => 'Proyek-proyeknya mantap, terutama yang POS dan AI Content Bot. Sukses terus!',
                'created_at' => now()->subDay(),
            ],
            [
                'name' => 'Dimas Arya',
                'avatar' => '⚡',
                'message' => 'Desain futuristik cyberpunk-nya dapet banget. Clean code & performa ngebut di HP.',
                'created_at' => now()->subDays(2),
            ],
        ];

        foreach ($messages as $msg) {
            GuestbookMessage::create($msg);
        }
    }
}

