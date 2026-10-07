/* =====================================================================
   CONFIGURAÇÃO DOS VÍDEOS  —  é aqui que você coloca seu conteúdo
   ---------------------------------------------------------------------
   Para cada item preencha:
     youtube: o ID do vídeo (a parte depois de "v=" no link do YouTube,
              ou depois de "youtu.be/" / "shorts/")
     thumb:   (opcional) caminho de uma imagem de capa, ex: 'assets/capa1.jpg'
     title:   (opcional) legenda que aparece no cartão
   Na página "Outros", em vez de youtube você pode usar  image: 'assets/x.jpg'
   (é o que abre quando clica numa pasta).
   ===================================================================== */
const CONTENT = {
  'home-longos': [ { youtube: '2fXMITWJsYU', thumb: '', title: 'Video 2' }, { youtube: 'geeIieObAyY', thumb: '', title: 'Video 1' }, { youtube: 'yAhCQgp-two', thumb: '', title: 'Video 3' } ],
  'home-curtos': [ { youtube: 'bIKyqQmvj1Y', thumb: '', title: 'Video 3' }, { youtube: 'c1bmlTtrYv8', thumb: '', title: 'Video 1' }, { youtube: 'F9GNgwOAREg', thumb: '', title: 'Video 2' } ],
  longos: ['_F1QO28zyuQ', 'PIPRP-wYqUs', '2fXMITWJsYU', 'yAhCQgp-two', 'uSbEdqzeVwA', 'PKKpR2hgVmM']
    .map((youtube, i) => ({ youtube, thumb: '', title: 'Video ' + (i + 1) })),
  curtos: ['c1bmlTtrYv8', 'F9GNgwOAREg', 'bIKyqQmvj1Y', 'RxvgWMx4kLw', '4lkBaCZFCPo', '55mLGlL2gaQ']
    .map((youtube, i) => ({ youtube, thumb: '', title: 'Video ' + (i + 1) })),
  outros: ['bhpDx25A4EE', 'Scsorm5a4c4', 'blzK2CbFfXI', 'ThSuYlbClqY']
    .map((youtube, i) => ({ youtube, image: '', thumb: '', title: 'Trabalho ' + (i + 1) }))
};

