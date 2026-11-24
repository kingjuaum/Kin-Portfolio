/* Navegação extra: voltar ao topo, copiar e-mail, fechar menu mobile. Carregar depois de script.js. */
(function () {
  var T = {
    pt: { top: 'Voltar ao topo', copy: 'Copiar e-mail', copied: 'Copiado!' },
    en: { top: 'Back to top', copy: 'Copy e-mail', copied: 'Copied!' }
  };
  function t(k) { return T[document.documentElement.lang === 'en' ? 'en' : 'pt'][k]; }

  /* Voltar ao topo */
  var top = document.createElement('button');
  top.className = 'kv-top'; top.type = 'button'; top.textContent = '↑';
  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    var c = document.getElementById('conteudo'); if (c) c.focus({ preventScroll: true });
  });
  document.body.appendChild(top);
  var onScroll = function () { top.classList.toggle('show', window.scrollY > window.innerHeight * 0.8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Copiar e-mail */
  var copy = null, mail = document.querySelector('.site-footer .footer-mail a');
  if (mail && navigator.clipboard) {
    copy = document.createElement('button'); copy.type = 'button'; copy.className = 'kv-copy';
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(mail.textContent.trim()).then(function () {
        copy.textContent = t('copied'); copy.classList.add('ok');
        setTimeout(function () { copy.textContent = t('copy'); copy.classList.remove('ok'); }, 1800);
      });
    });
    mail.parentNode.after(copy);
  }

  function render() {
    top.setAttribute('aria-label', t('top')); top.title = t('top');
    if (copy && !copy.classList.contains('ok')) copy.textContent = t('copy');
  }
  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  /* Menu mobile fecha ao clicar num link */
  document.querySelectorAll('#nav-panel a').forEach(function (a) {
    a.addEventListener('click', function () {
      var h = document.querySelector('.site-header');
      if (h && h.classList.contains('open')) document.querySelector('.menu-toggle').click();
    });
  });
})();
