/**
 * Cyberpunk / Tech Hacker / Cyber HUD Background Canvas
 * Renders:
 * 1. Vertical Binary Stream (0 1 0 1 Digital Rain) in the center-to-right zone
 * 2. Bottom Cybernetic Wireframe Terrain Wave + Glowing Vertex Nodes
 * 3. Bottom HUD Data Spectrum / Equalizer Bars
 */
export function initCyberHudCanvas(canvasId = 'cyber-hud-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return null;

  let width = 0;
  let height = 0;
  let isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  let dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
  let binaryColumns = [];
  let spectrumBars = [];
  let floatingNodes = [];
  let animationFrameId = null;
  let isRunning = false;

  function setupStreams() {
    binaryColumns = [];
    spectrumBars = [];
    floatingNodes = [];
    isMobile = window.innerWidth < 768;

    // 1. Binary Rain Columns (Concentrated in center-to-right)
    const colSpacing = isMobile ? 32 : 22;
    const startX = Math.floor(width * (isMobile ? 0.35 : 0.41));
    const endX = Math.floor(width * 0.94);

    for (let x = startX; x < endX; x += colSpacing) {
      const normX = (x - startX) / Math.max(1, endX - startX);
      const intensity = Math.sin(normX * Math.PI);
      if (Math.random() > (isMobile ? 0.72 : 0.82)) continue;

      const length = isMobile ? (8 + Math.floor(Math.random() * 8)) : (10 + Math.floor(Math.random() * 16));
      const digits = [];
      for (let i = 0; i < length; i++) {
        digits.push(Math.random() > 0.5 ? '1' : '0');
      }

      binaryColumns.push({
        x,
        y: Math.random() * height,
        speed: (isMobile ? 18 : 22) + Math.random() * 30,
        fontSize: isMobile ? 11 : (Math.random() > 0.35 ? 13 : 11),
        length,
        digits,
        isGreen: Math.random() > 0.32,
        baseAlpha: (0.12 + intensity * 0.14) * (0.75 + Math.random() * 0.35),
        flipTimer: Math.random() * 0.5,
      });
    }

    // 2. Bottom HUD Data Spectrum / Frequency Bars
    const barCount = isMobile ? Math.min(22, Math.floor(width / 20)) : Math.min(56, Math.floor(width / 18));
    const barZoneStart = width * (isMobile ? 0.15 : 0.24);
    const barZoneWidth = width * (isMobile ? 0.7 : 0.42);
    const barStep = barZoneWidth / barCount;

    for (let i = 0; i < barCount; i++) {
      const norm = i / barCount;
      const envelope = Math.sin(norm * Math.PI);
      spectrumBars.push({
        x: barZoneStart + i * barStep,
        baseHeight: (isMobile ? 8 : 10) + envelope * (isMobile ? 36 : 56),
        freq: 1.5 + Math.random() * 2.5,
        phase: i * 0.28 + Math.random(),
        isGreen: i % 3 === 0,
      });
    }

    // 3. Ambient Cyber Dust Nodes
    const nodeCount = isMobile ? 12 : 32;
    for (let i = 0; i < nodeCount; i++) {
      floatingNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 10,
        vy: -6 - Math.random() * 12,
        isGreen: Math.random() > 0.45,
        alpha: 0.18 + Math.random() * 0.4,
      });
    }
  }

  function resize() {
    isMobile = window.innerWidth < 768;
    dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    setupStreams();
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Terrain elevation helper for bottom cyber mesh
  function getTerrainY(x, row, t) {
    const nx = x / Math.max(1, width);
    // Two main mountain peaks on left-bottom and right-bottom like reference screenshot
    const leftPeak = Math.exp(-Math.pow((nx - 0.16) / 0.11, 2)) * 68;
    const midValley = Math.exp(-Math.pow((nx - 0.45) / 0.14, 2)) * 22;
    const rightPeak = Math.exp(-Math.pow((nx - 0.72) / 0.13, 2)) * 56;

    const wave1 = Math.sin(nx * 14 + t * 0.9 + row * 0.45) * 12;
    const wave2 = Math.cos(nx * 26 - t * 0.65 - row * 0.3) * 7;

    const depthFactor = row / 7; // 0 (back) -> 1 (front)
    const baseBottom = height - 10 - (1 - depthFactor) * 82;
    const elevation = (leftPeak + midValley + rightPeak + wave1 + wave2) * (0.45 + depthFactor * 0.65);

    return baseBottom - elevation;
  }

  let lastTime = performance.now();
  let lastRenderTime = 0;

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      lastTime = performance.now();
      lastRenderTime = performance.now();
    }
  });

  function render(now) {
    requestAnimationFrame(render);

    if (document.hidden) return;

    // Frame pacing: limit to ~33fps on mobile to preserve battery and keep thermal low
    if (isMobile && (now - lastRenderTime < 30)) {
      return;
    }
    lastRenderTime = now;

    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    const t = now * 0.001;

    ctx.clearRect(0, 0, width, height);

    // =========================================================
    // A. DRAW BINARY DIGITAL RAIN (0 1 0 1)
    // =========================================================
    ctx.textAlign = 'center';
    for (let i = 0; i < binaryColumns.length; i++) {
      const col = binaryColumns[i];
      col.y += col.speed * dt;
      col.flipTimer += dt;

      if (col.flipTimer > 0.22) {
        col.flipTimer = 0;
        const idx = Math.floor(Math.random() * col.length);
        col.digits[idx] = col.digits[idx] === '1' ? '0' : '1';
      }

      const totalHeight = col.length * (col.fontSize + 5);
      if (col.y - totalHeight > height) {
        col.y = -20;
      }

      ctx.font = `600 ${col.fontSize}px "JetBrains Mono", monospace`;

      for (let j = 0; j < col.length; j++) {
        const charY = col.y - j * (col.fontSize + 5);
        if (charY < -20 || charY > height + 20) continue;

        const tailRatio = 1 - j / col.length;
        const isHead = j === 0;
        const alpha = isHead ? Math.min(0.42, col.baseAlpha * 1.9) : col.baseAlpha * tailRatio;

        if (col.isGreen) {
          ctx.fillStyle = isHead
            ? `rgba(167, 243, 208, ${alpha})`
            : `rgba(0, 255, 136, ${alpha})`;
        } else {
          ctx.fillStyle = isHead
            ? `rgba(186, 230, 253, ${alpha})`
            : `rgba(0, 242, 254, ${alpha})`;
        }

        ctx.fillText(col.digits[j], col.x, charY);
      }
    }

    // =========================================================
    // B. DRAW BOTTOM HUD DATA SPECTRUM / EQUALIZER BARS
    // =========================================================
    const spectrumBaseline = height - 48;
    for (let i = 0; i < spectrumBars.length; i++) {
      const bar = spectrumBars[i];
      const pulse =
        0.55 +
        0.45 * Math.sin(t * bar.freq + bar.phase) * Math.cos(t * 1.1 - i * 0.15);
      const barH = Math.max(4, bar.baseHeight * pulse);

      const grad = ctx.createLinearGradient(0, spectrumBaseline - barH, 0, spectrumBaseline);
      if (bar.isGreen) {
        grad.addColorStop(0, 'rgba(0, 255, 136, 0.45)');
        grad.addColorStop(1, 'rgba(0, 255, 136, 0.03)');
      } else {
        grad.addColorStop(0, 'rgba(0, 242, 254, 0.42)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0.03)');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(bar.x, spectrumBaseline - barH, 2.2, barH);

      // Glowing cap dot on top of each spectrum bar
      ctx.fillStyle = bar.isGreen ? 'rgba(0, 255, 136, 0.65)' : 'rgba(0, 242, 254, 0.65)';
      ctx.fillRect(bar.x, spectrumBaseline - barH - 3, 2.2, 1.8);
    }

    // =========================================================
    // C. DRAW BOTTOM CYBER WIREFRAME TERRAIN MESH & NODES
    // =========================================================
    const rows = isMobile ? 3 : 6;
    const cols = isMobile ? Math.min(18, Math.floor(width / 24)) : Math.max(24, Math.floor(width / 44));
    const stepX = width / cols;
    const gridPts = [];

    for (let r = 0; r <= rows; r++) {
      const rowPts = [];
      for (let c = 0; c <= cols; c++) {
        const x = c * stepX;
        const y = getTerrainY(x, r, t);
        rowPts.push({ x, y });
      }
      gridPts.push(rowPts);
    }

    // Horizontal & diagonal wireframe triangles
    ctx.lineWidth = 0.85;
    for (let r = 0; r < rows; r++) {
      const alpha = 0.08 + (r / rows) * 0.18;
      ctx.strokeStyle = r % 2 === 0
        ? `rgba(0, 242, 254, ${alpha})`
        : `rgba(16, 185, 129, ${alpha})`;

      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const p00 = gridPts[r][c];
        const p10 = gridPts[r][c + 1];
        const p01 = gridPts[r + 1][c];

        // Horizontal ridge
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p10.x, p10.y);

        // Cross rib
        ctx.moveTo(p00.x, p00.y);
        ctx.lineTo(p01.x, p01.y);

        // Diagonal triangulation
        ctx.moveTo(p10.x, p10.y);
        ctx.lineTo(p01.x, p01.y);
      }
      ctx.stroke();
    }

    // Glowing vertex dots along terrain ridges
    for (let r = 1; r <= rows; r += 2) {
      for (let c = 0; c <= cols; c += 2) {
        const pt = gridPts[r][c];
        ctx.fillStyle = (c + r) % 4 === 0
          ? 'rgba(0, 255, 136, 0.55)'
          : 'rgba(56, 189, 248, 0.5)';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // =========================================================
    // D. FLOATING CYBER PARTICLES
    // =========================================================
    for (let i = 0; i < floatingNodes.length; i++) {
      const p = floatingNodes[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.fillStyle = p.isGreen
        ? `rgba(0, 255, 136, ${p.alpha})`
        : `rgba(0, 242, 254, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isRunning) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);
  }

  function stop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    ctx.clearRect(0, 0, width, height);
  }

  // Listen for graphics mode switch events
  window.addEventListener('graphics-mode-change', (e) => {
    const mode = e.detail?.mode;
    if (mode === 'performance') {
      stop();
    } else {
      start();
    }
  });

  // Start initially unless explicitly configured in performance mode
  const initialMode = localStorage.getItem('ryozu_graphics_mode') || 'visual';
  if (initialMode !== 'performance') {
    start();
  }

  return {
    start,
    stop,
    isRunning: () => isRunning,
  };
}

