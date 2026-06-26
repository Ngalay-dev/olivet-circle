/* ============================================================
   THE OLIVET CIRCLE — main.js
   ============================================================

   ██████████████████████████████████████████████████████████
   SETTINGS — EDIT ONLY THIS SECTION
   Change these values to customise the site behaviour.
   ██████████████████████████████████████████████████████████ */

const SETTINGS = {

  // WhatsApp
  // Replace with your number including country code, no spaces or dashes
  // Example: "6591234567"
  whatsappNumber: "6591234567",

  // WhatsApp pre-filled message when someone clicks the button
  whatsappMessage: "Hi Carol, I'd like to find out more about estate planning.",

  // Formspree
  // 1. Go to https://formspree.io and create a free account
  // 2. Create a new form — you'll get an ID like "abcdefgh"
  // 3. Replace YOUR_FORM_ID below with that ID
  formspreeId: "YOUR_FORM_ID",

  // Calendly
  // 1. Go to https://calendly.com and create a free account
  // 2. Set up your availability and event types
  // 3. Copy your Calendly link e.g. "https://calendly.com/carol-olivetcircle"
  // 4. Replace the URL below
  calendlyUrl: "https://calendly.com/taryarlinlet511",

};

/* ██████████████████████████████████████████████████████████
   END OF SETTINGS — do not edit below unless you know JS
   ██████████████████████████████████████████████████████████ */


/* ============================================================
   1. NAVIGATION — shrinks on scroll
   ============================================================ */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


/* ============================================================
   2. MOBILE HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

// Close menu when a nav link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});


/* ============================================================
   3. WHATSAPP FLOATING BUTTON
   Injects the button dynamically using SETTINGS.whatsappNumber
   ============================================================ */
function initWhatsApp() {
  const number  = SETTINGS.whatsappNumber;
  const message = encodeURIComponent(SETTINGS.whatsappMessage);
  const url     = `https://wa.me/${number}?text=${message}`;

  const btn = document.getElementById('whatsapp-btn');
  if (btn) {
    btn.href = url;
    btn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  }
}

initWhatsApp();


/* ============================================================
   4. WHATSAPP TOOLTIP — show/hide on hover
   ============================================================ */
const waBtn     = document.getElementById('whatsapp-btn');
const waTooltip = document.getElementById('wa-tooltip');

if (waBtn && waTooltip) {
  waBtn.addEventListener('mouseenter', () => waTooltip.classList.add('show'));
  waBtn.addEventListener('mouseleave', () => waTooltip.classList.remove('show'));
}


/* ============================================================
   5. ENQUIRY FORM — Formspree integration
   ============================================================ */
const enquiryForm = document.getElementById('enquiry-form-el');
const enqResponse = document.getElementById('enq-response');
const enqBtn      = document.getElementById('enq-submit-btn');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Basic validation
    const first   = document.getElementById('enq-first').value.trim();
    const email   = document.getElementById('enq-email').value.trim();
    const consent = document.getElementById('enq-consent').checked;

    if (!first || !email) {
      showEnqMessage('Please fill in your name and email address.', 'error');
      return;
    }
    if (!consent) {
      showEnqMessage('Please give your consent to proceed.', 'error');
      return;
    }

    // Check if Formspree ID has been set
    if (SETTINGS.formspreeId === 'YOUR_FORM_ID') {
      showEnqMessage('⚠️ Form not connected yet. Please set your Formspree ID in main.js SETTINGS.', 'error');
      return;
    }

    // Disable button while sending
    enqBtn.textContent = 'Sending…';
    enqBtn.disabled = true;

    try {
      const formData = new FormData(enquiryForm);
      const response = await fetch(`https://formspree.io/f/${SETTINGS.formspreeId}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showEnqMessage(`✓ Thank you, ${first}. We'll be in touch within one business day.`, 'success');
        enquiryForm.reset();
      } else {
        showEnqMessage('Something went wrong. Please email us directly at connect@theolivetcircle.com', 'error');
      }
    } catch (err) {
      showEnqMessage('Network error. Please try again or email us directly.', 'error');
    }

    enqBtn.textContent = 'Send Enquiry';
    enqBtn.disabled = false;
  });
}

function showEnqMessage(msg, type) {
  enqResponse.textContent = msg;
  enqResponse.style.color = type === 'success' ? 'var(--olive-sage)' : '#c97060';
  enqResponse.style.marginTop = '0.75rem';
  enqResponse.style.fontSize = '0.82rem';
  enqResponse.style.textAlign = 'center';
}


/* ============================================================
   6. CALENDLY EMBED — loads when section is in view
   ============================================================ */
function initCalendly() {
  const container = document.getElementById('calendly-container');
  if (!container) return;

  // Check if URL has been set
  if (SETTINGS.calendlyUrl === 'https://calendly.com/YOUR_CALENDLY_LINK') {
    container.innerHTML = `
      <div style="
        padding: 3rem 2rem;
        text-align: center;
        border: 1px dashed var(--olive-pale);
        background: var(--parchment);
        color: var(--text-muted);
        font-size: 0.88rem;
        line-height: 1.7;
      ">
        <div style="font-size:2rem; margin-bottom:1rem">📅</div>
        <strong style="color:var(--olive-deep); display:block; margin-bottom:0.5rem">
          Calendly not connected yet
        </strong>
        Sign up at <a href="https://calendly.com" target="_blank"
          style="color:var(--olive-mid)">calendly.com</a>,
        set your availability, then paste your link into
        <code>SETTINGS.calendlyUrl</code> in <strong>js/main.js</strong>
      </div>`;
    return;
  }

  // Load Calendly widget script once
  if (!document.getElementById('calendly-script')) {
    const script = document.createElement('script');
    script.id  = 'calendly-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
  }

  // Render inline Calendly widget
  container.innerHTML = `
    <div class="calendly-inline-widget"
         data-url="${SETTINGS.calendlyUrl}?hide_gdpr_banner=1&primary_color=3D4A2E"
         style="min-width:280px; height:660px;">
    </div>`;

  // Re-init Calendly if script already loaded
  if (window.Calendly) {
    window.Calendly.initInlineWidgets();
  }
}

// Use IntersectionObserver so Calendly only loads when scrolled into view
const apptSection = document.getElementById('appointment');
if (apptSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initCalendly();
      observer.disconnect();
    }
  }, { threshold: 0.1 });
  observer.observe(apptSection);
}


/* ============================================================
   7. SMOOTH SCROLL for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ============================================================
   8. FADE-IN ANIMATION on scroll
   ============================================================ */
const fadeEls = document.querySelectorAll(
  '.service-card, .tree-card, .audience-card, .stat-card, .result-item, .pillar'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});
