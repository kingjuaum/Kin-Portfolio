/* ========== Configuração dos vídeos ========== */
const CONTENT = {
  'home-longos': [ { youtube: '2fXMITWJsYU', thumb: '', title: 'Video 2' }, { youtube: 'geeIieObAyY', thumb: '', title: 'Video 1' }, { youtube: 'yAhCQgp-two', thumb: '', title: 'Video 3' } ],
  'home-curtos': [ { youtube: 'bIKyqQmvj1Y', thumb: '', title: 'Video 1' }, { youtube: 'c1bmlTtrYv8', thumb: '', title: 'Video 2' }, { youtube: 'F9GNgwOAREg', thumb: '', title: 'Video 3' } ],
  longos: ['_F1QO28zyuQ', 'PIPRP-wYqUs', '2fXMITWJsYU', 'yAhCQgp-two', 'uSbEdqzeVwA', '11g5XDk9O2E', 'GNtqgw0BiBM']
    .map((youtube, i) => ({ youtube, thumb: '', title: 'Video ' + (i + 1) })),
  curtos: ['bIKyqQmvj1Y', 'c1bmlTtrYv8', 'F9GNgwOAREg', 'RxvgWMx4kLw', '4lkBaCZFCPo', '55mLGlL2gaQ', 'bfM2NoRcu8U']
    .map((youtube, i) => ({ youtube, thumb: '', title: 'Video ' + (i + 1) })),
  outros: ['bhpDx25A4EE', 'Scsorm5a4c4', 'blzK2CbFfXI', 'ThSuYlbClqY']
    .map((youtube, i) => ({ youtube, image: '', thumb: '', title: 'Trabalho ' + (i + 1) }))
};

