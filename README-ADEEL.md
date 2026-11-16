# ADEEL-MD Baileys v2 — stock RC14 + Qadeer view-once system

Pure official Baileys 7.0.0-rc14 with ONLY the view-once system from
QadeerXTechxbaileys added, plus the two pairing fixes Android identity
needs. Everything else is byte-identical to stock RC14 — same function,
same speed, same behaviour.

## What changed vs stock RC14 (6 files, 395/401 byte-identical)

### View-once system (from Qadeer)
1. **lib/Utils/browser-utils.js** (+1 line): `androidPhone` browser variant
   — `['Chrome', 'Android', '15']`.
2. **lib/Defaults/index.js** (1 line): default browser macOS → androidPhone.
3. **lib/Socket/messages-recv.js** (+9/-3): `view_once_unavailable_fanout`
   split out of the bot/hosted branch — logs it, appends
   `'view_once_unavailable'` to messageStubParameters, ACKs, falls through
   to upsert. Bot/hosted behaviour unchanged.

### Pairing fixes (required for Android identity to work)
4. **lib/Utils/validate-connection.js**: when the browser is Android, the
   UserAgent now reports Android device/OS values (osVersion/device/
   osBuildNumber from the browser array) instead of RC14's hardcoded
   Desktop/0.1. Non-Android browsers keep RC14's exact values
   (WEB platform, Desktop, 0.1). Without this, WhatsApp closes the pairing
   socket because platform (ANDROID) and device (Desktop) disagree.
5. **lib/Utils/companion-reg-client-utils.js**: `getCompanionWebClientType`
   now resolves the real browser name for Android (browser[0], e.g.
   'Chrome') instead of looking up 'Android' in the table and falling back
   to OTHER_WEB_CLIENT (9). Non-Android browsers resolve exactly as in
   RC14. Without this, WhatsApp rejects pairing codes for Android.

### Packaging
6. **package.json**: version `7.0.0-rc14-adeel.2`, name kept
   `@whiskeysockets/baileys`, homepage/repository → Adeel-xtech-v14,
   build scripts removed (ships compiled `lib/` only).

## What is NOT in this build
- NO force-Android (socket.js byte-identical to stock)
- NO media cache, NO quote enrichment
- NO Redx/Qadeer performance tuning (timeouts, cache TTLs, sync settings)
- NO encrypted message-edit decryption, NO in-memory store
- NO auto-follow / auto-react (never present — this is built from stock RC14)
- WA version stays RC14's [2, 3000, 1043857760]

## Why pairing failed before (root cause, proven)
1. Android platform + Desktop device → WhatsApp closes the pairing socket.
2. OTHER_WEB_CLIENT (9) companion ID for Android → WhatsApp rejects
   pairing codes.
Both are fixed here. Pairing works on official RC14 with Windows identity
because Windows is fully consistent in RC14 (WEB platform + Desktop device
+ CHROME companion type). The bug only appears with Android identity.

## Install
```json
"@whiskeysockets/baileys": "git+https://github.com/ADEEL967MD/Adeel-xtech-v14.git"
```
Use the explicit `git+https://` URL — the `github:` shorthand resolves to
SSH and Heroku has no SSH key.

## Bot side (index.js)
The bot MUST pass `browser: Browsers.androidPhone('Chrome')` in both
makeWASocket calls (lines 998 + 1538 in the repo index) — otherwise the
library default is overridden and WhatsApp keeps sending view-once stubs.
No plugin changes are needed for .vv once real view-once media arrives.