/* ============================ Idiomas ============================ */
const EN = {
  nav_long: 'Long videos', nav_short: 'Short videos', nav_other: 'Others', nav_contact: 'Contact',
  hero_hi: "Hi, I'm Kin!", btn_talk: "Let's talk", btn_projects: 'See projects',
  svc_edit: 'Video Editing', svc_motion: 'Motion Design', svc_film: 'Filmmaking',
  works: 'Works', long_label: 'Long Videos', short_label: 'Short Videos',
  title_long: 'Long Videos', title_short: 'Short Videos', title_other: 'Other Works',
  about: 'About me',
  about_text: "Hi, I'm João Vitor! I'm a video editor and motion designer who also lives the content-creation side of things. I work with tools like Premiere, After Effects and Photoshop to create high-impact visuals. Because I write and make my own videos for the web, I've developed a sharp eye for the rhythm and aesthetics of audiovisual work. My goal is always to deliver dynamic edits that mix solid technique with the fast language the internet demands!",
  contacts: 'My Contacts',
  hero_t1: 'Video Editor &', hero_t2: 'Motion Designer',
  hero_sub: 'Dynamic edits, with technique and the fast language the internet demands.',
  see_all: 'See all', soon: 'Coming soon', close: 'Close'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

function setLang(lang) {
  $$('[data-i18n]').forEach(el => {
    if (el.dataset.pt === undefined) el.dataset.pt = el.textContent;
    el.textContent = lang === 'en' ? (EN[el.dataset.i18n] || el.dataset.pt) : el.dataset.pt;
  });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.documentElement.dataset.lang = lang;
  store('lang', lang);
}

/* ===== Aceita imagens em .png, .jpg, .jpeg ou .webp com o mesmo nome ===== */
const IMG_EXTS = ['png', 'jpg', 'jpeg', 'webp'];
function tryNextExt(img) {
  const m = (img.getAttribute('src') || '').match(/^(assets\/[^?#]+)\.(\w+)$/i);
  if (!m) return;
  const tried = (img.dataset.tried || m[2].toLowerCase()).split(',');
  const next = IMG_EXTS.find(x => !tried.includes(x));
  if (!next) return;
  img.dataset.tried = tried.concat(next).join(',');
  img.src = m[1] + '.' + next;
}
document.addEventListener('error', e => { if (e.target instanceof HTMLImageElement) tryNextExt(e.target); }, true);

const ytThumb = (id, quality) => 'https://i.ytimg.com/vi/' + id + '/' + quality + '.jpg';

/* ========================= Cartões de vídeo ======================== */
function fillCards() {
  $$('.video-card').forEach(card => {
    const item = (CONTENT[card.dataset.group] || [])[+card.dataset.index];
    if (!item) return;
    // Capa: usa a sua (thumb) ou pega automaticamente a capa do vídeo no YouTube
    const src = item.thumb || (item.youtube ? ytThumb(item.youtube, 'maxresdefault') : '');
    if (src) {
      const img = document.createElement('img');
      img.className = 'thumb'; img.src = src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      if (!item.thumb && item.youtube) {
        img.addEventListener('error', () => { img.src = ytThumb(item.youtube, 'hqdefault'); }, { once: true });
      }
      card.prepend(img);
    }
    card.setAttribute('aria-label', item.title || 'Abrir vídeo');
    card.addEventListener('click', () => openItem(card.dataset.group, +card.dataset.index));
  });
}

/* =============================== Modal ============================= */
let lastFocus = null;
function modalEl() {
  let m = $('#modal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'modal'; m.className = 'modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
  m.innerHTML = '<div class="modal-box"><button class="modal-close" aria-label="Fechar">×</button><div class="modal-content"></div></div>';
  document.body.appendChild(m);
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('.modal-close')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  return m;
}
function closeModal() {
  const m = $('#modal');
  if (!m || !m.classList.contains('open')) return;
  m.classList.remove('open');
  $('.modal-content', m).innerHTML = '';
  if (lastFocus) lastFocus.focus();
}
function openItem(group, index) {
  const item = (CONTENT[group] || [])[index];
  const vertical = group.endsWith('curtos');
  /* Abrindo o arquivo direto do computador (file://), o YouTube recusa o player embutido
     (erro 153). Nesse caso abrimos o vídeo no próprio YouTube, em outra aba.
     Quando o site estiver hospedado (https://), o player aparece normalmente aqui dentro. */
  if (item && item.youtube && location.protocol === 'file:') {
    window.open('https://www.youtube.com/watch?v=' + encodeURIComponent(item.youtube), '_blank', 'noopener');
    return;
  }
  const m = modalEl();
  const box = $('.modal-box', m), content = $('.modal-content', m);
  box.classList.toggle('vertical', vertical);
  content.style.cssText = 'width:100%;height:100%;display:grid;place-items:center';
  if (item && item.youtube) {
    content.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(item.youtube) + '?autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" title="' + (item.title || 'Vídeo') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  } else if (item && item.image) {
    content.innerHTML = '<img src="' + item.image + '" alt="' + (item.title || '') + '">';
  } else {
    const lang = document.documentElement.dataset.lang;
    content.textContent = lang === 'en' ? EN.soon : 'Em breve';
  }
  lastFocus = document.activeElement;
  m.classList.add('open');
  $('.modal-close', m).focus();
}

/* ====== Ícones flutuantes do hero: levam a um vídeo da página ====== */
function wireHeroIcons() {
  $$('.hero-icon').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group, index = +btn.dataset.index;
      const card = $('.video-card[data-group="' + group + '"][data-index="' + index + '"]');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => openItem(group, index), 350);
    });
  });
}