/* ========== Descrições dos projetos ========== */
const INFO = {
  /* ========== Vídeos longos ========== */
  'geeIieObAyY': {
    pt: { title: 'Stream Pack',
          desc: 'Overlays de início e fim de stream que criei para as minhas lives. Animei a cabeça no After Effects e montei o restante da composição no Premiere.',
          role: 'Motion design e edição' },
    en: { title: 'Stream Pack',
          desc: 'Start and end-of-stream overlays I made for my own livestreams. I animated the character head in After Effects and built the rest of the composition in Premiere.',
          role: 'Motion design and editing' }
  },
  '2fXMITWJsYU': {
    pt: { title: 'O jogo que mudou a forma como eu vejo jogos de terror',
          desc: 'Vídeo para o meu canal do YouTube sobre como Silent Hill 2 Remake mudou a minha percepção sobre jogos de terror.',
          role: 'Do roteiro à edição final' },
    en: { title: 'The game that changed how I see horror games',
          desc: 'A video for my YouTube channel about how the Silent Hill 2 Remake changed my perception of horror games.',
          role: 'From script to final edit' }
  },
  'yAhCQgp-two': {
    pt: { title: 'Animação para o vídeo “Analisando creepypastas antigas pra ver se elas realmente eram assustadoras”',
          desc: 'Vídeo produzido para o meu canal do YouTube, em que revisito creepypastas antigas (2010–2012) para descobrir se elas davam mesmo medo ou se era só o nosso cérebro de criança vendo terror em tudo.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Animation for the video “Analyzing old creepypastas to see if they were really scary”',
          desc: 'A video made for my YouTube channel, where I revisit old creepypastas (2010–2012) to find out whether they were really scary or if it was just our childhood brains finding horror in everything.',
          role: 'From script to final edit' }
  },
  '_F1QO28zyuQ': {
    pt: { title: 'Pokémon mudou a minha vida (e a sua provavelmente também)',
          desc: 'Vídeo para o Instagram e o TikTok contando um pouco da minha história com videogames: onde foi o meu primeiro contato e como Pokémon virou a minha zona de conforto em momentos difíceis da vida.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Pokémon changed my life (and probably yours too)',
          desc: 'A video for Instagram and TikTok about my history with video games: where I first got into them and how Pokémon became my comfort zone during hard times.',
          role: 'From script to final edit' }
  },
  'PIPRP-wYqUs': {
    pt: { title: 'Como Pokémon mudou a minha vida',
          desc: 'Vídeo para o meu canal do YouTube em que me aprofundo e conto com mais detalhes como a saga Pokémon virou a minha zona de conforto e me moldou na pessoa que sou hoje.',
          role: 'Do roteiro à edição final' },
    en: { title: 'How Pokémon changed my life',
          desc: 'A video for my YouTube channel where I go deeper into how the Pokémon saga became my comfort zone and shaped me into the person I am today.',
          role: 'From script to final edit' }
  },
  'uSbEdqzeVwA': {
    pt: { title: 'Aetherion Pro vs Max: qual deles escolher?',
          desc: 'Vídeo editado para o canal Meu Tech Mundo no Adobe Premiere, com edição dinâmica e muitos B-rolls para construir a melhor narrativa possível no comparativo.',
          role: 'Edição de vídeo' },
    en: { title: 'Aetherion Pro vs Max: which one should you pick?',
          desc: 'A video edited for the channel Meu Tech Mundo in Adobe Premiere, with dynamic editing and plenty of B-roll to build the best possible narrative for the comparison.',
          role: 'Video editing' }
  },
  '11g5XDk9O2E': {
    pt: { title: 'Explorando creepypastas antigas pra ver se elas realmente eram assustadoras',
          desc: 'Trecho do vídeo produzido para o meu canal do YouTube, em que revisito creepypastas antigas (2010–2012) para descobrir se davam mesmo medo ou se era só o nosso cérebro de criança que se assustava fácil demais.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Exploring old creepypastas to see if they were really scary',
          desc: 'An excerpt from the video made for my YouTube channel, where I revisit old creepypastas (2010–2012) to find out whether they were really scary or if our childhood brains just got spooked too easily.',
          role: 'From script to final edit' }
  },
  'GNtqgw0BiBM': {
    pt: { title: 'Finding the HORNIEST People on Reddit…',
          desc: 'Vídeo editado para o YouTuber americano Bran, reunindo em um só vídeo uma compilação de posts do Reddit aos quais ele reagiu durante uma live.',
          role: 'Edição do vídeo' },
    en: { title: 'Finding the HORNIEST People on Reddit…',
          desc: 'A video edited for American YouTuber Bran, compiling Reddit posts he reacted to during a livestream into a single video.',
          role: 'Video editing' }
  },

  /* ========== Vídeos curtos ========== */
  'bIKyqQmvj1Y': {
    pt: { title: 'Abrindo a box da Sylveon da coleção de 30 anos de Pokémon TCG',
          desc: 'Short para o Instagram e o TikTok abrindo um produto da coleção de 30 anos de Pokémon.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Opening the Sylveon box from the Pokémon TCG 30th anniversary collection',
          desc: 'A short for Instagram and TikTok, opening a product from the Pokémon 30th anniversary collection.',
          role: 'From script to final edit' }
  },
  'c1bmlTtrYv8': {
    pt: { title: 'Dois idiotas presos em uma pousada do djabo',
          desc: 'Short para o Instagram e o TikTok feito a partir de uma live de “Fears to Fathom” na minha Twitch. Separei alguns trechos e montei uma edição dinâmica e bem-humorada.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Two idiots trapped in a hellish inn',
          desc: 'A short for Instagram and TikTok made from a “Fears to Fathom” livestream on my Twitch. I picked a few moments from the stream and cut them into a dynamic, funny edit.',
          role: 'From script to final edit' }
  },
  'F9GNgwOAREg': {
    pt: { title: 'Se você teve um Nintendo Wii, provavelmente já jogou esses jogos',
          desc: 'Short para o Instagram e o TikTok feito para relembrar alguns dos jogos do Nintendo Wii que mais marcaram quem teve (ou ainda tem) o console.',
          role: 'Do roteiro à edição final' },
    en: { title: 'If you had a Nintendo Wii, you probably played these games',
          desc: 'A short for Instagram and TikTok to bring back some of the Nintendo Wii games that left the biggest mark on anyone who had (or still has) the console.',
          role: 'From script to final edit' }
  },
  'RxvgWMx4kLw': {
    pt: { title: 'Se você teve um Xbox 360 na infância, provavelmente jogou algum desses jogos',
          desc: 'Short para o Instagram e o TikTok feito para relembrar alguns dos jogos do Xbox 360 que mais marcaram quem teve (ou ainda tem) o console.',
          role: 'Do roteiro à edição final' },
    en: { title: 'If you had an Xbox 360 as a kid, you probably played some of these games',
          desc: 'A short for Instagram and TikTok to bring back some of the Xbox 360 games that left the biggest mark on anyone who had (or still has) the console.',
          role: 'From script to final edit' }
  },
  '4lkBaCZFCPo': {
    pt: { title: 'Personagens que eu chamaria pra um churrasco (se eles fossem reais)',
          desc: 'Short para o Instagram e o TikTok, uma brincadeira em que listo personagens de videogames que eu chamaria para um churrasco lá em casa. Um vídeo bem-humorado e dinâmico.',
          role: 'Do roteiro à edição final' },
    en: { title: 'Characters I would invite to a barbecue (if they were real)',
          desc: 'A short for Instagram and TikTok, a playful list of video game characters I would invite to a barbecue at my place. A funny, dynamic video.',
          role: 'From script to final edit' }
  },
  '55mLGlL2gaQ': {
    pt: { title: 'Fui humilhado por uma streamer em live…',
          desc: 'Short para o Instagram e o TikTok a partir de um react que fiz em stream: a criadora de conteúdo Eudinha reagindo e analisando o meu perfil do Instagram. Bem-humorado e dinâmico.',
          role: 'Do roteiro à edição final' },
    en: { title: 'I got roasted by a streamer on a livestream…',
          desc: 'A short for Instagram and TikTok from a reaction I did on stream: content creator Eudinha reacting to and analyzing my Instagram profile. Funny and dynamic.',
          role: 'From script to final edit' }
  },
  'bfM2NoRcu8U': {
    pt: { title: 'Eu paro a hora que eu quiser, man...',
          desc: 'Vídeo produzido a partir de uma das minhas lives na Twitch. Neste Shorts, joguei um mod de Minecraft que trazia um sistema de apostas para aprimorar itens. A ideia foi mostrar, de forma leve e usando o jogo como exemplo, como é fácil perder tudo o que temos ao apostar.',
          role: 'Do roteiro à edição final' },
    en: { title: 'I can stop whenever I want, man...',
          desc: 'A video made from one of my Twitch livestreams. In this Short, I played a Minecraft mod with a betting system for upgrading items. The goal was to show, in a lighthearted way and using the game as an example, how easy it is to lose everything we have by gambling.',
          role: 'From script to final edit' }
  },

  /* ========== Outros ========== */
  'bhpDx25A4EE': {
    pt: { title: 'Motion de final de vídeo',
          desc: 'Motion simples criado no After Effects para ser usado no final de vídeos.',
          role: 'Motion design (After Effects)' },
    en: { title: 'Video outro motion',
          desc: 'A simple motion piece created in After Effects to be used at the end of videos.',
          role: 'Motion design (After Effects)' }
  },
  'Scsorm5a4c4': {
    pt: { title: 'Overlay de início de live',
          desc: 'Overlay de abertura que criei para as minhas lives.',
          role: 'Motion design' },
    en: { title: 'Livestream intro overlay',
          desc: 'An opening overlay I created for my livestreams.',
          role: 'Motion design' }
  },
  'blzK2CbFfXI': {
    pt: { title: 'Encerramento com chat da Twitch',
          desc: 'Encerramento de vídeo que fiz para o meu canal de gameplay, simulando o chat da Twitch em uma animação boba e divertida.',
          role: 'Motion design e animação' },
    en: { title: 'Twitch chat outro',
          desc: 'A video outro I made for my gameplay channel, simulating the Twitch chat in a silly, fun animation.',
          role: 'Motion design and animation' }
  },
  'ThSuYlbClqY': {
    pt: { title: 'Overlay de final de live',
          desc: 'Overlay de encerramento que criei para as minhas lives.',
          role: 'Motion design' },
    en: { title: 'Livestream ending overlay',
          desc: 'A closing overlay I created for my livestreams.',
          role: 'Motion design' }
  }
};

