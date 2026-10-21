// Changing a recording updates its iframe; it never navigates the page.
document.querySelectorAll('select[data-player]').forEach(select => {
  select.addEventListener('change', () => {
    const videoId = select.value;
    if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;
    const player = document.getElementById(select.dataset.player);
    player.src = `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0`;
    player.title = `${select.dataset.series} — ${select.selectedOptions[0].textContent}`;
    document.getElementById(`${select.dataset.player}-source`).href =
      `https://www.youtube.com/watch?v=${videoId}`;
  });
});

// Keep the compact options menus dismissible with a pointer or keyboard.
document.addEventListener('click', event => {
  document.querySelectorAll('.replay-options[open]').forEach(menu => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.replay-options[open]').forEach(menu => {
    if (menu.contains(document.activeElement)) menu.querySelector('summary').focus();
    menu.open = false;
  });
});

// Load the real channel player only when the viewer chooses to watch.
const livePlayer = document.getElementById('live-player');
document.getElementById('start-live').addEventListener('click', () => {
  livePlayer.src = livePlayer.dataset.src + '&autoplay=1';
  livePlayer.hidden = false;
  document.getElementById('live-cover').hidden = true;
  document.getElementById('refresh-live').hidden = false;
  livePlayer.parentElement.classList.add('is-playing');
  livePlayer.focus();
  document.getElementById('live-feedback').textContent =
    'If the broadcast is unavailable, try Reload when it begins.';
});

// Reload only on request so an ongoing broadcast is never interrupted by polling.
document.getElementById('refresh-live').addEventListener('click', () => {
  livePlayer.src = livePlayer.dataset.src;
  document.getElementById('live-feedback').textContent =
    'Player reloaded. Press play when the broadcast is available.';
});