/* ===================== Animação: revelar ao rolar ================== */
function initReveal() {
  const els = $$('.reveal, .reveal-zoom, .reveal-line');
  $$('[data-stagger]').forEach(group => {
    [...group.children].forEach((child, i) => child.style.setProperty('--rd', (i * 0.11) + 's'));
  });
  $$('[data-delay]').forEach(el => el.style.setProperty('--rd', el.dataset.delay + 's'));
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
  // Garantia: se algo não for revelado em 5s (ex.: aba em segundo plano), mostra tudo
  setTimeout(() => els.forEach(el => el.classList.add('in')), 5000);
}

/* ======= Header: sombra ao rolar, barra de progresso e menu mobile ====== */
function initHeader() {
  const header = $('.site-header'), bar = $('.progress'), toggle = $('.menu-toggle');
  if (!header) return;
  let ticking = false;
  const update = () => {
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 8);
    if (bar) bar.style.scale = (max > 0 ? Math.min(y / max, 1) : 0) + ' 1';
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  if (!toggle) return;
  const setOpen = open => { header.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); };
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('open')));
  $$('.nav-panel a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

/* ============ Parallax suave do mascote (só com mouse) ============ */
function initParallax() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) return;
  $$('.hero').forEach(hero => {
    const m = $('.hero-mascot', hero);
    if (!m) return;
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      m.style.setProperty('--px', (x * -22) + 'px');
      m.style.setProperty('--py', (y * -14) + 'px');
    });
    hero.addEventListener('pointerleave', () => { m.style.setProperty('--px', '0px'); m.style.setProperty('--py', '0px'); });
  });
}

/* ============ Transição suave ao trocar de página ============ */
function initTransitions() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || a.target === '_blank') return;
    let u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.protocol !== location.protocol || u.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = a.href; }, 260);
  });
  window.addEventListener('pageshow', () => document.body.classList.remove('leaving'));
}

/* =====================================================================
   EFEITOS EXTRAS: grade animada, cursor, tilt, easter eggs
   ===================================================================== */
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* Computador mais fraco (poucos núcleos / pouca memória): o site usa efeitos mais leves automaticamente */
const WEAK = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
const FINE_POINTER = matchMedia('(pointer: fine)').matches;
const curLang = () => document.documentElement.dataset.lang === 'en' ? 'en' : 'pt';

