<!-- Cyberpunk / Tech Hacker / Cyber HUD Background System -->
<div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transform-gpu" style="contain: strict;" aria-hidden="true">

    <!-- 1. Deep Base Layer & Blueprint Tech Grid -->
    <div class="absolute inset-0 bg-[#030712]"></div>
    <div class="absolute inset-0 cyber-blueprint-grid"></div>

    <!-- 2. Strong Radial Ambient Glow (Right / Behind 3D ID Card & Bottom Horizon) -->
    <!-- Matrix Cyber Green Core Glow -->
    <div class="absolute top-[12%] right-[10%] w-[480px] h-[520px] rounded-full ambient-glow-green animate-pulse"></div>
    <!-- Neon Cyan Outer Glow -->
    <div class="absolute top-[22%] right-[6%] w-[560px] h-[560px] rounded-full ambient-glow-cyan"></div>
    <!-- Secondary Teal/Emerald Horizon Glow -->
    <div class="absolute -bottom-24 left-1/3 w-[650px] h-[320px] rounded-full ambient-glow-teal hidden sm:block"></div>
    <div class="absolute top-1/4 left-[8%] w-[380px] h-[380px] rounded-full ambient-glow-blue hidden sm:block"></div>

    <!-- 3. Dot-Matrix Halftone Clusters (Top-Center-Left & Left-Middle like Reference) -->
    <div class="absolute top-6 left-[27%] w-56 h-36 cyber-dot-matrix opacity-25 hidden md:block"></div>
    <div class="absolute top-[42%] left-2 w-28 h-48 cyber-dot-matrix opacity-25 hidden lg:block"></div>

    <!-- 4. Left Code Snippet Watermark (C++ / PHP / Kernel Logs, Opacity 12-15%) -->
    <div class="absolute top-6 left-3 sm:left-6 flex gap-3 opacity-[0.14] font-mono-code text-[10px] sm:text-[11px] leading-[1.45] text-cyan-200/90 max-w-md overflow-hidden">
        <!-- Far-left vertical telemetry ticks -->
        <div class="hidden sm:flex flex-col items-center text-[9px] text-cyan-400/70 border-r border-cyan-500/20 pr-2 space-y-2 pt-1">
            <span>01</span>
            <span>//</span>
            <span>02</span>
            <span>03</span>
            <span>::</span>
            <span>04</span>
            <span>05</span>
            <span>//</span>
            <span>06</span>
            <span>07</span>
            <span>08</span>
            <span>::</span>
            <span>09</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
        </div>

        <!-- Monospaced Syntax Code Block -->
        <pre class="whitespace-pre font-mono-code text-sky-200/90">#include &lt;iostream&gt;
#include &lt;vector&gt;
#include &lt;memory&gt;
#include &lt;cyber/core_matrix.hpp&gt;

int main(int argc, char** argv) {
  octree = new Node("kalimasada_uym");
  
  uint64_t seed = initializeMatrix(23040153ULL);
  return renderHologram(seed);
}

void synchronizeVerletChain( Matrix4&amp; mtx ) {
  scalar = 0.9935f;
  const substeps = 20;
  matrix_stream.dispatch(&amp;Shader::LiquidGlass);
}

