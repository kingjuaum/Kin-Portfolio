/* ============ KIN RUN ============ */
(function () {
  var art = document.querySelector('.nf-art');
  var main = document.querySelector('.nf-main');
  var stage = document.querySelector('.nf-stage');
  if (!art || !main || !stage) return;

  var TXT = {
    pt: { ready: 'Toque ou aperte espaço para correr', again: 'Toque para tentar de novo', exit: 'Sair do jogo', label: 'Minigame Kin Run. Aperte espaço, seta para cima ou toque na tela para pular.', over: 'Fim de jogo!', pts: 'pontos', secret: 'Nível secreto: chuva de meteoros!', survived: 'Você sobreviveu à chuva de meteoros!' },
    en: { ready: 'Tap or press space to run', again: 'Tap to try again', exit: 'Exit game', label: 'Kin Run minigame. Press space, the up arrow or tap the screen to jump.', over: 'Game over!', pts: 'points', secret: 'Secret level: meteor shower!', survived: 'You survived the meteor shower!' }
  };
  var lang = function () { return document.documentElement.dataset.lang === 'en' ? 'en' : 'pt'; };
  var T = function () { return TXT[lang()]; };

  var W = 600, H = 170, GROUND = 142, FW = 37, FH = 48, KX = 52;
  var GOAL = 150, SHOWER_FIRST = 200, SHOWER_PERIOD = 320, SHOWER_LEN = 120;
  var BEST_KEY = 'kinRunBest';
  var DAY = { bg: [247, 247, 247], ink: [83, 83, 83], soft: [117, 117, 117], cloud: [218, 218, 218], dots: [172, 172, 172] };
  var NIGHT = { bg: [32, 33, 36], ink: [214, 214, 214], soft: [150, 150, 156], cloud: [58, 59, 64], dots: [96, 96, 102] };
  var DUSK = [52, 24, 24];

  var FONT = {
    '0': ['111', '101', '101', '101', '111'], '1': ['010', '110', '010', '010', '111'], '2': ['111', '001', '111', '100', '111'],
    '3': ['111', '001', '111', '001', '111'], '4': ['101', '101', '111', '001', '001'], '5': ['111', '100', '111', '001', '111'],
    '6': ['111', '100', '111', '101', '111'], '7': ['111', '001', '001', '001', '001'], '8': ['111', '101', '111', '101', '111'],
    '9': ['111', '101', '111', '001', '111'], 'H': ['101', '101', '111', '101', '101'], 'I': ['111', '010', '010', '010', '111'],
    'G': ['111', '100', '101', '101', '111'], 'A': ['111', '101', '111', '101', '101'], 'M': ['10001', '11011', '10101', '10001', '10001'],
    'E': ['111', '100', '111', '100', '111'], 'O': ['111', '101', '101', '101', '111'], 'V': ['101', '101', '101', '101', '010'],
    'R': ['111', '101', '111', '110', '101'], 'N': ['101', '111', '111', '111', '101'], 'L': ['100', '100', '100', '100', '111'],
    'S': ['111', '100', '111', '001', '111'], 'C': ['111', '100', '100', '100', '111'], 'T': ['111', '010', '010', '010', '010'],
    'B': ['110', '101', '110', '101', '110'], 'U': ['101', '101', '101', '101', '111'], '!': ['1', '1', '1', '0', '1'], ' ': ['00', '00', '00', '00', '00']
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
  var nightSheet = null;
  sheet.src = 'assets/kin-run.png';
  function makeNight() {
    nightSheet = document.createElement('canvas');
    nightSheet.width = sheet.naturalWidth; nightSheet.height = sheet.naturalHeight;
    var c = nightSheet.getContext('2d');
    c.drawImage(sheet, 0, 0);
    c.globalCompositeOperation = 'source-in';
    c.fillStyle = 'rgb(214,214,214)';
    c.fillRect(0, 0, nightSheet.width, nightSheet.height);
  }
  if (sheet.complete && sheet.naturalWidth) makeNight(); else sheet.addEventListener('load', makeNight);

  var stars = [];
  for (var si = 0; si < 18; si++) stars.push({ x: (si * 97 + 31) % (W - 20) + 10, y: (si * 53 + 17) % 78 + 8 });

  var state = 'idle';
  var raf = 0, last = 0;
  var speed, dist, scoreF, y, vy, obstacles, meteors, sparks, craters, clouds, nextGap, frame, best, goalDone;
  var tn, tr, showerOn, meteorTimer, banner, shake;

  function readBest() { try { return parseInt(localStorage.getItem(BEST_KEY), 10) || 0; } catch (e) { return 0; } }
  function saveBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) { return; } }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rgb(a, b, t) {
    return 'rgb(' + Math.round(lerp(a[0], b[0], t)) + ',' + Math.round(lerp(a[1], b[1], t)) + ',' + Math.round(lerp(a[2], b[2], t)) + ')';
  }

  function reset() {
    speed = 5.5; dist = 0; scoreF = 0; y = 0; vy = 0; frame = 0; goalDone = false;
    obstacles = []; meteors = []; sparks = []; craters = [];
    nextGap = 170; tn = 0; tr = 0; showerOn = false; meteorTimer = 0; banner = null; shake = 0;
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

  function disc(cx, cy, r, color) {
    ctx.fillStyle = color;
    for (var dy = -r; dy <= r; dy++) {
      var half = Math.round(Math.sqrt(r * r - dy * dy));
      ctx.fillRect(Math.round(cx) - half, Math.round(cy) + dy, half * 2 + 1, 1);
    }
  }

  function makeObstacle() {
    var r = Math.random(), s, rows, txt;
    if (r < 0.4) { rows = 1; txt = '404'; s = 5; }
    else if (r < 0.65) { rows = 1; txt = '40'; s = 5; }
    else if (r < 0.85) { rows = 2; txt = '404'; s = 4; }
    else { rows = 1; txt = '4'; s = 7; }
    var gw = 3 * s, gap = s, rh = 5 * s, h = rows * rh + (rows - 1) * s;
    return { x: W + 10, w: txt.length * gw + (txt.length - 1) * gap, h: h, top: GROUND + 2 - h, txt: txt, s: s, rows: rows, gw: gw, gap: gap, rh: rh, mul: 1 };
  }

  function makeFly() {
    var s = 3, h = 5 * s;
    return { x: W + 10, w: 3 * 3 * s + 2 * s, h: h, top: GROUND - 54 - h, txt: 'ERR', s: s, rows: 1, gw: 3 * s, gap: s, rh: h, mul: 1.12 };
  }

  function spawnObstacle() {
    var sc = scoreF;
    var flyP = sc < 100 ? 0 : (sc < 200 ? 0.22 : 0.32);
    if (Math.random() < flyP) { var f = makeFly(); obstacles.push(f); return f.w; }
    var count = 1;
    if (sc > 60 && Math.random() < Math.min(0.5, (sc - 40) / 260)) count = 2;
    if (sc > 160 && Math.random() < 0.2) count = 3;
    var x = W + 10, total = 0;
    for (var i = 0; i < count; i++) {
      var o = makeObstacle();
      o.x = x; obstacles.push(o);
      x += o.w + 14 + Math.random() * 10; total = x - (W + 10);
    }
    return total;
  }

  function spawnMeteor(prog) {
    var vyy = lerp(5, 9, prog) * (0.9 + Math.random() * 0.2), vx = -(2 + Math.random() * 2);
    var near = Math.random() < 0.7;
    var ix = near ? KX + FW / 2 + (Math.random() * 170 - 50) : 120 + Math.random() * 420;
    var tt = (GROUND + 24) / vyy;
    meteors.push({ x: ix - vx * tt, y: -24, vx: vx, vy: vyy, ix: ix });
  }

  function explode(m) {
    for (var i = 0; i < 12; i++) {
      var ang = -Math.PI * Math.random(), sp = 2 + Math.random() * 4;
      sparks.push({ x: m.x, y: GROUND, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 26 });
    }
    craters.push({ x: m.x });
    shake = 8;
  }

  function drawObstacle(o, ink) {
    ctx.fillStyle = ink;
    for (var r = 0; r < o.rows; r++) {
      var oy = o.top + r * (o.rh + o.s);
      for (var i = 0; i < o.txt.length; i++) {
        var g = FONT[o.txt[i]], ox = o.x + i * (o.gw + o.gap);
        for (var gy = 0; gy < 5; gy++) for (var gx = 0; gx < g[0].length; gx++) {
          if (g[gy][gx] === '1') ctx.fillRect(Math.round(ox + gx * o.s), Math.round(oy + gy * o.s), o.s, o.s);
        }
      }
    }
  }

  function drawCloud(c, color) {
    ctx.fillStyle = color;
    var x = Math.round(c.x), yy = c.y;
    ctx.fillRect(x + 8, yy + 8, 38, 8); ctx.fillRect(x + 14, yy + 3, 12, 5); ctx.fillRect(x + 28, yy, 12, 8);
    ctx.fillRect(x, yy + 10, 10, 6); ctx.fillRect(x + 44, yy + 10, 10, 6);
  }

  function drawSky(P) {
    if (tn < 0.03) return;
    ctx.globalAlpha = tn;
    ctx.fillStyle = P.ink;
    for (var i = 0; i < stars.length; i++) {
      if ((Math.floor(frame / 24) + i) % 6 === 0) continue;
      ctx.fillRect(stars[i].x, stars[i].y, 2, 2);
    }
    disc(W - 110, 36, 11, P.ink);
    disc(W - 105, 33, 10, P.bg);
    ctx.globalAlpha = 1;
  }

  function drawGround(P) {
    ctx.fillStyle = P.ink;
    ctx.fillRect(0, GROUND + 2, W, 2);
    ctx.fillStyle = P.dots;
    var off = dist % 72;
    for (var x = -off; x < W; x += 72) {
      ctx.fillRect(Math.round(x), GROUND + 11, 16, 2);
      ctx.fillRect(Math.round(x + 40), GROUND + 18, 6, 2);
      ctx.fillRect(Math.round(x + 58), GROUND + 8, 3, 2);
    }
    ctx.fillStyle = P.ink;
    for (var c = 0; c < craters.length; c++) ctx.fillRect(Math.round(craters[c].x) - 9, GROUND + 5, 18, 2);
  }

  function drawMeteor(m) {
    var blink = Math.floor(frame / 4) % 2 === 0;
    if (blink) { ctx.fillStyle = '#ff4d2f'; ctx.fillRect(Math.round(m.ix) - 10, GROUND + 6, 20, 2); }
    for (var i = 6; i >= 1; i--) {
      ctx.globalAlpha = (1 - i / 7) * 0.85;
      ctx.fillStyle = i > 3 ? '#ff4d2f' : '#ff9d3d';
      var s = 9 - i;
      ctx.fillRect(Math.round(m.x - m.vx * i * 1.7 - s / 2), Math.round(m.y - m.vy * i * 1.7 - s / 2), s, s);
    }
    ctx.globalAlpha = 1;
    disc(m.x, m.y, 8, '#ff7a2f');
    disc(m.x - 1, m.y - 1, 4, '#ffe08a');
  }

  function drawKin() {
    var top = Math.round(GROUND + 2 - FH + y);
    var f = state === 'run' ? (y < -1 ? 2 : (Math.floor(frame / 6) % 2)) : 3;
    if (!(sheet.complete && sheet.naturalWidth)) { ctx.fillStyle = '#535353'; ctx.fillRect(KX + 8, top + 6, 22, FH - 6); return; }
    if (tn < 0.98) { ctx.globalAlpha = 1 - tn; ctx.drawImage(sheet, f * FW, 0, FW, FH, KX, top, FW, FH); }
    if (tn > 0.02 && nightSheet) { ctx.globalAlpha = tn; ctx.drawImage(nightSheet, f * FW, 0, FW, FH, KX, top, FW, FH); }
    ctx.globalAlpha = 1;
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    var skyBg = rgb(DAY.bg, NIGHT.bg, tn);
    if (tr > 0.01) skyBg = rgb([lerp(DAY.bg[0], NIGHT.bg[0], tn), lerp(DAY.bg[1], NIGHT.bg[1], tn), lerp(DAY.bg[2], NIGHT.bg[2], tn)], DUSK, tr);
    var P = {
      bg: skyBg, ink: rgb(DAY.ink, NIGHT.ink, tn), soft: rgb(DAY.soft, NIGHT.soft, tn),
      cloud: rgb(DAY.cloud, NIGHT.cloud, tn), dots: rgb(DAY.dots, NIGHT.dots, tn)
    };
    ctx.save();
    if (shake > 0) ctx.translate(Math.round((Math.random() - 0.5) * 5), Math.round((Math.random() - 0.5) * 4));
    ctx.fillStyle = P.bg;
    ctx.fillRect(-6, -6, W + 12, H + 12);
    drawSky(P);
    for (var c = 0; c < clouds.length; c++) drawCloud(clouds[c], P.cloud);
    drawGround(P);
    for (var i = 0; i < obstacles.length; i++) drawObstacle(obstacles[i], P.ink);
    for (var j = 0; j < meteors.length; j++) drawMeteor(meteors[j]);
    for (var q = 0; q < sparks.length; q++) {
      ctx.globalAlpha = clamp(sparks[q].life / 20, 0, 1);
      ctx.fillStyle = q % 2 ? '#ffb347' : '#ff6a2a';
      ctx.fillRect(Math.round(sparks[q].x), Math.round(sparks[q].y), 3, 3);
    }
    ctx.globalAlpha = 1;
    drawKin();
    ctx.restore();
    var cur = pad(Math.floor(scoreF));
    var hiStr = 'HI ' + pad(best);
    drawText(hiStr, W - 16 - textWidth(hiStr + ' ' + cur, 3), 8, 3, P.soft);
    drawText(cur, W - 16 - textWidth(cur, 3), 8, 3, P.ink);
    if (banner && banner.t > 0 && Math.floor(banner.t / 12) % 2 === 0) {
      if (banner.a) drawText(banner.a, Math.round((W - textWidth(banner.a, 2)) / 2), 34, 2, P.soft);
      drawText(banner.b, Math.round((W - textWidth(banner.b, 5)) / 2), 52, 5, showerOn ? '#ff7a2f' : P.ink);
    }
    if (state === 'over') {
      var t = 'GAME OVER';
      drawText(t, Math.round((W - textWidth(t, 6)) / 2), 30, 6, P.ink);
    }
  }

  function hit() {
    var top = GROUND + 2 - FH + y;
    var kx = KX + FW * 0.25, kw = FW * 0.62, ky = top + FH * 0.1, kh = FH * 0.86;
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      var ox = o.x + 2, oy = o.top + 2, ow = o.w - 4, oh = o.h - 2;
      if (kx < ox + ow && kx + kw > ox && ky < oy + oh && ky + kh > oy) return true;
    }
    for (var j = 0; j < meteors.length; j++) {
      var m = meteors[j];
      var nx = clamp(m.x, kx, kx + kw), ny = clamp(m.y, ky, ky + kh);
      if ((m.x - nx) * (m.x - nx) + (m.y - ny) * (m.y - ny) < 49) return true;
    }
    return false;
  }

  function setMsg(text) { msg.textContent = text || ''; }
  function announce(text) { sr.textContent = text; }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    var dt = Math.min(32, now - (last || now));
    last = now;
    if (state !== 'run') { frame += dt / 16.667; render(); return; }
    var k = dt / 16.667;
    frame += k;
    speed = 5.5 + 8.5 * (1 - Math.exp(-scoreF / 180));
    dist += speed * k;
    scoreF += speed * 0.02 * k;

    var n = scoreF >= SHOWER_FIRST ? Math.floor((scoreF - SHOWER_FIRST) / SHOWER_PERIOD) : -1;
    var pos = n >= 0 ? scoreF - (SHOWER_FIRST + SHOWER_PERIOD * n) : 0;
    var on = n >= 0 && pos < SHOWER_LEN;
    if (on && !showerOn) { showerOn = true; banner = { a: 'NIVEL SECRETO', b: 'METEOROS', t: 150 }; meteorTimer = 45; announce(T().secret); }
    if (!on && showerOn) {
      showerOn = false; banner = { a: '', b: 'SOBREVIVEU!', t: 120 }; announce(T().survived);
      if (window.kinUnlock) window.kinUnlock('meteor');
    }
    var prog = on ? pos / SHOWER_LEN : 0;
    var nightGoal = showerOn ? 1 : ((scoreF % 260) >= 100 && (scoreF % 260) < 180 ? 1 : 0);
    tn += (nightGoal - tn) * 0.03 * k;
    tr += ((showerOn ? 1 : 0) - tr) * 0.03 * k;
    if (banner) { banner.t -= k; if (banner.t <= 0) banner = null; }
    if (shake > 0) shake -= k;

    if (y < 0 || vy < 0) {
      vy += 0.6 * k; y += vy * k;
      if (y >= 0) { y = 0; vy = 0; }
    }
    for (var i = 0; i < obstacles.length; i++) obstacles[i].x -= speed * obstacles[i].mul * k;
    while (obstacles.length && obstacles[0].x + obstacles[0].w < -10) obstacles.shift();
    for (var c = 0; c < clouds.length; c++) {
      clouds[c].x -= speed * 0.18 * k;
      if (clouds[c].x < -60) { clouds[c].x = W + 20 + Math.random() * 80; clouds[c].y = 14 + Math.random() * 50; }
    }
    for (var cr = craters.length - 1; cr >= 0; cr--) { craters[cr].x -= speed * k; if (craters[cr].x < -20) craters.splice(cr, 1); }

    nextGap -= speed * k;
    if (nextGap <= 0) {
      var wide = spawnObstacle();
      var lvl = clamp(scoreF / 300, 0, 1);
      var frames = lerp(46 + Math.random() * 30, 37 + Math.random() * 15, lvl);
      nextGap = frames * speed * (showerOn ? 1.3 : 1) + wide;
    }

    if (showerOn) {
      meteorTimer -= k;
      if (meteorTimer <= 0) {
        spawnMeteor(prog);
        if (prog > 0.5 && Math.random() < 0.4) spawnMeteor(prog);
        meteorTimer = lerp(72, 26, prog) * (0.8 + Math.random() * 0.4);
      }
    }
    for (var m = meteors.length - 1; m >= 0; m--) {
      var mt = meteors[m];
      mt.x += mt.vx * k; mt.y += mt.vy * k;
      if (mt.y >= GROUND) { explode(mt); meteors.splice(m, 1); }
    }
    for (var s = sparks.length - 1; s >= 0; s--) {
      var sp = sparks[s];
      sp.x += sp.vx * k; sp.y += sp.vy * k; sp.vy += 0.25 * k; sp.life -= k;
      if (sp.life <= 0) sparks.splice(s, 1);
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
    announce(T().over + ' ' + sc + ' ' + T().pts);
  }

  function jump() {
    if (state === 'idle') return;
    if (state === 'over') { reset(); state = 'run'; setMsg(''); announce(''); last = 0; return; }
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
