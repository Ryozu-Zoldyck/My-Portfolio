<header id="navbar-root" class="navbar-root">
    <div class="navbar-container ios-glass-surface">
        <!-- iOS Liquid Glass Specular Layers -->
        <span class="ios-glass-sheen" aria-hidden="true"></span>
        <span class="ios-glass-rim" aria-hidden="true"></span>

        <div class="ios-glass-content">
            <!-- Desktop Brand Mark -->
            <a href="#home" data-section="home" class="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors mr-1">
                <img src="images/ryozu-logo.jpg" alt="Ryozu Logo" class="w-6 h-6 rounded-lg object-contain bg-black border border-white/20 shadow-[0_0_10px_rgba(34,211,238,0.35)]" />
                <span class="font-heading font-bold text-xs tracking-wider text-white">Ryozu<span class="text-cyan-400">.DEV</span></span>
            </a>

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

            <!-- Mobile Brand (Clickable to Home, Single Line Row) -->
            <a href="#home" data-section="home" class="navbar-mobile-brand flex items-center gap-2">
                <img src="images/ryozu-logo.jpg" alt="Ryozu Logo" class="w-6 h-6 rounded-md object-contain bg-black border border-white/20 shadow-[0_0_8px_rgba(34,211,238,0.3)] shrink-0" />
                <span class="leading-none font-heading font-bold text-sm tracking-tight text-white">Ryozu<span class="text-cyan-400">.DEV</span></span>
            </a>

            <!-- Right Actions: Divider + Ambient Sound Button + Mobile Toggle -->
            <div class="navbar-actions">
                <span class="navbar-actions-divider" aria-hidden="true"></span>

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
            <div class="flex items-center gap-2.5 px-3 py-2 mb-1 border-b border-white/10">
                <img src="images/ryozu-logo.jpg" alt="Ryozu Logo" class="w-7 h-7 rounded-lg object-contain bg-black border border-white/15 shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
                <span class="font-heading font-bold text-sm text-white">Ryozu<span class="text-cyan-400">.DEV</span></span>
            </div>
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
        </div>
    </div>
</header>
