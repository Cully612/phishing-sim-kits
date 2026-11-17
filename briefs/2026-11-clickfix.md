# Threat brief: ClickFix (fake "verify" and "fix error" prompts)

*Written from public reporting by security vendors. General description only.*

## What it is
ClickFix is a social engineering trick. A lure (email, ad or hacked website) leads to a page showing a fake CAPTCHA, browser error or "document couldn't load" message. To "fix" it, the page tells the person to:

1. press Windows + R (opens the Run box),
2. press Ctrl + V (pastes),
3. press Enter.

Behind the scenes, the page has already copied a malicious command to the clipboard. Those three key presses run it, and the person installs malware themselves. Security tools often miss it because the user ran the command.

Variants use the Mac Terminal, or ask people to paste into PowerShell or the browser's address bar.

## Common lures
- Shared documents that "can't be displayed" until you verify.
- Fake CAPTCHA / "verify you are human" pages.
- Fake browser or video-call error messages ("fix microphone", "update required").

## What to teach
- Real websites never ask you to paste and run anything.
- A CAPTCHA only asks you to click a box or choose pictures.
- If it happens, stop, don't press Enter, and report it.
