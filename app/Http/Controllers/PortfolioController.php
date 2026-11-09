<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\GuestbookMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    /**
     * Display the portfolio page.
     */
    public function index(): View
    {
        $profile = [
            'name' => 'Aryo',
            'full_name' => 'Aryo Kalimasada',
            'tagline' => 'Fullstack Developer & Creative Web Specialist',
            'roles' => [
                'Web & Roblox Game Developer',
                'Fullstack Web Developer',
                'Mahasiswa Ilmu Komputer (UYM)',
                'Creative UI & 3D Web Explorer',
            ],
            'bio_paragraphs' => [
                'Halo! Saya Aryo, seorang pengembang web yang berdedikasi membangun aplikasi modern yang cepat, andal, dan menyenangkan untuk digunakan.',
                'Dengan memadukan kekuatan ekosistem Laravel di sisi backend serta sentuhan visual modern, interaksi 3D Three.js, dan animasi dinamis di sisi frontend, saya mengubah ide bisnis menjadi solusi digital yang berdaya saing.',
            ],
            'stats' => [
                ['label' => 'Tahun Pengalaman', 'value' => '3+'],
                ['label' => 'Proyek Selesai', 'value' => '25+'],
                ['label' => 'Teknologi Dikuasai', 'value' => '15+'],
                ['label' => 'Tingkat Kepuasan', 'value' => '99%'],
            ],
            'socials' => [
                ['name' => 'GitHub', 'icon' => 'github', 'url' => 'https://github.com/'],
                ['name' => 'Instagram', 'icon' => 'instagram', 'url' => 'https://instagram.com/'],
                ['name' => 'LinkedIn', 'icon' => 'linkedin', 'url' => 'https://linkedin.com/'],
                ['name' => 'TikTok', 'icon' => 'video', 'url' => 'https://tiktok.com/'],
            ],
        ];

        $projects = [
            [
                'id' => 'pos-kasir',
                'title' => 'E-Commerce & Kasir Pintar (Omnichannel POS)',
                'category' => 'web',
                'category_label' => 'Web App',
                'badge' => 'Featured',
                'gradient' => 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
                'border_color' => 'border-cyan-500/40 hover:border-cyan-400',
                'description' => 'Aplikasi POS & Toko Online modern terintegrasi dengan pelaporan otomatis, mutasi stok, cetak struk thermal, dan QRIS Payment.',
                'long_description' => 'Aplikasi Point of Sale (POS) dan katalog belanja digital lengkap untuk mendukung operasional retail dan F&B. Menghadirkan sistem pencatatan multi-kasir, sinkronisasi stok otomatis antar-cabang, barcode scanning, grafik analitik penjualan harian-bulanan, serta integrasi gateway pembayaran online instan.',
                'tags' => ['Laravel 12', 'Tailwind CSS', 'MySQL', 'Alpine.js', 'Chart.js', 'Midtrans API'],
                'demo_url' => '#',
                'github_url' => 'https://github.com/',
                'icon' => 'shopping-bag',
            ],
            [
                'id' => 'ai-content-bot',
                'title' => 'AI Studio & SEO Article Generator',
                'category' => 'bot',
                'category_label' => 'Bot / Automation',
                'badge' => 'AI Powered',
                'gradient' => 'from-purple-500/20 via-pink-500/10 to-rose-500/20',
                'border_color' => 'border-purple-500/40 hover:border-purple-400',
                'description' => 'Platform otomasi pembuatan artikel berkualitas tinggi berbasis AI lengkap dengan optimasi SEO dan penjadwalan konten ke CMS.',
                'long_description' => 'Dashboard pintar yang memanfaatkan Large Language Model (Gemini / OpenAI API) untuk riset kata kunci, merancang outline, menghasilkan artikel komprehensif, menambahkan tag meta otomatis, serta mempublikasikan langsung ke platform CMS seperti WordPress dan blog internal.',
                'tags' => ['Python', 'Laravel REST API', 'Gemini AI', 'Tailwind CSS', 'Vite'],
                'demo_url' => '#',
                'github_url' => 'https://github.com/',
                'icon' => 'sparkles',
            ],
            [
                'id' => 'school-management',
                'title' => 'EduSmart - Sistem Informasi Manajemen Sekolah',
                'category' => 'web',
                'category_label' => 'Web App',
                'badge' => 'Enterprise',
                'gradient' => 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
                'border_color' => 'border-emerald-500/40 hover:border-emerald-400',
                'description' => 'Portal akademik terpadu untuk monitoring absensi QR code, pencatatan nilai rapor kurikulum merdeka, dan broadcast notifikasi WA.',
                'long_description' => 'Sistem tata kelola data sekolah komprehensif yang mempermudah guru dan staf dalam mengelola biodata siswa, kelas, jadwal mengajar, dan rekap keuangan SPP. Dilengkapi portal orang tua untuk memantau progres kehadiran dan nilai anak secara transparan.',
                'tags' => ['PHP', 'Laravel', 'Livewire', 'MySQL', 'Bootstrap / Tailwind', 'WhatsApp Gateway'],
                'demo_url' => '#',
                'github_url' => 'https://github.com/',
                'icon' => 'graduation-cap',
            ],
            [
                'id' => 'cyber-globe',
                'title' => 'CyberGuard 3D Threat Visualizer',
                'category' => 'ui3d',
                'category_label' => '3D & WebGL',
                'badge' => 'WebGL / 3D',
                'gradient' => 'from-blue-500/20 via-indigo-500/10 to-violet-500/20',
                'border_color' => 'border-blue-500/40 hover:border-blue-400',
                'description' => 'Dashboard monitoring keamanan siber interaktif dengan visualisasi peta bola bumi 3D dan analitik anomali lalu lintas jaringan.',
                'long_description' => 'Antarmuka visualisasi SOC (Security Operations Center) yang menampilkan aliran log trafik jaringan dan mitigasi serangan DDoS secara real-time pada bola dunia 3D interaktif menggunakan Three.js dan WebGL shader.',
                'tags' => ['Three.js', 'WebGL', 'JavaScript', 'Laravel API', 'Tailwind CSS'],
                'demo_url' => '#',
                'github_url' => 'https://github.com/',
                'icon' => 'globe',
            ],
        ];

        $skill_categories = [
            [
                'title' => 'Frontend Development',
                'icon' => 'code-2',
                'skills' => [
                    ['name' => 'Laravel Blade & Livewire', 'level' => '95%', 'color' => '#FF2D20'],
                    ['name' => 'Tailwind CSS', 'level' => '92%', 'color' => '#06B6D4'],
                    ['name' => 'JavaScript (ES6+)', 'level' => '90%', 'color' => '#F7DF1E'],
                    ['name' => 'Three.js & WebGL', 'level' => '82%', 'color' => '#38BDF8'],
                    ['name' => 'React & Vue.js', 'level' => '85%', 'color' => '#61DAFB'],
                    ['name' => 'HTML5 & CSS3 Responsive', 'level' => '96%', 'color' => '#E34F26'],
                ],
            ],
            [
                'title' => 'Backend & Architecture',
                'icon' => 'server',
                'skills' => [
                    ['name' => 'PHP (8.x / Modern OOP)', 'level' => '95%', 'color' => '#777BB4'],
                    ['name' => 'Laravel Framework', 'level' => '96%', 'color' => '#FF2D20'],
                    ['name' => 'RESTful API & Webhooks', 'level' => '92%', 'color' => '#10B981'],
                    ['name' => 'Python & Automation', 'level' => '80%', 'color' => '#3776AB'],
                    ['name' => 'Authentication & Security', 'level' => '88%', 'color' => '#F59E0B'],
                ],
            ],
            [
                'title' => 'Database & Storage',
                'icon' => 'database',
                'skills' => [
                    ['name' => 'MySQL / MariaDB', 'level' => '94%', 'color' => '#4479A1'],
                    ['name' => 'PostgreSQL', 'level' => '85%', 'color' => '#336791'],
                    ['name' => 'SQLite', 'level' => '90%', 'color' => '#003B57'],
                    ['name' => 'Redis (Cache & Queue)', 'level' => '82%', 'color' => '#DC382D'],
                    ['name' => 'Supabase / Firebase', 'level' => '84%', 'color' => '#3ECF8E'],
                ],
            ],
            [
                'title' => 'DevOps & Development Tools',
                'icon' => 'wrench',
                'skills' => [
                    ['name' => 'Git & GitHub Workflow', 'level' => '92%', 'color' => '#F05032'],
                    ['name' => 'Vite & NPM Tooling', 'level' => '90%', 'color' => '#646CFF'],
                    ['name' => 'Docker & Containerization', 'level' => '78%', 'color' => '#2496ED'],
                    ['name' => 'Linux VPS & Nginx', 'level' => '85%', 'color' => '#009639'],
                    ['name' => 'Postman & API Testing', 'level' => '90%', 'color' => '#FF6C37'],
                ],
            ],
        ];

        $certificates = [
            [
                'id' => 'cert-laravel',
                'title' => 'Fullstack Web Development with Laravel & Modern Ecosystem',
                'issuer' => 'Dicoding Indonesia / Udemy Professional',
                'year' => '2024',
                'category' => 'Sertifikasi Keahlian',
                'icon' => 'award',
            ],
            [
                'id' => 'cert-cyber',
                'title' => 'Cyber Security Essentials & Secure Web Architecture',
                'issuer' => 'Cisco Networking Academy',
                'year' => '2023',
                'category' => 'Keamanan Sistem',
                'icon' => 'shield-check',
            ],
            [
                'id' => 'cert-cloud',
                'title' => 'Cloud Practitioner & Linux Server Administration',
                'issuer' => 'AWS Academy / Digital Talent Scholarship',
                'year' => '2024',
                'category' => 'Cloud & Infrastructure',
                'icon' => 'cloud',
            ],
            [
                'id' => 'award-ksm',
                'title' => 'Juara Kompetisi Bidang Teknologi & Pemrograman Web',
                'issuer' => 'Kompetisi Sains & Teknologi Pelajar',
                'year' => '2023',
                'category' => 'Penghargaan',
                'icon' => 'trophy',
            ],
        ];

        $experiences = [
            [
                'period' => '2024 — Sekarang',
                'role' => 'Independent Fullstack Developer',
                'company' => 'Freelance / Remote',
                'description' => 'Mengerjakan berbagai proyek pembuatan sistem informasi perusahaan, aplikasi POS, integrasi payment gateway, dan implementasi visual 3D modern untuk portofolio digital klien.',
            ],
            [
                'period' => '2023 — 2024',
                'role' => 'Junior Web Developer / Project Contributor',
                'company' => 'Digital Creative Studio',
                'description' => 'Mengembangkan API berbasis Laravel, mengoptimalkan query database MySQL, serta merancang antarmuka frontend interaktif menggunakan Tailwind CSS dan JavaScript.',
            ],
            [
                'period' => '2023 — Sekarang',
                'role' => 'Mahasiswa S1 Ilmu Komputer',
                'company' => 'Universitas Yatsi Madani (NIM: 23040153)',
                'description' => 'Mendalami algoritma pemrograman, rekayasa perangkat lunak, arsitektur basis data, serta riset pengembangan game Roblox (Lua) dan web modern.',
            ],
        ];

        $guestbook_messages = GuestbookMessage::latest()->take(15)->get();

        return view('portfolio', compact(
            'profile',
            'projects',
            'skill_categories',
            'certificates',
            'experiences',
            'guestbook_messages'
        ));
    }

    /**
     * Store a guestbook message via AJAX or Form Post.
     */
    public function storeGuestbook(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:80',
            'message' => 'required|string|max:500',
            'avatar' => 'nullable|string|max:50',
        ]);

        $avatars = ['👨‍💻', '👩‍🚀', '⚡', '🚀', '🔥', '🤖', '🎮', '💡'];
        $chosenAvatar = $validated['avatar'] ?? $avatars[array_rand($avatars)];

        $comment = GuestbookMessage::create([
            'name' => strip_tags($validated['name']),
            'message' => strip_tags($validated['message']),
            'avatar' => $chosenAvatar,
        ]);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Pesan Anda berhasil dikirimkan ke guestbook!',
                'data' => [
                    'id' => $comment->id,
                    'name' => $comment->name,
                    'message' => $comment->message,
                    'avatar' => $comment->avatar,
                    'time_ago' => $comment->time_ago,
                ],
            ]);
        }

        return redirect()->back()->with('guestbook_success', 'Pesan Anda berhasil dikirim ke guestbook!');
    }

    /**
     * Get latest guestbook messages (for dynamic refresh).
     */
    public function getGuestbook(): JsonResponse
    {
        $messages = GuestbookMessage::latest()->take(20)->get()->map(function ($msg) {
            return [
                'id' => $msg->id,
                'name' => $msg->name,
                'message' => $msg->message,
                'avatar' => $msg->avatar,
                'time_ago' => $msg->time_ago,
            ];
        });

        return response()->json($messages);
    }

    /**
     * Store a contact message.
     */
    public function storeContact(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:2000',
        ]);

        ContactMessage::create([
            'name' => strip_tags($validated['name']),
            'email' => strip_tags($validated['email']),
            'subject' => strip_tags($validated['subject'] ?? 'Pesan dari Portofolio'),
            'message' => strip_tags($validated['message']),
        ]);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Terima kasih! Pesan Anda sudah terkirim ke Aryo.',
            ]);
        }

        return redirect()->back()->with('contact_success', 'Terima kasih! Pesan Anda sudah terkirim.');
    }
}

