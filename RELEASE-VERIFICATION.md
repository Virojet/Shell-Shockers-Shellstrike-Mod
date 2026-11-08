# Shellstrike 1.0.3 — release verification

Verified 2026-11-08. The userscript is **48,801 bytes**, with SHA-256 `6927676d6beaa14e55830d5700b8cd49d5957333edd7289a49973b6557db3c35`. Its TXT attachment is byte-identical. The version is 1.0.3 in the header and runtime API.

## Static and fixture checks

**16 passed, 0 failed**, plus `node --check` exit 0.

- The metadata companion equals the complete shipping header. The published userscript name, namespace, download/update channels, all 77 match patterns, document-start execution and grant-none behavior are retained.
- Readable formatting preserves the complete parsed program. The compact preset's existing visual/lifecycle functions are unchanged.
- Both embedded effect images decode at 128×128, and the header icon at 32×32. No artwork download was added.
- The existing eight-second install counter still omits credentials and referrer, marks only successful responses, retries on a later page load after network/HTTP failure, and contains blocked-storage/quota errors. Duplicate userscript execution now schedules only one counter attempt.
- Repeated start/stop creates and releases one visual housekeeping timer.

## Headless live-game checks

Chrome 156.0.8078.80, current Shell Shockers page (`home.js?1793733888`), standalone preset in a private room, software WebGL and simulated pointer lock. Install-counter requests were intercepted by the test harness, so these runs did not add public install hits.

**17 accepted live assertions passed across the initial run and a focused pixel-copy recheck.**

- The preset attached to the native 300-sprite smoke, 400-sprite shell and 100-sprite yolk pools without warnings or page errors.
- Smoke and all four shell shapes retained the original alpha pixel for pixel. Every untouched cell retained exact alpha and matched an ordinary neutral canvas copy. Some RGB values differ by one level from the source due to the browser's canvas alpha round trip; the neutral-copy control reproduced that difference. Bit-identical RGB against the original canvas is not claimed.
- Large default blast smoke selected the decorated cell; small puffs and other smoke retained the ordinary cell. Circular yolk had an opaque center and transparent exterior. Native filtering was retained, and textures were independent copies.
- Repeated Mod Menu enable/disable restored native textures and ordinary sprite properties, released copied textures, and reattached cleanly. A later foreign wrapper was preserved and its inner Shellstrike hook became inert on stop.
- Native Play worked with simulated pointer lock. A subsequent key-input stability check left the preset active; that check is not counted as proof of a visible grenade explosion.

## Limits and installation check

These results do not certify the user's installed Tampermonkey profile, real graphics card, Firefox, every mirror domain, or a normal multiplayer kill/visible explosion. No FPS increase is promised.

Use the repository's Install link to update the existing script in place if the manager does not immediately retry its formerly missing metadata URL, then reload the game. In a match, `ssShellstrike.status()` should report `active: true` and three managers. Throw a grenade using your configured key and check the fixed logo; Mod Menu off/on should restore and reapply the preset. The update metadata and download are read back after publication and compared with this tested artifact.
