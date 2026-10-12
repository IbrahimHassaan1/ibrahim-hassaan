/**
 * IBRAHIM HASSAAN — PORTFOLIO & CV
 * Premium Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. DYNAMIC COPYRIGHT YEAR
  // ==========================================================================
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 2. THEME TOGGLE (DARK / LIGHT)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // ==========================================================================
  // 3. SCROLL PROGRESS INDICATOR & BACK TO TOP
  // ==========================================================================
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgress) {
      const progressPercent = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 4. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  const toastNotification = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification) return;
    clearTimeout(toastTimer);
    toastNotification.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent); margin-right: 8px;"></i>${message}`;
    toastNotification.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2600);
  }

  // ==========================================================================
  // 5. COPY ACTIONS (EMAIL & CODE)
  // ==========================================================================
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'ibrahimhassaan3@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const codeBlock = document.getElementById('engineerCodeBlock');
  if (copyCodeBtn && codeBlock) {
    copyCodeBtn.addEventListener('click', () => {
      const textToCopy = codeBlock.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--success);"></i>';
        showToast('Code snippet copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2200);
      });
    });
  }

  // ==========================================================================
  // 6. MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = mobileMenuBtn.querySelector('i');
      if (navLinks.classList.contains('show')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Keyboard accessibility: ESC closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      const icon = mobileMenuBtn?.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });

  // ==========================================================================
  // 7. ACTIVE NAVIGATION ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 8. CATEGORY FILTERS (PROJECTS & SKILLS)
  // ==========================================================================
  const projectTabs = document.querySelectorAll('#projectFilters .filter-btn');
  const projectCards = document.querySelectorAll('.minimal-card');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filterValue = tab.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const matches = (filterValue === 'all' || card.getAttribute('data-pcategory') === filterValue);
        if (matches) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  const skillTabs = document.querySelectorAll('#skillFilters .filter-btn');
  const skillTiles = document.querySelectorAll('.skill-tile');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filterValue = tab.getAttribute('data-filter');

      skillTiles.forEach(tile => {
        const matches = (filterValue === 'all' || tile.getAttribute('data-category') === filterValue);
        if (matches) {
          tile.style.display = 'flex';
          setTimeout(() => {
            tile.style.opacity = '1';
            tile.style.transform = 'translateY(0)';
          }, 10);
        } else {
          tile.style.opacity = '0';
          tile.style.transform = 'translateY(10px)';
          setTimeout(() => {
            tile.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // ==========================================================================
  // 9. SCROLL REVEAL OBSERVER
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ==========================================================================
  // 10. ANIMATED METRIC COUNTERS
  // ==========================================================================
  const metricCards = document.querySelectorAll('.metric-card');
  let metricsCounted = false;

  function countUp(element, target, prefix = '', suffix = '', duration = 1600) {
    let start = 0;
    const isYear = target > 2000;
    if (isYear) start = 2000;
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * ease);
      element.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = `${prefix}${target}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window && metricCards.length > 0) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsCounted) {
          metricsCounted = true;
          metricCards.forEach(card => {
            const numEl = card.querySelector('.metric-num');
            if (!numEl) return;
            const text = numEl.textContent.trim();
            if (text === '2026') {
              countUp(numEl, 2026, '', '', 1400);
            } else if (text.includes('5+')) {
              countUp(numEl, 5, '', '+', 1200);
            } else if (text === '2') {
              countUp(numEl, 2, '', '', 1000);
            }
          });
        }
      });
    }, { threshold: 0.3 });

    metricCards.forEach(card => metricsObserver.observe(card));
  }

  // ==========================================================================
  // 11. INTERACTIVE 3D CARD TILT & SPOTLIGHT TRACKER
  // ==========================================================================
  const interactiveCards = document.querySelectorAll('.minimal-card, .minimal-terminal, .trait-box');

  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      if (card.classList.contains('minimal-terminal')) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      } else if (card.classList.contains('minimal-card')) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg) translateY(-6px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--mouse-x');
      card.style.removeProperty('--mouse-y');
      if (card.classList.contains('minimal-terminal')) {
        card.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg)';
      } else {
        card.style.transform = '';
      }
    });
  });

  // ==========================================================================
  // 12. INTERACTIVE PARTICLES / CONSTELLATION CANVAS
  // ==========================================================================
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    let animationFrameId = null;
    let mouse = { x: -1000, y: -1000, radius: 130 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.65)' : 'rgba(99, 102, 241, 0.35)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 24000), 50);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * (isDark ? 0.2 : 0.08);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });
  }
});
