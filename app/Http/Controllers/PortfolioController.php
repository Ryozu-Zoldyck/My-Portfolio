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
                [
                    'name' => 'GitHub',
                    'icon' => 'github',
                    'url' => 'https://github.com/Ryozu-Zoldyck',
                    'hover' => 'hover:text-white hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]',
                ],
                [
                    'name' => 'Instagram',
                    'icon' => 'instagram',
                    'url' => 'https://www.instagram.com/ryozu._/',
                    'hover' => 'hover:text-pink-400 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]',
                ],
                [
                    'name' => 'LinkedIn',
                    'icon' => 'linkedin',
                    'url' => 'https://linkedin.com/',
                    'hover' => 'hover:text-sky-400 hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]',
                ],
                [
                    'name' => 'TikTok',
                    'icon' => 'tiktok',
                    'url' => 'https://www.tiktok.com/@ryozuholic',
                    'hover' => 'hover:text-teal-300 hover:border-teal-400/50 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)]',
                ],
            ],
        ];

        $projects = [
            [
                'id' => 'siakad-aryo',
                'title' => 'SIAKAD - Sistem Informasi Akademik UYM',
                'category' => 'web',
                'category_label' => 'Web App / Academic',
                'badge' => 'Tugas Akhir PBO',
                'gradient' => 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
                'border_color' => 'border-cyan-500/40 hover:border-cyan-400',
                'description' => 'Aplikasi web sistem informasi akademik mahasiswa untuk memenuhi tugas akhir Desain & Pemrograman Berorientasi Objek.',
                'long_description' => 'Sistem tata kelola data akademik perkuliahan komprehensif yang dibangun menggunakan framework Laravel dengan konsep Object-Oriented Programming (OOP). Mengelola biodata mahasiswa, jadwal perkuliahan, kartu rencana studi (KRS), penginputan nilai, serta siap dideploy ke cloud environment Railway.',
                'tags' => ['Laravel', 'PHP OOP', 'MySQL', 'JavaScript', 'Railway Cloud', 'Nixpacks'],
                'demo_url' => 'https://github.com/Ryozu-Zoldyck/Siakad-Aryo',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/Siakad-Aryo',
                'icon' => 'graduation-cap',
            ],
            [
                'id' => 'evaluasi-diksi',
                'title' => 'Evaluasi Diksi & Public Speaking AI',
                'category' => 'ai',
                'category_label' => 'AI / Speech Processing',
                'badge' => 'AI Powered',
                'gradient' => 'from-purple-500/20 via-pink-500/10 to-rose-500/20',
                'border_color' => 'border-purple-500/40 hover:border-purple-400',
                'description' => 'Platform web cerdas evaluasi keterampilan berbicara di depan umum berbasis perekaman audio browser & Speech Recognition AI.',
                'long_description' => 'Aplikasi web evaluasi keterampilan public speaking berbasis Python dan Flask. Dilengkapi fitur perekam audio presentasi langsung dari browser, upload berkas suara multiformat (WAV, MP3, M4A, AAC, OGG, WebM), modul transkripsi otomatis Google Speech Recognition, dan algoritma scoring diksi serta kelancaran tuturan.',
                'tags' => ['Python', 'Flask', 'SpeechRecognition AI', 'NLP', 'Audio Processing', 'HTML5 Audio'],
                'demo_url' => 'https://github.com/Ryozu-Zoldyck/Evaluasi-diksi',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/Evaluasi-diksi',
                'icon' => 'sparkles',
            ],
            [
                'id' => 'mie-ayam-pakde-ryo',
                'title' => 'Mie Ayam Pakde Ryo (Ryo Amerika)',
                'category' => 'web',
                'category_label' => 'Commercial Landing Page',
                'badge' => 'Live Commercial',
                'gradient' => 'from-amber-500/20 via-orange-500/10 to-red-500/20',
                'border_color' => 'border-amber-500/40 hover:border-amber-400',
                'description' => 'Website representatif bisnis kuliner Mie Ayam Pakde Ryo dengan katalog menu, integrasi Google Analytics, dan SEO.',
                'long_description' => 'Website profil bisnis kuliner resmi untuk Mie Ayam Ryo Amerika (Pakde Ryo). Menampilkan navigasi responsif, visual sajian, katalog menu interaktif, peta lokasi, sitemap XML, serta terintegrasi Google Tag Manager dan Google Analytics 4 (GA4) untuk pelacakan trafik pengunjung.',
                'tags' => ['HTML5', 'CSS3', 'JavaScript', 'Google Tag Manager', 'GA4 Analytics', 'SEO Sitemap'],
                'demo_url' => 'https://ryozu-zoldyck.github.io/MIE-AYAM-PAKDE-RYO/',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/MIE-AYAM-PAKDE-RYO',
                'icon' => 'shopping-bag',
            ],
            [
                'id' => 'ryozu-racing-team',
                'title' => 'Ryozu Racing Team - Bengkel & Booking',
                'category' => 'web',
                'category_label' => 'Web App / Booking System',
                'badge' => 'Workshop System',
                'gradient' => 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
                'border_color' => 'border-blue-500/40 hover:border-blue-400',
                'description' => 'Sistem pemesanan jadwal servis motor, manajemen profil kendaraan, katalog sparepart, dan administrasi bengkel.',
                'long_description' => 'Aplikasi web manajemen operasional bengkel otomotif Ryozu Racing Team. Menghadirkan autentikasi pengguna, registrasi pelanggan, pendaftaran data motor, pemesanan jadwal servis berkala, pemantauan status reservasi aktif, serta katalog sparepart berbasis PHP dan database MySQL relasional.',
                'tags' => ['PHP', 'MySQL Database', 'UIKit', 'JSON-LD', 'Session Auth', 'Responsive UI'],
                'demo_url' => 'https://github.com/Ryozu-Zoldyck/Latihan-JSON-LD',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/Latihan-JSON-LD',
                'icon' => 'wrench',
            ],
            [
                'id' => 'siyama-aryo',
                'title' => 'SIYAMA - Sistem Informasi Yayasan & Mahasiswa',
                'category' => 'web',
                'category_label' => 'Academic System',
                'badge' => 'Semester 4 Project',
                'gradient' => 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
                'border_color' => 'border-emerald-500/40 hover:border-emerald-400',
                'description' => 'Sistem informasi pengelolaan data yayasan dan mahasiswa akademik semester 4 berbasis Laravel MVC.',
                'long_description' => 'Aplikasi web Sistem Informasi Yayasan dan Mahasiswa (SIYAMA) yang dikerjakan pada perkuliahan semester 4. Mengimplementasikan arsitektur Model-View-Controller (MVC) Laravel, migrasi database, autentikasi role pengguna, dan konfigurasi deployment Railway.',
                'tags' => ['Laravel', 'PHP', 'MySQL', 'MVC Architecture', 'Railway Deployment', 'Webpack Mix'],
                'demo_url' => 'https://github.com/Ryozu-Zoldyck/siyama-aryo',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/siyama-aryo',
                'icon' => 'database',
            ],
            [
                'id' => 'mahasiswa-uym',
                'title' => 'Portal Mahasiswa UYM (Dockerized)',
                'category' => 'web',
                'category_label' => 'DevOps & Web App',
                'badge' => 'Containerized',
                'gradient' => 'from-sky-500/20 via-blue-500/10 to-indigo-500/20',
                'border_color' => 'border-sky-500/40 hover:border-sky-400',
                'description' => 'Portal pendataan mahasiswa Universitas YPPI Rembang dengan kontainerisasi Docker dan arsitektur Laravel.',
                'long_description' => 'Aplikasi web data mahasiswa UYM (Universitas YPPI Rembang) yang dikemas menggunakan Dockerfile multi-stage container untuk memastikan isolasi environment, portabilitas sistem, dan kemudahan deployment cloud modern.',
                'tags' => ['Laravel', 'Docker', 'Dockerfile', 'PHP', 'MySQL', 'Containerization'],
                'demo_url' => 'https://github.com/Ryozu-Zoldyck/mahasiswa-uym',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/mahasiswa-uym',
                'icon' => 'server',
            ],
            [
                'id' => 'my-portfolio',
                'title' => '3D Cyberpunk Interactive Portfolio',
                'category' => 'ui3d',
                'category_label' => '3D & WebGL',
                'badge' => 'Featured / Live',
                'gradient' => 'from-cyan-500/20 via-teal-500/10 to-blue-500/20',
                'border_color' => 'border-cyan-500/40 hover:border-cyan-400',
                'description' => 'Website portofolio resmi dengan kartu identitas 3D Three.js interaktif, Cyber HUD Canvas, dan Clean URL routing.',
                'long_description' => 'Portofolio personal berteknologi tinggi yang memadukan Laravel 12, Vite, Tailwind CSS v4, simulasi fisika 3D Lanyard ID card Three.js 60fps, canvas cyber HUD efek digital rain & wireframe wave, Web Audio API sound feedback, serta Clean URL routing tanpa simbol hash.',
                'tags' => ['Laravel 12', 'Three.js', 'WebGL', 'Tailwind CSS v4', 'Vite', 'HTML5 History API'],
                'demo_url' => 'https://ryozu-zoldyck.github.io/My-Portfolio/',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/My-Portfolio',
                'icon' => 'globe',
            ],
            [
                'id' => 'privacy-policy',
                'title' => 'Web & App Privacy Policy Hub',
                'category' => 'web',
                'category_label' => 'Compliance Web',
                'badge' => 'Live Policy',
                'gradient' => 'from-slate-500/20 via-zinc-500/10 to-neutral-500/20',
                'border_color' => 'border-slate-500/40 hover:border-slate-400',
                'description' => 'Halaman kepatuhan kebijakan privasi resmi untuk publikasi aplikasi dan layanan web digital.',
                'long_description' => 'Dokumen dan halaman web kebijakan privasi (Privacy Policy) untuk memenuhi standar kepatuhan regulasi perlindungan data pengguna pada aplikasi dan platform digital publik.',
                'tags' => ['HTML5', 'CSS Responsive', 'GitHub Pages', 'Compliance'],
                'demo_url' => 'https://ryozu-zoldyck.github.io/privacy-policy/',
                'github_url' => 'https://github.com/Ryozu-Zoldyck/privacy-policy',
                'icon' => 'shield-check',
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

