import * as THREE from 'three';

// Constants & Configuration matching studio lanyard physics
const LAYOUTS = {
  portrait: [1.56, 2.45],
  landscape: [2.25, 1.6],
};
const ANCHORS = { left: 0.27, center: 0.5, right: 0.73 };
const CARD_DEPTH = 0.018;
const CARD_BEVEL = 0.007;
const isMobileDevice = typeof window !== 'undefined' && (
  window.innerWidth < 768 ||
  ('ontouchstart' in window && window.innerWidth < 1024)
);

const SEGMENTS = 4; // 5 nodes (0..4)
const INV_NODE_MASS = 20;
const STEP_DT = isMobileDevice ? 1 / 360 : 1 / 960;
const SOLVER_ITERS = 2;
const RIBBON_ROWS = isMobileDevice ? 36 : 72;
const CAMERA_FOV = 24;
const BASE_STRAP_WIDTH = 0.36;
const SPLIT_RING_RADIUS = 0.095;
const SPLIT_RING_TUBE = 0.0135;
const EYELET_RADIUS = 0.036;
const CARD_TEX_WIDTH = 1024;

const FINISH_PRESETS = {
  glossy: { roughness: 0.42, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.06, foil: 0.15, anisotropy: 0 },
  matte: { roughness: 0.85, metalness: 0, clearcoat: 0, clearcoatRoughness: 0.6, foil: 0, anisotropy: 0 },
  holographic: { roughness: 0.3, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04, foil: 0.85, anisotropy: 0 },
  metallic: { roughness: 0.36, metalness: 0.75, clearcoat: 0.5, clearcoatRoughness: 0.18, foil: 0, anisotropy: 0.7 },
};

const METAL_PRESETS = {
  silver: { color: '#d9dce2', roughness: 0.16 },
  gold: { color: '#e4b965', roughness: 0.2 },
  graphite: { color: '#4d4f55', roughness: 0.28 },
};

const RIBBON_U = [0, 0.07, 0.93, 1];
const RIBBON_NORM_ANGLES = [-0.95, -0.28, 0.28, 0.95];
const FLIP_IMPULSE = 9;

// Shaders for subtle holographic foil sheen on the card
const FOIL_VERT_PARS = `
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;
`;

const FOIL_VERT_MAIN = `
vFoilUv = uv;
vFoilX = normalize((modelViewMatrix * vec4(1.0, 0.0, 0.0, 0.0)).xyz);
vFoilY = normalize((modelViewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
`;

const FOIL_FRAG_PARS = `
uniform float foilStrength;
uniform float foilAspect;
uniform vec3 foilKey;
uniform vec3 foilFill;
uniform vec3 foilTop;
varying vec2 vFoilUv;
varying vec3 vFoilX;
varying vec3 vFoilY;

float foilHash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float foilBump(float t, float center, float width) {
  float x = (t - center) / width;
  return max(0.0, 1.0 - x * x);
}

vec3 foilSpectrum(float t) {
  return vec3(
    foilBump(t, 0.82, 0.32) + 0.4 * foilBump(t, 0.02, 0.12),
    foilBump(t, 0.5, 0.26),
    foilBump(t, 0.18, 0.24)
  );
}

vec3 foilGrating(float u, float spacing) {
  vec3 color = vec3(0.0);
  for (int m = 1; m <= 2; m++) {
    float order = float(m);
    float t = (spacing * abs(u) / order - 0.38) / 0.32;
    color += foilSpectrum(t) / order;
  }
  return color;
}

vec3 foilShard(vec2 p) {
  vec2 base = floor(p);
  float best = 9.0;
  float edge = 9.0;
  vec2 id = base;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 cell = base + vec2(float(i), float(j));
      vec2 site = cell + vec2(foilHash(cell), foilHash(cell + 7.31)) * 0.9 + 0.05;
      float d = length(site - p);
      if (d < best) {
        edge = best;
        best = d;
        id = cell;
      } else if (d < edge) {
        edge = d;
      }
    }
  }
  return vec3(foilHash(id + 3.17), foilHash(id + 11.73), edge - best);
}
`;

const FOIL_FRAG_MAIN = `
if (foilStrength > 0.0) {
  vec3 foilView = normalize(vViewPosition);
  vec3 foilNormal = normalize(normal);
  vec2 foilP = vec2(vFoilUv.x, vFoilUv.y * foilAspect);
  vec3 shard = foilShard(foilP * 26.0);
  vec2 ray = foilP - vec2(-1.6, 2.6 * foilAspect);
  float angle = atan(ray.y, ray.x) + (shard.x - 0.5) * 0.16;
  vec3 grating = normalize(vFoilX * cos(angle) + vFoilY * sin(angle));
  float spacing = 1.7 * (0.95 + shard.y * 0.1);
  vec3 rainbow = foilGrating(dot(foilKey + foilView, grating), spacing);
  rainbow += 0.6 * foilGrating(dot(foilTop + foilView, grating), spacing);
  rainbow *= 0.8 + 0.2 * smoothstep(0.0, 0.04, shard.z);
  rainbow = max(rainbow - 0.35 * min(rainbow.r, min(rainbow.g, rainbow.b)), 0.0);
  vec2 grid = foilP * 64.0;
  vec2 cell = floor(grid);
  vec2 jitter = vec2(foilHash(cell + 1.7), foilHash(cell + 9.2));
  float flake = smoothstep(0.32, 0.06, length(fract(grid) - jitter * 0.6 - 0.2)) * step(0.45, foilHash(cell + 4.4));
  vec3 facet = normalize(foilNormal + (vFoilX * (jitter.x - 0.5) + vFoilY * (jitter.y - 0.5)) * 0.8);
  float glint = pow(max(dot(reflect(-foilKey, facet), foilView), 0.0), 28.0);
  glint += 0.7 * pow(max(dot(reflect(-foilTop, facet), foilView), 0.0), 28.0);
  float fine = 1.0 - smoothstep(0.35, 0.9, max(fwidth(grid.x), fwidth(grid.y)));
  vec3 sparkle = flake * glint * fine * (vec3(0.7) + foilGrating(dot(foilKey + foilView, grating) + jitter.x * 0.4, spacing));
  float ink = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  float foil = foilStrength * (0.08 + 0.92 * smoothstep(0.04, 0.7, ink));
  float facing = clamp(dot(foilNormal, foilView), 0.0, 1.0);
  float tint = clamp(dot(rainbow, vec3(0.4)), 0.0, 1.0);
  outgoingLight = outgoingLight * (1.0 - foil * (0.3 + 0.32 * tint)) + (rainbow * 0.62 * (0.4 + 0.6 * facing) + sparkle * 1.6) * foil;
}
`;

