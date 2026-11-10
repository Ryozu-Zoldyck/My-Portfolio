<div id="project-modal" class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
    <div class="modal-content w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <!-- Close button -->
        <button id="modal-close-btn" type="button" class="absolute top-5 right-5 w-9 h-9 rounded-full glass-icon-box text-slate-300 hover:text-white flex items-center justify-center transition-all focus:outline-none cursor-pointer" aria-label="Tutup Modal">
            <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <!-- Category & Title -->
        <div class="space-y-2 pr-10">
            <span id="modal-project-category" class="px-3.5 py-1 rounded-full text-xs font-mono-code font-semibold uppercase glass-tag text-cyan-300">
                Web App
            </span>
            <h3 id="modal-project-title" class="text-2xl sm:text-3xl font-heading font-bold text-white mt-3">
                Judul Proyek
            </h3>
        </div>

        <!-- Long Description -->
        <div class="my-6">
            <h4 class="text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-2">Tentang Proyek:</h4>
            <p id="modal-project-desc" class="text-slate-200 text-sm sm:text-base leading-relaxed">
                Deskripsi proyek lengkap.
            </p>
        </div>

        <!-- Technology Stack Tags -->
        <div class="mb-8">
            <h4 class="text-xs font-mono-code text-slate-300 uppercase tracking-widest mb-2.5">Teknologi yang Digunakan:</h4>
            <div id="modal-project-tags" class="flex flex-wrap gap-2">
                <!-- Dynamically populated tags -->
            </div>
        </div>

        <!-- Action Links -->
        <div class="pt-5 border-t border-white/15 flex flex-wrap items-center justify-end gap-3">
            <a id="modal-project-github" href="#" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-white glass-tag flex items-center gap-2">
                <x-brand-icon name="github" class="w-4 h-4" />
                <span>Source Code</span>
            </a>

            <a id="modal-project-demo" href="#" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_6px_18px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2">
                <span>Kunjungi Demo</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
            </a>
        </div>
    </div>
</div>

