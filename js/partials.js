// ============================================================
// COLORIDO 2K26 — SHARED HEADER / FOOTER
// Single source of truth for the navbar, mobile menu and footer
// so all pages stay structurally and visually identical.
// ============================================================

export const PRIMARY_NAV = [
  { id: 'home', label: 'Home', href: 'index.html' },
  { id: 'events', label: 'Events', href: 'events.html' },
  { id: 'schedule', label: 'Schedule', href: 'schedule.html' },
  { id: 'announcements', label: 'Announcements', href: 'announcements.html' },
  { id: 'gallery', label: 'Gallery', href: 'gallery.html' },
  { id: 'contact', label: 'Contact', href: 'contact.html' },
];

// Shown only in the mobile menu, under the primary links
const SECONDARY_NAV = [
  { id: 'results', label: 'Results', href: 'results.html' },
  { id: 'sponsors', label: 'Sponsors', href: 'sponsors.html' },
];

const FOOTER_COLUMNS = [
  {
    title: 'The Fest',
    links: [
      { label: 'About', href: 'index.html#about' },
      { label: 'Events', href: 'events.html' },
      { label: 'Schedule', href: 'schedule.html' },
      { label: 'Gallery', href: 'gallery.html' },
    ],
  },
  {
    title: 'Participate',
    links: [
      { label: 'Register', href: 'register.html' },
      { label: 'Announcements', href: 'announcements.html' },
      { label: 'Results', href: 'results.html' },
      { label: 'Sponsors', href: 'sponsors.html' },
    ],
  },
];

const CONTACT = {
  email: 'colorido2k26@rvrjcce.edu.in',
  phone: '+91 98765 43210',
  address: 'Chowdavaram, Guntur — 522019, Andhra Pradesh',
};

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/colorido2k26',
    icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
  },
  {
    label: 'Facebook',
    href: '#',
    icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  },
  {
    label: 'YouTube',
    href: '#',
    icon: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
  },
];

const svg = (paths, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

// Four quarter-circle tiles in the <colorido-logo> palette
export const BRAND_MARK = `
  <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#18181B"/>
    <path d="M8 8h11v11A11 11 0 0 1 8 8z" fill="#FF4D6D"/>
    <path d="M21 8h11A11 11 0 0 1 21 19z" fill="#FFB627"/>
    <path d="M8 32V21a11 11 0 0 1 11 11z" fill="#2EC4B6"/>
    <path d="M21 32a11 11 0 0 1 11-11v11z" fill="#3A86FF"/>
  </svg>`;

function renderNavLink(item, activePage) {
  const isActive = item.id === activePage;
  return `<a href="${item.href}"${isActive ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`;
}

function renderMobileLink(item, activePage) {
  const isActive = item.id === activePage;
  return `
    <a href="${item.href}"${isActive ? ' class="active" aria-current="page"' : ''}>
      <span>${item.label}</span>
      ${svg('<polyline points="9 18 15 12 9 6"/>', 18)}
    </a>`;
}

function renderSocials(className) {
  return `
    <div class="${className}">
      ${SOCIALS.map((s) => `<a href="${s.href}" aria-label="${s.label}"${s.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${svg(s.icon)}</a>`).join('')}
    </div>`;
}

export function renderHeader(activePage) {
  const onRegister = activePage === 'register';
  return `
    <nav class="navbar" id="navbar" aria-label="Main">
      <div class="container">
        <a href="index.html" class="navbar-brand" aria-label="COLORIDO 2K26 home">
          ${BRAND_MARK}
          <span class="brand-text">
            <span class="brand-name">COLORIDO <span class="gradient-text">2K26</span></span>
            <span class="brand-sub">15–17 Oct 2026 · Guntur</span>
          </span>
        </a>
        <div class="nav-links" id="navLinks">
          ${PRIMARY_NAV.map((item) => renderNavLink(item, activePage)).join('')}
          <span class="nav-indicator" id="navIndicator" aria-hidden="true"></span>
        </div>
        <div class="nav-cta">
          <a href="register.html" class="btn btn-primary nav-register${onRegister ? ' is-current' : ''}"${onRegister ? ' aria-current="page"' : ''}>Register</a>
          <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-menu-backdrop" id="mobileMenuBackdrop" hidden></div>
    <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Site menu" hidden>
      <nav class="mobile-menu-links" aria-label="Mobile">
        ${PRIMARY_NAV.map((item) => renderMobileLink(item, activePage)).join('')}
      </nav>
      <div class="mobile-menu-secondary">
        ${SECONDARY_NAV.map((item) => renderNavLink(item, activePage)).join('')}
      </div>
      <div class="mobile-menu-footer">
        <p class="mobile-menu-meta">
          ${svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', 16)}
          15–17 October 2026 · R.V.R. &amp; J.C. College, Guntur
        </p>
        <a href="register.html" class="btn btn-primary">Register Now</a>
        ${renderSocials('mobile-menu-social')}
      </div>
    </div>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="footer-logo" aria-label="COLORIDO 2K26 home">
              ${BRAND_MARK}
              <span>COLORIDO <span class="gradient-text">2K26</span></span>
            </a>
            <p class="footer-tagline">The national-level cultural &amp; sports fest of R.V.R. &amp; J.C. College of Engineering. Three days of stage, sport and celebration.</p>
            <p class="footer-dates">${svg('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', 16)} 15–17 October 2026</p>
            ${renderSocials('footer-social')}
          </div>
          ${FOOTER_COLUMNS.map(
            (col) => `
          <div class="footer-col">
            <h2>${col.title}</h2>
            <ul>
              ${col.links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
            </ul>
          </div>`,
          ).join('')}
          <div class="footer-col footer-contact">
            <h2>Get in Touch</h2>
            <ul>
              <li><a href="mailto:${CONTACT.email}">${svg('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', 16)}<span>${CONTACT.email}</span></a></li>
              <li><a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>', 16)}<span>${CONTACT.phone}</span></a></li>
              <li><a href="contact.html">${svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', 16)}<span>${CONTACT.address}</span></a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 COLORIDO 2K26 · R.V.R. &amp; J.C. College of Engineering, Guntur</p>
          <a href="contact.html">Contact the organising team →</a>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="backToTop" type="button" aria-label="Back to top">
      ${svg('<polyline points="18 15 12 9 6 15"/>', 20)}
    </button>
  `;
}