// Helper math & geometry builders
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const lerp = (a, b, t) => a + (b - a) * t;

function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawRoundedRectPath(path, x, y, w, h, r) {
  const rad = Math.max(0, Math.min(r, w / 2, h / 2));
  const k = rad * 0.4477;
  path.moveTo(x + rad, y);
  path.lineTo(x + w - rad, y);
  path.bezierCurveTo(x + w - k, y, x + w, y + k, x + w, y + rad);
  path.lineTo(x + w, y + h - rad);
  path.bezierCurveTo(x + w, y + h - k, x + w - k, y + h, x + w - rad, y + h);
  path.lineTo(x + rad, y + h);
  path.bezierCurveTo(x + k, y + h, x, y + h - k, x, y + h - rad);
  path.lineTo(x, y + rad);
  path.bezierCurveTo(x, y + k, x + k, y, x + rad, y);
}

function getCardSpec(orientation, cornerRadius) {
  const [width, height] = LAYOUTS[orientation] || LAYOUTS.portrait;
  const radius = lerp(0.03, Math.min(width, height) * 0.2, clamp(cornerRadius, 0, 1));
  const slot = { width: 0.34, height: 0.07, y: height / 2 - 0.13 };
  const ringY = height / 2 - 0.055;
  return {
    width,
    height,
    radius,
    slot,
    ringY,
    hangY: ringY + SPLIT_RING_RADIUS,
  };
}

function createCardGeometries(spec) {
  const { width, height, radius, slot } = spec;
  const shape = new THREE.Shape();
  drawRoundedRectPath(
    shape,
    -width / 2 + CARD_BEVEL,
    -height / 2 + CARD_BEVEL,
    width - CARD_BEVEL * 2,
    height - CARD_BEVEL * 2,
    Math.max(radius - CARD_BEVEL, 0.005)
  );

  // Punched stadium slot hole at top of card
  const hole = new THREE.Path();
  drawRoundedRectPath(
    hole,
    -slot.width / 2 - CARD_BEVEL,
    slot.y - slot.height / 2 - CARD_BEVEL,
    slot.width + CARD_BEVEL * 2,
    slot.height + CARD_BEVEL * 2,
    slot.height / 2 + CARD_BEVEL
  );
  shape.holes.push(hole);

  const body = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_DEPTH,
    bevelEnabled: true,
    bevelThickness: CARD_BEVEL,
    bevelSize: CARD_BEVEL,
    bevelSegments: 5,
    curveSegments: 24,
  });
  body.translate(0, 0, -CARD_DEPTH / 2);

  const face = new THREE.ShapeGeometry(shape, 24);
  const posAttr = face.getAttribute('position');
  const uvAttr = face.getAttribute('uv');
  for (let i = 0; i < posAttr.count; i++) {
    uvAttr.setXY(
      i,
      (posAttr.getX(i) + width / 2) / width,
      (posAttr.getY(i) + height / 2) / height
    );
  }
  uvAttr.needsUpdate = true;

  return { body, face };
}

function createClampGeometry(strapWidth) {
  const shape = new THREE.Shape();
  const w = strapWidth * 1.16;
  drawRoundedRectPath(shape, -w / 2 + 0.014, -0.061, w - 0.028, 0.122, 0.024);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 6,
    curveSegments: 10,
  });
  geom.translate(0, 0, -0.01);
  return geom;
}

function createRibbonGeometry(rows) {
  const cols = RIBBON_U.length;
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(rows * cols * 3), 3));
  geom.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(rows * cols * 3), 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(rows * cols * 2), 2));

  const indices = [];
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const idx = r * cols + c;
      indices.push(idx, idx + cols, idx + 1, idx + 1, idx + cols, idx + cols + 1);
    }
  }
  geom.setIndex(indices);
  return geom;
}

function createStudioEnvironment(renderer) {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0.035, 0.035, 0.04);
  const planeGeo = new THREE.PlaneGeometry(1, 1);
  const mats = [];
  const addPanel = (intensity, pos, scale, rotZ = 0) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide,
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.position.set(...pos);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    mesh.rotateZ(rotZ);
    envScene.add(mesh);
  };

  addPanel(2.6, [0, 4.5, 8], [9, 4]);
  addPanel(6.0, [-5.5, 0.5, 7], [0.9, 14]);
  addPanel(4.0, [5, -0.5, 8], [0.6, 14]);
  addPanel(3.5, [0, -1, 9], [24, 0.35], Math.PI / 3);
  addPanel(2.5, [1, 2.5, 9], [24, 0.2], Math.PI / 3);
  addPanel(1.4, [0, 6, -6], [12, 4]);
  addPanel(0.5, [0, -7, 1], [16, 6]);
  addPanel(0.9, [8, 0, -2], [4, 10]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTarget = pmrem.fromScene(envScene, 0.035);
  pmrem.dispose();
  planeGeo.dispose();
  mats.forEach((m) => m.dispose());
  return envTarget;
}

function createCardMicroNormalMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const rand = seededRandom(7);
  const noise = Float32Array.from({ length: 16384 }, () => rand());
  const sample = (x, y) => {
    let sum = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        sum += noise[((y + dy + 128) % 128) * 128 + ((x + dx + 128) % 128)];
      }
    }
    return (sum / 9) * 1.6;
  };

  const imgData = ctx.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const nx = sample((x - 1 + 128) % 128, y) - sample((x + 1) % 128, y);
      const ny = sample(x, (y - 1 + 128) % 128) - sample(x, (y + 1) % 128);
      const len = Math.hypot(nx, ny, 1);
      const idx = (y * 128 + x) * 4;
      imgData.data[idx] = ((nx / len) * 0.5 + 0.5) * 255;
      imgData.data[idx + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      imgData.data[idx + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      imgData.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 7);
  return tex;
}