/* ========== Idiomas ========== */
const EN = {
  nav_long: 'Long videos', nav_short: 'Short videos', nav_other: 'Others', nav_contact: 'Contact',
  hero_hi: "Hi, I'm Kin!", btn_talk: "Let's talk", btn_projects: 'See projects',
  svc_edit: 'Video Editing', svc_motion: 'Motion Design', svc_film: 'Video Making',
    skip: 'Skip to content', nf_title: 'Oops! This page doesn\'t exist.', nf_text: 'Kin looked everywhere and found nothing. The link may be wrong, or the page got lost in the middle of a render.', nf_btn: 'Back to home',
  works: 'Works', long_label: 'Long Videos', short_label: 'Short Videos',
  title_long: 'Long Videos', title_short: 'Short Videos', title_other: 'Other Works',
  about: 'About me',
  about_text: "Hi, I'm João Vitor! I'm a <strong>video editor</strong> and <strong>motion designer</strong> who also works as a <strong>scriptwriter</strong>, <strong>thumbnail maker</strong> and <strong>video maker</strong>, living the content-creation side of things. I work with tools like <strong>Premiere, After Effects and Photoshop</strong> to create <strong>high-impact visuals</strong>. Because I write and make my own videos for the web, I've developed a sharp eye for the <strong>rhythm and aesthetics</strong> of audiovisual work. My goal is always to deliver <strong>dynamic edits</strong> that mix solid technique with the fast language the internet demands!",
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
    const isHtml = el.hasAttribute('data-html');
    if (el.dataset.pt === undefined) el.dataset.pt = isHtml ? el.innerHTML : el.textContent;
    const txt = lang === 'en' ? (EN[el.dataset.i18n] || el.dataset.pt) : el.dataset.pt;
    if (isHtml) el.innerHTML = txt; else el.textContent = txt;
  });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.documentElement.dataset.lang = lang;
  store('lang', lang);
}

/* ========== Imagens ========== */
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

function infoFor(item) {
  const e = item && item.youtube && INFO[item.youtube];
  if (!e) return null;
  return (curLang() === 'en' && e.en) ? e.en : e.pt;
}

const ytThumb = (id, quality) => 'https://i.ytimg.com/vi/' + id + '/' + quality + '.jpg';

/* ========== Cartões de vídeo ========== */
function cardTitle(item) {
  const info = infoFor(item);
  return (info && info.title) || item.title || '';
}

