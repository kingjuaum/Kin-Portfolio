/* =====================================================================
   KIN RUN — minigame secreto da página 404
   Como abrir: tocar/clicar 3 vezes na cabeça pixelada do Kin.
   Controles: espaço / seta para cima / toque na tela para pular. Esc sai do jogo.
   Passou de 150 pontos? Troféu "Fugitivo do 404".
   ===================================================================== */
(function () {
  var art = document.querySelector('.nf-art');
  var win = document.querySelector('.nf-window');
  var body = document.querySelector('.nf-body');
  var barTitle = document.querySelector('.nf-bar span');
  if (!art || !win || !body || !barTitle) return;

  var TXT = {
    pt: { bar: 'Kin Run', ready: 'Toque ou aperte espaço para correr', over: 'Fim de jogo!\nToque para tentar de novo', score: 'Pontos', best: 'Recorde', exit: 'Sair do jogo' },
    en: { bar: 'Kin Run', ready: 'Tap or press space to run', over: 'Game over!\nTap to try again', score: 'Score', best: 'Best', exit: 'Exit game' }
  };
  var lang = function () { return document.documentElement.dataset.lang === 'en' ? 'en' : 'pt'; };
  var T = function () { return TXT[lang()]; };

  var W = 520, H = 190, GROUND = 158, LEG = 10, HEAD = 44, KX = 56;
  var GOAL = 150;
  var BEST_KEY = 'kinRunBest';
  var GLYPH = { '4': ['101', '101', '111', '001', '001'], '0': ['111', '101', '101', '101', '111'] };

  var game = document.createElement('div');
  game.className = 'nf-game';
  game.hidden = true;
  game.innerHTML =
    '<div class="ag-hud"><span><span class="ag-l-score"></span> <b class="ag-score">0</b></span>' +
    '<span><span class="ag-l-best"></span> <b class="ag-best">0</b></span></div>' +
    '<div class="ag-wrap"><canvas class="ag-canvas" width="' + W + '" height="' + H + '"></canvas><div class="ag-msg"></div></div>' +
    '<button type="button" class="nf-btn ag-exit"></button>';
  win.appendChild(game);

  var cv = game.querySelector('canvas');
  var ctx = cv.getContext('2d');
  var msg = game.querySelector('.ag-msg');
  var elScore = game.querySelector('.ag-score');
  var elBest = game.querySelector('.ag-best');
  var wrap = game.querySelector('.ag-wrap');
  var head = new Image();
  head.src = 'assets/pixel-kin.png';

  var state = 'idle';           // idle | ready | run | over
  var raf = 0, last = 0;
  var speed, dist, scoreF, y, vy, obstacles, nextGap, frame, best, goalDone, shownScore;
  var originalBar = barTitle.textContent;

  function readBest() { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } }
  function saveBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { /* ignora */ } }

  function reset() {
    speed = 5.5; dist = 0; scoreF = 0; y = 0; vy = 0; frame = 0; goalDone = false; shownScore = -1;
    obstacles = []; nextGap = 160;
    best = readBest();
    elScore.textContent = '0'; elBest.textContent = String(best);
  }

  function makeObstacle() {
    var r = Math.random(), s, rows, txt;
    if (r < 0.4) { rows = 1; txt = '404'; s = 5; }
    else if (r < 0.65) { rows = 1; txt = '40'; s = 5; }
    else if (r < 0.85) { rows = 2; txt = '404'; s = 4; }
    else { rows = 1; txt = '4'; s = 7; }
    var gw = 3 * s, gap = s, rh = 5 * s;
    return { x: W + 10, w: txt.length * gw + (txt.length - 1) * gap, h: rows * rh + (rows - 1) * s, txt: txt, s: s, rows: rows, gw: gw, gap: gap, rh: rh };
  }

  function drawObstacle(o) {
    ctx.fillStyle = '#111';
    for (var r = 0; r < o.rows; r++) {
      var oy = GROUND - o.h + r * (o.rh + o.s);
      for (var i = 0; i < o.txt.length; i++) {
        var g = GLYPH[o.txt[i]], ox = o.x + i * (o.gw + o.gap);
        for (var gy = 0; gy < 5; gy++) for (var gx = 0; gx < 3; gx++) {
          if (g[gy][gx] === '1') ctx.fillRect(Math.round(ox + gx * o.s), Math.round(oy + gy * o.s), o.s, o.s);
        }
      }
    }
  }

  function drawKin() {
    var top = GROUND - LEG - HEAD + 4 + y;
    ctx.fillStyle = '#111';
    var air = y < -1;
    var step = Math.floor(frame / 6) % 2;
    var lh = air ? LEG - 3 : (step ? LEG : LEG - 3), rh = air ? LEG - 3 : (step ? LEG - 3 : LEG);
    ctx.fillRect(Math.round(KX + HEAD * 0.24), top + HEAD - 4, 5, lh);
    ctx.fillRect(Math.round(KX + HEAD * 0.64), top + HEAD - 4, 5, rh);
    if (head.complete && head.naturalWidth) ctx.drawImage(head, KX, top, HEAD, HEAD);
    else ctx.fillRect(KX + 4, top + 4, HEAD - 8, HEAD - 8);
  }

  function drawGround() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, GROUND, W, 2);
    var off = dist % 64;
    for (var x = -off; x < W; x += 64) {
      ctx.fillRect(Math.round(x), GROUND + 9, 14, 2);
      ctx.fillRect(Math.round(x + 34), GROUND + 16, 6, 2);
    }
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    drawGround();
    for (var i = 0; i < obstacles.length; i++) drawObstacle(obstacles[i]);
    drawKin();
  }

  function hit() {
    var top = GROUND - LEG - HEAD + 4 + y, kx = KX + HEAD * 0.27, kw = HEAD * 0.46, ky = top + HEAD * 0.24, kh = HEAD + 2 - HEAD * 0.24;
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      var ox = o.x + 2, oy = GROUND - o.h + 2, ow = o.w - 4, oh = o.h - 2;
      if (kx < ox + ow && kx + kw > ox && ky < oy + oh && ky + kh > oy) return true;
    }
    return false;
  }

  function setMsg(text) { msg.textContent = text || ''; msg.style.whiteSpace = 'pre-line'; }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    var dt = Math.min(32, now - (last || now));
    last = now;
    if (state !== 'run') { render(); return; }
    var k = dt / 16.667;
    frame += k;
    speed = Math.min(11.5, speed + 0.0016 * k);
    dist += speed * k;
    scoreF += speed * 0.02 * k;
    // pulo
    if (y < 0 || vy < 0) {
      vy += 0.6 * k; y += vy * k;
      if (y >= 0) { y = 0; vy = 0; }
    }
    // obstáculos
    for (var i = 0; i < obstacles.length; i++) obstacles[i].x -= speed * k;
    while (obstacles.length && obstacles[0].x + obstacles[0].w < -10) obstacles.shift();
    nextGap -= speed * k;
    if (nextGap <= 0) {
      obstacles.push(makeObstacle());
      nextGap = speed * (40 + Math.random() * 30) + 40;
    }
    var sc = Math.floor(scoreF);
    if (sc !== shownScore) { shownScore = sc; elScore.textContent = String(sc); }
    if (!goalDone && sc >= GOAL) { goalDone = true; if (window.kinUnlock) window.kinUnlock('arcade'); }
    render();
    if (hit()) gameOver();
  }

  function gameOver() {
    state = 'over';
    var sc = Math.floor(scoreF);
    if (sc > best) { best = sc; saveBest(best); elBest.textContent = String(best); }
    setMsg(T().over);
  }

  function jump() {
    if (state === 'idle') return;
    if (state === 'over') { reset(); state = 'run'; setMsg(''); last = 0; return; }
    if (state === 'ready') { state = 'run'; setMsg(''); last = 0; }
    if (y === 0 && vy === 0) vy = -10.4;
  }

  function applyText() {
    game.querySelector('.ag-l-score').textContent = T().score;
    game.querySelector('.ag-l-best').textContent = T().best;
    game.querySelector('.ag-exit').textContent = T().exit;
    barTitle.textContent = T().bar;
  }

  function openGame() {
    if (state !== 'idle') return;
    reset();
    applyText();
    body.hidden = true; game.hidden = false;
    state = 'ready';
    setMsg(T().ready);
    last = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function closeGame() {
    if (state === 'idle') return;
    state = 'idle';
    cancelAnimationFrame(raf);
    game.hidden = true; body.hidden = false;
    barTitle.textContent = originalBar;
  }

  // ---- abrir: 3 toques seguidos na cabeça pixelada
  var taps = 0, tapTimer = 0;
  art.addEventListener('click', function () {
    art.classList.remove('shake'); void art.offsetWidth; art.classList.add('shake');
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(function () { taps = 0; }, 2200);
    if (taps >= 3) { taps = 0; openGame(); }
  });

  // ---- controles
  wrap.addEventListener('pointerdown', function (e) { e.preventDefault(); jump(); });
  document.addEventListener('keydown', function (e) {
    if (state === 'idle') return;
    if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { e.preventDefault(); jump(); }
    else if (e.key === 'Escape') closeGame();
  });
  game.querySelector('.ag-exit').addEventListener('click', closeGame);
})();
