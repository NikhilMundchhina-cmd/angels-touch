# Angels Touch — install it as an app

Offline music player · Developed by **Nikhil**

This folder is the complete app:

| File | What it does |
|---|---|
| `index.html` | The player itself |
| `manifest.webmanifest` | App name, icon and colors, so devices can install it |
| `sw.js` | Keeps the app on your device so it opens without internet |
| `icons/` | App icons for phones, tablets and computers |

Your music is never uploaded anywhere. The app reads songs straight from your device.

---

## Step 1 — Put the folder online (one time, free)

Phones and computers only install apps from a secure web address (`https://…`).
Once installed, the app works offline.

### Easiest: Netlify Drop
1. Open **https://app.netlify.com/drop** on a computer.
2. Drag this whole **angels-touch-app** folder onto the page.
3. You get a link ending in `.netlify.app`.
4. **Sign up for a free account and claim the site.** If you don't, it is deleted after a short time.

### Or: GitHub Pages
1. Create a free GitHub account and a new **public** repository (for example `angels-touch`).
2. Upload everything in this folder (keep the `icons` folder).
3. Go to **Settings → Pages**, choose **Deploy from a branch → main → / (root)** and save.
4. After a minute your app is at `https://YOUR-NAME.github.io/angels-touch/`.

---

## Step 2 — Install it

| Device | How |
|---|---|
| **Android (Chrome)** | Open your link → tap **Install app** in Angels Touch, or ⋮ menu → **Install app** / **Add to Home screen** |
| **iPhone / iPad (Safari)** | Open your link → **Share** → **Add to Home Screen** → **Add** (the app's **Install app** button shows these steps) |
| **Windows / Mac / Linux (Chrome or Edge)** | Open your link → click **Install app** in Angels Touch, or the install icon in the address bar |

Open it once while online. After that it works with no internet.

---

## What's different in the installed app

- Its own icon and its own window, with no browser bars.
- **Works offline** after the first visit.
- **Remembers your music folder** on Windows, Mac and Linux (Chrome / Edge). Next time it loads your songs automatically, or shows **Open "Music" again**.
- **Open with Angels Touch:** on computers you can right-click a song file → *Open with* → Angels Touch.
- A **Detected · Installed app** chip appears in the player.
- Lyrics, equalizer, sleep timer, favorites and settings are all kept on your device.
- **Online lyrics search works** in the installed app.

On Android and iPhone you still choose your songs each time you open the app. Phones don't let web apps keep folder access.

---

## Want a real Android APK / Google Play app?

1. Put the app online (Step 1).
2. Go to **https://www.pwabuilder.com**, paste your link and press **Start**.
3. Choose **Package for stores → Android → Generate**.
4. You get a zip with an **.apk** (install on your phone to test) and an **.aab** (for the Google Play Store).

For Google Play you also need a Google Play developer account. PWABuilder's instructions explain the remaining setup steps.

---

## Updating the app later

Replace the files online with the new ones (drag the folder onto Netlify again, or upload to GitHub).
Installed copies update themselves the next time they are opened while online. A message says when a new version is ready.
If you change `index.html`, also change `VERSION` at the top of `sw.js` (for example `angels-touch-v2`) so every device picks up the update.