function fillCards() {
  $$('.video-card').forEach(card => {
    const item = (CONTENT[card.dataset.group] || [])[+card.dataset.index];
    if (!item) return;
    const src = item.thumb || (item.youtube ? ytThumb(item.youtube, 'maxresdefault') : '');
    if (src) {
      const img = document.createElement('img');
      img.className = 'thumb'; img.src = src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      img.addEventListener('error', () => {
        if (!item.thumb && item.youtube && !img.dataset.fallback) { img.dataset.fallback = '1'; img.src = ytThumb(item.youtube, 'hqdefault'); }
        else { img.remove(); card.classList.add('no-thumb'); }
      });
      card.prepend(img);
    } else card.classList.add('no-thumb');
    const cap = document.createElement('span');
    cap.className = 'cap'; cap.setAttribute('aria-hidden', 'true'); cap.textContent = cardTitle(item);
    card.append(cap);
    card.setAttribute('aria-label', cardTitle(item) || 'Abrir vídeo');
    card.addEventListener('click', () => openItem(card.dataset.group, +card.dataset.index));
  });
  new MutationObserver(() => {
    $$('.video-card').forEach(card => {
      const item = (CONTENT[card.dataset.group] || [])[+card.dataset.index];
      if (!item) return;
      const t = cardTitle(item), cap = $('.cap', card);
      if (cap) cap.textContent = t;
      card.setAttribute('aria-label', t || 'Abrir vídeo');
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
}

/* ========== Modal ========== */
let lastFocus = null;
let modalCurrent = null;
let modalHistory = false;
let skipPush = false;

function focusables(root) {
  return Array.from(root.querySelectorAll('button, a[href], iframe, [tabindex]:not([tabindex="-1"])'))
    .filter(el => !el.disabled && el.getClientRects().length > 0);
}
function trapTab(e, root) {
  const list = focusables(root);
  if (!list.length) return;
  const first = list[0], last = list[list.length - 1];
  if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(() => true, () => false);
  return new Promise(resolve => {
    const t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(t); t.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    t.remove(); resolve(ok);
  });
}

function modalEl() {
  let m = $('#modal');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'modal'; m.className = 'modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
  m.innerHTML = '<div class="modal-box"><button class="modal-close" aria-label="Fechar">×</button><div class="modal-content"></div></div>'
    + '<button class="modal-nav prev" aria-label="Vídeo anterior">‹</button>'
    + '<button class="modal-nav next" aria-label="Próximo vídeo">›</button>'
    + '<div class="modal-count" aria-live="polite"></div>';
  document.body.appendChild(m);
  m.addEventListener('click', e => {
    if (e.target === m || e.target.closest('.modal-close')) { closeModal(); return; }
    const nb = e.target.closest('.modal-nav');
    if (nb) stepModal(nb.classList.contains('next') ? 1 : -1);
  });
  document.addEventListener('keydown', e => {
    if (!m.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowRight') stepModal(1);
    else if (e.key === 'ArrowLeft') stepModal(-1);
    else if (e.key === 'Tab') trapTab(e, m);
  });
  window.addEventListener('popstate', () => { if (m.classList.contains('open')) closeModal(true); });
  return m;
}
function closeModal(fromPop) {
  const m = $('#modal');
  if (!m || !m.classList.contains('open')) return;
  m.classList.remove('open');
  modalCurrent = null;
  $('.modal-content', m).innerHTML = '';
  if (lastFocus) lastFocus.focus();
  if (fromPop === true) { modalHistory = false; return; }
  if (modalHistory) { modalHistory = false; history.back(); }
  else if (/^#v=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
}
function modalOrder(group) {
  return $$('.video-card[data-group="' + group + '"]').map(c => +c.dataset.index).filter(i => (CONTENT[group] || [])[i]);
}
function stepModal(dir) {
  if (!modalCurrent) return;
  const order = modalOrder(modalCurrent.group);
  if (order.length < 2) return;
  let i = order.indexOf(modalCurrent.index);
  i = i < 0 ? 0 : (i + dir + order.length) % order.length;
  openItem(modalCurrent.group, order[i]);
}
function updateModalNav(m, group, index) {
  const order = modalOrder(group), i = order.indexOf(index), en = curLang() === 'en';
  m.classList.toggle('has-nav', order.length > 1 && i >= 0);
  $('.modal-nav.prev', m).setAttribute('aria-label', en ? 'Previous video' : 'Vídeo anterior');
  $('.modal-nav.next', m).setAttribute('aria-label', en ? 'Next video' : 'Próximo vídeo');
  $('.modal-close', m).setAttribute('aria-label', en ? 'Close' : 'Fechar');
  $('.modal-count', m).textContent = i >= 0 ? (i + 1) + ' / ' + order.length : '';
}
function openFromHash() {
  const h = location.hash.match(/^#v=([\w-]{11})$/);
  if (!h) return;
  for (const g of Object.keys(CONTENT)) {
    const i = CONTENT[g].findIndex(it => it.youtube === h[1]);
    if (i >= 0 && $('.video-card[data-group="' + g + '"][data-index="' + i + '"]')) {
      skipPush = true; openItem(g, i); skipPush = false;
      return;
    }
  }
}

window.addEventListener('hashchange', () => { if (/^#v=/.test(location.hash) && !$('#modal.open')) openFromHash(); });

function openItem(group, index) {
  const item = (CONTENT[group] || [])[index];
  const vertical = group.endsWith('curtos');
  if (item && item.youtube && location.protocol === 'file:') {
    window.open('https://www.youtube.com/watch?v=' + encodeURIComponent(item.youtube), '_blank', 'noopener');
    return;
  }
  const m = modalEl();
  const box = $('.modal-box', m), content = $('.modal-content', m);
  const info = infoFor(item);
  const lang = curLang();
  const player = () => '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(item.youtube) + '?autoplay=1&rel=0" referrerpolicy="strict-origin-when-cross-origin" title="' + ((info && info.title) || item.title || 'Vídeo').replace(/"/g, '&quot;') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  box.classList.toggle('vertical', vertical);
  box.classList.toggle('has-info', !!(info && item.youtube));
  if (info && item.youtube) {
    content.style.cssText = '';
    content.textContent = '';
    const mv = document.createElement('div'); mv.className = 'mv'; mv.innerHTML = player();
    const mi = document.createElement('aside'); mi.className = 'mi';
    const h = document.createElement('h2'); h.textContent = info.title;
    const p = document.createElement('p'); p.className = 'mi-desc'; p.textContent = info.desc;
    mi.append(h, p);
    if (info.role) {
      const r = document.createElement('p'); r.className = 'mi-role';
      const b = document.createElement('strong'); b.textContent = (lang === 'en' ? 'My role' : 'Meu papel') + ': ';
      r.append(b, info.role); mi.append(r);
    }
    const cp = document.createElement('button');
    cp.type = 'button'; cp.className = 'mi-copy';
    const label = lang === 'en' ? 'Copy link' : 'Copiar link';
    cp.textContent = label;
    cp.addEventListener('click', () => {
      copyText(location.origin + location.pathname + '#v=' + item.youtube).then(ok => {
        cp.textContent = ok ? (lang === 'en' ? 'Link copied!' : 'Link copiado!') : (lang === 'en' ? 'Could not copy' : 'Não foi possível copiar');
        setTimeout(() => { cp.textContent = label; }, 2200);
      });
    });
    mi.append(cp);
    content.append(mv, mi);
    m.setAttribute('aria-label', info.title);
  } else {
    content.style.cssText = 'width:100%;height:100%;display:grid;place-items:center';
    m.setAttribute('aria-label', (item && item.title) || 'Vídeo');
    if (item && item.youtube) {
      content.innerHTML = player();
    } else if (item && item.image) {
      content.innerHTML = '<img src="' + item.image + '" alt="' + (item.title || '') + '">';
    } else {
      content.textContent = lang === 'en' ? EN.soon : 'Em breve';
    }
  }
  const wasOpen = m.classList.contains('open');
  if (!wasOpen) lastFocus = document.activeElement;
  modalCurrent = { group, index };
  updateModalNav(m, group, index);
  m.scrollTop = 0;
  m.classList.add('open');
  if (!wasOpen) $('.modal-close', m).focus();
  if (item && item.youtube && !skipPush) {
    try {
      const st = { kinModal: 1 }, url = '#v=' + item.youtube;
      if (modalHistory) history.replaceState(st, '', url);
      else { history.pushState(st, '', url); modalHistory = true; }
    } catch (e) { modalHistory = false; }
  }
}

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

/* ========== Revelar ao rolar ========== */
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

  setTimeout(() => els.forEach(el => el.classList.add('in')), 5000);
}

/* ========== Header ========== */
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

/* ========== Parallax do mascote ========== */
function initParallax() {
  if (REDUCE || matchMedia('(pointer: coarse)').matches) return;
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

/* ========== Transição de página ========== */
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

/* ========== Efeitos extras ========== */
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

const WEAK = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
const FINE_POINTER = matchMedia('(pointer: fine)').matches;
const curLang = () => document.documentElement.dataset.lang === 'en' ? 'en' : 'pt';

/* ========== Grade animada ========== */
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
  let level = 0, slow = 0, ema = 0, lastAct = 0, lastDraw = 0;
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

        const w = Math.sin(bx * 0.011 + t * 0.0011) + Math.cos(by * 0.013 - t * 0.0009);
        dy += w * 2.4; dx += Math.cos((bx + by) * 0.01 + t * 0.0008) * 1.8;

        let q = (bx * 0.8 + by * 0.6 - t * 0.14) % 2600; if (q < 0) q += 2600; if (q > 1300) q -= 2600;
        a += Math.exp(-(q * q) / 16000) * 0.4;

        if (mouse.p > 0.01) {
          const mx = bx - mouse.sx, my = by - mouse.sy, d2 = mx * mx + my * my;
          const f = Math.exp(-d2 / R2) * mouse.p, d = Math.sqrt(d2) + 0.001;
          dx += (mx / d) * f * 18; dy += (my / d) * f * 18; a += f * 0.5;
        }

        for (let k = 0; k < ripples.length; k++) {
          const r = ripples[k], age = now - r.t0;
          const rx = bx - r.x, ry = by - r.y, d = Math.sqrt(rx * rx + ry * ry) + 0.001;
          const e = (d - age * 0.6) / 48, ring = Math.exp(-e * e) * (1 - age / 1700);
          dx += (rx / d) * ring * 26; dy += (ry / d) * ring * 26; a += ring * 0.9;
        }
        px[idx] = bx + dx; py[idx] = by + dy; pa[idx] = a;
      }
    }

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

      const al = 0.04 + k * 0.13 / (NB - 1);
      ctx.lineWidth = (2.2 + k * 0.22) * u;
      ctx.strokeStyle = 'rgba(43,40,47,' + al.toFixed(3) + ')'; ctx.stroke(lines[k]);
      ctx.fillStyle = 'rgba(43,40,47,' + Math.min(0.22, al + 0.03).toFixed(3) + ')'; ctx.fill(dots[k]);
    }

    ctx.globalCompositeOperation = 'destination-out';
    const g = ctx.createLinearGradient(0, H * 0.78, 0, H);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = g; ctx.fillRect(0, H * 0.78, W, H * 0.22);
    ctx.globalCompositeOperation = 'source-over';

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

    const gap = (active ? 26 : 42) * (WEAK ? 1.6 : 1) * (1 + level * 0.5);
    if (now - lastDraw >= gap) {
      lastDraw = now;
      draw(t);
      const dt = performance.now() - now;
      ema = ema * 0.9 + dt * 0.1;
      if (ema > 8 && level < 3 && ++slow > 25) { level++; slow = 0; ema = 0; resize(); }
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

  if (REDUCE) draw(0);
}

/* ========== Inclinação dos cartões ========== */
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

/* ========== Easter eggs ========== */
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 3200);
}

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
    if (count === 6) kinUnlock('poke');
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
      kinUnlock(side === 'left' ? 'footL' : 'footR');
    });
  });
}

