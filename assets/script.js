document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Gracias por confirmar tu asistencia!');
  this.reset();
});

function setActiveNav(section) {
  document.querySelectorAll('nav .nav-link').forEach(link => {
    link.classList.remove('fw-bold', 'text-decoration-underline');
    if (link.getAttribute('onclick').includes(section)) {
      link.classList.add('fw-bold', 'text-decoration-underline');
    }
  });
}

function loadSection(section, push = true) {
  fetch(`pages/${section}.html`)
    .then(response => response.text())
    .then(html => {
      const main = document.getElementById('main-content');
      main.innerHTML = html;
      setActiveNav(section);
      if (push) {
        history.pushState({section}, '', `#${section}`);
      }
      // Scroll suave al cargar sección
      setTimeout(() => {
        main.scrollIntoView({behavior: 'smooth'});
      }, 50);
      if(section === 'confirmacion') {
        const form = document.querySelector('.confirmacion form');
        if(form) {
          form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por confirmar tu asistencia!');
            this.reset();
          });
        }
      }
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#','') || 'evento';
  loadSection(hash, false);
  iniciarCountdown();
});

window.addEventListener('popstate', (e) => {
  const section = (e.state && e.state.section) || window.location.hash.replace('#','') || 'evento';
  loadSection(section, false);
  iniciarCountdown();
});

function iniciarCountdown() {
  const countdownDiv = document.getElementById('countdown');
  if (!countdownDiv) return;
  function updateCountdown() {
    const eventDate = new Date('2026-02-21T17:20:00');
    const now = new Date();
    const diff = eventDate - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdownDiv.textContent = `Faltan ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
    } else {
      countdownDiv.textContent = '¡El evento ha comenzado!';
    }
  }
  updateCountdown();
  if (window._countdownInterval) clearInterval(window._countdownInterval);
  window._countdownInterval = setInterval(updateCountdown, 1000);
}