/* ---------- Grade preta animada no fundo branco da Home ---------- */
function initGrid() {
  const hero = $('.home-hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'bg-grid';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = 0, H = 0, u = 1, cell = 56, cols = 0, rows = 0, ox = 0, oy = 0, raf = 0, visible = true;
  let level = 0, slow = 0, ema = 0, lastAct = 0, lastDraw = 0;  // 'level' sobe sozinho se o computador estiver sofrendo
  let px = new Float32Array(0), py = new Float32Array(0), pa = new Float32Array(0);
  const mouse = { x: 0, y: 0, sx: 0, sy: 0, want: 0, p: 0, speed: 0, ag: 0, lx: null, ly: null };
  const fig = $('.hero-figure', hero);
  let moved = false;
  const ripples = [];

  function resize() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    let dpr = WEAK ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
    if (W * H * dpr * dpr > 1000000) dpr = Math.max(1, Math.sqrt(1000000 / (W * H)));
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = (W < 700 ? 44 : 60) + (WEAK ? 10 : 0) + level * 10; u = W < 700 ? 0.6 : 1;
    cols = Math.ceil(W / cell) + 3; rows = Math.ceil(H / cell) + 3;
    ox = -cell - ((cell - (W % cell)) / 2); oy = -cell - ((cell - (H % cell)) / 2);
    px = new Float32Array(cols * rows); py = new Float32Array(cols * rows); pa = new Float32Array(cols * rows);
    if (!raf) schedule();
  }

  function draw(t) {
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);
    mouse.sx += (mouse.x - mouse.sx) * 0.14; mouse.sy += (mouse.y - mouse.sy) * 0.14;
    mouse.p += (mouse.want - mouse.p) * 0.08;
    for (let k = ripples.length - 1; k >= 0; k--) if (now - ripples[k].t0 > 1700) ripples.splice(k, 1);
    const R2 = 180 * 180;

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const idx = j * cols + i;
        const bx = ox + i * cell, by = oy + j * cell;
        let dx = 0, dy = 0, a = 0;
        // ondulação suave o tempo todo
        const w = Math.sin(bx * 0.011 + t * 0.0011) + Math.cos(by * 0.013 - t * 0.0009);
        dy += w * 2.4; dx += Math.cos((bx + by) * 0.01 + t * 0.0008) * 1.8;
        // faixa de luz que atravessa a grade na diagonal
        let q = (bx * 0.8 + by * 0.6 - t * 0.14) % 2600; if (q < 0) q += 2600; if (q > 1300) q -= 2600;
        a += Math.exp(-(q * q) / 16000) * 0.4;
        // mouse: a grade "estufa" em volta do cursor
        if (mouse.p > 0.01) {
          const mx = bx - mouse.sx, my = by - mouse.sy, d2 = mx * mx + my * my;
          const f = Math.exp(-d2 / R2) * mouse.p, d = Math.sqrt(d2) + 0.001;
          dx += (mx / d) * f * 28; dy += (my / d) * f * 28; a += f * 0.95;
        }
        // ondas ao clicar
        for (let k = 0; k < ripples.length; k++) {
          const r = ripples[k], age = now - r.t0;
          const rx = bx - r.x, ry = by - r.y, d = Math.sqrt(rx * rx + ry * ry) + 0.001;
          const e = (d - age * 0.6) / 48, ring = Math.exp(-e * e) * (1 - age / 1700);
          dx += (rx / d) * ring * 26; dy += (ry / d) * ring * 26; a += ring * 0.9;
        }
        px[idx] = bx + dx; py[idx] = by + dy; pa[idx] = a;
      }
    }

    // Estilo "cartoon": traço grosso e arredondado, levemente torto (como desenhado à mão),
    // que "ferve" em passos curtos. Desenhado em lotes para ficar leve.
    const NB = 8, lines = [], dots = [];
    for (let k = 0; k < NB; k++) { lines.push(new Path2D()); dots.push(new Path2D()); }
    const bucket = al => Math.min(NB - 1, Math.max(0, Math.round((al - 0.1) * (NB - 1) / 0.75)));
    const boil = Math.floor(t / 170) % 4;
    const hash = (i, j, d, f) => { const n = Math.sin(i * 127.1 + j * 311.7 + d * 74.7 + f * 19.3) * 43758.5453; return n - Math.floor(n); };
    const seg = (i, j, i2, j2, d) => {
      const i1 = j * cols + i, k2 = j2 * cols + i2;
      const x1 = px[i1], y1 = py[i1], x2 = px[k2], y2 = py[k2];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
      const bend = (hash(i, j, d, 0) - 0.5) * 7 + (hash(i, j, d, boil + 1) - 0.5) * 2;
      const k = bucket(0.1 + (pa[i1] + pa[k2]) * 0.3);
      lines[k].moveTo(x1, y1); lines[k].quadraticCurveTo(mx - (dy / len) * bend, my + (dx / len) * bend, x2, y2);
    };
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const idx = j * cols + i, a = pa[idx], x = px[idx], y = py[idx];
        if (i < cols - 1) seg(i, j, i + 1, j, 1);
        if (j < rows - 1) seg(i, j, i, j + 1, 2);
        const kd = bucket(0.14 + a * 0.7), r = (2.4 + Math.min(a, 1) * 2.6) * u;
        dots[kd].moveTo(x + r, y); dots[kd].arc(x, y, r, 0, 6.2832);
      }
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (let k = 0; k < NB; k++) {
      const al = 0.1 + k * 0.75 / (NB - 1);
      ctx.lineWidth = (2.2 + k * 0.22) * u;
      ctx.strokeStyle = 'rgba(1,1,1,' + al.toFixed(3) + ')'; ctx.stroke(lines[k]);
      ctx.fillStyle = 'rgba(1,1,1,' + Math.min(0.92, al + 0.05).toFixed(3) + ')'; ctx.fill(dots[k]);
    }
    // esmaece a grade na borda de baixo (sem máscara CSS, que é pesada)
    ctx.globalCompositeOperation = 'destination-out';
    const g = ctx.createLinearGradient(0, H * 0.78, 0, H);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g; ctx.fillRect(0, H * 0.78, W, H * 0.22);
    ctx.globalCompositeOperation = 'source-over';
    // O Kin só se mexe quando a grade é "chacoalhada" (mouse rápido) ou quando clicam
    mouse.speed *= 0.9;
    const target = Math.min(Math.max((mouse.speed - 260) / 520, 0), 1);
    mouse.ag += (target - mouse.ag) * (target > mouse.ag ? 0.12 : 0.05);
    if (fig) {
      if (mouse.ag > 0.012) {
        const g2 = mouse.ag;
        fig.style.rotate = (Math.sin(t * 0.021) * g2 * 3.2).toFixed(2) + 'deg';
        fig.style.translate = (Math.sin(t * 0.017) * g2 * 5).toFixed(1) + 'px ' + (Math.cos(t * 0.013) * g2 * 3).toFixed(1) + 'px';
        moved = true;
      } else if (moved) { fig.style.rotate = ''; fig.style.translate = ''; moved = false; }
    }
  }

  function loop(t) {
    raf = 0;
    const now = performance.now();
    const active = now - lastAct < 1600 || ripples.length > 0 || mouse.ag > 0.02 || mouse.p > 0.02;
    // parado: ~24 quadros/s (o visual "cartoon" já é em passos); com interação: ~38. Em PC fraco, menos ainda.
    const gap = (active ? 26 : 42) * (WEAK ? 1.6 : 1) * (1 + level * 0.5);
    if (now - lastDraw >= gap) {
      lastDraw = now;
      draw(t);
      const dt = performance.now() - now;
      ema = ema * 0.9 + dt * 0.1;
      if (ema > 8 && level < 3 && ++slow > 25) { level++; slow = 0; ema = 0; resize(); }   // desenhando devagar: simplifica sozinho
    }
    if (visible && !REDUCE && !document.hidden) schedule();
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(loop); }

  const setMouse = e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    lastAct = performance.now();
    if (mouse.lx !== null && e.pointerType === 'mouse') mouse.speed += Math.hypot(e.clientX - mouse.lx, e.clientY - mouse.ly);
    mouse.lx = e.clientX; mouse.ly = e.clientY;
    if (!mouse.want) { mouse.sx = mouse.x; mouse.sy = mouse.y; }
    mouse.want = 1;
  };
  hero.addEventListener('pointermove', setMouse);
  hero.addEventListener('pointerleave', () => { mouse.want = 0; mouse.lx = null; });
  hero.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') setTimeout(() => { mouse.want = 0; }, 500); });
  hero.addEventListener('pointerdown', e => {
    setMouse(e);
    const r = canvas.getBoundingClientRect();
    ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t0: performance.now() });
    mouse.ag = Math.max(mouse.ag, 0.55); lastAct = performance.now();
    if (REDUCE) schedule();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(en => { visible = en[0].isIntersecting; if (visible) schedule(); }).observe(hero);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(hero); else window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) schedule(); });
  resize();
  // sem animação (movimento reduzido): desenha uma vez
  if (REDUCE) draw(0);
}

