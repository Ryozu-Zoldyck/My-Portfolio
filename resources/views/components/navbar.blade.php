<header id="navbar-root" class="navbar-root">
    <div class="navbar-container ios-glass-surface">
        <!-- iOS Liquid Glass Specular Layers -->
        <span class="ios-glass-sheen" aria-hidden="true"></span>
        <span class="ios-glass-rim" aria-hidden="true"></span>

        <div class="ios-glass-content">
            <!-- Desktop Ambient Pill Navigation -->
            <nav class="navbar-links" aria-label="Primary Navigation">
                <a href="#home" data-section="home" class="navbar-link-item is-active">
                    <span>Home</span>
                    <span class="navbar-active-pill" aria-hidden="true"></span>
                </a>
                <a href="#about" data-section="about" class="navbar-link-item">
                    <span>About</span>
                    <span class="navbar-active-pill" aria-hidden="true"></span>
                </a>
                <a href="#portfolio" data-section="portfolio" class="navbar-link-item">
                    <span>Portfolio</span>
                    <span class="navbar-active-pill" aria-hidden="true"></span>
                </a>
                <a href="#contact" data-section="contact" class="navbar-link-item">
                    <span>Contact</span>
                    <span class="navbar-active-pill" aria-hidden="true"></span>
                </a>
            </nav>

            <!-- Mobile Centered Brand -->
            <span class="navbar-mobile-brand">
                Ryozu<span class="text-cyan-400">.DEV</span>
            </span>

            <!-- Right Actions: Divider + Graphics Mode + Sound Button + Mobile Toggle -->
            <div class="navbar-actions">
                <span class="navbar-actions-divider" aria-hidden="true"></span>

                <!-- Graphics Mode Toggle Button (Visual vs Performance) -->
                <button
                    id="graphics-mode-btn"
                    type="button"
                    class="navbar-icon-btn hidden sm:inline-flex"
                    aria-label="Ganti Mode Grafis (Visual / Performa)"
                    title="Mode Grafis (Visual / Performa)"
                    data-mode="visual"
                >
                    <i id="gfx-icon-visual" data-lucide="sparkles" class="w-4 h-4 text-cyan-400"></i>
                    <i id="gfx-icon-perf" data-lucide="zap" class="w-4 h-4 text-amber-400 hidden"></i>
                </button>

                <button
                    id="sound-toggle-btn"
                    type="button"
                    class="navbar-icon-btn"
                    aria-label="Toggle Sound Effects"
                    title="Toggle Ambient UI Sound"
                    data-sound-enabled="true"
                >
                    <i id="sound-icon-on" data-lucide="volume-2" class="w-4 h-4"></i>
                    <i id="sound-icon-off" data-lucide="volume-x" class="w-4 h-4 hidden opacity-60"></i>
                </button>

                <button
                    id="mobile-menu-btn"
                    type="button"
                    class="navbar-mobile-toggle"
                    aria-label="Toggle Mobile Navigation"
                >
                    <i data-lucide="menu" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Liquid Glass Dropdown Menu -->
    <div id="mobile-menu-drawer" class="navbar-mobile-menu ios-glass-surface">
        <span class="ios-glass-sheen" aria-hidden="true"></span>
        <span class="ios-glass-rim" aria-hidden="true"></span>
        <div class="relative z-10 w-full p-4 flex flex-col gap-1.5">
            <a href="#home" data-section="home" class="mobile-nav-link px-4 py-2.5 rounded-full text-sm font-bold text-white bg-white/10 border border-white/15 flex items-center justify-between">
                <span>Home</span>
                <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            </a>
            <a href="#about" data-section="about" class="mobile-nav-link px-4 py-2.5 rounded-full text-sm font-bold text-slate-200/80 hover:text-white hover:bg-white/10 transition-colors">
                About
            </a>
            <a href="#portfolio" data-section="portfolio" class="mobile-nav-link px-4 py-2.5 rounded-full text-sm font-bold text-slate-200/80 hover:text-white hover:bg-white/10 transition-colors">
                Portfolio
            </a>
            <a href="#contact" data-section="contact" class="mobile-nav-link px-4 py-2.5 rounded-full text-sm font-bold text-slate-200/80 hover:text-white hover:bg-white/10 transition-colors">
                Contact
            </a>

            <!-- Mobile Quick Graphics Switch -->
            <div class="pt-3 mt-2 border-t border-white/10 flex items-center justify-between px-2">
                <span class="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <i data-lucide="cpu" class="w-3.5 h-3.5 text-cyan-400"></i>
                    <span>Mode Tampilan</span>
                </span>
                <button
                    id="mobile-gfx-toggle"
                    type="button"
                    class="px-3 py-1.5 text-xs font-mono font-semibold rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 flex items-center gap-1.5 hover:bg-cyan-500/20 active:scale-95 transition-all"
                >
                    <i id="mobile-gfx-icon" data-lucide="sparkles" class="w-3.5 h-3.5 text-cyan-400"></i>
                    <span id="mobile-gfx-label">Visual (FX Aktif)</span>
                </button>
            </div>
        </div>
    </div>
</header>