function createWovenStrapNormalMap() {
  const rand = seededRandom(19);
  const noise = Float32Array.from({ length: 16384 }, () => rand());
  const arch = (v) => Math.sqrt(Math.max(0, 1 - 4 * v * v));
  const heightAt = (x, y) => {
    const ix = ((x % 128) + 128) % 128;
    const iy = ((y % 128) + 128) % 128;
    const gx = (ix / 128) * 8;
    const gy = (iy / 128) * 8;
    const cx = Math.floor(gx);
    const cy = Math.floor(gy);
    const ux = gx - cx - 0.5;
    const uy = gy - cy - 0.5;
    const even = (cx + cy) % 2 === 0;
    const wx = arch(ux) * (0.55 + 0.45 * Math.cos(uy * Math.PI * (even ? 1 : 0.6)));
    const wy = arch(uy) * (0.55 + 0.45 * Math.cos(ux * Math.PI * (even ? 0.6 : 1)));
    return (even ? Math.max(wx, wy * 0.7) : Math.max(wy, wx * 0.7)) + noise[iy * 128 + ix] * 0.08;
  };

  const data = new Uint8Array(128 * 128 * 4);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const nx = (heightAt(x - 1, y) - heightAt(x + 1, y)) * 1.6;
      const ny = (heightAt(x, y - 1) - heightAt(x, y + 1)) * 1.6;
      const len = Math.hypot(nx, ny, 1);
      const idx = (y * 128 + x) * 4;
      data[idx] = ((nx / len) * 0.5 + 0.5) * 255;
      data[idx + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      data[idx + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      data[idx + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, 128, 128);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

// Draw the branded black woven strap texture with "(A) Aryo Kalimasada"
function drawBrandedStrapCanvas(canvas) {
  const width = 192;
  const height = 640;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return height / width;

  // Deep matte black/charcoal strap base
  ctx.fillStyle = '#111318';
  ctx.fillRect(0, 0, width, height);

  // Subtle horizontal woven ribs
  ctx.fillStyle = 'rgba(255, 255, 255, 0.045)';
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1.5);
  }

  // Side edge stitching marks (like authentic fabric lanyard)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  for (let y = 0; y < height; y += 12) {
    ctx.fillRect(width * 0.075, y, 2.5, 7);
    ctx.fillRect(width * 0.925 - 2.5, y, 2.5, 7);
  }

  // Draw vertical branding: Circle Logo (A) + "Aryo Kalimasada"
  ctx.save();
  ctx.translate(width, 0);
  ctx.rotate(Math.PI / 2);

  // Now X runs from 0..height (down the strap), Y runs from 0..width (across the strap, center = 96)
  const centerY = width / 2;
  const logoX = 115;
  const logoRadius = 38;

  // Circular emblem ring
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 6.5;
  ctx.beginPath();
  ctx.arc(logoX, centerY, logoRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Stylized bold 'A' inside circle
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'italic 800 46px "Space Grotesk", "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A', logoX - 1, centerY + 2);

  // Brand Name "Aryo Kalimasada" following the emblem
  ctx.font = '800 50px "Space Grotesk", "Inter", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('Aryo Kalimasada', logoX + logoRadius + 24, centerY + 2);

  ctx.restore();
  return height / width;
}

// Draw front or back card face onto canvas
function drawCardFaceCanvas(canvas, img, bgColor = '#071128', padding = 0.025) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (img) {
    const padX = canvas.width * padding;
    const padY = canvas.height * padding;
    const availW = canvas.width - padX * 2;
    const availH = canvas.height - padY * 2;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(padX, padY, availW, availH, 28);
    ctx.clip();

    const scale = Math.max(availW / img.width, availH / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    ctx.drawImage(
      img,
      padX + (availW - drawW) / 2,
      padY + (availH - drawH) / 2,
      drawW,
      drawH
    );
    ctx.restore();
  }
}

