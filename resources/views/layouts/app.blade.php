<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#050510">
    <title>{{ $profile['full_name'] ?? 'Aryo' }} | Creative Fullstack Developer</title>
    <meta name="description" content="Portofolio resmi {{ $profile['full_name'] ?? 'Aryo' }} — Fullstack Web Developer, Laravel Specialist & Creative 3D Explorer.">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" rel="stylesheet">

    <!-- Vite Assets -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#030712] text-slate-100 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">

    <!-- Cyberpunk / Tech Hacker / Cyber HUD Background Layers -->
    @include('components.cyber-hud-bg')

    <!-- Navigation Bar -->
    @include('components.navbar')

    <!-- Main Content -->
    <main class="relative z-10">
        @yield('content')
    </main>

    <!-- Footer -->
    @include('components.footer')

    <!-- Project Details Modal -->
    @include('components.project-modal')

</body>
</html>

