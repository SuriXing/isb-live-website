# ISB LIVE

Student-built ISB LIVE website. This repository hosts the blue-and-white static site, with selected 2026-27 sports, swimming, and APAC Orchestra events.

## Edit

Edit `index.html` to change the website or schedule. Broadcast coverage is pending confirmation.

## Video players

The Watch section opens the ISB LIVE channel (`UCTDWdwy_Aghv8LF2LHGuQKw`) inside the page when a viewer presses **Watch here**. Its initial cover is a channel landing screen, not an indication that a broadcast is currently live. The live iframe has no `src` until requested. YouTube may show an unavailable player when no public, embeddable broadcast is active. Viewers can use **Reload** to reload it in place. Once a specific broadcast is confirmed, replace the iframe's `data-src` with `https://www.youtube.com/embed/VIDEO_ID?playsinline=1&rel=0`. The Watch section's styles are in `watch.css`.

Replays include JPAC Basketball 2026 and all six Great Wall Shootout 2025 recordings. The recording selectors update the embedded players in place using `video-players.js`. To add a recording, add an option with the YouTube video ID as its value. The highlights use the original MP4 hosted by ISB. Sources: [ISB LIVE](https://www.youtube.com/@ISBLiveStream/streams) and [ISB's archive](https://www.isb.cn/great-wall-shootout).

In YouTube Studio, enable **Allow embedding** for each livestream and recording and make the broadcast public for channel discovery. Test a broadcast on the website before the event. YouTube can restrict playback by account, rights, or region; this static site cannot override those restrictions or independently verify live status. YouTube's own branding and optional outbound links remain inside its player. Replay cards use compact recording dropdowns; live and replay players use a **⋯** menu for help or source links. Normal playback and recording selection stay on this page.

`page-navigation.js` resets a page refresh to the hero and removes the old section fragment, while preserving query parameters. Navigation links and newly opened section URLs still work normally.

Keep descriptive iframe titles, `allowfullscreen`, and `referrerpolicy="strict-origin-when-cross-origin"` when updating players. Keep a source link in each player's options menu for unavailable or restricted videos. Nothing autoplays on page load; the live player requests playback after **Watch here** is pressed (the browser may still require pressing YouTube's play control). Replay embeds load lazily and the MP4 uses `preload="none"`.

Preview over HTTP (for example, `python3 -m http.server 8000`) rather than opening the file directly, so YouTube receives the referring origin. Check desktop and mobile layouts and playback on a connection that can reach the video hosts.

## Publish

Use GitHub Pages: Repository Settings > Pages > Build and deployment > Deploy from a branch > `main` > `/ (root)` > Save. The site will be available at `https://surixing.github.io/isb-live-website/` after Pages finishes deploying.