// Create high-res back card design canvas
function createBackDesignCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1608;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1608);
  bgGrad.addColorStop(0, '#091945');
  bgGrad.addColorStop(0.5, '#050d26');
  bgGrad.addColorStop(1, '#081840');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1608);

  // Subtle decorative circles
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.lineWidth = 3;
  for (let r = 90; r < 460; r += 65) {
    ctx.beginPath();
    ctx.arc(512, 760, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Top Pill "Universitas Yatsi Madani"
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(160, 210, 704, 84, 42);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Universitas Yatsi Madani', 512, 264);

  // Center Emblem & Name
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 104px "Space Grotesk", sans-serif';
  ctx.fillText('{ ARYO }', 512, 710);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Space Grotesk", sans-serif';
  ctx.fillText('KALIMASADA', 512, 785);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '600 28px "JetBrains Mono", monospace';
  ctx.fillText('WEB & ROBLOX GAME DEVELOPER', 512, 850);

  // Student ID Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(172, 940, 680, 200, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px "JetBrains Mono", monospace';
  ctx.fillText('NIM 23040153', 512, 1020);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '500 26px "Inter", sans-serif';
  ctx.fillText('Program Studi Ilmu Komputer', 512, 1075);

  // Barcode at bottom
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(150, 1250, 724, 110);
  ctx.fillStyle = '#0f172a';
  for (let x = 175; x < 845; x += 13) {
    const barW = x % 3 === 0 ? 7 : x % 5 === 0 ? 9 : 4;
    ctx.fillRect(x, 1265, barW, 80);
  }

  ctx.fillStyle = '#64748b';
  ctx.font = '22px "JetBrains Mono", monospace';
  ctx.fillText('OFFICIAL VERIFIED DEVELOPER PASS', 512, 1420);

  return canvas;
}

// Physics State & Solver Functions
function createPhysicsState() {
  const makeNodes = () => Array.from({ length: SEGMENTS + 1 }, () => new THREE.Vector3());
  return {
    nodes: makeNodes(),
    previous: makeNodes(),
    velocities: makeNodes(),
    lengths: new Float64Array(SEGMENTS),
    impulses: new Float64Array(SEGMENTS),
    rest: 1,
    anchor: new THREE.Vector3(),
    body: {
      position: new THREE.Vector3(),
      previous: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      previousQuaternion: new THREE.Quaternion(),
      angular: new THREE.Vector3(),
      mass: 1,
      inverseInertia: new THREE.Vector3(1, 1, 1),
      hang: new THREE.Vector3(),
    },
    grab: null,
    turn: 0,
    twist: 0,
    twistRaw: 0,
    calm: 0,
  };
}

const SCRATCH = {
  a: new THREE.Vector3(),
  b: new THREE.Vector3(),
  c: new THREE.Vector3(),
  d: new THREE.Vector3(),
  e: new THREE.Vector3(),
  f: new THREE.Vector3(),
  g: new THREE.Vector3(),
  pin: new THREE.Vector3(),
  q: new THREE.Quaternion(),
  r: new THREE.Quaternion(),
};

function applyWorldInvInertia(body, vec, out) {
  SCRATCH.r.copy(body.quaternion).invert();
  out.copy(vec).applyQuaternion(SCRATCH.r);
  out.set(
    out.x * body.inverseInertia.x,
    out.y * body.inverseInertia.y,
    out.z * body.inverseInertia.z
  );
  return out.applyQuaternion(body.quaternion);
}

function integrateQuaternion(q, omegaDt) {
  const { x, y, z, w } = q;
  q.x += 0.5 * (omegaDt.x * w + omegaDt.y * z - omegaDt.z * y);
  q.y += 0.5 * (omegaDt.y * w + omegaDt.z * x - omegaDt.x * z);
  q.z += 0.5 * (omegaDt.z * w + omegaDt.x * y - omegaDt.y * x);
  q.w += 0.5 * (-omegaDt.x * x - omegaDt.y * y - omegaDt.z * z);
  q.normalize();
}

function effectiveInvMass(body, rVec, dir) {
  const rCrossN = SCRATCH.c.crossVectors(rVec, dir);
  return 1 / body.mass + rCrossN.dot(applyWorldInvInertia(body, rCrossN, SCRATCH.d));
}

function applyBodyImpulse(body, rVec, impulse) {
  body.position.addScaledVector(impulse, 1 / body.mass);
  integrateQuaternion(
    body.quaternion,
    applyWorldInvInertia(body, SCRATCH.e.crossVectors(rVec, impulse), SCRATCH.f)
  );
}

function solveSegmentConstraint(state, segIdx, dt, params) {
  const { nodes, body } = state;
  const nA = nodes[segIdx];
  const invMassA = segIdx === 0 ? 0 : INV_NODE_MASS;
  const isLast = segIdx === SEGMENTS - 1;
  const rVec = SCRATCH.g;
  let nB = nodes[segIdx + 1];

  if (isLast) {
    rVec.copy(body.hang).applyQuaternion(body.quaternion);
    nB = SCRATCH.b.copy(body.position).add(rVec);
  }

  const delta = SCRATCH.a.subVectors(nB, nA);
  const dist = delta.length();
  const stretch = dist - state.rest;
  if (stretch <= 0 || dist < 1e-9) return;

  const dir = delta.divideScalar(dist);
  const invMassB = isLast ? effectiveInvMass(body, rVec, dir) : INV_NODE_MASS;
  const relVel = (dist - state.lengths[segIdx]) / dt;
  const maxImpulse =
    (params.hold * Math.tanh((params.stiffness * stretch) / params.hold) +
      params.spring * stretch +
      params.bandDamping * Math.max(0, relVel)) *
      dt *
      dt -
    state.impulses[segIdx];

  if (maxImpulse <= 0) return;

  const impulseMag = Math.min(stretch / (invMassA + invMassB), maxImpulse);
  state.impulses[segIdx] += impulseMag;

  if (invMassA) nA.addScaledVector(dir, impulseMag * invMassA);
  if (isLast) {
    applyBodyImpulse(body, rVec, dir.multiplyScalar(-impulseMag));
  } else {
    nB.addScaledVector(dir, -impulseMag * invMassB);
  }
}

function solveGrabConstraint(body, grab, pinPos) {
  const rVec = SCRATCH.g.copy(grab.local).applyQuaternion(body.quaternion);
  const delta = SCRATCH.a.copy(pinPos).sub(body.position).sub(rVec);
  const dist = delta.length();
  if (dist < 1e-9) return;
  const dir = delta.divideScalar(dist);
  const impulseMag = dist / effectiveInvMass(body, rVec, dir);
  applyBodyImpulse(body, rVec, dir.multiplyScalar(impulseMag));
}

function configurePhysicsSizes(state, spec, totalStrapLen) {
  state.rest = totalStrapLen / SEGMENTS;
  const { width, height } = spec;
  const body = state.body;
  const thickness = 0.032;
  body.mass = 1;
  body.inverseInertia.set(
    12 / (height * height + thickness * thickness),
    12 / (width * width + thickness * thickness),
    12 / (width * width + height * height)
  );
  body.hang.set(0, spec.hangY, 0);
}

function resetPhysicsState(state, spec, withIntroDrop = false) {
  const { nodes, previous, velocities, body, anchor } = state;
  nodes[0].copy(anchor);
  for (let i = 1; i <= SEGMENTS; i++) {
    nodes[i].copy(nodes[i - 1]);
    if (withIntroDrop) {
      nodes[i].x += state.rest * 0.65;
      nodes[i].y -= state.rest * 0.75;
    } else {
      nodes[i].y -= state.rest;
    }
  }
  body.quaternion.identity();
  if (withIntroDrop) {
    body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI * 0.28);
  }
  body.hang.set(0, spec.hangY, 0);
  const hangWorld = SCRATCH.a.copy(body.hang).applyQuaternion(body.quaternion);
  body.position.copy(nodes[SEGMENTS]).sub(hangWorld);
  body.previous.copy(body.position);
  body.previousQuaternion.copy(body.quaternion);
  body.velocity.set(0, 0, 0);
  body.angular.set(0, 0, 0);
  if (withIntroDrop) {
    body.velocity.set(-2.5, -1.0, 0);
    body.angular.z = -3.0;
    body.angular.y = 2.2;
  }
  for (let i = 0; i <= SEGMENTS; i++) {
    previous[i].copy(nodes[i]);
    velocities[i].set(0, 0, 0);
  }
  state.lengths.fill(state.rest);
  state.turn = 0;
  state.twist = 0;
  state.twistRaw = 0;
  state.calm = 0;
}

