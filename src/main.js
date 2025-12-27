import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('AVOI Website Loaded');

  // ============================================
  // Mobile Menu Toggle
  // ============================================
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Sticky CTA Button
  // ============================================
  const stickyCta = document.querySelector('.sticky-cta');
  const heroSection = document.querySelector('.hero');

  if (stickyCta && heroSection) {
    const showStickyCta = () => {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollPosition = window.pageYOffset + window.innerHeight;

      if (scrollPosition > heroBottom + 200) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', showStickyCta);
    showStickyCta(); // Check on load
  }

  // ============================================
  // Header Scroll Effect
  // ============================================
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

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Keep observing for repeatable animations if needed
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    '.hero-content, .hero-visual, .section-header, .card, .step, .contact-wrapper, .building-content, .building-visual, .feature-item'
  );

  animatedElements.forEach((el, index) => {
    el.classList.add('reveal');

    // Add stagger classes to cards and steps
    if (el.classList.contains('card') || el.classList.contains('step') || el.classList.contains('feature-item')) {
      const staggerIndex = (index % 4) + 1;
      el.classList.add(`stagger-${staggerIndex}`);
    }

    observer.observe(el);
  });

  // ============================================
  // Enhanced Voice Wave Animation
  // ============================================
  const voiceWave = document.querySelector('.voice-wave');

  if (voiceWave) {
    const bars = voiceWave.querySelectorAll('.bar');

    // Add randomized animation delays for more natural feel
    bars.forEach((bar, index) => {
      const randomDelay = Math.random() * 0.5;
      bar.style.animationDelay = `${randomDelay}s`;

      // Add random height variations
      setInterval(() => {
        const randomScale = 0.7 + Math.random() * 0.6;
        bar.style.setProperty('--random-scale', randomScale);
      }, 2000 + Math.random() * 1000);
    });
  }

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Form Handling with Validation
  // ============================================
  const form = document.getElementById('contactForm');

  if (form) {
    const inputs = form.querySelectorAll('input, textarea');

    // Add focus/blur effects
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        if (input.value.trim() !== '') {
          input.parentElement.classList.add('filled');
        } else {
          input.parentElement.classList.remove('filled');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      inputs.forEach(input => {
        if (input.hasAttribute('required') && input.value.trim() === '') {
          isValid = false;
          input.parentElement.classList.add('error');
        } else {
          input.parentElement.classList.remove('error');
        }
      });

      if (!isValid) {
        return;
      }

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);

      // Show success message
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();
        inputs.forEach(input => {
          input.parentElement.classList.remove('filled');
        });
      }, 3000);
    });
  }

  // ============================================
  // Parallax Effect for Background Elements
  // ============================================
  const parallaxElements = document.querySelectorAll('.hero::before');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ============================================
  // Reduced Motion Support
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
    document.documentElement.style.setProperty('--transition-smooth', '0ms');
  }

  // ============================================
  // Performance Optimization: Lazy Load Images
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // Console Easter Egg
  // ============================================
  console.log(
    '%c🎙️ AVOI - Smart Voice Agents',
    'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #7c3aed, #ec4899); -webkit-background-clip: text; color: transparent;'
  );
  console.log(
    '%cInterested in joining our team? Email us at careers@avoi.ai',
    'font-size: 12px; color: #a1a1aa;'
  );
});
