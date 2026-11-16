# ADEEL-MD Baileys

My own build of Baileys 7.0.0-rc14, made for ADEEL-MD. Stock RC14 with
a few fixes on top.

## What's different

- View-once media actually arrives now (Android identity on registered
  sessions, Windows on fresh ones so pairing still works)
- Pairing fixed for Android (device/OS + companion type)
- Mex queries don't crash on protobuf responses anymore
- Version check reads from this repo

## Install

```json
"@whiskeysockets/baileys": "git+https://github.com/ADEEL967MD/Adeel-xtech-v14.git"
```

Use the full `git+https://` URL. The `github:` shorthand breaks on Heroku
(no SSH key).
