<div align="center">

# Shell Shockers — Shellstrike

**Replaces blast smoke, yolk bursts and shell fragments in [Shell Shockers](https://shellshock.io) with your own Shellstrike logo. No settings, no setup—just install and throw a grenade. Only you see it.**

<br>

[![Install Shellstrike](https://img.shields.io/badge/Install_Shellstrike-one_click-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Shellstrike-Mod/main/Shell-Shockers-Shellstrike-Mod.user.js)

[![Version](https://img.shields.io/badge/version-1.0.1-0E7697?style=flat-square)](./Shell-Shockers-Shellstrike-Mod.user.js) [![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)](./LICENSE) [![installs](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fabacus.jasoncameron.dev%2Fget%2Fvirojet-shellstrike%2Finstalls&query=%24.value&label=installs&color=0E7697&style=flat-square&cacheSeconds=3600)](https://abacus.jasoncameron.dev/get/virojet-shellstrike/installs)

</div>

---

## Install

1. **Get Tampermonkey** for your browser: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) · [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) · [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/) · [Opera GX & others](https://www.tampermonkey.net/) (or use [Violentmonkey](https://violentmonkey.github.io/))
2. **[Click here to install Shellstrike](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Shellstrike-Mod/main/Shell-Shockers-Shellstrike-Mod.user.js)**, then press **Install** on the page that opens
3. **Reload [shellshock.io](https://shellshock.io)**

> [!TIP]
> **No Shellstrike in Settings?** Chrome, Edge, Brave and Opera need one extra switch: open your browser's **Extensions** page → **Tampermonkey** → **Details** → turn on **Allow User Scripts**. Then reload the game. [Step by step for each browser](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod#allow-user-scripts)

## Use it

Shellstrike has no settings. Once it's installed and the game has reloaded, throw a grenade or rocket. The blast smoke carries the Shellstrike logo. The logo also appears on yolk bursts and shell fragments.

If you have the [Mod Menu](https://github.com/Virojet/Shell-Shockers-Mod-Menu), Shellstrike is in its list with an on and off switch.

## What you see

- **The smoke is still the game's smoke.** The puffs keep their shape, size, opacity and fade, so a cloud hides and reveals exactly what it always did. Only the picture on the puffs changes, and it's checked pixel for pixel that the smoke's transparency is the game's own.
- **Your logo sits on each puff**, a little inside the puff's soft round edge, and moves, spins and fades with it. The smoke still shades it, so a transparent PNG shows only its drawing.
- **Only you see it.** Other players keep seeing the game's smoke. Nothing is sent to them or to the game's servers.
- **Which effects:** blast smoke, yolk bursts, and shell fragments. Bullet puffs, rocket trails, fire and special item-grenade shapes are left as they are.

## Limits

- The logo is local to your browser. Clearing site data or **Remove All Mod Data** in Better HUD removes it.
- It's a look for your own screen. It doesn't show anything the game doesn't, and it doesn't change how smoke blocks your view.
- Shellstrike hooks into how the game sets up its blast and burst textures. If a game update changes that, the logo simply stops showing and the game's own textures come back. Nothing else breaks.
- It works alone. If a future Better HUD has its own Shellstrike, this script stands down and lets that one run.

## Turning it off

Switch the script off in Tampermonkey and reload the game. Either way the game's own textures come straight back.

## Privacy

- **One anonymous install count, sent once.** The first time the script runs in your browser, it adds 1 to the public install counter shown above. No settings, names, IDs or cookies go with it, and it is never sent again. Nothing else is sent anywhere.
- **Your logo** is embedded in the script's assets and rendered locally in your browser.

## Changelog

#### v1.0.1 — current

- Fixed blast smoke, yolk bursts and shell fragments all showing the Shellstrike logo consistently.

#### v1.0.0

- First release: Shellstrike logo on blast smoke, yolk bursts and shell fragments, on your screen only.

## License

[MIT](./LICENSE)
