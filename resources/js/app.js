import './bootstrap';
import {
  createIcons,
  ArrowRight, ArrowUp, Award, CheckCircle, Cloud, Code2, Cpu, Database,
  ExternalLink, Folder, Globe, GraduationCap, Hand, Layers, Mail, Menu,
  MessageCircle, MessageSquare, Music, Send, Server, ShieldCheck, ShoppingBag,
  Sparkles, Trophy, Video, Volume2, VolumeX, Wrench, X,
} from 'lucide';
import confetti from 'canvas-confetti';
import { initCyberHudCanvas } from './cyber-hud';

// Only the icons actually used (instead of bundling the whole lucide set)
const icons = {
  ArrowRight, ArrowUp, Award, CheckCircle, Cloud, Code2, Cpu, Database,
  ExternalLink, Folder, Globe, GraduationCap, Hand, Layers, Mail, Menu,
  MessageCircle, MessageSquare, Music, Send, Server, ShieldCheck, ShoppingBag,
  Sparkles, Trophy, Video, Volume2, VolumeX, Wrench, X,
};

const isPhone = window.matchMedia('(max-width: 768px)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({ icons });

  // 1b. Cyber HUD canvas: desktop only. On phones the full-screen animated canvas is the
  //     single biggest cost while scrolling, so the static CSS/SVG background is used instead.
  if (!isPhone && !reduceMotion) {
    try {
      initCyberHudCanvas('cyber-hud-canvas');
    } catch (err) {
      console.warn('Cyber HUD Canvas note:', err);
    }
  }

  // 2. 3D Lanyard: lazy-loaded (three.js is a separate chunk) after first paint
  const startLanyard = () => {
    import('./lanyard-3d')
      .then(({ initLanyard3D }) => initLanyard3D('lanyard-canvas-container'))
      .catch((err) => console.warn('3D Lanyard initialization note:', err));
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(startLanyard, { timeout: 1200 });
  } else {
    setTimeout(startLanyard, 250);
  }

  // 3. Typewriter Effect for Hero Subtitle
  const typewriterElem = document.getElementById('typewriter-text');
  if (typewriterElem) {
    const roles = JSON.parse(typewriterElem.getAttribute('data-roles') || '[]');
    if (roles.length > 0) {
      let roleIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      const typeSpeed = 90;
      const deleteSpeed = 45;
      const holdDelay = 1800;

      function typeLoop() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
          typewriterElem.textContent = currentRole.substring(0, charIdx - 1);
          charIdx--;
        } else {
          typewriterElem.textContent = currentRole.substring(0, charIdx + 1);
          charIdx++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIdx === currentRole.length) {
          delay = holdDelay;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          delay = 400;
        }

        setTimeout(typeLoop, delay);
      }

      typeLoop();
    }
  }

  // 4. Portfolio Category / Tabs Switching
  const tabBtns = document.querySelectorAll('.portfolio-tab-btn');
  const tabViews = document.querySelectorAll('.portfolio-tab-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update active iOS glass tab buttons
      tabBtns.forEach(b => {
        b.classList.remove('is-tab-active', 'text-white');
        b.classList.add('text-slate-300');
      });
      btn.classList.add('is-tab-active', 'text-white');
      btn.classList.remove('text-slate-300');

      // Show target tab view
      tabViews.forEach(view => {
        if (view.getAttribute('data-tab-content') === targetTab) {
          view.classList.remove('hidden');
          view.classList.add('animate-fadeIn');
        } else {
          view.classList.add('hidden');
          view.classList.remove('animate-fadeIn');
        }
      });
    });
  });

  // 4b. Interactive Mouse-Follow Liquid Glass Specular Glare (Desktop only to save mobile battery)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.glass-panel').forEach(panel => {
      panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        panel.style.setProperty('--mouse-x', `${x}px`);
        panel.style.setProperty('--mouse-y', `${y}px`);
      }, { passive: true });
    });
  }

  // 5. Project Modal Details
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalDescription = document.getElementById('modal-project-desc');
  const modalTags = document.getElementById('modal-project-tags');
  const modalDemoBtn = document.getElementById('modal-project-demo');
  const modalGithubBtn = document.getElementById('modal-project-github');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(data) {
    if (!projectModal) return;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.long_description || data.description;

    // Render tags
    modalTags.innerHTML = '';
    (data.tags || []).forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'px-3 py-1 text-xs font-mono font-medium rounded-lg glass-tag';
      badge.textContent = tag;
      modalTags.appendChild(badge);
    });

    if (modalDemoBtn) modalDemoBtn.href = data.demo_url || '#';
    if (modalGithubBtn) modalGithubBtn.href = data.github_url || '#';

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const rawData = card.getAttribute('data-project');
      if (rawData) {
        try {
          const data = JSON.parse(rawData);
          openProjectModal(data);
        } catch (e) {
          console.error('Failed to parse project data:', e);
        }
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // 6. Contact Form -> WhatsApp (wa.me) redirect
  const contactForm = document.getElementById('contact-form');
  const contactSuccessAlert = document.getElementById('contact-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const waNumber = contactForm.getAttribute('data-wa-number');
      const data = new FormData(contactForm);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const lines = [
        'Halo Aryo, saya menghubungi lewat website portfolio Ryozu.DEV.',
        '',
        `*Nama:* ${name}`,
      ];
      if (email) lines.push(`*Email:* ${email}`);
      if (subject) lines.push(`*Subjek:* ${subject}`);
      lines.push('', message);

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.8 },
        colors: ['#00ff88', '#00f2fe', '#10b981'],
      });

      contactForm.reset();
      if (contactSuccessAlert) {
        contactSuccessAlert.classList.remove('hidden');
        setTimeout(() => contactSuccessAlert.classList.add('hidden'), 8000);
      }
    });
  }

  // 8. iOS Liquid Glass Navbar: Scroll-Spy, Active Pill, Mobile Drawer & Sound Toggle
  const navbarRoot = document.getElementById('navbar-root');
  const navLinks = document.querySelectorAll('.navbar-link-item');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  // Subtle iOS-style Glass Tap Sound via Web Audio API
  let soundEnabled = true;
  let audioCtx = null;

  function playGlassTap(freq = 620) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.48, now + 0.045);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.setAttribute('data-sound-enabled', String(soundEnabled));
      const iconOn = document.getElementById('sound-icon-on');
      const iconOff = document.getElementById('sound-icon-off');
      if (iconOn && iconOff) {
        iconOn.classList.toggle('hidden', !soundEnabled);
        iconOff.classList.toggle('hidden', soundEnabled);
      }
      if (soundEnabled) {
        playGlassTap(740);
      }
    });
  }

  // Clean Section URL Routing (No Hash / Pager Symbol)
  function getBasePath() {
    const path = window.location.pathname;
    if (window.location.hostname.endsWith('github.io')) {
      const m = path.match(/^(\/[^\/]+)/);
      if (m) return m[1].replace(/\/+$/, '');
    }
    return '';
  }

  function formatSectionPath(sectionId) {
    const base = getBasePath();
    const norm = sectionId === 'experience' ? 'portfolio' : sectionId;
    if (!norm || norm === 'home') {
      return base ? `${base}/` : '/';
    }
    return base ? `${base}/${norm}` : `/${norm}`;
  }

  let currentUrlSection = null;
  function updateSectionUrl(sectionId, push = false) {
    const norm = sectionId === 'experience' ? 'portfolio' : sectionId;
    if (currentUrlSection === norm && !window.location.hash) return;
    currentUrlSection = norm;

    const targetPath = formatSectionPath(norm);
    if (window.location.pathname !== targetPath || window.location.hash) {
      if (push) {
        window.history.pushState({ section: norm }, '', targetPath);
      } else {
        window.history.replaceState({ section: norm }, '', targetPath);
      }
    }
  }

  function scrollToSection(sectionId, pushHistory = true) {
    const targetElem = document.getElementById(sectionId);
    if (!targetElem) return;

    targetElem.scrollIntoView({ behavior: 'smooth' });
    setActiveNavSection(sectionId);
    updateSectionUrl(sectionId, pushHistory);
  }

  function setActiveNavSection(sectionId) {
    const normalized = sectionId === 'experience' ? 'portfolio' : sectionId;
    navLinks.forEach(link => {
      const target = link.getAttribute('data-section');
      if (target === normalized) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Intercept all internal anchor links (navbar, mobile drawer, hero, about, footer)
  // so browser navigates cleanly without '#' in the URL bar
  document.querySelectorAll('a[href^="#"], a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      const dataSec = link.getAttribute('data-section');
      const targetId = dataSec || href.replace(/^#/, '');

      if (!targetId || targetId === '#') return;
      const targetElem = document.getElementById(targetId);
      if (!targetElem) return;

      e.preventDefault();
      scrollToSection(targetId, true);
      playGlassTap(660);

      if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('is-open')) {
        mobileMenuDrawer.classList.remove('is-open');
      }
    });
  });

  // Scroll-spy for navbar glass state & active section pill
  const trackedSections = ['home', 'about', 'portfolio', 'experience', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function handleNavbarScroll() {
    const scrollY = window.scrollY;
    if (navbarRoot) {
      navbarRoot.classList.toggle('navbar-scrolled', scrollY > 40);
    }

    const viewportMid = scrollY + window.innerHeight * 0.35;
    let currentSection = 'home';

    for (const sec of trackedSections) {
      if (sec.offsetTop <= viewportMid) {
        currentSection = sec.id;
      }
    }
    setActiveNavSection(currentSection);
    // Keep browser URL cleanly in sync with current visible section (no '#' symbol)
    updateSectionUrl(currentSection, false);
  }

  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  handleNavbarScroll();

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('is-open');
      playGlassTap(580);
    });
  }

  // Initial URL check: remove existing hash (#about -> /about) or scroll to route path
  if (window.location.hash) {
    const hashSec = window.location.hash.replace('#', '');
    if (document.getElementById(hashSec)) {
      updateSectionUrl(hashSec, false);
      setTimeout(() => {
        const el = document.getElementById(hashSec);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 180);
    }
  } else {
    const path = window.location.pathname;
    const base = getBasePath();
    const sub = (base && path.startsWith(base)) ? path.slice(base.length) : path;
    const initialSec = sub.replace(/^\/+|\/+$/g, '');
    if (initialSec && initialSec !== 'home' && document.getElementById(initialSec)) {
      setTimeout(() => {
        const el = document.getElementById(initialSec);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveNavSection(initialSec);
          currentUrlSection = initialSec;
        }
      }, 180);
    }
  }

  // Handle browser back and forward button navigation
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const base = getBasePath();
    const sub = (base && path.startsWith(base)) ? path.slice(base.length) : path;
    const sec = sub.replace(/^\/+|\/+$/g, '') || 'home';
    const targetElem = document.getElementById(sec);
    if (targetElem) {
      targetElem.scrollIntoView({ behavior: 'smooth' });
      setActiveNavSection(sec);
      currentUrlSection = sec;
    }
  });

  // 9. Confetti Celebration Trigger
  const confettiTriggers = document.querySelectorAll('.confetti-trigger');
  confettiTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
      });
    });
  });

  // 10. Helper function to escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