function bootCyberKernel($request) {
  $node = System::connect('RYOZU.DEV // UYM');
  return Response::stream($node-&gt;telemetry());
}
return 0x00FF88;</pre>
    </div>

    <!-- 5. 60FPS HTML5 Canvas: Binary Digital Rain (0 1 0 1) & Bottom Cyber Terrain/Bars -->
    <canvas id="cyber-hud-canvas" class="absolute inset-0 w-full h-full opacity-90"></canvas>

    <!-- 6. Glowing Circuit Board Traces (PCB / Motherboard Neon Lines on Right & Top-Right) -->
    <svg class="absolute top-0 right-0 w-full lg:w-[68%] h-full opacity-75" viewBox="0 0 1100 900" fill="none" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="pcbGradGreenCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00ff88" stop-opacity="0.95" />
                <stop offset="50%" stop-color="#00f2fe" stop-opacity="0.80" />
                <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.15" />
            </linearGradient>
            <linearGradient id="pcbGradCyan" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.85" />
                <stop offset="60%" stop-color="#10b981" stop-opacity="0.65" />
                <stop offset="100%" stop-color="#00f2fe" stop-opacity="0.05" />
            </linearGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <!-- Primary PCB Bus Lines radiating from behind the ID card toward Top-Right & Right -->
        <g stroke="url(#pcbGradGreenCyan)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" filter="url(#neonGlow)">
            <!-- Top-right ascending traces -->
            <path d="M 480 280 L 560 200 L 680 200 L 730 150 L 920 150 L 970 100 L 1100 100" class="circuit-trace trace-anim-1" />
            <path d="M 460 260 L 545 175 L 650 175 L 710 115 L 860 115 L 910 65 L 1100 65" class="circuit-trace trace-anim-2" />
            <path d="M 430 240 L 510 160 L 510 70 L 560 20 L 780 20" class="circuit-trace trace-anim-3" />
            <path d="M 400 220 L 465 155 L 465 45 L 510 0" opacity="0.7" />
            <path d="M 520 310 L 610 220 L 760 220 L 810 170 L 1020 170 L 1060 130 L 1100 130" class="circuit-trace trace-anim-1" />

            <!-- Mid-right horizontal & 45-deg traces -->
            <path d="M 550 360 L 660 250 L 830 250 L 880 300 L 1100 300" class="circuit-trace trace-anim-2" />
            <path d="M 570 390 L 675 285 L 810 285 L 865 340 L 1040 340 L 1080 380 L 1100 380" class="circuit-trace trace-anim-3" />
            <path d="M 580 430 L 720 430 L 770 380 L 950 380 L 990 420 L 1100 420" class="circuit-trace trace-anim-1" />
            <path d="M 580 455 L 740 455 L 790 405 L 930 405 L 975 450 L 1100 450" opacity="0.75" />
            <path d="M 570 490 L 710 490 L 760 540 L 940 540 L 980 500 L 1100 500" class="circuit-trace trace-anim-2" />

            <!-- Lower-right & bottom-card traces -->
            <path d="M 530 560 L 640 560 L 690 610 L 850 610 L 890 570 L 1100 570" class="circuit-trace trace-anim-3" />
            <path d="M 490 620 L 580 710 L 740 710 L 790 760 L 920 760" opacity="0.65" />
            <path d="M 340 650 L 260 730 L 120 730 L 70 780 L 0 780" stroke="url(#pcbGradCyan)" class="circuit-trace trace-anim-1" />
        </g>

        <!-- Secondary Fine Micro-Traces -->
        <g stroke="#00f2fe" stroke-opacity="0.32" stroke-width="1">
            <path d="M 610 200 L 610 120 L 660 70 L 820 70" />
            <path d="M 760 220 L 760 265 L 890 265 L 930 225 L 1100 225" />
            <path d="M 680 430 L 680 350 L 740 290 L 800 290" />
            <path d="M 830 455 L 830 510 L 910 510" />
            <path d="M 640 560 L 640 650 L 720 650" />
            <!-- IC Parallel Bus Ticks -->
            <line x1="700" y1="188" x2="700" y2="196" />
            <line x1="708" y1="188" x2="708" y2="196" />
            <line x1="716" y1="188" x2="716" y2="196" />
            <line x1="724" y1="188" x2="724" y2="196" />
            <line x1="870" y1="368" x2="870" y2="376" />
            <line x1="878" y1="368" x2="878" y2="376" />
            <line x1="886" y1="368" x2="886" y2="376" />
            <line x1="894" y1="368" x2="894" y2="376" />
        </g>

        <!-- Glowing Circuit Solder Pads & Nodes -->
        <g filter="url(#neonGlow)">
            <!-- Hollow PCB Via Rings -->
            <circle cx="560" cy="200" r="4.5" stroke="#00ff88" stroke-width="2" fill="#030712" />
            <circle cx="730" cy="150" r="4.5" stroke="#00ff88" stroke-width="2" fill="#030712" />
            <circle cx="660" cy="250" r="4.5" stroke="#00f2fe" stroke-width="2" fill="#030712" />
            <circle cx="830" cy="250" r="4.5" stroke="#00f2fe" stroke-width="2" fill="#030712" />
            <circle cx="770" cy="380" r="4.5" stroke="#00ff88" stroke-width="2" fill="#030712" />
            <circle cx="950" cy="380" r="4.5" stroke="#00f2fe" stroke-width="2" fill="#030712" />
            <circle cx="760" cy="540" r="4.5" stroke="#00ff88" stroke-width="2" fill="#030712" />
            <circle cx="690" cy="610" r="4.5" stroke="#00f2fe" stroke-width="2" fill="#030712" />

            <!-- Solid Neon Pulse Nodes -->
            <circle cx="510" cy="160" r="3.5" fill="#00ff88" />
            <circle cx="780" cy="20" r="4" fill="#00ff88" />
            <circle cx="610" cy="220" r="3.5" fill="#00ff88" />
            <circle cx="810" cy="170" r="3.5" fill="#00f2fe" />
            <circle cx="800" cy="290" r="3.5" fill="#00ff88" />
            <circle cx="910" cy="510" r="3.5" fill="#00f2fe" />
            <circle cx="720" cy="650" r="3.5" fill="#00ff88" />
            <circle cx="820" cy="70" r="3.5" fill="#00f2fe" />
        </g>
    </svg>

    <!-- 7. Tech Crosshairs (+), Corner Brackets & Numeric Coordinates -->
    <!-- Glowing Left-Lower Crosshair (+) like in reference screenshot -->
    <div class="absolute bottom-[30%] left-[14%] flex items-center justify-center opacity-70">
        <div class="w-7 h-[1.5px] bg-cyan-400 shadow-[0_0_8px_#00f2fe]"></div>
        <div class="h-7 w-[1.5px] bg-cyan-400 shadow-[0_0_8px_#00f2fe] absolute"></div>
    </div>

    <!-- Secondary Crosshairs -->
    <div class="absolute top-[20%] left-[44%] flex items-center justify-center opacity-40">
        <div class="w-4 h-px bg-emerald-400"></div>
        <div class="h-4 w-px bg-emerald-400 absolute"></div>
    </div>
    <div class="absolute top-[62%] left-[42%] flex items-center justify-center opacity-40">
        <div class="w-5 h-px bg-cyan-400"></div>
        <div class="h-5 w-px bg-cyan-400 absolute"></div>
    </div>

    <!-- Corner HUD Target Brackets & Coordinates -->
    <div class="absolute top-4 right-5 hidden sm:flex items-center gap-2 font-mono-code text-[10px] text-cyan-400/45 tracking-widest">
        <span>SYS.HUD // 0x23040153</span>
        <span class="w-2 h-2 border-t border-r border-cyan-400/60"></span>
    </div>
    <div class="absolute bottom-4 left-5 hidden sm:flex items-center gap-2 font-mono-code text-[10px] text-cyan-400/40 tracking-widest">
        <span class="w-2 h-2 border-b border-l border-cyan-400/60"></span>
        <span>LAT -6.1751° // LON 106.6300° // UYM_NODE</span>
    </div>

    <!-- 8. World Map / Data Wireframe HUD (Bottom-Right Corner like Reference) -->
    <div class="hidden xl:flex flex-col gap-3 absolute bottom-7 right-7 w-64 opacity-60">
        <!-- Upper World Map Wireframe Box -->
        <div class="relative p-2.5 border border-cyan-500/25 bg-[#040b1a]/60 backdrop-blur-sm">
            <!-- Corner HUD ticks -->
            <span class="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/70"></span>
            <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/70"></span>
            <span class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/70"></span>
            <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/70"></span>

            <!-- Left ruler ticks -->
            <div class="absolute left-0 top-3 bottom-3 w-1 flex flex-col justify-between opacity-50">
                <span class="w-1.5 h-px bg-cyan-400"></span>
                <span class="w-1 h-px bg-cyan-400"></span>
                <span class="w-1.5 h-px bg-cyan-400"></span>
                <span class="w-1 h-px bg-cyan-400"></span>
                <span class="w-1.5 h-px bg-cyan-400"></span>
            </div>

            <div class="flex items-center justify-between text-[8px] font-mono-code text-cyan-400/70 mb-1 px-1">
                <span>GLOBAL_NET // WIREFRAME</span>
                <span>98.4%</span>
            </div>

            <!-- Digital Dot-Matrix World Map SVG -->
            <svg viewBox="0 0 220 100" class="w-full h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Grid lines -->
                <line x1="0" y1="25" x2="220" y2="25" stroke="#06b6d4" stroke-opacity="0.15" stroke-dasharray="2 2" />
                <line x1="0" y1="50" x2="220" y2="50" stroke="#06b6d4" stroke-opacity="0.22" />
                <line x1="0" y1="75" x2="220" y2="75" stroke="#06b6d4" stroke-opacity="0.15" stroke-dasharray="2 2" />
                <line x1="55" y1="0" x2="55" y2="100" stroke="#06b6d4" stroke-opacity="0.15" stroke-dasharray="2 2" />
                <line x1="110" y1="0" x2="110" y2="100" stroke="#06b6d4" stroke-opacity="0.22" />
                <line x1="165" y1="0" x2="165" y2="100" stroke="#06b6d4" stroke-opacity="0.15" stroke-dasharray="2 2" />

                <!-- Continents Digital Polygon/Dot Silhouette -->
                <g fill="#38bdf8" fill-opacity="0.45" stroke="#00f2fe" stroke-width="0.6" stroke-opacity="0.7">
                    <!-- North America -->
                    <polygon points="18,18 45,14 58,28 48,44 34,48 24,36" />
                    <!-- South America -->
                    <polygon points="48,54 62,58 68,74 56,92 48,78" />
                    <!-- Europe & Asia -->
                    <polygon points="96,16 135,12 178,18 192,32 176,48 152,52 134,42 112,40 94,30" />
                    <!-- Africa -->
                    <polygon points="98,44 122,44 130,62 118,84 104,76 96,58" />
                    <!-- Indonesia & Maritime SEA -->
                    <polygon points="158,56 176,58 182,64 162,64" fill="#00ff88" fill-opacity="0.8" />
                    <!-- Australia -->
                    <polygon points="168,72 190,70 194,84 174,88" />
                </g>

                <!-- Glowing Crosshair (+) on Map -->
                <g stroke="#ffffff" stroke-width="1.2">
                    <line x1="128" y1="45" x2="140" y2="45" />
                    <line x1="134" y1="39" x2="134" y2="51" />
                </g>
                <!-- Active Ping on Indonesia -->
                <circle cx="168" cy="60" r="2.5" fill="#00ff88" />
                <circle cx="168" cy="60" r="6" stroke="#00ff88" stroke-width="0.8" stroke-opacity="0.7" />
            </svg>
        </div>

        <!-- Lower Secondary Telemetry / Sector Map Box -->
        <div class="relative p-2.5 border border-cyan-500/20 bg-[#040b1a]/50 backdrop-blur-sm">
            <span class="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400/70"></span>
            <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400/70"></span>

            <svg viewBox="0 0 220 75" class="w-full h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="#10b981" fill-opacity="0.35" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.6">
                    <polygon points="22,12 52,10 60,26 42,38 26,28" />
                    <polygon points="52,42 66,48 62,68 50,60" />
                    <polygon points="96,12 155,10 185,22 170,40 120,36 98,26" />
                    <polygon points="102,38 124,40 122,64 106,56" />
                    <polygon points="166,52 188,52 190,66 170,66" />
                </g>
                <!-- Data links between nodes -->
                <path d="M 45 24 Q 90 5 135 24 T 175 56" stroke="#00f2fe" stroke-width="0.8" stroke-dasharray="2 2" fill="none" />
                <circle cx="45" cy="24" r="2" fill="#00f2fe" />
                <circle cx="135" cy="24" r="2" fill="#00ff88" />
                <circle cx="175" cy="56" r="2" fill="#00f2fe" />
            </svg>
        </div>
    </div>

</div>