function initSecrets() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  const feed = k => {
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; kinRain(); kinUnlock('konami'); }
  };
  document.addEventListener('keydown', e => feed(e.key.length === 1 ? e.key.toLowerCase() : e.key));

  let tx = 0, ty = 0, tid = null;
  document.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) { tid = null; return; }
    const t = e.touches[0]; tx = t.clientX; ty = t.clientY; tid = t.identifier;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (tid === null) return;
    const t = Array.from(e.changedTouches).find(c => c.identifier === tid);
    tid = null;
    if (!t) return;
    const dx = t.clientX - tx, dy = t.clientY - ty, ax = Math.abs(dx), ay = Math.abs(dy);
    if (Math.max(ax, ay) < 14) { feed(pos === 8 ? 'b' : pos === 9 ? 'a' : 'tap'); return; }
    if (Math.max(ax, ay) < 48) return;
    feed(ax > ay ? (dx > 0 ? 'ArrowRight' : 'ArrowLeft') : (dy > 0 ? 'ArrowDown' : 'ArrowUp'));
  }, { passive: true });

  const logo = $('.logo');
  if (logo) {
    let n = 0, timer = 0;
    logo.addEventListener('click', e => {
      let u; try { u = new URL(logo.href, location.href); } catch (err) { return; }
      if (u.pathname !== location.pathname) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      n++; clearTimeout(timer); timer = setTimeout(() => { n = 0; }, 1500);
      if (n >= 5) { n = 0; logo.classList.remove('spin360'); void logo.offsetWidth; logo.classList.add('spin360'); if (!kinUnlock('logo')) toast(curLang() === 'en' ? '🎞️ Cut! You found a secret.' : '🎞️ Corta! Você achou um segredo.'); }
    });
  }

  $$('.marquee-item .faded').forEach(img => img.addEventListener('click', () => {
    img.classList.remove('popped'); void img.offsetWidth; img.classList.add('popped');
    kinUnlock('faces');
  }));

  const p = $('.about .portrait');
  if (p) p.addEventListener('click', () => { if (!kinUnlock('portrait')) toast(curLang() === 'en' ? '📸 Taken at 3 AM, between one render and another.' : '📸 Foto tirada às 3 da manhã, entre um render e outro.'); });

  console.log('%cOpa, curioso! 👀 Tem segredos escondidos por aqui. Dica: ↑ ↑ ↓ ↓ ← → ← → B A', 'font:16px sans-serif;color:#cd0024');
}

