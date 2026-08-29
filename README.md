# START.

A t-shirt shop that boots like an operating system. This repo is the **design prototype**: a desktop you can click around, with **Windows 95** and **Windows XP** skins of the same store. Checkout and real inventory come later.

## What is in this prototype

- OS chooser on launch (95 vs XP)
- Desktop with icons, overlapping windows, taskbar, Start menu
- Welcome and Shop windows already open on desktop
- Five placeholder tees, local add-to-cart, checkout stub
- Display Properties to switch OS without leaving the desktop
- Restart / Shut Down
- Mobile: full-screen windows, row of icons, sheet-style Start menu

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## How it should feel

**Windows 95** is teal wallpaper, silver 3D bevels, navy title bars, a gray Start button. **Windows XP** is a Bliss-like hill wallpaper, Luna blue chrome, a green Start button. Same files, same shop, different chrome.

On a phone, stacked overlapping windows do not work, so apps open maximized and the taskbar is the switcher — closer to a handheld than a tiny desktop.

## Next (not in this build)

- Real product photos and size charts
- Payments (Stripe or similar)
- Shipping, taxes, confirmation mail
- Accounts, if we need them