/* ---------- Cursor em anel (só com mouse) ---------- */
function initCursor() {
  if (REDUCE || !FINE_POINTER) return;
  const ring = document.createElement('div');
  ring.className = 'cursor-ring'; ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
  const tick = () => {
    x += (tx - x) * 0.2; y += (ty - y) * 0.2;
    ring.style.transform = 'translate3d(' + (x - 17) + 'px,' + (y - 17) + 'px,0)';
    raf = (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) ? requestAnimationFrame(tick) : 0;
  };
  window.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY; ring.classList.add('on');
    const hot = e.target.closest && e.target.closest('a, button, .video-card, .hero-icon, .hero-figure, .footer-mascot');
    ring.classList.toggle('hot', !!hot);
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
  document.addEventListener('pointerleave', () => ring.classList.remove('on'));
  window.addEventListener('pointerdown', () => ring.classList.add('down'));
  window.addEventListener('pointerup', () => ring.classList.remove('down'));
}

/* ---------- Cartões de vídeo: inclinação 3D com brilho ---------- */
function initTilt() {
  if (REDUCE || !FINE_POINTER) return;
  $$('.video-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', ((0.5 - y) * 9).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((x - 0.5) * 11).toFixed(2) + 'deg');
      card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
}

/* ---------- Rolagem: faixas aceleram e fundos têm parallax ---------- */
function initScrollFx() {
  if (REDUCE) return;
  const anims = $$('.marquee-track').map(t => t.getAnimations && t.getAnimations()[0]).filter(Boolean);
  let last = window.scrollY, vel = 0, raf = 0;
  const step = () => {
    const y = window.scrollY, dy = y - last; last = y;
    vel += (dy - vel) * 0.12;
    const rate = 1 + Math.min(Math.abs(vel) * 0.3, 5);
    anims.forEach(a => { a.playbackRate = rate; });
    raf = (Math.abs(vel) > 0.02 || Math.abs(dy) > 0) ? requestAnimationFrame(step) : 0;
    if (!raf) anims.forEach(a => { a.playbackRate = 1; });
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(step); }, { passive: true });
  step();
}

