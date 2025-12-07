import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('AVOI Website Loaded');

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll('.hero-content, .hero-visual, .section-header, .card, .step, .contact-wrapper');
  animatedElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove('hidden');
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 80) {
      // Scrolling down
      header.classList.add('hidden');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
    }
    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Form handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here we would normally send the data to a backend
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);

      // Show success message (simple alert for now, or replace content)
      alert('Thank you for your interest! We will be in touch shortly.');
      form.reset();
    });
  }
});
