// NW Paint & Remodel — Main JS

(function() {
  'use strict';

  // Mobile Navigation Toggle
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    var navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // Sticky header background on scroll
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Active nav link highlighting
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav__link');

  function highlightNav() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(function(item) {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-item__question');
    question.addEventListener('click', function() {
      var isOpen = item.classList.contains('open');
      // Close all others
      faqItems.forEach(function(other) { other.classList.remove('open'); });
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Quote Form Submission
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var formData = new FormData(quoteForm);
      var data = {};
      formData.forEach(function(value, key) { data[key] = value; });

      // Track form submission in GA
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'form',
          event_label: data.service || 'unknown',
          value: 1
        });
      }

      // Show success message
      var btn = quoteForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Thank You! We\'ll Be In Touch.';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';

      // Send to email via mailto fallback (or could be replaced with a form backend)
      var subject = encodeURIComponent('Quote Request - ' + (data.service || 'General'));
      var body = encodeURIComponent(
        'Name: ' + data.firstName + ' ' + data.lastName + '\n' +
        'Email: ' + data.email + '\n' +
        'Phone: ' + data.phone + '\n' +
        'Address: ' + (data.address || 'Not provided') + '\n' +
        'Service: ' + (data.service || 'Not specified') + '\n' +
        'Details: ' + (data.details || 'None')
      );

      // Open mailto as fallback
      setTimeout(function() {
        window.location.href = 'mailto:outreach@nwpaintandremodel.com?subject=' + subject + '&body=' + body;
      }, 500);

      // Reset form after delay
      setTimeout(function() {
        quoteForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    });
  }

  // Track phone clicks in GA
  var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'click', {
          event_category: 'phone',
          event_label: 'call_click',
          value: 1
        });
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
