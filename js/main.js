/* =========================================
   TRUE NORTH LANDSCAPING — Main JavaScript
   ========================================= */

// Mobile hamburger menu
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  // Handle all quote forms with Formspree
  // To activate: sign up free at https://formspree.io
  // Then replace YOUR_FORM_ID in each form's action attribute
  document.querySelectorAll('.quote-form').forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      const action = form.getAttribute('action');

      // If the form still has the placeholder action, show a friendly message
      if (!action || action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        alert('Form not yet connected. See setup instructions in the README.');
        return;
      }

      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.innerHTML = `
            <div style="text-align:center;padding:2rem 0;">
              <div style="font-size:2.5rem;margin-bottom:1rem;">✅</div>
              <h3 style="color:#1a4a28;margin-bottom:0.5rem;">Request Received!</h3>
              <p style="color:#4b5563;">We'll be in touch within 24 hours to schedule your free estimate.</p>
            </div>`;
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert('Something went wrong. Please call us directly or try again.');
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
