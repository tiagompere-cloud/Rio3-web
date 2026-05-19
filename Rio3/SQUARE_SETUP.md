# Square Appointments — Booking Integration

This site can write bookings directly to your Square Appointments calendar.
There are two pieces:

- **Frontend** (`src/booking.jsx`) — the 4-step booking modal you see on the site
- **Backend** (`api/*.js`) — two serverless functions that hold your Square
  access token and talk to Square's API. The token is **never** exposed in
  the browser.

The site ships in **demo mode** out of the box (static slots, no calendar
sync). Flip to live mode after the steps below.

---

## 1. Prerequisites

- A **Square Appointments** subscription on your Square account
- At least one **Location** with Appointments enabled
- One or more **Services** configured in Square Dashboard → Appointments → Services
- A **deployment host** for the serverless functions. This repo is configured
  for [Vercel](https://vercel.com) (free tier is fine), but any host that
  supports Node.js serverless functions works (Netlify, Cloudflare Workers
  with light edits, AWS Lambda, etc.)

---

## 2. Get your Square credentials

In the [Square Developer Dashboard](https://developer.squareup.com/apps):

1. Create an Application (or open your existing one)
2. Under **Production** → **Credentials**, copy:
   - **Access token** → `SQUARE_ACCESS_TOKEN`
   - **Location ID** (from Locations tab) → `SQUARE_LOCATION_ID`

> **Test first.** Square also gives you a **Sandbox** tab with separate
> credentials. Use those with `SQUARE_ENV=sandbox` while you wire things up.
> Sandbox bookings don't touch your real calendar.

---

## 3. Map your services to the booking modal

Each "reason for visit" button in the booking modal needs a Square
**service variation ID**.

Find the IDs:

1. Square Dashboard → Appointments → Services → click a service
2. Each service has one or more **variations** (e.g. "60 min", "90 min")
3. The variation ID is visible via the
   [Catalog API](https://developer.squareup.com/explorer/square/catalog-api/list-catalog?type=ITEM)
   — easiest path: open `https://developer.squareup.com/explorer/square/catalog-api/list-catalog?type=ITEM`,
   paste your access token, run, and look for `"type": "ITEM_VARIATION"`. The
   variation `id` is what you want (looks like `XXXXXXXXXXXXXXXXXXXXXXXX`).

Open `src/booking.jsx` and fill in the IDs:

```js
const BOOKING_REASONS = [
  {
    id: "consult",
    title: "Initial consultation",
    squareServiceVariationId: "YOUR_VARIATION_ID_HERE",  // ← here
    ...
  },
  ...
];
```

Any reason left with an empty ID will show "call us to schedule" in live
mode instead of the calendar.

---

## 4. Deploy the backend (Vercel)

```bash
npm install -g vercel        # one-time, if you don't have it
vercel login
vercel link                  # link this folder to a Vercel project
vercel env add SQUARE_ACCESS_TOKEN
vercel env add SQUARE_LOCATION_ID
vercel env add SQUARE_ENV            # "production" or "sandbox"
vercel deploy --prod
```

Vercel will auto-detect the `api/` folder and deploy each `.js` file as a
serverless function:

- `POST https://your-domain.vercel.app/api/availability`
- `POST https://your-domain.vercel.app/api/bookings`

The static site (everything else) is served from the same domain.

---

## 5. Flip the site to live mode

Open `index.html` and change:

```html
<script>
  window.RIO3_BOOKING_CONFIG = {
    mode: "live",            // ← was "demo"
    apiBase: "",             // same-origin if hosted on Vercel; otherwise put your API URL here
  };
</script>
```

If your static site is hosted **separately** from the API (e.g. site on
Squarespace, API on Vercel), set `apiBase: "https://your-api.vercel.app"`.

You'll also want to set `CORS_ORIGIN=https://yourdomain.com` in Vercel env
vars to lock the API down.

---

## 6. End-to-end test

1. Open the site, click **Book a visit**
2. Pick a reason that has a Square service variation ID configured
3. Step 2 should show real open slots from your Square calendar (loading spinner first)
4. Pick a slot, fill in your details, confirm
5. Check Square Dashboard → Appointments — the booking should be there
6. The booked patient receives Square's normal confirmation email/SMS
   (configurable in Square Dashboard → Appointments → Settings → Communications)

---

## How it works

```
Browser                Serverless (Vercel)        Square API
───────                ───────────────────        ──────────
booking.jsx
  │
  ├── POST /api/availability ───► api/availability.js
  │                                │
  │                                └─► POST /v2/bookings/availability/search
  │                                       (with Bearer token)
  │   ◄────── slots[] ────────────┘
  │
  ├── (user picks slot, fills form)
  │
  └── POST /api/bookings ────────► api/bookings.js
                                    │
                                    ├─► POST /v2/customers/search    (find by email)
                                    ├─► POST /v2/customers           (create if new)
                                    └─► POST /v2/bookings            (create the booking)
      ◄────── booking confirmed ───┘
```

The Square access token only exists inside the serverless function's
environment — the browser never sees it.

---

## Things to know

- **Square auto-confirmation:** by default Square auto-accepts bookings made
  via the API. If you require manual approval, change the appointment
  settings in Square Dashboard.
- **Buffer time & lead time:** Square respects whatever you've configured per
  service (advance notice, buffer between bookings, cancellation window).
  The `/api/availability` endpoint already only returns slots that satisfy
  those rules.
- **Team members:** if a service is assigned to multiple staff, Square will
  return availability across all of them and pick the right one for the
  booking. To restrict to one provider, add a `team_member_id_filter` in
  `api/availability.js` and pin `team_member_id` on the booking.
- **Cancellations & changes:** patients receive a Square email with a link
  to manage their booking. To build an in-site cancellation UI, add a third
  serverless function calling `POST /v2/bookings/{id}/cancel`.
- **HIPAA:** Square's standard Appointments product is **not** HIPAA
  compliant. If your booking form collects PHI beyond name/contact (e.g.
  conditions in the "note" field), you need Square Healthcare's BAA, or
  strip PHI from the note before posting it.

---

## Reverting to demo mode

If anything breaks, set `mode: "demo"` in `index.html`. The site falls back
to a static slot picker — no API calls, no calendar writes.