function kinRain() {
  toast(curLang() === 'en' ? '🎬 Kin mode on!' : '🎬 Modo Kin ativado!');
  if (REDUCE) return;
  const layer = document.createElement('div');
  layer.className = 'kin-rain'; layer.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 38; i++) {
    const im = document.createElement('img');
    im.src = 'assets/kin-face-sm.webp'; im.alt = '';
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

/* ========== Ondas ========== */
function initWaves() {

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

    if ('IntersectionObserver' in window) new IntersectionObserver(en => wrap.classList.toggle('off', !en[0].isIntersecting)).observe(host);
  }

  const works = $('.works'), foot = $('.site-footer');
  if (works) make(works, { color: 'rgba(255,255,255,0.30)', color2: 'rgba(255,255,255,0.18)', seed: 1.3 });
  if (foot) make(foot, { color: 'rgba(255,255,255,0.16)', color2: 'rgba(255,255,255,0.10)', seed: 7.9 });
}

/* ========== Cabeças flutuantes ========== */
function initHeadsBg() {
  $$('main:not(.nf-stage)').forEach(host => {
    const layer = document.createElement('div');
    layer.className = 'bg-heads'; layer.setAttribute('aria-hidden', 'true');
    host.prepend(layer);
    let lastH = 0, timer = 0;
    const build = () => {
      const h = host.getBoundingClientRect().height;
      if (lastH && Math.abs(h - lastH) / lastH < 0.25) return;
      lastH = h;
      layer.textContent = '';
      const small = innerWidth < 760;
      const n = Math.max(8, Math.min(small ? 12 : 22, Math.round(h / (small ? 170 : 130))));
      let seed = 7;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < n; i++) {
        const im = document.createElement('img');
        im.src = 'assets/kin-face-sm.webp'; im.alt = ''; im.decoding = 'async';
        im.style.top = ((i + rnd() * 0.8) / n * 100).toFixed(1) + '%';
        im.style.left = (i % 2 ? 50 + rnd() * 42 : 2 + rnd() * 42).toFixed(1) + '%';
        im.style.setProperty('--s', ((46 + rnd() * 50) * (small ? 0.7 : 1)).toFixed(0) + 'px');
        im.style.setProperty('--dur', (9 + rnd() * 8).toFixed(1) + 's');
        im.style.setProperty('--delay', (-rnd() * 12).toFixed(1) + 's');
        im.style.setProperty('--dx', ((rnd() - 0.5) * 44).toFixed(0) + 'px');
        im.style.setProperty('--r0', ((rnd() - 0.5) * 34).toFixed(0) + 'deg');
        im.style.setProperty('--r1', ((rnd() - 0.5) * 34).toFixed(0) + 'deg');
        layer.appendChild(im);
      }
    };
    build();
    if ('ResizeObserver' in window) new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(build, 250); }).observe(host);
    if ('IntersectionObserver' in window) new IntersectionObserver(en => layer.classList.toggle('off', !en[0].isIntersecting)).observe(host);
  });
}

/* ========== Conquistas ========== */
const TROPHY_KEY = 'kinTrophies';
const TIER_LABEL = {
  pt: { bronze: 'Troféu de bronze', silver: 'Troféu de prata', gold: 'Troféu de ouro', platinum: 'Troféu de platina', done: 'desbloqueado' },
  en: { bronze: 'Bronze trophy', silver: 'Silver trophy', gold: 'Gold trophy', platinum: 'Platinum trophy', done: 'unlocked' }
};

const ACH = {
  logo:     { tier: 'bronze', img: 'tr-logo',
              pt: { t: 'Corta!', d: 'Cinco cliques no logo e um segredo encontrado. Alguém aqui gosta de girar coisas.' },
              en: { t: 'Cut!', d: 'Five clicks on the logo and a secret found. Someone here likes spinning things.' } },
  faces:    { tier: 'bronze', img: 'tr-faces',
              pt: { t: 'Estourou a bolha', d: 'Você cutucou uma das carinhas da faixa vermelha.' },
              en: { t: 'Pop!', d: 'You poked one of the little faces on the red strip.' } },
  portrait: { tier: 'bronze', img: 'tr-portrait',
              pt: { t: 'Madrugada de render', d: 'Foto tirada às 3 da manhã, entre um render e outro.' },
              en: { t: 'Render o\'clock', d: 'Photo taken at 3 AM, between one render and another.' } },
  footL:    { tier: 'bronze', img: 'tr-footL',
              pt: { t: 'Boas-vindas', d: 'O Kin do rodapé agradeceu a sua visita.' },
              en: { t: 'Welcome', d: 'The Kin in the footer thanked you for stopping by.' } },
  footR:    { tier: 'bronze', img: 'tr-footR',
              pt: { t: 'Aceita café?', d: 'O outro Kin do rodapé aceita café como forma de pagamento.' },
              en: { t: 'Coffee?', d: 'The other Kin in the footer accepts coffee as payment.' } },
  poke:     { tier: 'silver', img: 'tr-poke',
              pt: { t: 'Mascote estressado', d: 'Você cutucou o Kin até ele ficar bravo. Ele vai cobrar hora extra.' },
              en: { t: 'Stressed mascot', d: 'You poked Kin until he got angry. He is charging overtime.' } },
  lost:     { tier: 'silver', img: 'tr-lost',
              pt: { t: 'Perdido na rede', d: 'Você caiu na página 404. O Kin finge que não viu.' },
              en: { t: 'Lost online', d: 'You landed on the 404 page. Kin pretends he didn\'t see.' } },
  arcade:   { tier: 'silver', img: 'tr-arcade',
              pt: { t: 'Fugitivo do 404', d: 'Você chegou a 150 pontos no minigame secreto da página 404.' },
              en: { t: '404 fugitive', d: 'You reached 150 points in the secret minigame on the 404 page.' } },
  meteor:   { tier: 'gold', img: 'tr-meteor',
              pt: { t: 'Chuva de meteoros', d: 'Você sobreviveu ao nível secreto do minigame da 404.' },
              en: { t: 'Meteor shower', d: 'You survived the secret level of the 404 minigame.' } },
  konami:   { tier: 'gold', img: 'tr-konami',
              pt: { t: 'Modo Kin', d: 'Você digitou o código secreto. Chuva de cabeças liberada!' },
              en: { t: 'Kin mode', d: 'You typed the secret code. Head rain unlocked!' } }
};
const PLATINUM = {
  img: 'tr-platinum',
  pt: { t: 'Platina!', d: 'Você encontrou todos os segredos do site. Obrigado por explorar cada cantinho!' },
  en: { t: 'Platinum!', d: 'You found every secret on the site. Thanks for exploring every corner!' }
};
const TROPHY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 3h12v2h3v3c0 2.2-1.8 4-4 4h-.3A5 5 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A5 5 0 0 1 7.3 12H7C4.8 12 3 10.2 3 8V5h3V3zm0 4H5v1c0 1.1.9 2 2 2V7zm12 0v3c1.1 0 2-.9 2-2V7h-2z"/></svg>';

