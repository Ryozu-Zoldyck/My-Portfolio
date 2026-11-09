<section id="contact" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-12">
            <span class="text-cyan-400 font-mono-code text-sm font-semibold">04.</span>
            <h2 class="text-2xl sm:text-3xl font-heading font-bold text-white tracking-wide">
                Hubungi Saya & Buku Tamu
            </h2>
            <div class="h-px bg-gradient-to-r from-cyan-500/50 to-transparent flex-1 ml-4"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left: Direct Contact Form -->
            <div class="lg:col-span-6 space-y-6">
                <div class="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-cyan-300">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-heading font-bold text-xl text-white">Kirim Pesan via WhatsApp</h3>
                            <p class="text-xs text-slate-300/80">Isi form, lalu pesan langsung terkirim ke WhatsApp Aryo.</p>
                        </div>
                    </div>

                    <!-- Alert message -->
                    <div id="contact-alert" class="hidden mb-6 p-4 rounded-xl glass-subcard text-emerald-300 text-xs font-mono-code">
                        ✅ WhatsApp dibuka dengan pesan Anda. Tekan "Kirim" di aplikasi WhatsApp untuk mengirimnya.
                    </div>

                    <form id="contact-form" data-wa-number="6285714965810" class="space-y-4">
                        <div>
                            <label for="contact-name" class="block text-xs font-mono-code text-slate-200 mb-1.5 uppercase">Nama Lengkap</label>
                            <input type="text" id="contact-name" name="name" required placeholder="Nama Anda" class="w-full px-4 py-3 rounded-xl glass-input text-white placeholder-slate-400 text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="contact-email" class="block text-xs font-mono-code text-slate-200 mb-1.5 uppercase">Alamat Email (opsional)</label>
                            <input type="email" id="contact-email" name="email" placeholder="email@contoh.com" class="w-full px-4 py-3 rounded-xl glass-input text-white placeholder-slate-400 text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="contact-subject" class="block text-xs font-mono-code text-slate-200 mb-1.5 uppercase">Subjek / Topik</label>
                            <input type="text" id="contact-subject" name="subject" placeholder="Diskusi Proyek Web / Penawaran" class="w-full px-4 py-3 rounded-xl glass-input text-white placeholder-slate-400 text-sm focus:outline-none">
                        </div>

                        <div>
                            <label for="contact-message" class="block text-xs font-mono-code text-slate-200 mb-1.5 uppercase">Pesan</label>
                            <textarea id="contact-message" name="message" rows="4" required placeholder="Tuliskan detail pesan Anda di sini..." class="w-full px-4 py-3 rounded-xl glass-input text-white placeholder-slate-400 text-sm focus:outline-none"></textarea>
                        </div>

                        <button type="submit" class="w-full py-3.5 rounded-xl font-heading font-semibold text-sm tracking-wide bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer">
                            <i data-lucide="message-circle" class="w-4 h-4"></i>
                            <span>Kirim via WhatsApp</span>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Right: Interactive Live Guestbook -->
            <div class="lg:col-span-6 space-y-6">
                <div class="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col h-full">
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl glass-icon-box flex items-center justify-center text-purple-300">
                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 class="font-heading font-bold text-xl text-white">Pesan dari Pengunjung</h3>
                                <p class="text-xs text-slate-300/80">Kesan dan komentar dari orang-orang yang pernah mampir.</p>
                            </div>
                        </div>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
                    </div>

                    <!-- Guestbook Comments List -->
                    <div id="guestbook-list" class="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                        @forelse($guestbook_messages as $gmsg)
                        <div class="p-4 rounded-xl glass-subcard hover:border-cyan-400/40 transition-all">
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-full glass-icon-box flex items-center justify-center text-lg shrink-0">
                                    {{ $gmsg->avatar ?? '👨‍💻' }}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between gap-2">
                                        <h4 class="font-semibold text-white text-sm truncate">{{ $gmsg->name }}</h4>
                                        <span class="text-xs text-slate-400 font-mono-code">{{ $gmsg->time_ago }}</span>
                                    </div>
                                    <p class="text-slate-200 text-sm mt-1 break-words">{{ $gmsg->message }}</p>
                                </div>
                            </div>
                        </div>
                        @empty
                        <div class="text-center py-8 text-slate-500 text-xs font-mono-code">
                            Belum ada pesan dari pengunjung.
                        </div>
                        @endforelse
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

