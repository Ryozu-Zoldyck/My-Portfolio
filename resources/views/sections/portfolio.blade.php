<section id="portfolio" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-8">
            <span class="text-cyan-400 font-mono-code text-sm font-semibold">02.</span>
            <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Portofolio & Rekam Jejak
            </h2>
            <div class="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1 ml-4"></div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-12">
            <button type="button" data-tab="projects" class="portfolio-tab-btn is-tab-active px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-semibold tracking-wide text-white transition-all flex items-center gap-2">
                <i data-lucide="layers" class="w-4 h-4 text-cyan-300"></i>
                <span>Proyek Unggulan</span>
            </button>

            <button type="button" data-tab="skills" class="portfolio-tab-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-semibold tracking-wide text-slate-300 hover:text-white transition-all flex items-center gap-2">
                <i data-lucide="cpu" class="w-4 h-4 text-cyan-300"></i>
                <span>Keahlian & Stack</span>
            </button>

            <button type="button" data-tab="certificates" class="portfolio-tab-btn px-5 py-2.5 rounded-full text-xs sm:text-sm font-heading font-semibold tracking-wide text-slate-300 hover:text-white transition-all flex items-center gap-2">
                <i data-lucide="award" class="w-4 h-4 text-cyan-300"></i>
                <span>Sertifikasi & Prestasi</span>
            </button>
        </div>

        <!-- 1. TAB VIEW: PROJECTS -->
        <div data-tab-content="projects" class="portfolio-tab-view grid grid-cols-1 md:grid-cols-2 gap-8">
            @foreach($projects as $proj)
            <div class="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden">
                <!-- Background radial glow -->
                <div class="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl group-hover:bg-cyan-400/25 transition-all pointer-events-none"></div>

                <div>
                    <!-- Top card info & badge -->
                    <div class="flex items-center justify-between mb-5">
                        <div class="w-12 h-12 rounded-2xl glass-icon-box flex items-center justify-center text-cyan-300">
                            <i data-lucide="{{ $proj['icon'] ?? 'folder' }}" class="w-6 h-6"></i>
                        </div>
                        <span class="px-3.5 py-1 rounded-full text-[11px] font-mono-code font-semibold tracking-wider uppercase glass-tag text-cyan-300">
                            {{ $proj['badge'] }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h3 class="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {{ $proj['title'] }}
                    </h3>

                    <!-- Short Description -->
                    <p class="text-slate-300/85 text-sm sm:text-base mt-3 leading-relaxed">
                        {{ $proj['description'] }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mt-5">
                        @foreach($proj['tags'] as $tag)
                        <span class="px-3 py-1 rounded-lg text-xs font-mono-code glass-tag">
                            {{ $tag }}
                        </span>
                        @endforeach
                    </div>
                </div>

                <!-- Bottom card action -->
                <div class="pt-6 mt-6 border-t border-white/15 flex items-center justify-between">
                    <button type="button" class="project-card-trigger px-3.5 py-1.5 rounded-full glass-tag text-xs font-heading font-semibold text-cyan-300 hover:text-white flex items-center gap-1.5 focus:outline-none cursor-pointer" data-project="{{ json_encode($proj) }}">
                        <span>Lihat Detail Lengkap</span>
                        <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                    </button>

                    <div class="flex items-center gap-3">
                        @if($proj['github_url'])
                        <a href="{{ $proj['github_url'] }}" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full glass-icon-box flex items-center justify-center text-slate-300 hover:text-white transition-colors" title="Lihat Source Code">
                            <x-brand-icon name="github" class="w-4 h-4" />
                        </a>
                        @endif
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        <!-- 2. TAB VIEW: SKILLS -->
        <div data-tab-content="skills" class="portfolio-tab-view hidden grid grid-cols-1 md:grid-cols-2 gap-8">
            @foreach($skill_categories as $cat)
            <div class="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-cyan-300">
                        <i data-lucide="{{ $cat['icon'] }}" class="w-5 h-5"></i>
                    </div>
                    <h3 class="font-heading font-bold text-xl text-white">
                        {{ $cat['title'] }}
                    </h3>
                </div>

                <div class="space-y-4">
                    @foreach($cat['skills'] as $skill)
                    <div class="space-y-1.5">
                        <div class="flex items-center justify-between text-xs font-mono-code">
                            <span class="text-slate-200 font-medium">{{ $skill['name'] }}</span>
                            <span class="text-cyan-300">{{ $skill['level'] }}</span>
                        </div>
                        <div class="w-full h-2.5 rounded-full glass-subcard overflow-hidden p-0.5">
                            <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-all duration-1000" style="width: {{ $skill['level'] }}"></div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            @endforeach
        </div>

        <!-- 3. TAB VIEW: CERTIFICATES & AWARDS -->
        <div data-tab-content="certificates" class="portfolio-tab-view hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            @foreach($certificates as $cert)
            <div class="glass-panel glass-panel-hover rounded-3xl p-6 flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl glass-icon-box flex items-center justify-center text-cyan-300 shrink-0">
                    <i data-lucide="{{ $cert['icon'] ?? 'award' }}" class="w-6 h-6"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2">
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-semibold uppercase glass-tag text-cyan-300">
                            {{ $cert['category'] }}
                        </span>
                        <span class="text-xs font-mono-code text-slate-400">{{ $cert['year'] }}</span>
                    </div>
                    <h4 class="font-heading font-bold text-base text-white mt-2">
                        {{ $cert['title'] }}
                    </h4>
                    <p class="text-xs text-slate-300/80 mt-1">
                        Diterbitkan oleh: <span class="text-white font-medium">{{ $cert['issuer'] }}</span>
                    </p>
                </div>
            </div>
            @endforeach
        </div>

    </div>
</section>