const trophyMem = new Set();
function trophyList() {
  let saved = [];
  try { const a = JSON.parse(store(TROPHY_KEY) || '[]'); if (Array.isArray(a)) saved = a; } catch (e) {  }
  return Array.from(new Set(saved.concat(Array.from(trophyMem))));
}
function kinUnlock(id) {
  if (!ACH[id]) return false;
  const have = trophyList();
  if (have.includes(id)) return false;
  have.push(id); trophyMem.add(id);
  const ids = Object.keys(ACH);
  const done = ids.filter(k => have.includes(k)).length;
  const all = done === ids.length;
  const giveGold = all && !have.includes('platinum');
  if (giveGold) { have.push('platinum'); trophyMem.add('platinum'); }
  store(TROPHY_KEY, JSON.stringify(have));
  updateTrophyBtn();
  queueTrophy(id, done, ids.length);
  if (giveGold) queueTrophy('platinum', done, ids.length);
  return true;
}
window.kinUnlock = kinUnlock;

const trophyQ = []; let trophyBusy = false;
function queueTrophy(id, n, total) { trophyQ.push({ id, n, total }); if (!trophyBusy) nextTrophy(); }
function nextTrophy() {
  const job = trophyQ.shift();
  if (!job) { trophyBusy = false; return; }
  trophyBusy = true;
  const lang = curLang(), L = TIER_LABEL[lang];
  const plat = job.id === 'platinum';
  const def = plat ? PLATINUM : ACH[job.id];
  const tier = plat ? 'platinum' : def.tier;
  const txt = def[lang] || def.pt;
  let stack = $('.trophy-stack');
  if (!stack) {
    stack = document.createElement('div'); stack.className = 'trophy-stack';
    stack.setAttribute('role', 'status'); stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
  }
  const card = document.createElement('div');
  card.className = 'trophy ' + tier;
  card.innerHTML = '<span class="tr-pic"><img class="tr-img" alt="" width="58" height="58" src="assets/' + def.img + '.webp"><span class="tr-burst"></span></span>'
    + '<div class="tr-text"><div class="tr-kind">' + TROPHY_SVG + '<span></span></div><div class="tr-title"></div><div class="tr-desc"></div></div>';
  $('.tr-kind span', card).textContent = L[tier] + ' ' + L.done + (plat ? '' : ' · ' + job.n + '/' + job.total);
  $('.tr-title', card).textContent = txt.t;
  $('.tr-desc', card).textContent = txt.d;
  if (!REDUCE && (tier === 'gold' || tier === 'platinum')) burst($('.tr-burst', card), tier);
  stack.appendChild(card);
  void card.offsetWidth;
  card.classList.add('show');
  setTimeout(() => {
    card.classList.remove('show'); card.classList.add('hide');
    setTimeout(() => { card.remove(); nextTrophy(); }, 600);
  }, plat ? 6800 : 5000);
}
function burst(host, tier) {
  const colors = tier === 'platinum' ? ['#8fd8ff', '#ffffff', '#c9f0ff'] : ['#f5c542', '#fff3c4', '#ffffff'];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.4, dist = 46 + Math.random() * 44;
    s.style.cssText = '--dx:' + Math.round(Math.cos(ang) * dist) + 'px;--dy:' + Math.round(Math.sin(ang) * dist) + 'px;background:' + colors[i % colors.length] + ';animation-delay:' + (0.5 + Math.random() * 0.15).toFixed(2) + 's';
    host.appendChild(s);
  }
}