/* =====================================================================
   EASTER EGGS
   ===================================================================== */
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* Balão de fala reutilizável */
function sayIn(host, text, cls) {
  let b = $(':scope > .speech', host);
  if (!b) { b = document.createElement('div'); b.className = 'speech'; b.setAttribute('role', 'status'); host.appendChild(b); }
  b.className = 'speech ' + (cls || '');
  b.textContent = text;
  void b.offsetWidth; b.classList.add('show');
  clearTimeout(b._t);
  b._t = setTimeout(() => b.classList.remove('show'), 3400);
  return b;
}

const POKE = {
  pt: ['Ai! Não me belisca não, cara 😣', 'Sério, isso dói!', 'Ei, para com isso, hein?', 'Já falei pra parar…',
       'Tô começando a ficar bravo!', 'Cara, SÉRIO. Eu sou um mascote, não um botão!', 'ÚLTIMO AVISO!! 😠',
       'CHEGA! Vou cobrar hora extra de edição por clique! 💸', 'Tô de mal de você. 😤'],
  en: ['Ouch! Don\'t pinch me, dude 😣', 'Seriously, that hurts!', 'Hey, stop that, okay?', 'I said stop…',
       'I\'m getting angry here!', 'Dude, SERIOUSLY. I\'m a mascot, not a button!', 'LAST WARNING!! 😠',
       'ENOUGH! I\'m charging overtime per click! 💸', 'We\'re not talking anymore. 😤'],
  sulk: { pt: ['Não falo mais com você.', 'Tô de mal. Fim de papo.', '…', 'Hmpf.'], en: ['Not talking to you.', 'I\'m done. Period.', '…', 'Hmpf.'] },
  calm: { pt: 'Tá… tá perdoado. 🙂', en: 'Okay… you\'re forgiven. 🙂' }
};

function initPoke() {
  const fig = $('.home-hero .hero-figure');
  if (!fig) return;
  let count = 0, calmTimer = 0, sulkIdx = 0;
  fig.addEventListener('click', () => {
    count++;
    const lang = curLang(), list = POKE[lang];
    let text;
    if (count <= list.length) text = list[count - 1];
    else { const s = POKE.sulk[lang]; text = s[sulkIdx++ % s.length]; }
    const anger = Math.min(count / 8, 1);
    fig.style.setProperty('--anger', anger.toFixed(2));
    fig.classList.toggle('fume', count >= 6);
    fig.classList.remove('poke'); void fig.offsetWidth; fig.classList.add('poke');
    const mad = count >= 5;
    sayIn(fig, text, mad ? 'mad' : '');
    clearTimeout(calmTimer);
    calmTimer = setTimeout(() => {
      const wasMad = count >= 5;
      count = 0; sulkIdx = 0;
      fig.style.setProperty('--anger', '0'); fig.classList.remove('fume');
      if (wasMad) sayIn(fig, POKE.calm[curLang()], 'calm');
    }, 6500);
  });
}

