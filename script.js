const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const bookingForm = document.getElementById('bookingForm');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const text = `Hola, quiero consultar disponibilidad en Hotel Sussex Córdoba.%0A%0AEntrada: ${data.get('checkin')}%0ASalida: ${data.get('checkout')}%0AHuéspedes: ${data.get('guests')}%0AHabitación: ${data.get('room')}`;
  window.open(`https://wa.me/5493515441281?text=${text}`, '_blank');
});

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent('Consulta desde la nueva web');
  const body = encodeURIComponent(`Nombre: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMensaje:\n${data.get('message')}`);
  window.location.href = `mailto:reservas@hotelsussexcba.com.ar?subject=${subject}&body=${body}`;
});

const today = new Date().toISOString().split('T')[0];
const checkin = document.querySelector('input[name="checkin"]');
const checkout = document.querySelector('input[name="checkout"]');
if (checkin && checkout) {
  checkin.min = today;
  checkout.min = today;
  checkin.addEventListener('change', () => {
    checkout.min = checkin.value;
    if (checkout.value && checkout.value < checkin.value) checkout.value = checkin.value;
  });
}
