<section id="experience" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-12">
            <span class="text-cyan-400 font-mono-code text-sm font-semibold">03.</span>
            <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Pengalaman & Riwayat
            </h2>
            <div class="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1 ml-4"></div>
        </div>

        <div class="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-12">
            @foreach($experiences as $exp)
            <div class="relative pl-8 group">
                <!-- Timeline glowing circle indicator -->
                <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300 shadow-md shadow-cyan-400/50"></div>

                <!-- Year badge on desktop (left floating) -->
                <div class="sm:absolute sm:-left-36 sm:top-0 sm:text-right font-mono-code text-xs font-semibold text-cyan-400 mb-2 sm:mb-0">
                    {{ $exp['period'] }}
                </div>

                <!-- Experience Card -->
                <div class="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7">
                    <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 class="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors">
                            {{ $exp['role'] }}
                        </h3>
                        <span class="px-3.5 py-1 rounded-full text-xs font-mono-code glass-tag text-cyan-200">
                            {{ $exp['company'] }}
                        </span>
                    </div>

                    <p class="text-slate-300/85 text-sm leading-relaxed mt-3">
                        {{ $exp['description'] }}
                    </p>
                </div>
            </div>
            @endforeach
        </div>

    </div>
</section>

