// Run in the head, before the browser can jump to the old section anchor.
(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (navigation?.type !== 'reload') return;

  history.scrollRestoration = 'manual';
  history.replaceState(history.state, '', location.pathname + location.search);

  window.addEventListener('pageshow', event => {
    if (event.persisted) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Wait until the browser's initial history restoration has finished.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      history.scrollRestoration = 'auto';
    });
  });
})();
