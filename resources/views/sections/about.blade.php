<section id="about" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-12">
            <span class="text-cyan-400 font-mono-code text-sm font-semibold">01.</span>
            <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Tentang Saya
            </h2>
            <div class="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1 ml-4"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left Portrait & Cyber Card -->
            <div class="lg:col-span-5 relative group">
                <div class="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 opacity-30 group-hover:opacity-75 blur-xl transition-all duration-500 -z-10"></div>
                
                <div class="glass-panel glass-panel-hover rounded-3xl p-6 overflow-hidden relative">
                    <!-- Top terminal bar -->
                    <div class="flex items-center justify-between pb-4 mb-6 border-b border-white/15 font-mono-code text-xs text-slate-300">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                        </div>
                        <span class="text-cyan-300 text-[11px]">aryo_profile.sys</span>
                    </div>

                    <!-- Cyber Visual Avatar -->
                    <div class="relative rounded-2xl glass-subcard p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                        <!-- Hologram circle with Real Photo -->
                        <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500 p-1 shadow-xl shadow-cyan-500/30 mb-5 relative group/avatar">
                            <div class="w-full h-full rounded-full bg-slate-950 overflow-hidden flex items-center justify-center">
                                <img src="images/aryo-avatar.jpg" alt="Aryo Kalimasada" class="w-full h-full object-cover object-[50%_55%] hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping pointer-events-none"></div>
                        </div>

                        <h3 class="font-heading font-bold text-xl text-white">Aryo Kalimasada</h3>
                        <p class="text-cyan-300 font-mono-code text-xs mt-1">Web & Roblox Game Developer • UYM</p>

                        <!-- Code snippet badge -->
                        <div class="mt-6 w-full text-left glass-subcard rounded-xl p-3 font-mono-code text-[11px] text-slate-300 space-y-1">
                            <div><span class="text-purple-300">const</span> engineer = {</div>
                            <div class="pl-4">name: <span class="text-emerald-300">'Aryo Kalimasada'</span>,</div>
                            <div class="pl-4">campus: <span class="text-cyan-300">'Univ. Yatsi Madani'</span>,</div>
                            <div class="pl-4">nim: <span class="text-amber-300">'23040153'</span>,</div>
                            <div class="pl-4">focus: <span class="text-sky-300">'Web & Roblox Dev'</span></div>
                            <div>};</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Bio & Key Stats -->
            <div class="lg:col-span-7 space-y-8">
                <div class="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                    @foreach($profile['bio_paragraphs'] as $para)
                    <p>{{ $para }}</p>
                    @endforeach
                    <p class="text-slate-300/80 text-base">
                        Fokus saya adalah menciptakan arsitektur kode yang bersih (clean architecture), keamanan sistem yang teruji, integrasi database yang teroptimasi, serta pengalaman visual yang interaktif melalui pemanfaatan animasi dan komponen 3D.
                    </p>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    @foreach($profile['stats'] as $stat)
                    <div class="p-4 rounded-2xl glass-panel glass-panel-hover text-center group">
                        <div class="text-3xl sm:text-4xl font-heading font-extrabold text-gradient-cyan group-hover:scale-105 transition-transform">
                            {{ $stat['value'] }}
                        </div>
                        <div class="text-xs font-mono-code text-slate-300 mt-1 uppercase tracking-wider">
                            {{ $stat['label'] }}
                        </div>
                    </div>
                    @endforeach
                </div>

                <!-- Quick highlights list -->
                <div class="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-cyan-300 shrink-0">
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h4 class="font-heading font-semibold text-white text-sm">Siap Berkolaborasi</h4>
                            <p class="text-xs text-slate-300/80">Terbuka untuk proyek web freelance, remote, atau konsultasi sistem.</p>
                        </div>
                    </div>
                    <a href="#contact" class="px-4 py-2 rounded-full text-xs font-mono-code font-medium glass-tag text-cyan-300 hover:text-white shrink-0 transition-colors">
                        Mulai Diskusi &rarr;
                    </a>
                </div>
            </div>

        </div>
    </div>
</section>

