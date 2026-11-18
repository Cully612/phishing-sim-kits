# Threat brief: Fake meeting reminder with malicious reschedule link

*Written from general attack-pattern knowledge and public reporting. General description only.*

## What it is
Attackers send emails impersonating a workplace chat and meetings platform (such as a Teams or Slack equivalent) with a routine meeting reminder. The email references a plausible colleague's name — common enough that the recipient may not recognize them but would not find the contact unusual — and frames it as a reminder for a meeting already on the calendar, implying the recipient previously agreed to it.

The email contains a "Review Meeting Details" button that links to a convincing fake meeting details page. The page shows a date, time, and meeting title ("2027 Project Discussion") and offers a reschedule link. That reschedule link is the real trap — it leads to a credential-harvesting or malware-delivery page under the same lookalike domain.

The two-step design is deliberate: the first click feels completely safe, which lowers the recipient's guard before the actual malicious link appears.

## Common lures
- "Your meeting with [name] is in two days — click to review the details."
- A meeting details page showing date, time, agenda title, and a reschedule option.
- A reschedule link using the same lookalike domain as the sender, making it appear to belong to the same system.

## What to teach

### Slow down and question
Meeting reminders feel routine, and routine is where the danger lives. Before clicking anything in a meeting-related email, pause and ask: do I actually have this meeting on my calendar? If you can answer that question from your calendar app in ten seconds, you don't need to click anything in the email at all.

### Sender domain
The email appears to come from the platform's notifications system, but the domain has an extra word — `teamhub-notify.example` instead of `teamhub.example`. A real notifications address would use the platform's own domain. Any extra word, hyphen, or subdomain after the company name is a reason to look more carefully.

### Link mismatch — the button and the reschedule link
Both the "Review Meeting Details" button and the reschedule link on the landing page go to the same lookalike domain. Hovering over either one (or pressing and holding on a phone) reveals the address before you commit to the click. Real platform links go to the platform's own domain — not a variation of it.

### Go to your calendar directly
The safest response to any meeting reminder email is to close it and open your calendar app. If the meeting is real, it is already there. If it isn't, the email is not legitimate. This habit removes the need to evaluate the email at all.