/* Mascotes do rodapé também falam */
function initFooterTalk() {
  const lines = {
    left: { pt: ['Valeu por passar por aqui! 👋', 'Gostou? Chama no Instagram!', 'Tô aqui o dia todo, pode chamar.'],
            en: ['Thanks for stopping by! 👋', 'Liked it? DM me on Instagram!', 'I\'m here all day, say hi.'] },
    right: { pt: ['Bora fechar um projeto? 👍', 'Aceito café como forma de pagamento ☕', 'Brincadeira… ou não. 😄'],
             en: ['Shall we work together? 👍', 'I accept coffee as payment ☕', 'Kidding… or not. 😄'] }
  };
  $$('.footer-mascot').forEach(img => {
    const side = img.classList.contains('left') ? 'left' : 'right';
    let n = 0;
    img.addEventListener('click', () => {
      const arr = lines[side][curLang()];
      const b = sayIn(img.parentElement, arr[n++ % arr.length], 'foot ' + side);
      img.classList.remove('wave'); void img.offsetWidth; img.classList.add('wave');
    });
  });
}

/* Konami code e outros segredos */
function initSecrets() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; kinRain(); }
  });

  // logo: 5 cliques seguidos
  const logo = $('.logo');
  if (logo) {
    let n = 0, timer = 0;
    logo.addEventListener('click', e => {
      let u; try { u = new URL(logo.href, location.href); } catch (err) { return; }
      if (u.pathname !== location.pathname) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      n++; clearTimeout(timer); timer = setTimeout(() => { n = 0; }, 1500);
      if (n >= 5) { n = 0; logo.classList.remove('spin360'); void logo.offsetWidth; logo.classList.add('spin360'); toast(curLang() === 'en' ? '🎞️ Cut! You found a secret.' : '🎞️ Corta! Você achou um segredo.'); }
    });
  }

  // carinhas da faixa vermelha
  $$('.marquee-item .faded').forEach(img => img.addEventListener('click', () => {
    img.classList.remove('popped'); void img.offsetWidth; img.classList.add('popped');
  }));

  // foto do "Sobre mim"
  const p = $('.about .portrait');
  if (p) p.addEventListener('click', () => toast(curLang() === 'en' ? '📸 Taken at 3 AM, between one render and another.' : '📸 Foto tirada às 3 da manhã, entre um render e outro.'));

  console.log('%cOpa, curioso! 👀 Tem segredos escondidos por aqui. Dica: ↑ ↑ ↓ ↓ ← → ← → B A', 'font:16px sans-serif;color:#cd0024');
}

function kinRain() {
  toast(curLang() === 'en' ? '🎬 Kin mode on!' : '🎬 Modo Kin ativado!');
  if (REDUCE) return;
  const layer = document.createElement('div');
  layer.className = 'kin-rain'; layer.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 38; i++) {
    const im = document.createElement('img');
    im.src = 'assets/kin-face.png'; im.alt = '';
    im.style.left = (Math.random() * 100) + 'vw';
    im.style.width = (28 + Math.random() * 40) + 'px';
    im.style.animationDuration = (2.6 + Math.random() * 2.4) + 's';
    im.style.animationDelay = (Math.random() * 1.6) + 's';
    im.style.setProperty('--spin', ((Math.random() < .5 ? -1 : 1) * (180 + Math.random() * 360)) + 'deg');
    layer.appendChild(im);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 7000);
}


/* ---------- Ondas de fundo (curvas de nível) ----------
   Desenhadas por código UMA única vez (e de novo só se a janela mudar de tamanho).
   O movimento fluido é feito pelo CSS, que roda na placa de vídeo e quase não gasta processador. */
