import './bootstrap';
import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';
import { initLanyard3D } from './lanyard-3d';
import { initCyberHudCanvas } from './cyber-hud';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  createIcons({ icons });

  // 1b. Initialize Cyber HUD Background Canvas (Binary Rain + Wireframe Terrain)
  try {
    initCyberHudCanvas('cyber-hud-canvas');
  } catch (err) {
    console.warn('Cyber HUD Canvas note:', err);
  }

  // 2. Initialize 3D Lanyard
  try {
    initLanyard3D('lanyard-canvas-container');
  } catch (err) {
    console.warn('3D Lanyard initialization note:', err);
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

  // 4b. Interactive Mouse-Follow Liquid Glass Specular Glare on all .glass-panel cards
  document.querySelectorAll('.glass-panel').forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);
    });
  });

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

  // 6. Interactive Guestbook Form with AJAX & Confetti
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookList = document.getElementById('guestbook-list');
  const guestbookSuccessAlert = document.getElementById('guestbook-alert');

  // Avatar selector inside guestbook
  const avatarChoices = document.querySelectorAll('.avatar-choice');
  const selectedAvatarInput = document.getElementById('selected-avatar');

  avatarChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      avatarChoices.forEach(c => c.classList.remove('ring-2', 'ring-cyan-400', 'bg-cyan-900/50'));
      choice.classList.add('ring-2', 'ring-cyan-400', 'bg-cyan-900/50');
      if (selectedAvatarInput) {
        selectedAvatarInput.value = choice.getAttribute('data-avatar');
      }
    });
  });

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = guestbookForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mengirimkan...</span>';

      const formData = new FormData(guestbookForm);

      try {
        const response = await fetch(guestbookForm.action, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Trigger confetti explosion
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#38bdf8', '#818cf8', '#c084fc', '#34d399'],
          });

          // Prepend new comment to the list
          if (guestbookList && result.data) {
            const newCard = document.createElement('div');
            newCard.className = 'p-4 rounded-xl glass-subcard hover:border-cyan-400/40 transition-all';
            newCard.innerHTML = `
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-full glass-icon-box flex items-center justify-center text-lg shrink-0">
                  ${result.data.avatar || '👨‍💻'}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2">
                    <h4 class="font-semibold text-white text-sm truncate">${escapeHtml(result.data.name)}</h4>
                    <span class="text-xs text-slate-400 font-mono">${result.data.time_ago || 'Baru saja'}</span>
                  </div>
                  <p class="text-slate-200 text-sm mt-1 break-words">${escapeHtml(result.data.message)}</p>
                </div>
              </div>
            `;
            guestbookList.insertBefore(newCard, guestbookList.firstChild);
          }

          guestbookForm.reset();
          if (guestbookSuccessAlert) {
            guestbookSuccessAlert.classList.remove('hidden');
            setTimeout(() => guestbookSuccessAlert.classList.add('hidden'), 5000);
          }
        }
      } catch (err) {
        console.error('Error submitting guestbook:', err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        createIcons({ icons });
      }
    });
  }

  // 7. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const contactSuccessAlert = document.getElementById('contact-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Mengirimkan Pesan...</span>';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.8 },
            colors: ['#06b6d4', '#3b82f6', '#a855f7'],
          });

          contactForm.reset();
          if (contactSuccessAlert) {
            contactSuccessAlert.classList.remove('hidden');
            setTimeout(() => contactSuccessAlert.classList.add('hidden'), 6000);
          }
        }
      } catch (err) {
        console.error('Error submitting contact form:', err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        createIcons({ icons });
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

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-section');
      if (target) setActiveNavSection(target);
      playGlassTap(660);
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
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuDrawer.classList.toggle('is-open');
      playGlassTap(580);
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('data-section');
        if (target) setActiveNavSection(target);
        mobileMenuDrawer.classList.remove('is-open');
        playGlassTap(660);
      });
    });
  }

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
