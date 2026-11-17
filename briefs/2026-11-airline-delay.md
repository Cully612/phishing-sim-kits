# Threat brief: Fake airline delay notification with vishing phone number

*Written from general attack-pattern knowledge and public reporting. General description only.*

## What it is
Attackers send emails impersonating airlines during periods of high travel disruption — holiday seasons, major storms, or widely-reported IT outages. The email tells the recipient their flight has been delayed and offers two ways to act: click a link to check their flight status, or call a support number to rebook.

Both options are traps. The link goes to a lookalike domain designed to steal credentials or payment details. The phone number connects to a scammer posing as airline support, who uses the call to extract money or personal information.

The lure works because the timing feels real. When a major airline outage is in the news, employees and travelers are already primed to expect disruption emails — which lowers their scrutiny.

## Common lures
- "Your flight has been delayed due to recent system outages. Click below to view your updated itinerary."
- A "Check Flight Status" button linking to a subtle lookalike domain (e.g., `skybridgeairlines-status.example` instead of `skybridgeairlines.example`).
- A customer support phone number that routes to a scammer instead of the airline.

## What to teach

### Sender domain
Real airline notification emails come from the airline's own domain. A support subdomain or extra word in the address (e.g., `-notifications`, `-support`, `-status`) is a signal to pause. Hover over or tap the sender address and compare it carefully to what you'd see on the airline's official website.

### Link mismatch
Before clicking any button in an email, hover over it (or press and hold on a phone) to see the real destination. A subtle lookalike — one added word, a hyphen, a transposed letter — is easy to miss at a glance. If the URL isn't exactly the airline's known domain, go directly to the site instead.

### Fake support phone number
Never call a phone number listed in an email. Look it up yourself on the airline's official website or the back of your credit card if the booking was made by card. Scammers who answer these numbers are trained to sound helpful and urgent — they will pressure callers with fake rebooking fees, ask for payment via gift card or wire transfer, or request account credentials to "verify your identity." Real airline agents will never ask for payment this way.

### Timing awareness
Attackers watch the news. A widely-covered outage, a major holiday travel week, or a severe weather event is a signal that phishing volume will spike. When disruption is already in the headlines, treat any unexpected email about your travel plans with extra skepticism — even if it looks exactly like what you'd expect to receive.
