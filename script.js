const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

function setMinDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = d => d.toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach(input => input.min = fmt(today));
  ['checkin','bottomCheckin'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value) el.value = fmt(today);
  });
  ['checkout','bottomCheckout'].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value) el.value = fmt(tomorrow);
  });
}
setMinDates();

function sendBooking(prefix = '') {
  const checkin = document.getElementById(prefix + 'Checkin')?.value || document.getElementById('checkin')?.value;
  const checkout = document.getElementById(prefix + 'Checkout')?.value || document.getElementById('checkout')?.value;
  const guests = document.getElementById(prefix + 'Guests')?.value || document.getElementById('guests')?.value;
  const room = document.getElementById('room')?.value || 'Habitación a confirmar';
  const text = `Hola Hotel Sussex, quiero consultar disponibilidad. Entrada: ${checkin}. Salida: ${checkout}. Huéspedes: ${guests}. Habitación: ${room}.`;
  window.open(`https://wa.me/543515441281?text=${encodeURIComponent(text)}`, '_blank');
}

document.getElementById('bookingForm')?.addEventListener('submit', (e) => { e.preventDefault(); sendBooking(''); });
document.getElementById('bottomBookingForm')?.addEventListener('submit', (e) => { e.preventDefault(); sendBooking('bottom'); });

document.querySelectorAll('[data-room]').forEach(button => {
  button.addEventListener('click', () => {
    const roomSelect = document.getElementById('room');
    if (!roomSelect) return;
    const value = button.getAttribute('data-room');
    [...roomSelect.options].forEach(option => {
      if (option.textContent === value) roomSelect.value = option.textContent;
    });
  });
});
