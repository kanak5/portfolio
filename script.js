/* ═══════════════════════════════
   KANAK PORTFOLIO – JS
   ═══════════════════════════════ */

// ── Active sidebar nav on scroll ──
const sections = ['overview', 'projects', 'experience', 'skills', 'education', 'recognition'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      document.querySelectorAll('.snav-item').forEach(el => el.classList.remove('active'));
      const active = document.getElementById(`snav-${id}`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35, rootMargin: '-60px 0px -60px 0px' });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ── Sidebar search filter ──
const searchInput = document.getElementById('sidebar-search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.snav-item').forEach(item => {
      const label = item.querySelector('span:nth-child(2)')?.textContent.toLowerCase() || '';
      item.style.display = q === '' || label.includes(q) ? '' : 'none';
    });
  });
}

// ── Copy email ──
function copyEmail() {
  const email = 'kanak.sethi04@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email copied to clipboard ✓');
    const btn = document.getElementById('copy-email-btn');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {
    showToast('kanak.sethi04@gmail.com');
  });
}

// ── Toast ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Smooth scroll for sidebar nav links ──
document.querySelectorAll('.snav-item, .tnav-link, .footer-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ── Subtle fade-in on sections ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.proj-card, .exp-card, .skills-card, .edu-card, .recog-card, .stats-row, .code-block').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  fadeObserver.observe(el);
});

// expose copyEmail globally (called from inline onclick)
window.copyEmail = copyEmail;
