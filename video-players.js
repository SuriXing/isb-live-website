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

// Live broadcasts must be explicitly confirmed by the ISB LIVE team.
// Add entries to window.ISB_LIVE_NOW as {title:"Event name", url:"https://www.youtube.com/watch?v=VIDEO_ID"}.
// Without verified status, the cover shows NEXT UP instead of claiming a broadcast is live.
const livePlayer = document.getElementById('live-player');
const liveStatus = document.getElementById('live-cover-status');
const liveNow = Array.isArray(window.ISB_LIVE_NOW) ? window.ISB_LIVE_NOW : [];
if (liveStatus && liveNow.length) {
  liveStatus.replaceChildren();
  const heading = document.createElement('strong');
  heading.className = 'live-now-heading';
  heading.textContent = 'NOW ON LIVE';
  liveStatus.append(heading);
  const notice=document.createElement('div');notice.className='live-demo-note';notice.textContent='3 past recordings · not broadcasting live';liveStatus.append(notice);
  const list = document.createElement('ul');
  list.className = 'live-now-list';
  liveNow.forEach(item => {
    if (!item || typeof item.title !== 'string' || typeof item.url !== 'string') return;
    const match = item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([A-Za-z0-9_-]{11})/);
    if (!match) return;
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.title + ' ↗';
    button.addEventListener('click', () => {
      livePlayer.src = 'https://www.youtube.com/embed/' + match[1] + '?autoplay=1&playsinline=1&rel=0';
      livePlayer.hidden = false;
      document.getElementById('live-cover').hidden = true;
      document.getElementById('refresh-live').hidden = false;
      livePlayer.parentElement.classList.add('is-playing');
      // User click opens the chosen stream in fullscreen. If fullscreen is blocked,
      // the embedded player remains visible in the page.
      const stage = livePlayer.closest('.live-stage');
      if (stage && stage.requestFullscreen) {
        const request = stage.requestFullscreen();
        if (request && request.catch) request.catch(() => {});
      }
    });
    li.append(button);
    list.append(li);
  });
  liveStatus.append(list);
  if (!list.children.length) liveStatus.innerHTML = '<a class="next-up-link" href="#schedule">NEXT UP →</a>';
}

// Reload only on request so an ongoing broadcast is never interrupted by polling.
document.getElementById('refresh-live').addEventListener('click', () => {
  livePlayer.src = livePlayer.dataset.src;
  document.getElementById('live-feedback').textContent =
    'Player reloaded. Press play when the broadcast is available.';
});
