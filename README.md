# ADEEL-MD Baileys v3.2

Official Baileys 7.0.0-rc14 with the view-once system, Android pairing
fixes, dynamic identity switching and a Mex protobuf fallback — built by
Adeel for ADEEL-MD. Everything else is byte-identical to stock RC14.

## What changed vs stock RC14 (10 files, 391/401 byte-identical)

### View-once system
1. **lib/Utils/browser-utils.js**: `androidPhone` browser variant —
   `['Chrome', 'Android', '15']`.
2. **lib/Defaults/index.js**: default browser macOS → androidPhone.
3. **lib/Socket/messages-recv.js**: `view_once_unavailable_fanout`
   split out of the bot/hosted branch — logs it, appends
   `'view_once_unavailable'` to messageStubParameters, ACKs, falls through
   to upsert.

### Dynamic identity switching (v3)
4. **lib/Socket/index.js**: in makeWASocket, if the session is already
   registered (`config.auth.creds.registered`) the browser becomes
   `['Chrome', 'Android', '15']` so view-once media arrives. Fresh
   (unregistered) sessions keep the bot's own browser so pairing works.
   Zero bot changes needed.

### Pairing fixes (required for Android identity)
5. **lib/Utils/validate-connection.js**: when the browser is Android, the
   UserAgent reports Android device/OS values instead of RC14's hardcoded
   Desktop/0.1. Non-Android browsers keep RC14's exact values.
6. **lib/Utils/companion-reg-client-utils.js**: `getCompanionWebClientType`
   resolves the real browser name for Android instead of falling back to
   OTHER_WEB_CLIENT (9).

### Mex protobuf fallback (v3.1)
7. **lib/Socket/mex.js**: `executeWMexQuery` now handles non-JSON
   (protobuf) Mex responses — Android clients get protobuf, not JSON.
   On JSON.parse failure it extracts the newsletter JID and returns
   `{ id: '<jid>@newsletter' }`. JSON handling is unchanged.

### Packaging
8. **package.json**: version `7.0.0-rc14-adeel.3.2`, name kept
   `@whiskeysockets/baileys`, homepage/repository → Adeel-xtech-v14.

### Name cleanup (v3.2)
9. **LICENSE**: copyright → Adeel.
10. **lib/Utils/generics.js**: version fetch now reads from this repo
    (`lib/Defaults/index.js`, line 5) instead of the upstream repo.
    Comment-only cleanups in `lib/Socket/messages-send.js` and
    `lib/Utils/use-multi-file-auth-state.js` (no functional change).

## What is NOT in this build
- NO force-Android (socket.js byte-identical to stock)
- NO media cache, NO quote enrichment
- NO performance tuning (timeouts, cache TTLs, sync settings)
- NO encrypted message-edit decryption, NO in-memory store
- NO auto-follow / auto-react
- WA version stays RC14's [2, 3000, 1043857760]

## Install
```json
"@whiskeysockets/baileys": "git+https://github.com/ADEEL967MD/Adeel-xtech-v14.git"
```
Use the explicit `git+https://` URL — the `github:` shorthand resolves to
SSH and Heroku has no SSH key.

## Bot side
No bot changes needed. The bot keeps passing `Browsers.windows('Chrome')`
— the library switches to Android automatically once the session is
registered. Pairing works on Windows identity; view-once works on Android
identity.