function stepPhysics(state, dt, params, elapsed) {
  const steps = Math.max(1, Math.ceil(dt / STEP_DT - 1e-6));
  const subDt = dt / steps;
  const { nodes, previous, velocities, body } = state;

  const windX =
    params.breeze * (Math.sin(elapsed * 0.53) * 0.7 + Math.sin(elapsed * 1.31 + 1.7) * 0.3) * 3;
  const windZ = params.breeze * Math.sin(elapsed * 0.37 + 0.6) * 2;
  const grab = state.grab;
  const pin = SCRATCH.pin;
  const nodeDecay = Math.exp(-params.nodeDrag * subDt);
  const linDecay = Math.exp(-params.linearDrag * subDt);
  const angDecay = Math.exp(-params.angularDrag * subDt);

  for (let s = 0; s < steps; s++) {
    for (let i = 1; i < SEGMENTS; i++) {
      const v = velocities[i];
      v.y -= params.gravity * subDt;
      v.x += windX * subDt;
      v.z += windZ * subDt;
      previous[i].copy(nodes[i]);
      nodes[i].addScaledVector(v, subDt);
    }

    body.previous.copy(body.position);
    body.previousQuaternion.copy(body.quaternion);
    const q = body.quaternion;

    if (grab) {
      const dq = SCRATCH.q.copy(grab.rotation).multiply(SCRATCH.r.copy(q).invert());
      if (dq.w < 0) dq.set(-dq.x, -dq.y, -dq.z, -dq.w);
      const torque = SCRATCH.a.set(dq.x, dq.y, dq.z).multiplyScalar(2 * params.grip);
      torque.addScaledVector(body.angular, -params.gripDamping);
      body.angular.addScaledVector(applyWorldInvInertia(body, torque, SCRATCH.b), subDt);
    }

    const upAxis = SCRATCH.a.set(0, 1, 0).applyQuaternion(q);
    const proj = SCRATCH.b.set(-upAxis.x * upAxis.z, -upAxis.y * upAxis.z, 1 - upAxis.z * upAxis.z);
    if (proj.lengthSq() > 0.001) {
      const fwd = SCRATCH.d.set(0, 0, 1).applyQuaternion(q);
      const rawAngle = Math.atan2(SCRATCH.e.crossVectors(proj, fwd).dot(upAxis), proj.dot(fwd));
      let diff = rawAngle - state.twistRaw;
      if (diff > Math.PI) diff -= Math.PI * 2;
      else if (diff < -Math.PI) diff += Math.PI * 2;
      state.twist += diff;
      state.twistRaw = rawAngle;
    }

    if (!grab) {
      const twistVel = body.angular.dot(upAxis);
      body.angular.addScaledVector(
        upAxis,
        (params.twist * (state.turn - state.twist) - params.twistDamping * twistVel) * subDt
      );
    }

    body.velocity.y -= params.gravity * subDt;
    body.velocity.x += windX * 0.35 * subDt;
    body.velocity.z += windZ * 0.35 * subDt;
    body.position.addScaledVector(body.velocity, subDt);
    integrateQuaternion(body.quaternion, SCRATCH.f.copy(body.angular).multiplyScalar(subDt));

    state.impulses.fill(0);
    if (grab) pin.lerpVectors(grab.from, grab.target, (s + 1) / steps);

    for (let iter = 0; iter < SOLVER_ITERS; iter++) {
      for (let i = 0; i < SEGMENTS; i++) {
        solveSegmentConstraint(state, i, subDt, params);
      }
      if (grab) solveGrabConstraint(body, grab, pin);
    }

    for (let i = 1; i < SEGMENTS; i++) {
      const v = velocities[i]
        .subVectors(nodes[i], previous[i])
        .divideScalar(subDt)
        .multiplyScalar(nodeDecay);
      v.multiplyScalar(1 / (1 + params.nodeAir * v.length() * subDt));
    }

    body.velocity.subVectors(body.position, body.previous).divideScalar(subDt);
    const qDelta = SCRATCH.q.copy(body.previousQuaternion).invert().premultiply(body.quaternion);
    body.angular
      .set(qDelta.x, qDelta.y, qDelta.z)
      .multiplyScalar((2 / subDt) * (qDelta.w < 0 ? -1 : 1));

    const cardNormal = SCRATCH.a.set(0, 0, 1).applyQuaternion(body.quaternion);
    const normalVel = body.velocity.dot(cardNormal);
    const tangentVel = SCRATCH.b.copy(body.velocity).addScaledVector(cardNormal, -normalVel);
    tangentVel.multiplyScalar(1 / (1 + params.air * tangentVel.length() * subDt));
    body.velocity
      .copy(tangentVel)
      .addScaledVector(cardNormal, normalVel / (1 + params.broadside * Math.abs(normalVel) * subDt))
      .multiplyScalar(linDecay);

    body.angular.multiplyScalar(angDecay / (1 + params.spinAir * body.angular.length() * subDt));

    if (body.velocity.lengthSq() > 3600) body.velocity.setLength(60);
    if (body.angular.lengthSq() > 1600) body.angular.setLength(40);

    nodes[SEGMENTS].copy(body.hang).applyQuaternion(body.quaternion).add(body.position);
    for (let i = 0; i < SEGMENTS; i++) {
      state.lengths[i] = nodes[i].distanceTo(nodes[i + 1]);
    }
  }

  if (grab) grab.from.copy(grab.target);
}

