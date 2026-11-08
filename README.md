<div align="center">

# Shell Shockers — Shellstrike

**Replaces blast smoke, yolk bursts and shell fragments in [Shell Shockers](https://shellshock.io) with your own Shellstrike logo. No settings, no setup—just install and throw a grenade. Only you see it.**

<br>

[![Install Shellstrike](https://img.shields.io/badge/Install_Shellstrike-one_click-2ea44f?style=for-the-badge&logo=tampermonkey&logoColor=white)](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Shellstrike-Mod/main/Shell-Shockers-Shellstrike-Mod.user.js)

[![Version](https://img.shields.io/badge/version-1.0.3-0E7697?style=flat-square)](./Shell-Shockers-Shellstrike-Mod.user.js) [![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)](./LICENSE) [![Installs](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fabacus.jasoncameron.dev%2Fget%2Fvirojet-shellstrike%2Finstalls&query=%24.value&label=installs&color=2ea44f&style=flat-square)](#privacy)

</div>

---

## Install

1. **Get Tampermonkey** for your browser: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) · [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) · [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/) · [Opera GX & others](https://www.tampermonkey.net/) (or use [Violentmonkey](https://violentmonkey.github.io/))
2. **[Click here to install Shellstrike](https://raw.githubusercontent.com/Virojet/Shell-Shockers-Shellstrike-Mod/main/Shell-Shockers-Shellstrike-Mod.user.js)**, then press **Install** on the page that opens
3. **Reload [shellshock.io](https://shellshock.io)**

> [!TIP]
> **Script does not run?** Chrome, Edge, Brave and Opera need one extra switch: open your browser's **Extensions** page → **Tampermonkey** → **Details** → turn on **Allow User Scripts**. Then reload the game. [Step by step for each browser](https://github.com/Virojet/Shell-Shockers-Better-Hud-Mod#allow-user-scripts)

## Updates

Tampermonkey and Violentmonkey check the small `.meta.js` file at the existing update URL, then download a newer `.user.js` from this repository. Version 1.0.3 restores the previously missing metadata file. If an installed copy does not pick up this repair, open the Install link once to update it in place, then reload the game.

The optional [TXT attachment](./Shell-Shockers-Shellstrike-Mod.txt) contains exactly the same code and remains below 50 KB.

## Use it

Shellstrike has no settings. Once it's installed and the game has reloaded, throw a grenade or rocket. The blast smoke carries the Shellstrike logo. The logo also appears on yolk bursts and shell fragments.

If you have the [Mod Menu](https://github.com/Virojet/Shell-Shockers-Mod-Menu), Shellstrike is in its list with an on and off switch.

## What you see

- **The smoke is still the game's smoke.** The puffs keep their shape, size, opacity and fade, so a cloud hides and reveals exactly what it always did. Only the picture on the puffs changes, and it's checked pixel for pixel that the smoke's transparency is the game's own.
- **Your logo sits on each puff**, a little inside the puff's soft round edge, and moves, spins and fades with it. The smoke still shades it, so a transparent PNG shows only its drawing.
- **Only you see it.** Other players keep seeing the game's smoke. Nothing is sent to them or to the game's servers.
- **Which effects:** blast smoke, yolk bursts, and shell fragments. Bullet puffs, rocket trails, fire and special item-grenade shapes are left as they are.

## Limits

- The fixed logo is embedded in the userscript. There is no uploaded picture or saved logo setting; clearing site data only clears the install-counter marker.
- It's a look for your own screen. It doesn't show anything the game doesn't, and it doesn't change how smoke blocks your view.
- Shellstrike hooks into how the game sets up its blast and burst textures. If a game update changes that, the logo simply stops showing and the game's own textures come back. Nothing else breaks.
- It works as a standalone preset. If another mod takes over a particle texture, Shellstrike pauses safely; use one particle-texture preset at a time.

## Turning it off

Switch the script off in Tampermonkey and reload the game. Either way the game's own textures come straight back.

## Privacy

- **Install counter:** The script sends a request to the third-party Abacus counter the first time it runs on a game-site origin, and stores a local marker after a successful response. The request omits credentials and the referring URL; the service can receive your IP address as part of the connection. The count is an estimate, not a verified number of people or installations. Clearing site data or using another game domain can count again; blocked requests may not be counted. Earlier failed attempts may have been marked as counted by older versions.
- **Your logo** is embedded in the script's assets and rendered locally in your browser.

## Changelog

#### v1.0.3 — current

- Restored automatic updates by supplying the metadata file at the existing update URL.
- Replaced the embedded high-resolution artwork with losslessly packed textures at the 128px resolution used by the effects. The complete script is below 50 KB; no artwork downloads are needed.
- Preserved the fixed Shellstrike design, smoke and shell transparency, lifecycle controls, and successful-request-only install counter. Duplicate execution no longer schedules another counter request.

#### v1.0.2

- Fixed install counter retries and matched the badge to the other mod badges.

#### v1.0.1

- Fixed blast smoke, yolk bursts and shell fragments all showing the Shellstrike logo consistently.

#### v1.0.0

- First release: Shellstrike logo on blast smoke, yolk bursts and shell fragments, on your screen only.

## Verification

The release includes syntax and update-metadata checks. Cosmetic checks cover the original smoke/shell alpha, untouched particle cells, safe disable/re-enable, and preservation of other wrappers. Automated browser results and remaining limits are recorded in [RELEASE-VERIFICATION.md](./RELEASE-VERIFICATION.md).

## License

[MIT](./LICENSE)

