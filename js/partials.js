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

function renderNavLink(item, activePage) {
  const isActive = item.id === activePage;
  return `<a href="${item.href}"${isActive ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`;
}

export function renderHeader(activePage) {
  return `
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <div class="brand-mark">C</div>
          <div class="brand-text">
            COLORIDO <span class="gradient-text">2K26</span>
            <div class="brand-sub">R.V.R. &amp; J.C. College</div>
          </div>
        </a>
        <div class="nav-links" id="navLinks">
          ${PRIMARY_NAV.map((item) => renderNavLink(item, activePage)).join('')}
          <span class="nav-indicator" id="navIndicator" aria-hidden="true"></span>
        </div>
        <div class="nav-cta">
          <a href="register.html" class="btn btn-primary">Register</a>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
      ${PRIMARY_NAV.map((item) => renderNavLink(item, activePage)).join('')}
      <a href="register.html" class="btn btn-primary">Register Now</a>
    </div>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>COLORIDO <span class="gradient-text">2K26</span></h3>
            <p class="footer-college">R.V.R. &amp; J.C. College of Engineering</p>
            <p class="footer-location">Guntur, Andhra Pradesh</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="index.html#about">About</a></li>
              <li><a href="events.html">Events</a></li>
              <li><a href="schedule.html">Schedule</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Fest Info</h4>
            <ul>
              <li><a href="register.html">Registration</a></li>
              <li><a href="announcements.html">Announcements</a></li>
              <li><a href="results.html">Results</a></li>
              <li><a href="sponsors.html">Sponsors</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 COLORIDO 2K26 — R.V.R. & J.C. College of Engineering, Guntur</p>
        </div>
      </div>
    </footer>

    <button class="back-to-top" id="backToTop" aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  `;
}
