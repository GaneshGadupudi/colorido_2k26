// ============================================================
// COLORIDO 2K26 — <colorido-logo> WEB COMPONENT
// Self-contained animated wordmark: 16 rotating tiles + letters,
// cycling through its own palette set on click. Dispatches
// "palettechange" (detail: { c, bg, ink }) so a host page can
// theme a backdrop to match — see js/pages/home.js.
// ============================================================

class ColoridoLogo extends HTMLElement {
  static palettes = [
    { c: ['#FF4D6D', '#FFB627', '#2EC4B6', '#3A86FF', '#B45CFF'], bg: '#1D1A3A', ink: '#FFF6E5' },
    { c: ['#E63946', '#F4A261', '#1B9AAA', '#3D5AFE', '#8E24AA'], bg: '#EDEBFF', ink: '#241C4D' },
    { c: ['#FF7B54', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B9E'], bg: '#0E3B43', ink: '#F3FFF9' },
  ];
  static SHAPES = {
    q: { d: 'M0 0H44A44 44 0 0 1 0 44Z', o: [-22, -22] }, // quarter disc
    h: { d: 'M0 0H44A22 22 0 0 1 0 0Z', o: [-22, -11] }, // half disc
    p: { d: 'M11 0H33A11 11 0 0 1 33 22H11A11 11 0 0 1 11 0Z', o: [-22, -11] }, // pill
    l: { d: 'M0 44A44 44 0 0 0 44 0A44 44 0 0 0 0 44Z', o: [-22, -22] }, // leaf
  };
  static LAYOUT = 'qplq' + 'hqph' + 'plqp' + 'qhpl';
  static COLORS = [0, 3, 1, 2, 4, 2, 0, 3, 1, 0, 3, 4, 2, 4, 1, 0];

  connectedCallback() {
    const NS = 'http://www.w3.org/2000/svg';
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display: inline-block; width: var(--size, 320px); outline: none; color: #fff; cursor: pointer; }
        :host(:focus-visible) svg { outline: 2px solid currentColor; outline-offset: 8px; border-radius: 8px; }
        svg { width: 100%; height: auto; display: block; overflow: visible; touch-action: manipulation; }
        .tile path { transition: fill .6s ease; }
        .word text {
          font: 800 46px "Avenir Next", "Nunito", "Trebuchet MS", "Segoe UI", system-ui, sans-serif;
          text-anchor: middle; transition: transform .28s cubic-bezier(.3,1.8,.5,1), fill .6s;
          transform-box: fill-box; transform-origin: 50% 100%;
        }
        .word text:hover { transform: translateY(-8px) scale(1.14); }
        .tag { font: 600 9.5px "Avenir Next", "Nunito", "Trebuchet MS", system-ui, sans-serif;
               letter-spacing: .32em; text-anchor: middle; fill: currentColor; opacity: .75; transition: fill .6s; }
        @media (prefers-reduced-motion: reduce) { .word text:hover { transform: none; } }
      </style>
      <svg viewBox="0 0 240 296" role="img" aria-label="Colorido, culture and sports event">
        <g class="tiles"></g>
        <g class="word"></g>
        <text class="tag" x="120" y="292">culture &amp; sports</text>
      </svg>`;

    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.pal = 0;
    const svg = root.querySelector('svg');
    const tilesG = root.querySelector('.tiles');
    const wordG = root.querySelector('.word');
    const P = ColoridoLogo.palettes;

    // tiles
    this.tiles = [];
    for (let i = 0; i < 16; i++) {
      const col = i % 4, row = (i / 4) | 0;
      const sh = ColoridoLogo.SHAPES[ColoridoLogo.LAYOUT[i]];
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'tile');
      g.setAttribute('transform', `translate(${20 + col * 50 + 25} ${row * 50 + 25})`);
      const rot = document.createElementNS(NS, 'g');
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', sh.d);
      path.setAttribute('transform', `translate(${sh.o[0]} ${sh.o[1]})`);
      rot.appendChild(path);
      g.appendChild(rot);
      tilesG.appendChild(g);
      const a = ((i * (i % 3 + 1)) % 4) * 90;
      this.tiles.push({ rot, path, col, row, a, t: a, last: 0, ci: ColoridoLogo.COLORS[i] });
      rot.setAttribute('transform', `rotate(${a})`);
    }

    // wordmark letters
    this.letters = [...'COLORIDO'].map((ch, i) => {
      const el = document.createElementNS(NS, 'text');
      el.setAttribute('x', 20 + 27.5 * (i + 0.5));
      el.setAttribute('y', 262);
      el.textContent = ch;
      wordG.appendChild(el);
      return el;
    });

    // motion
    this.running = false;
    this.kick = () => {
      if (!this.running) {
        this.running = true;
        requestAnimationFrame(this.frame);
      }
    };
    this.frame = () => {
      let moving = false;
      for (const t of this.tiles) {
        const d = t.t - t.a;
        if (Math.abs(d) > 0.05) {
          t.a = this.reduce ? t.t : t.a + d * 0.16;
          moving = true;
        } else {
          t.a = t.t;
        }
        t.rot.setAttribute('transform', `rotate(${t.a.toFixed(2)})`);
      }
      if (moving) requestAnimationFrame(this.frame);
      else this.running = false;
    };
    this.wave = (from) => {
      const f = this.tiles[from];
      this.tiles.forEach((t) => {
        const dist = Math.hypot(t.col - f.col, t.row - f.row);
        setTimeout(() => {
          t.t += 90;
          this.kick();
        }, this.reduce ? 0 : dist * 90);
      });
    };

    // interaction
    svg.addEventListener('pointermove', (e) => {
      const r = svg.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 240, y = ((e.clientY - r.top) / r.height) * 296;
      const col = Math.floor((x - 20) / 50), row = Math.floor(y / 50);
      if (col < 0 || col > 3 || row < 0 || row > 3) return;
      const t = this.tiles[row * 4 + col], now = performance.now();
      if (now - t.last > 450) {
        t.last = now;
        t.t += 90;
        this.kick();
      }
    });
    this.addEventListener('click', (e) => {
      this.setPalette((this.pal + 1) % P.length);
      const r = svg.getBoundingClientRect();
      const col = Math.min(3, Math.max(0, Math.floor(((((e.clientX - r.left) / r.width) * 240) - 20) / 50)));
      const row = Math.min(3, Math.max(0, Math.floor((((e.clientY - r.top) / r.height) * 296) / 50)));
      this.wave(row * 4 + col);
    });
    this.tabIndex = 0;
    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });

    // ambient: a wave rolls through now and then
    if (!this.reduce) {
      this.timer = setInterval(() => {
        if (!document.hidden) this.wave((Math.random() * 16) | 0);
      }, 3600);
      setTimeout(() => this.wave(5), 300);
    }
    this.setPalette(0);
  }

  setPalette(n) {
    const p = ColoridoLogo.palettes[n];
    this.pal = n;
    this.style.color = p.ink;
    this.tiles.forEach((t) => (t.path.style.fill = p.c[t.ci]));
    this.letters.forEach((l, i) => (l.style.fill = p.c[(i * 2 + n) % 5]));
    this.dispatchEvent(new CustomEvent('palettechange', { detail: p, bubbles: true }));
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }
}

customElements.define('colorido-logo', ColoridoLogo);
