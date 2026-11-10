# Portfolio contact email

The contact endpoint submits mail through Resend. A successful send API response
means Resend accepted the message; `delivered` means the receiving mail server
accepted it, not that Gmail placed it in Inbox.

## Confirmed diagnosis

The reported portfolio message was marked delivered by Resend and addressed to
the intended portfolio inbox. The owner then confirmed finding it in Gmail Spam.
The sender is currently `Portfolio Contact <onboarding@resend.dev>`. There are no
verified sending domains on this Resend account. No extra diagnostic emails were
sent, and no credentials or message bodies were added to this repository.

## Free option for this owner's Gmail inbox

1. Open the existing message in Spam and choose **Not spam**.
2. In desktop Gmail, open **Show search options** beside the search box.
3. Set **From** to `onboarding@resend.dev` and **Subject** to
   `New portfolio message from`. Use both fields so this applies to the portfolio
   notification pattern, rather than all mail using the shared test sender.
4. Choose **Create filter**, enable **Never send it to Spam**, and create it.
5. If a future code change alters the subject or sender, update the filter.

This is a recipient-side rule for this inbox, not an application-wide guarantee
of deliverability. The filter has not been created by this coding session;
Gmail account access is not connected.

## Domain-based sending, if a domain is available later

Add a domain or sending subdomain that you control to Resend. Publish the exact
SPF and DKIM records provided by Resend, verify them, then configure DMARC for
that domain with a policy appropriate to its existing email setup. Do not
replace unrelated mail records or invent record values. Set Vercel's
`CONTACT_FROM_EMAIL` to a sender at the verified domain and redeploy. The
recipient remains `CONTACT_TO_EMAIL` (or `siteConfig.email` when unset); visitor
addresses belong in `replyTo`, not in `from`.

The shared testing sender can only send to the Resend account's own address.
A verified domain improves sender identity and inbox placement but cannot force
Gmail to accept every message into Inbox.

References:
- https://resend.com/docs/knowledge-base/403-error-resend-dev-domain
- https://resend.com/docs/dashboard/domains/introduction
- https://resend.com/guides/email/deliverability/avoid-gmail-spam-folder
- https://support.google.com/mail/answer/16457426?hl=en
