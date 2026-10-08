document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
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

  // 3. Scroll Progress Indicator & Back-to-Top
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
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Toast Notification Utility
  const toastNotification = document.getElementById('toastNotification');
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2400);
  }

  // 5. Copy Email Action
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'ibrahimhassaan3@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard');
      });
    });
  });

  // 6. Copy Code Action
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const codeBlock = document.getElementById('engineerCodeBlock');
  if (copyCodeBtn && codeBlock) {
    copyCodeBtn.addEventListener('click', () => {
      const textToCopy = codeBlock.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        showToast('Code snippet copied');
        setTimeout(() => {
          copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  }

  // 7. Mobile Navigation Menu Toggle
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

  // 8. Skills Category Filter Tabs
  const filterTabs = document.querySelectorAll('#skillFilters .filter-btn');
  const skillTiles = document.querySelectorAll('.skill-tile');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillTiles.forEach(tile => {
        if (filterValue === 'all' || tile.getAttribute('data-category') === filterValue) {
          tile.style.display = 'flex';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });

  // 9. Projects Category Filter Tabs
  const projectTabs = document.querySelectorAll('#projectFilters .filter-btn');
  const projectCards = document.querySelectorAll('.minimal-card');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-pcategory') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 10. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });
});
