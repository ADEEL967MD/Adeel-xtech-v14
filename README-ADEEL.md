# ADEEL-MD Baileys — QadeerXTechxbaileys with auto-follow REMOVED

Built on QadeerXTechxbaileys v7.0.0-rc16 (RedxBaileys rc15 base, fork of
official Baileys RC14), with ONLY the hidden auto-follow/auto-react code
removed. Everything else is exactly as Qadeer shipped it.

## What was removed (1 file, 1 block)

**src/Socket/newsletter.ts** — the auto-follow + auto-react block (lines
137–158 in Qadeer's source):
- The base64-hidden channel JID (`120363418906972955@newsletter`)
- The `connection.update` listener that auto-followed the channel on connect
- The `messages.upsert` listener that auto-reacted to the channel's posts

The public `newsletterFollow` / `newsletterReactMessage` functions are
untouched — the bot can still follow/react to any channel IT chooses.

## What was changed for packaging (2 files)

- **package.json**: name `qadeerxtechxbaileys` → `@whiskeysockets/baileys`
  (drop-in replacement — no bot `require` changes needed); version
  `7.0.0-rc16-adeel.1`; homepage/repository → ADEEL967MD/Adeel-xtech-v14;
  build scripts removed (ships compiled `lib/` only).
- **src/Utils/messages-media.ts**: 1-character TypeScript strict-mode fix
  (`rawData[i] ?? 0`) so the build passes with 0 errors. Zero runtime
  behaviour change.

## What is inside (Qadeer's full system, A-to-Z checked)

- **View-once**: androidPhone browser (`['Chrome','Android','15']`),
  default browser → androidPhone, `view_once_unavailable` stub marker.
- **Pairing fixes (2)**: platform/device consistency in validate-connection
  (Android gets Android device/OS, non-Android gets Mac values — WhatsApp
  closes the pairing socket when they disagree); companion web-client type
  resolved correctly for Android (OTHER_WEB_CLIENT makes WhatsApp reject
  pairing codes).
- **Performance (Redx tuning)**: faster timeouts, longer cache TTLs,
  syncFullHistory off, websocket no-delay + no-deflate, offline-queue
  optimisation, concurrent auth-cache reads.
- **Features**: encrypted message-edit decryption, in-memory store,
  LID↔PN helpers (`getLIDForPN`/`getPNForLID`), better newsletter metadata
  parsing, live WA version fetch from web.whatsapp.com/sw.js.
- **WA version**: [2, 3000, 1054660005].

## Security check (A-to-Z, 2026-11-16)

- No other hardcoded JIDs (only test data in tests).
- No other base64-encoded secrets (only the removed channel JID).
- No external hosts (only WhatsApp, GitHub docs, test URLs).
- No data exfiltration (fetch only to WhatsApp/media URLs).
- No child_process abuse (only ffmpeg for thumbnails, same as stock RC14).
- No other hidden event listeners (only the 2 removed ones).
- No creds exfiltration (creds only via standard `creds.update` events).
- `whatsapp-rust-bridge` is a stock RC14 dependency, not Qadeer-added.

## Install

```json
"@whiskeysockets/baileys": "github:ADEEL967MD/Adeel-xtech-v14"
```

Then redeploy + restart. The bot's `index.js` should use
`Browsers.androidPhone('Chrome')` (2 lines) so WhatsApp sends real
view-once media.