function initWaves() {
  // casos do "marching squares": pares de arestas (0 topo, 1 direita, 2 base, 3 esquerda)
  const TABLE = [[], [3, 0], [0, 1], [3, 1], [1, 2], [3, 0, 1, 2], [0, 2], [3, 2], [2, 3], [0, 2], [0, 1, 2, 3], [1, 2], [1, 3], [0, 1], [3, 0], []];

  function render(canvas, w, h, seed, levels, color, width) {
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cell = 22, cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
    const f = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++) {
      const v = (j * cell) / 300;
      for (let i = 0; i < cols; i++) {
        const u = (i * cell) / 300;
        f[j * cols + i] =
          Math.sin(u * 1.1 + seed + 1.6 * Math.sin(v * 0.9 - seed * 0.7)) +
          Math.sin(v * 1.3 - seed * 0.8 + 1.4 * Math.sin(u * 0.8 + seed * 0.5)) +
          0.7 * Math.sin((u + v) * 0.8 + seed * 0.6) +
          0.35 * Math.sin(u * 2.1 - v * 1.7 + seed * 0.9);
      }
    }
    const edge = (e, x0, y0, a, b2, c, d, L) => {
      if (e === 0) return [x0 + cell * ((L - a) / (b2 - a)), y0];
      if (e === 1) return [x0 + cell, y0 + cell * ((L - b2) / (c - b2))];
      if (e === 2) return [x0 + cell * ((L - d) / (c - d)), y0 + cell];
      return [x0, y0 + cell * ((L - a) / (d - a))];
    };
    const path = new Path2D();
    for (const L of levels) {
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = f[j * cols + i], b2 = f[j * cols + i + 1], c = f[(j + 1) * cols + i + 1], d = f[(j + 1) * cols + i];
          const idx = (a > L ? 1 : 0) | (b2 > L ? 2 : 0) | (c > L ? 4 : 0) | (d > L ? 8 : 0);
          if (idx === 0 || idx === 15) continue;
          const e = TABLE[idx], x0 = i * cell, y0 = j * cell;
          for (let k = 0; k < e.length; k += 2) {
            const p1 = edge(e[k], x0, y0, a, b2, c, d, L), p2 = edge(e[k + 1], x0, y0, a, b2, c, d, L);
            path.moveTo(p1[0], p1[1]); path.lineTo(p2[0], p2[1]);
          }
        }
      }
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = width; ctx.strokeStyle = color;
    ctx.stroke(path);
  }

  function make(host, opt) {
    const wrap = document.createElement('div');
    wrap.className = 'bg-waves'; wrap.setAttribute('aria-hidden', 'true');
    const a = document.createElement('canvas'), b = document.createElement('canvas');
    a.className = 'wave wave-a'; b.className = 'wave wave-b';
    wrap.append(a, b); host.prepend(wrap);
    let lastW = 0, lastH = 0, timer = 0;
    const build = () => {
      const r = host.getBoundingClientRect();
      if (Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
      lastW = r.width; lastH = r.height;
      const w = Math.ceil(r.width * 1.3), h = Math.ceil(r.height * 1.3);
      render(a, w, h, opt.seed, [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2], opt.color, 3);
      render(b, w, h, opt.seed + 2.9, [-1.6, -0.8, 0, 0.8, 1.6], opt.color2, 2.5);
    };
    if ('ResizeObserver' in window) new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(build, 200); }).observe(host);
    build();
    // fora da tela, o movimento pausa (não gasta nada)
    if ('IntersectionObserver' in window) new IntersectionObserver(en => wrap.classList.toggle('off', !en[0].isIntersecting)).observe(host);
  }

  const works = $('.works'), foot = $('.site-footer');
  if (works) make(works, { color: 'rgba(255,255,255,0.30)', color2: 'rgba(255,255,255,0.18)', seed: 1.3 });
  if (foot) make(foot, { color: 'rgba(255,255,255,0.16)', color2: 'rgba(255,255,255,0.10)', seed: 7.9 });
}

/* ================================ Init ============================= */
document.addEventListener('DOMContentLoaded', () => {
  $$('img').forEach(img => { if (img.complete && img.naturalWidth === 0) tryNextExt(img); });
  fillCards();
  wireHeroIcons();
  initReveal();
  initHeader();
  initParallax();
  initTransitions();
  initGrid();
  initWaves();
  initCursor();
  initTilt();
  initScrollFx();
  initPoke();
  initFooterTalk();
  initSecrets();
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(store('lang') === 'en' ? 'en' : 'pt');
});
