/* ========== Kin Run ========== */
(function () {
  var art = document.querySelector('.nf-art');
  var main = document.querySelector('.nf-main');
  var stage = document.querySelector('.nf-stage');
  if (!art || !main || !stage) return;

  var TXT = {
    pt: { ready: 'Toque ou aperte espaço para correr', again: 'Toque para tentar de novo', exit: 'Sair do jogo', label: 'Minigame Kin Run. Aperte espaço, seta para cima ou toque na tela para pular.', over: 'Fim de jogo!', pts: 'pontos' },
    en: { ready: 'Tap or press space to run', again: 'Tap to try again', exit: 'Exit game', label: 'Kin Run minigame. Press space, the up arrow or tap the screen to jump.', over: 'Game over!', pts: 'points' }
  };
  var lang = function () { return document.documentElement.dataset.lang === 'en' ? 'en' : 'pt'; };
  var T = function () { return TXT[lang()]; };

  var W = 600, H = 170, GROUND = 142, FW = 37, FH = 48, KX = 52;
  var GOAL = 150;
  var BEST_KEY = 'kinRunBest';
  var INK = '#535353', INK_SOFT = '#757575', BG = '#f7f7f7';

  var FONT = {
    '0': ['111', '101', '101', '101', '111'], '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'],
    '3': ['111', '001', '111', '001', '111'], '4': ['101', '101', '111', '001', '001'], '5': ['111', '100', '111', '001', '111'],
    '6': ['111', '100', '111', '101', '111'], '7': ['111', '001', '001', '001', '001'], '8': ['111', '101', '111', '101', '111'],
    '9': ['111', '101', '111', '001', '111'], 'H': ['101', '101', '111', '101', '101'], 'I': ['111', '010', '010', '010', '111'],
    'G': ['111', '100', '101', '101', '111'], 'A': ['111', '101', '111', '101', '101'], 'M': ['10001', '11011', '10101', '10001', '10001'],
    'E': ['111', '100', '111', '100', '111'], 'O': ['111', '101', '101', '101', '111'], 'V': ['101', '101', '101', '101', '010'],
    'R': ['111', '101', '111', '110', '101'], ' ': ['00', '00', '00', '00', '00']
  };

  var game = document.createElement('section');
  game.className = 'nf-game';
  game.hidden = true;
  game.innerHTML =
    '<div class="crt"><div class="crt-screen" tabindex="0" role="group">' +
    '<canvas class="ag-canvas" width="' + W + '" height="' + H + '" aria-hidden="true"></canvas>' +
    '<div class="ag-msg"></div><span class="crt-roll"></span></div><span class="crt-led" aria-hidden="true"></span></div>' +
    '<p class="sr-only ag-sr" role="status"></p>' +
    '<button type="button" class="nf-btn ag-exit"></button>';
  stage.appendChild(game);

  var screen = game.querySelector('.crt-screen');
  var cv = game.querySelector('canvas');
  var ctx = cv.getContext('2d');
  var msg = game.querySelector('.ag-msg');
  var sr = game.querySelector('.ag-sr');
  var exitBtn = game.querySelector('.ag-exit');
  var sheet = new Image();
  sheet.src = 'assets/kin-run.png';

  var state = 'idle';
  var raf = 0, last = 0;
  var speed, dist, scoreF, y, vy, obstacles, clouds, nextGap, frame, best, goalDone;

  function readBest() { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } }
  function saveBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { return; } }

  function reset() {
    speed = 5.5; dist = 0; scoreF = 0; y = 0; vy = 0; frame = 0; goalDone = false;
    obstacles = []; nextGap = 170;
    clouds = [{ x: 90, y: 26 }, { x: 290, y: 48 }, { x: 480, y: 20 }];
    best = readBest();
  }

  function textWidth(str, s) {
    var w = 0;
    for (var i = 0; i < str.length; i++) w += (FONT[str[i]][0].length + 1) * s;
    return w - s;
  }
  function drawText(str, x, yy, s, color) {
    ctx.fillStyle = color;
    var cx = x;
    for (var i = 0; i < str.length; i++) {
      var g = FONT[str[i]];
      for (var r = 0; r < g.length; r++) for (var c = 0; c < g[r].length; c++) {
        if (g[r][c] === '1') ctx.fillRect(cx + c * s, yy + r * s, s, s);
      }
      cx += (g[0].length + 1) * s;
    }
  }
  function pad(n) { var t = String(n); while (t.length < 5) t = '0' + t; return t; }

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
    ctx.fillStyle = INK;
    for (var r = 0; r < o.rows; r++) {
      var oy = GROUND + 2 - o.h + r * (o.rh + o.s);
      for (var i = 0; i < o.txt.length; i++) {
        var g = FONT[o.txt[i]], ox = o.x + i * (o.gw + o.gap);
        for (var gy = 0; gy < 5; gy++) for (var gx = 0; gx < 3; gx++) {
          if (g[gy][gx] === '1') ctx.fillRect(Math.round(ox + gx * o.s), Math.round(oy + gy * o.s), o.s, o.s);
        }
      }
    }
  }

  function drawCloud(c) {
    ctx.fillStyle = '#dadada';
    var x = Math.round(c.x), yy = c.y;
    ctx.fillRect(x + 8, yy + 8, 38, 8); ctx.fillRect(x + 14, yy + 3, 12, 5); ctx.fillRect(x + 28, yy, 12, 8);
    ctx.fillRect(x, yy + 10, 10, 6); ctx.fillRect(x + 44, yy + 10, 10, 6);
  }

  function drawGround() {
    ctx.fillStyle = INK;
    ctx.fillRect(0, GROUND + 2, W, 2);
    ctx.fillStyle = '#acacac';
    var off = dist % 72;
    for (var x = -off; x < W; x += 72) {
      ctx.fillRect(Math.round(x), GROUND + 11, 16, 2);
      ctx.fillRect(Math.round(x + 40), GROUND + 18, 6, 2);
      ctx.fillRect(Math.round(x + 58), GROUND + 8, 3, 2);
    }
  }

  function drawKin() {
    var top = GROUND + 2 - FH + y;
    var f = state === 'run' ? (y < -1 ? 2 : (Math.floor(frame / 6) % 2)) : 3;
    if (sheet.complete && sheet.naturalWidth) ctx.drawImage(sheet, f * FW, 0, FW, FH, KX, Math.round(top), FW, FH);
    else { ctx.fillStyle = INK; ctx.fillRect(KX + 8, Math.round(top) + 6, 22, FH - 6); }
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);
    for (var c = 0; c < clouds.length; c++) drawCloud(clouds[c]);
    drawGround();
    for (var i = 0; i < obstacles.length; i++) drawObstacle(obstacles[i]);
    drawKin();
    var cur = pad(Math.floor(scoreF));
    drawText('HI ' + pad(best), W - 16 - textWidth('HI ' + pad(best) + ' ' + cur, 3), 8, 3, INK_SOFT);
    drawText(cur, W - 16 - textWidth(cur, 3), 8, 3, INK);
    if (state === 'over') {
      var t = 'GAME OVER';
      drawText(t, Math.round((W - textWidth(t, 6)) / 2), 30, 6, INK);
    }
  }

  function hit() {
    var top = GROUND + 2 - FH + y;
    var kx = KX + FW * 0.25, kw = FW * 0.62, ky = top + FH * 0.1, kh = FH * 0.86;
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      var ox = o.x + 2, oy = GROUND + 2 - o.h + 2, ow = o.w - 4, oh = o.h - 2;
      if (kx < ox + ow && kx + kw > ox && ky < oy + oh && ky + kh > oy) return true;
    }
    return false;
  }

  function setMsg(text) { msg.textContent = text || ''; }

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
    if (y < 0 || vy < 0) {
      vy += 0.6 * k; y += vy * k;
      if (y >= 0) { y = 0; vy = 0; }
    }
    for (var i = 0; i < obstacles.length; i++) obstacles[i].x -= speed * k;
    while (obstacles.length && obstacles[0].x + obstacles[0].w < -10) obstacles.shift();
    for (var c = 0; c < clouds.length; c++) {
      clouds[c].x -= speed * 0.18 * k;
      if (clouds[c].x < -60) { clouds[c].x = W + 20 + Math.random() * 80; clouds[c].y = 14 + Math.random() * 50; }
    }
    nextGap -= speed * k;
    if (nextGap <= 0) {
      obstacles.push(makeObstacle());
      nextGap = speed * (40 + Math.random() * 30) + 40;
    }
    if (!goalDone && Math.floor(scoreF) >= GOAL) { goalDone = true; if (window.kinUnlock) window.kinUnlock('arcade'); }
    render();
    if (hit()) gameOver();
  }

  function gameOver() {
    state = 'over';
    var sc = Math.floor(scoreF);
    if (sc > best) { best = sc; saveBest(best); }
    setMsg(T().again);
    sr.textContent = T().over + ' ' + sc + ' ' + T().pts;
  }

  function jump() {
    if (state === 'idle') return;
    if (state === 'over') { reset(); state = 'run'; setMsg(''); sr.textContent = ''; last = 0; return; }
    if (state === 'ready') { state = 'run'; setMsg(''); last = 0; }
    if (y === 0 && vy === 0) vy = -10.4;
  }

  function openGame() {
    if (state !== 'idle') return;
    reset();
    exitBtn.textContent = T().exit;
    screen.setAttribute('aria-label', T().label);
    main.hidden = true; game.hidden = false;
    screen.classList.remove('on'); void screen.offsetWidth; screen.classList.add('on');
    state = 'ready';
    setMsg(T().ready);
    last = 0;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
    screen.focus();
  }

  function closeGame() {
    if (state === 'idle') return;
    state = 'idle';
    cancelAnimationFrame(raf);
    game.hidden = true; main.hidden = false;
    var b = document.querySelector('.nf-btn');
    if (b) b.focus();
  }

  var taps = 0, tapTimer = 0;
  art.addEventListener('click', function () {
    art.classList.remove('shake'); void art.offsetWidth; art.classList.add('shake');
    taps++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(function () { taps = 0; }, 2200);
    if (taps >= 3) { taps = 0; openGame(); }
  });

  screen.addEventListener('pointerdown', function (e) { e.preventDefault(); screen.focus(); jump(); });
  document.addEventListener('keydown', function (e) {
    if (state === 'idle') return;
    if (e.key === 'Escape') { closeGame(); return; }
    if (e.code === 'Space' && e.target && e.target.closest && e.target.closest('.ag-exit')) return;
    if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { e.preventDefault(); jump(); }
  });
  exitBtn.addEventListener('click', closeGame);
})();