/* ========== Galeria de conquistas ========== */
const GAL = {
  pt: { open: 'Ver conquistas', title: 'Conquistas', close: 'Fechar',
        sub: 'Segredos escondidos pelo site. Os que você ainda não achou ficam misteriosos.',
        all: 'Você achou tudo. Obrigado por explorar cada cantinho!',
        tier: { bronze: 'Bronze', silver: 'Prata', gold: 'Ouro', platinum: 'Platina' },
        rarity: { bronze: 'Comum', silver: 'Rara', gold: 'Épica', platinum: 'Lendária' } },
  en: { open: 'View achievements', title: 'Achievements', close: 'Close',
        sub: 'Secrets hidden around the site. The ones you haven\'t found yet stay mysterious.',
        all: 'You found everything. Thanks for exploring every corner!',
        tier: { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', platinum: 'Platinum' },
        rarity: { bronze: 'Common', silver: 'Rare', gold: 'Epic', platinum: 'Legendary' } }
};
const HINTS = {
  logo:     { pt: 'Algo no topo da Home reage a quem insiste.', en: 'Something at the top of the Home page reacts to persistence.' },
  faces:    { pt: 'A faixa vermelha tem carinhas curiosas.', en: 'The red strip is full of curious little faces.' },
  portrait: { pt: 'Toda foto tem uma história por trás.', en: 'Every photo has a story behind it.' },
  footL:    { pt: 'No rodapé, alguém quer te cumprimentar.', en: 'In the footer, someone wants to greet you.' },
  footR:    { pt: 'O outro lado do rodapé também tem o que dizer.', en: 'The other side of the footer has something to say too.' },
  poke:     { pt: 'Alguém na Home tem pouca paciência.', en: 'Someone on the Home page has little patience.' },
  lost:     { pt: 'Nem todo caminho leva a uma página que existe.', en: 'Not every path leads to a page that exists.' },
  arcade:   { pt: 'Quando a página some, às vezes sobra uma corrida.', en: 'When the page vanishes, sometimes a race is all that is left.' },
  meteor:   { pt: 'Depois de correr bastante, o céu da 404 muda.', en: 'After running for a good while, the 404 sky changes.' },
  konami:   { pt: 'Quem joga há muito tempo conhece esta sequência. No celular, vale deslizar o dedo.', en: 'Longtime gamers know this sequence. On a phone, try swiping.' },
  platinum: { pt: 'Encontre todos os segredos.', en: 'Find all the secrets.' }
};
const GAL_ORDER = ['logo', 'faces', 'portrait', 'footL', 'footR', 'poke', 'lost', 'arcade', 'meteor', 'konami'];

function trophyCount() { const have = trophyList(); return GAL_ORDER.filter(k => have.includes(k)).length; }
function updateTrophyBtn() {
  const b = $('.trophy-open');
  if (!b) return;
  const n = trophyCount(), total = GAL_ORDER.length;
  $('span', b).textContent = n + '/' + total;
  b.setAttribute('aria-label', GAL[curLang()].open + ' (' + n + '/' + total + ')');
  b.classList.toggle('plat', trophyList().includes('platinum'));
}
function renderGallery(g) {
  const lang = curLang(), T = GAL[lang], have = trophyList(), n = trophyCount(), total = GAL_ORDER.length;
  $('.tg-title', g).textContent = T.title;
  $('.tg-close', g).setAttribute('aria-label', T.close);
  $('.tg-sub', g).textContent = n === total ? T.all : T.sub;
  $('.tg-count', g).textContent = n + ' / ' + total;
  $('.tg-fill', g).style.width = Math.round(n / total * 100) + '%';
  const list = $('.tg-list', g);
  list.textContent = '';
  const addCard = (id, tier, def) => {
    const on = have.includes(id);
    const card = document.createElement('div');
    card.className = 'tg-card ' + tier + (on ? ' on' : ' locked');
    const pic = on ? document.createElement('img') : document.createElement('div');
    pic.className = 'tg-img' + (on ? '' : ' q');
    if (on) { pic.alt = ''; pic.width = 56; pic.height = 56; pic.src = 'assets/' + def.img + '.webp'; } else pic.textContent = '?';
    const box = document.createElement('div');
    const kind = document.createElement('div'); kind.className = 'tg-kind';
    kind.textContent = on ? TIER_LABEL[lang][tier] + ' · ' + T.rarity[tier] : T.tier[tier];
    const name = document.createElement('div'); name.className = 'tg-name';
    const desc = document.createElement('div'); desc.className = 'tg-desc';
    if (on) { const txt = def[lang] || def.pt; name.textContent = txt.t; desc.textContent = txt.d; }
    else { name.textContent = '???'; desc.textContent = HINTS[id][lang]; }
    box.append(kind, name, desc);
    card.append(pic, box);
    list.appendChild(card);
  };
  addCard('platinum', 'platinum', PLATINUM);
  GAL_ORDER.forEach(id => addCard(id, ACH[id].tier, ACH[id]));
}
let galleryFocus = null;
function closeGallery() {
  const g = $('#trophy-gallery');
  if (!g || !g.classList.contains('open')) return;
  g.classList.remove('open');
  if (galleryFocus) galleryFocus.focus();
}
function openGallery() {
  let g = $('#trophy-gallery');
  if (!g) {
    g = document.createElement('div');
    g.id = 'trophy-gallery'; g.className = 'tg'; g.setAttribute('role', 'dialog'); g.setAttribute('aria-modal', 'true'); g.setAttribute('aria-labelledby', 'tg-title');
    g.innerHTML = '<div class="tg-panel"><button type="button" class="tg-close">×</button><h2 class="tg-title" id="tg-title"></h2><p class="tg-sub"></p>'
      + '<div class="tg-bar"><div class="tg-fill"></div></div><p class="tg-count"></p><div class="tg-list"></div></div>';
    document.body.appendChild(g);
    g.addEventListener('click', e => { if (e.target === g || e.target.closest('.tg-close')) closeGallery(); });
    document.addEventListener('keydown', e => {
      if (!g.classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      else if (e.key === 'Tab') trapTab(e, g);
    });
  }
  renderGallery(g);
  galleryFocus = document.activeElement;
  g.classList.add('open');
  $('.tg-close', g).focus();
}
function initTrophyButton() {
  const host = $('.footer-inner');
  if (!host) return;
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'trophy-open';
  b.innerHTML = TROPHY_SVG + '<span></span>';
  host.appendChild(b);
  b.addEventListener('click', openGallery);
  updateTrophyBtn();
  new MutationObserver(() => {
    updateTrophyBtn();
    const g = $('#trophy-gallery');
    if (g && g.classList.contains('open')) renderGallery(g);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
}

/* ========== Início ========== */
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
  initHeadsBg();
  initTilt();
  initPoke();
  initFooterTalk();
  initSecrets();
  initTrophyButton();
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(store('lang') ? (store('lang') === 'en' ? 'en' : 'pt') : (/^en/i.test(navigator.language || '') ? 'en' : 'pt'));
  openFromHash();
});
