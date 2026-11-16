# Moneris Hosted Checkout

Branded merchant checkout pages served by **Moneris Hosted Checkout**, plus the
shared hosted-checkout loader (`assets/moneris-checkout.js`).

Each merchant has a branded card-entry page under `checkout/` that embeds the
Moneris secure card-entry iframe and a **Pay Now** button.

## ⚠️ Checkout Release 2.4 — breaking change

Release 2.4 changed how the card-entry iframe mounts:

| | Before 2.4 (legacy) | 2.4+ (current) |
|---|---|---|
| Mount point | `<div id="moneris-card-form">` | `<div data-moneris-checkout data-ticket="…">` |
| Init call | `MonerisCheckout.render('moneris-card-form')` | `MonerisCheckout.mount({ selector: '[data-moneris-checkout]', ticket })` |
| Script include | unpinned `…/moneris-checkout.js` | pinned `…/v2.4.1/moneris-checkout.js` |

Pages still on the legacy contract load the script fine but **the card-entry
iframe never mounts** — the card number / expiry / CVV fields render blank and
the Pay Now button stays disabled. Guests cannot complete payment.

Migrate each branded page to the 2.4 mount contract. See the CHK-Confluence
runbook and RCA for the full root cause and rollout steps.

## Pages

| Merchant | File | Status |
|---|---|---|
| Indigo | `checkout/indigo.html` | migrated to 2.4 |
| Sobeys (Voilà) | `checkout/sobeys.html` | legacy — needs migration |
| Sport Chek | `checkout/sportchek.html` | legacy — needs migration |
| Canadian Tire | `checkout/canadiantire.html` | legacy — needs migration |
| Cineplex | `checkout/cineplex.html` | legacy — needs migration |
