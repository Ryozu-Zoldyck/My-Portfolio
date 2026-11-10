<section id="home" class="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left Info Column -->
            <div class="lg:col-span-7 flex flex-col items-start space-y-6">
                <!-- Status Pill -->
                <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-subcard text-cyan-300 text-xs font-mono-code">
                    <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span class="font-semibold tracking-wider uppercase">Future-Ready Web Developer</span>
                </div>

                <!-- Main Heading -->
                <div class="space-y-2">
                    <h2 class="text-sm sm:text-base font-mono-code text-slate-400 tracking-widest uppercase">
                        Hi, I'm
                    </h2>
                    <h1 class="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
                        Aryo <span class="text-gradient-cyan">Kalimasada</span>
                    </h1>
                </div>

                <!-- Dynamic Typewriter Subtitle -->
                <div class="h-10 sm:h-12 flex items-center">
                    <div class="text-lg sm:text-2xl font-mono-code text-cyan-400 font-medium flex items-center">
                        <span class="text-slate-500 mr-2">&gt;</span>
                        <span id="typewriter-text" data-roles="{{ json_encode($profile['roles']) }}">
                            Fullstack Web Developer
                        </span>
                        <span class="w-2.5 h-6 ml-1 bg-cyan-400 animate-pulse"></span>
                    </div>
                </div>

                <!-- Description -->
                <p class="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
                    Menggabungkan ketangguhan <strong class="text-cyan-300 font-medium">Laravel & PHP Modern</strong> dengan estetika visual interaktif <strong class="text-cyan-300 font-medium">Three.js & Tailwind CSS</strong> untuk menciptakan sistem web yang cepat, responsif, dan meninggalkan kesan mendalam.
                </p>

                <!-- Action CTA Buttons -->
                <div class="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                    <a href="#portfolio" class="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-heading font-semibold text-sm tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_28px_rgba(6,182,212,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2">
                        <span>Lihat Karya & Portofolio</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>

                    <a href="#contact" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-heading font-semibold text-sm tracking-wide glass-subcard text-white hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2">
                        <i data-lucide="message-square" class="w-4 h-4 text-cyan-300"></i>
                        <span>Hubungi Saya</span>
                    </a>
                </div>

                <!-- Social Links & Presence -->
                <div class="pt-6 border-t border-white/10 w-full flex flex-wrap items-center justify-between gap-4">
                    <span class="text-xs font-mono-code text-slate-400 uppercase tracking-widest">Connect with me:</span>
                    <div class="flex items-center gap-3">
                        @foreach($profile['socials'] as $soc)
                        <a href="{{ $soc['url'] }}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl glass-icon-box text-slate-200 hover:text-cyan-300 flex items-center justify-center transition-all group hover:scale-110" title="{{ $soc['name'] }}">
                            <i data-lucide="{{ $soc['icon'] }}" class="w-4 h-4 transition-transform group-hover:scale-110"></i>
                        </a>
                        @endforeach
                    </div>
                </div>
            </div>

            <!-- Right 3D Interactive Lanyard Column -->
            <div class="lg:col-span-5 relative flex flex-col items-center justify-center">
                <!-- Strong Neon Cyan & Matrix Cyber Green Radial Ambient Glow behind ID Card -->
                <div class="absolute -top-10 -right-8 w-80 h-80 rounded-full ambient-glow-green -z-10 pointer-events-none animate-pulse"></div>
                <div class="absolute -bottom-8 -left-6 w-80 h-80 rounded-full ambient-glow-cyan -z-10 pointer-events-none"></div>
                <div class="absolute inset-0 rounded-3xl ambient-glow-teal -z-10 pointer-events-none"></div>

                <!-- 3D Lanyard Canvas Container -->
                <div class="w-full relative rounded-3xl glass-panel p-2 shadow-[0_0_55px_rgba(0,255,136,0.18),0_0_90px_rgba(0,242,254,0.22)] overflow-hidden group">
                    <!-- Inner Neon Cyber Green & Cyan Backlight Wash -->
                    <div class="absolute inset-0 bg-gradient-to-b from-[#00ff88]/18 via-[#00f2fe]/12 to-[#06b6d4]/20 pointer-events-none"></div>
                    <div class="absolute top-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                        <div class="flex items-center gap-1.5 px-3 py-1 rounded-full glass-tag text-[10px] font-mono-code text-cyan-300">
                            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                            <span>INTERACTIVE 3D WEBGL</span>
                        </div>
                        <span class="text-[10px] font-mono-code text-slate-400">DRAG / TILT</span>
                    </div>

                    <div id="lanyard-canvas-container" class="cursor-grab active:cursor-grabbing w-full"></div>

                    <!-- Interactive Drag Hint -->
                    <div class="p-3 rounded-2xl glass-subcard flex items-center justify-between text-xs text-slate-300">
                        <span class="flex items-center gap-1.5 font-mono-code text-[11px] text-cyan-300">
                            <i data-lucide="hand" class="w-3.5 h-3.5"></i>
                            Tarik & ayunkan kartu (Klik kartu untuk membalik 180°)
                        </span>
                        <button type="button" class="confetti-trigger px-2.5 py-1 rounded-full glass-tag text-[11px] font-mono-code text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer">
                            <span>🎉 Spark</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