export function initLanyard3D(containerId = 'lanyard-canvas-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Configuration matching the reference lanyard look
  const config = {
    frontImage: 'images/aryo-pass.jpg',
    cardColor: '#071128',
    imagePadding: 0.025,
    finish: 'glossy',
    orientation: 'portrait',
    cornerRadius: 0.25,
    size: 0.64,
    anchor: 'center',
    strapLength: 0.56,
    strapWidth: 0.65,
    metal: 'silver',
    gravity: 1.15,
    damping: 0.35,
    elasticity: 0.7,
    breeze: 0.14,
  };

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    console.warn('WebGL not available:', e);
    return;
  }

  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const canvas = renderer.domElement;
  canvas.className = 'w-full h-full block';
  container.innerHTML = '';
  container.appendChild(canvas);

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const scene = new THREE.Scene();
  const envTarget = createStudioEnvironment(renderer);
  scene.environment = envTarget.texture;

  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 200);
  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
  keyLight.position.set(-2.5, 4, 6);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.35);
  fillLight.position.set(3, -1, 4);
  scene.add(keyLight, fillLight);

  // Textures & Materials Setup
  const frontCanvas = document.createElement('canvas');
  const backCanvas = createBackDesignCanvas();
  const strapCanvas = document.createElement('canvas');

  const frontTex = new THREE.CanvasTexture(frontCanvas);
  frontTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = maxAniso;

  const backTex = new THREE.CanvasTexture(backCanvas);
  backTex.colorSpace = THREE.SRGBColorSpace;
  backTex.anisotropy = maxAniso;

  const strapTex = new THREE.CanvasTexture(strapCanvas);
  strapTex.colorSpace = THREE.SRGBColorSpace;
  strapTex.anisotropy = maxAniso;
  strapTex.wrapS = THREE.ClampToEdgeWrapping;
  strapTex.wrapT = THREE.RepeatWrapping;

  const cardNormalMap = createCardMicroNormalMap();
  const strapNormalMap = createWovenStrapNormalMap();

  const foilUniforms = {
    foilStrength: { value: 0.15 },
    foilAspect: { value: 1.5 },
    foilKey: { value: new THREE.Vector3() },
    foilFill: { value: new THREE.Vector3() },
    foilTop: { value: new THREE.Vector3() },
  };

  const applyFoilShader = (shader) => {
    Object.assign(shader.uniforms, foilUniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${FOIL_VERT_PARS}`)
      .replace('#include <project_vertex>', `#include <project_vertex>\n${FOIL_VERT_MAIN}`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${FOIL_FRAG_PARS}`)
      .replace('#include <opaque_fragment>', `${FOIL_FRAG_MAIN}\n#include <opaque_fragment>`);
  };

  const finishPreset = FINISH_PRESETS[config.finish];
  const frontMat = new THREE.MeshPhysicalMaterial({
    map: frontTex,
    normalMap: cardNormalMap,
    normalScale: new THREE.Vector2(0.06, 0.06),
    roughness: finishPreset.roughness,
    metalness: finishPreset.metalness,
    clearcoat: finishPreset.clearcoat,
    clearcoatRoughness: finishPreset.clearcoatRoughness,
  });
  frontMat.onBeforeCompile = applyFoilShader;

  const backMat = new THREE.MeshPhysicalMaterial({
    map: backTex,
    normalMap: cardNormalMap,
    normalScale: new THREE.Vector2(0.06, 0.06),
    roughness: finishPreset.roughness,
    metalness: finishPreset.metalness,
    clearcoat: finishPreset.clearcoat,
    clearcoatRoughness: finishPreset.clearcoatRoughness,
  });
  backMat.onBeforeCompile = applyFoilShader;

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#060f24'),
    roughness: 0.3,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });

  const metalPreset = METAL_PRESETS[config.metal];
  const metalMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(metalPreset.color),
    metalness: 1.0,
    roughness: metalPreset.roughness,
  });

  const strapAspect = drawBrandedStrapCanvas(strapCanvas);
  strapNormalMap.repeat.set(2, 2 * strapAspect);
  strapTex.needsUpdate = true;

  const strapMat = new THREE.MeshPhysicalMaterial({
    map: strapTex,
    normalMap: strapNormalMap,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughness: 0.68,
    sheen: 1.0,
    sheenRoughness: 0.42,
    sheenColor: new THREE.Color(0.32, 0.32, 0.34),
    side: THREE.DoubleSide,
  });

  // Meshes Assembly
  const cardSpec = getCardSpec(config.orientation, config.cornerRadius);
  const cardGeoms = createCardGeometries(cardSpec);

  const cardGroup = new THREE.Group();
  const bodyMesh = new THREE.Mesh(cardGeoms.body, bodyMat);
  const frontMesh = new THREE.Mesh(cardGeoms.face, frontMat);
  const backMesh = new THREE.Mesh(cardGeoms.face.clone(), backMat);
  frontMesh.position.z = 0.0166;
  backMesh.rotation.y = Math.PI;
  backMesh.position.z = -0.0166;

  // Split ring passing through the card's stadium slot hole
  const splitRingMesh = new THREE.Mesh(
    new THREE.TorusGeometry(SPLIT_RING_RADIUS, SPLIT_RING_TUBE, 18, 72),
    metalMat
  );
  splitRingMesh.rotation.y = Math.PI / 2 - 0.7;
  splitRingMesh.position.set(0, cardSpec.ringY, 0);

  cardGroup.add(bodyMesh, frontMesh, backMesh, splitRingMesh);
  rootGroup.add(cardGroup);

  // Flat Woven Ribbon Mesh
  const strapScale = BASE_STRAP_WIDTH * clamp(config.strapWidth, 0.4, 2);
  const ribbonGeom = createRibbonGeometry(RIBBON_ROWS);
  const ribbonMesh = new THREE.Mesh(ribbonGeom, strapMat);
  ribbonMesh.frustumCulled = false;
  rootGroup.add(ribbonMesh);

  // Metallic Clamp & Eyelet at bottom of strap
  const clampGroup = new THREE.Group();
  const clampBoxMesh = new THREE.Mesh(createClampGeometry(strapScale), metalMat);
  clampBoxMesh.position.y = 0.107;
  const eyeletMesh = new THREE.Mesh(
    new THREE.TorusGeometry(EYELET_RADIUS, 0.0105, 14, 40),
    metalMat
  );
  clampGroup.add(clampBoxMesh, eyeletMesh);
  rootGroup.add(clampGroup);

  // Load Front Image onto Card Face Canvas
  frontCanvas.width = CARD_TEX_WIDTH;
  frontCanvas.height = Math.round((CARD_TEX_WIDTH * cardSpec.height) / cardSpec.width);
  drawCardFaceCanvas(frontCanvas, null, config.cardColor, config.imagePadding);
  frontTex.needsUpdate = true;

  const frontImg = new Image();
  frontImg.crossOrigin = 'anonymous';
  frontImg.onload = () => {
    drawCardFaceCanvas(frontCanvas, frontImg, config.cardColor, config.imagePadding);
    frontTex.needsUpdate = true;
  };
  frontImg.src = config.frontImage;

  // Physics Initialization
  const phys = createPhysicsState();
  const curvePts = [];
  const topJoinPt = new THREE.Vector3();
  const botJoinPt = new THREE.Vector3();
  const spline = new THREE.CatmullRomCurve3(curvePts, false, 'centripetal');
  const samplePts = Array.from({ length: RIBBON_ROWS }, () => new THREE.Vector3());
  const sampleAcross = Array.from({ length: RIBBON_ROWS }, () => new THREE.Vector3());
  const normSinCos = RIBBON_NORM_ANGLES.map((a) => [Math.cos(a), Math.sin(a)]);

  const RIBBON_VECS = {
    tangent: new THREE.Vector3(),
    toCamera: new THREE.Vector3(),
    basis: new THREE.Matrix4(),
    up: new THREE.Vector3(),
    across: new THREE.Vector3(),
    facing: new THREE.Vector3(),
    end: new THREE.Vector3(),
  };

  function updateFraming(isInitial = false) {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    const maxDpr = isMobileDevice ? 1.2 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
    renderer.setSize(w, h, false);

    const aspect = w / h;
    let viewH = cardSpec.height / clamp(config.size, 0.15, 0.9);
    const minW = cardSpec.width / 0.72;
    if (viewH * aspect < minW) viewH = minW / aspect;
    const viewW = viewH * aspect;

    camera.aspect = aspect;
    camera.position.set(0, 0, viewH / 2 / Math.tan((CAMERA_FOV * Math.PI) / 360));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    foilUniforms.foilKey.value
      .set(-2.5, 4, 6)
      .normalize()
      .transformDirection(camera.matrixWorldInverse);
    foilUniforms.foilFill.value
      .set(3, -1, 4)
      .normalize()
      .transformDirection(camera.matrixWorldInverse);
    foilUniforms.foilTop.value
      .set(0.5, 4.5, 8)
      .normalize()
      .transformDirection(camera.matrixWorldInverse);

    const anchorX = ((ANCHORS[config.anchor] ?? 0.5) - 0.5) * viewW;
    const topY = viewH / 2 + 0.05;
    const cardTargetY =
      viewH / 2 -
      viewH * lerp(0.12, 0.42, clamp(config.strapLength, 0, 1)) +
      (cardSpec.hangY - cardSpec.height / 2);

    phys.anchor.set(anchorX, topY, 0);
    configurePhysicsSizes(phys, cardSpec, topY - cardTargetY);
    phys.nodes[0].copy(phys.anchor);
    phys.previous[0].copy(phys.anchor);

    if (isInitial) {
      resetPhysicsState(phys, cardSpec, true);
    }
  }

  function updateRibbonAndClampMesh() {
    const endNode = phys.nodes[SEGMENTS];
    const clampDist = 0.236;
    let idx = SEGMENTS - 1;
    while (idx > 0 && phys.nodes[idx].distanceTo(endNode) < clampDist * 1.1) {
      idx--;
    }

    const upDir = RIBBON_VECS.up.subVectors(phys.nodes[idx], endNode);
    if (upDir.lengthSq() < 1e-8) {
      upDir.set(0, 1, 0).applyQuaternion(phys.body.quaternion);
    }
    upDir.normalize();

    topJoinPt.copy(endNode).addScaledVector(upDir, clampDist);
    botJoinPt.copy(endNode).addScaledVector(upDir, 0.0885);

    curvePts.length = 0;
    for (let i = 0; i <= idx; i++) curvePts.push(phys.nodes[i]);
    curvePts.push(topJoinPt, botJoinPt);
    spline.updateArcLengths();

    for (let r = 0; r < RIBBON_ROWS; r++) {
      spline.getPointAt(r / (RIBBON_ROWS - 1), samplePts[r]);
    }

    const totalArcLen = spline.getLength();
    const twistEndFrac = 1 - topJoinPt.distanceTo(botJoinPt) / Math.max(totalArcLen, 0.001);

    const posAttr = ribbonGeom.getAttribute('position');
    const normAttr = ribbonGeom.getAttribute('normal');
    const uvAttr = ribbonGeom.getAttribute('uv');
    const cols = RIBBON_U.length;
    const baseLen = phys.rest * SEGMENTS;
    const uvRepeats = baseLen / (strapScale * strapAspect);
    const actualWidth =
      strapScale / Math.pow(Math.max(1, totalArcLen / Math.max(baseLen, 0.001)), 0.35);

    const { tangent, toCamera, across, facing } = RIBBON_VECS;

    for (let r = 0; r < RIBBON_ROWS; r++) {
      tangent.subVectors(
        samplePts[Math.min(RIBBON_ROWS - 1, r + 1)],
        samplePts[Math.max(0, r - 1)]
      );
      if (tangent.lengthSq() < 1e-12) tangent.set(0, -1, 0);
      tangent.normalize();

      toCamera.subVectors(camera.position, samplePts[r]).normalize();
      const side = sampleAcross[r].crossVectors(toCamera, tangent);
      if (side.lengthSq() < 1e-10) {
        side.copy(r > 0 ? sampleAcross[r - 1] : SCRATCH.a.set(1, 0, 0));
      }
      side.normalize();
      if (r > 0 && side.dot(sampleAcross[r - 1]) < 0) side.negate();

      const twistAngle = -phys.twist * Math.pow(Math.min(1, r / (RIBBON_ROWS - 1) / twistEndFrac), 1.3);
      facing.crossVectors(tangent, side);
      across
        .copy(side)
        .multiplyScalar(Math.cos(twistAngle))
        .addScaledVector(facing, Math.sin(twistAngle));
      facing.crossVectors(tangent, across);

      const pt = samplePts[r];
      const vCoord = (1 - r / (RIBBON_ROWS - 1)) * uvRepeats;

      for (let c = 0; c < cols; c++) {
        const vIdx = r * cols + c;
        const offset = (RIBBON_U[c] - 0.5) * actualWidth;
        const [cosA, sinA] = normSinCos[c];

        posAttr.setXYZ(
          vIdx,
          pt.x + across.x * offset,
          pt.y + across.y * offset,
          pt.z + across.z * offset
        );
        normAttr.setXYZ(
          vIdx,
          facing.x * cosA + across.x * sinA,
          facing.y * cosA + across.y * sinA,
          facing.z * cosA + across.z * sinA
        );
        uvAttr.setXY(vIdx, RIBBON_U[c], vCoord);
      }
    }

    RIBBON_VECS.end.copy(across);
    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
    uvAttr.needsUpdate = true;

    // Align the metallic clamp with the bottom of the flat ribbon
    across.copy(RIBBON_VECS.end).addScaledVector(upDir, -RIBBON_VECS.end.dot(upDir)).normalize();
    facing.crossVectors(across, upDir).normalize();
    RIBBON_VECS.basis.makeBasis(across, upDir, facing);
    clampGroup.quaternion.setFromRotationMatrix(RIBBON_VECS.basis);
    clampGroup.position.copy(endNode);
  }

  function getPhysicsParams() {
    const g = 40 * clamp(config.gravity, 0, 3);
    const baseG = Math.max(g, 20);
    const elast = clamp(config.elasticity, 0, 1);
    const damp = clamp(config.damping, 0, 1);
    return {
      gravity: g,
      hold: baseG * lerp(2.2, 5.5, elast),
      stiffness: baseG * 10 * SEGMENTS,
      spring: baseG * lerp(0.1, 0.4, elast) * SEGMENTS,
      bandDamping: baseG * lerp(0.3, 0.08, elast) * SEGMENTS,
      linearDrag: 0.25 * Math.pow(16, damp),
      angularDrag: 0.5 * Math.pow(12, damp),
      air: 0.15,
      broadside: 0.5,
      spinAir: 0.03,
      nodeDrag: 2,
      nodeAir: 0.2,
      twist: 30,
      twistDamping: 3,
      grip: 40,
      gripDamping: 6,
      breeze: clamp(config.breeze, 0, 1),
    };
  }

  // Raycasting & Pointer Drag / Tap Flip Handling
  const raycaster = new THREE.Raycaster();
  const pointerNDC = new THREE.Vector2();
  let clickCandidate = null;
  let isHovering = false;

  function updateRaycaster(e) {
    const rect = canvas.getBoundingClientRect();
    pointerNDC.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(pointerNDC, camera);
  }

  function intersectCard() {
    cardGroup.updateMatrixWorld();
    return raycaster.intersectObjects([bodyMesh, frontMesh, backMesh], false)[0] || null;
  }

  function setCursor(style) {
    if (canvas.style.cursor !== style) canvas.style.cursor = style;
  }

  function triggerFlip(hitPoint, impulseStrength = FLIP_IMPULSE) {
    const body = phys.body;
    const upAxis = SCRATCH.a.set(0, 1, 0).applyQuaternion(body.quaternion);
    let dir = phys.turn > 0 ? -1 : 1;
    if (phys.turn === 0 && hitPoint) {
      const toCam = SCRATCH.c.subVectors(hitPoint, camera.position).normalize();
      dir =
        SCRATCH.b.subVectors(hitPoint, body.position).cross(toCam).dot(upAxis) < 0 ? -1 : 1;
    }
    phys.turn = phys.turn === 0 ? Math.PI * dir : 0;
    body.angular.addScaledVector(upAxis, impulseStrength * dir);
  }

  function onPointerDown(e) {
    if (e.button > 0) return;
    updateRaycaster(e);
    const hit = intersectCard();
    if (hit) {
      phys.grab = {
        local: hit.point
          .clone()
          .sub(phys.body.position)
          .applyQuaternion(phys.body.quaternion.clone().invert()),
        rotation: phys.body.quaternion.clone(),
        reach: hit.distance,
        from: hit.point.clone(),
        target: hit.point.clone(),
      };
      clickCandidate = {
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
        point: hit.point.clone(),
      };
      canvas.setPointerCapture?.(e.pointerId);
      setCursor('grabbing');
      e.preventDefault();
    }
  }

  function onPointerMove(e) {
    updateRaycaster(e);
    if (phys.grab) {
      if (clickCandidate && Math.hypot(e.clientX - clickCandidate.x, e.clientY - clickCandidate.y) > 6) {
        clickCandidate = null;
      }
      raycaster.ray.at(phys.grab.reach, phys.grab.target);
    } else if (e.pointerType !== 'touch') {
      isHovering = !!intersectCard();
      setCursor(isHovering ? 'grab' : 'default');
    }
  }

  function onPointerUp(e) {
    if (phys.grab) {
      phys.grab = null;
      if (
        clickCandidate &&
        e.type === 'pointerup' &&
        performance.now() - clickCandidate.time < 450
      ) {
        triggerFlip(clickCandidate.point);
      }
      clickCandidate = null;
      canvas.releasePointerCapture?.(e.pointerId);
      setCursor(isHovering && e.pointerType !== 'touch' ? 'grab' : 'default');
    }
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('lostpointercapture', onPointerUp);

  // Resize Observer
  updateFraming(true);
  const resizeObs = new ResizeObserver(() => updateFraming(false));
  resizeObs.observe(container);

  // Performance & Battery Optimization:
  // Pause WebGL rendering & physics sub-stepping when scrolled out of view or tab hidden
  let isCanvasVisible = true;
  if ('IntersectionObserver' in window) {
    const visibilityObs = new IntersectionObserver((entries) => {
      isCanvasVisible = entries[0].isIntersecting;
      if (isCanvasVisible) {
        lastTime = performance.now();
      }
    }, { threshold: 0.05 });
    visibilityObs.observe(container);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isCanvasVisible) {
      lastTime = performance.now();
    }
  });

  // Animation Loop
  let lastTime = performance.now();
  let elapsed = 0;

  function animate(now) {
    requestAnimationFrame(animate);

    // Skip entire render cycle if not visible to save mobile CPU/GPU
    if (!isCanvasVisible || document.hidden) {
      return;
    }

    const dt = clamp((now - lastTime) / 1000, 1 / 240, 1 / 30);
    lastTime = now;
    elapsed += dt;

    const params = getPhysicsParams();
    stepPhysics(phys, dt, params, elapsed);

    // Safety fallback if numerical instability ever occurs
    const b = phys.body;
    if (!Number.isFinite(b.position.x + b.position.y + b.position.z + b.quaternion.w)) {
      phys.grab = null;
      resetPhysicsState(phys, cardSpec, false);
    }

    cardGroup.position.copy(phys.body.position);
    cardGroup.quaternion.copy(phys.body.quaternion);
    updateRibbonAndClampMesh();

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}
