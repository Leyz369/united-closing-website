# Analytics Event Tracking Documentation

This project uses **Plausible Analytics** for privacy-friendly, GDPR-compliant conversion funnel tracking.

## Overview

Analytics tracking has been implemented to monitor user behavior throughout the conversion funnel without compromising privacy. All events are tracked client-side using Plausible's lightweight script.

---

## Tracked Events

### 1. **click_primary_cta**
Fired whenever a user clicks any primary CTA (Call-to-Action) button.

**Properties:**
- `location`: Where the button was clicked (e.g., "hero", "header", "mobile_sticky_cta")
- `label`: The text content of the button

**Locations:**
- `hero` - Main hero section CTA
- `header` - Header navigation CTA
- `about_section` - CTA in the about/team section
- `earning_section` - CTA in the earnings/pricing section
- `process_section` - CTA in the process explanation section
- `final_cta_section` - Final CTA before footer
- `modal_form` - Submit button in the contact form modal
- `mobile_sticky_cta` - Sticky bottom bar CTA (mobile only)

**Fires in:**
- `src/components/ui/get-started-button.tsx` (handleClick function)

---

### 2. **form_submit_success**
Fired when the contact form is successfully submitted.

**Properties:**
- `form_type`: Type of form submitted (e.g., "erstgespraech_anfrage")

**Fires in:**
- `src/App.tsx` (submit function, line ~557)
- Triggered after successful API response from Supabase edge function

---

### 3. **outbound_whatsapp_click**
Prepared for WhatsApp link clicks (currently not implemented as no WhatsApp links exist).

**Properties:**
- `location`: Where the WhatsApp link was clicked

**Fires in:**
- Ready to implement when WhatsApp links are added

---

## Configuration

### Step 1: Set up Plausible Account

1. Create a free account at [plausible.io](https://plausible.io)
2. Add your website domain (e.g., `united-closing.com`)
3. Copy your domain name

### Step 2: Update Environment Variables

Edit `.env` file and add your domain:

```bash
# Replace 'your-domain.com' with your actual domain
VITE_PLAUSIBLE_DOMAIN=united-closing.com
```

### Step 3: Update HTML Script Tag

Open `index.html` and replace `DOMAIN_PLACEHOLDER` with your actual domain:

```html
<!-- Before -->
<script defer data-domain="DOMAIN_PLACEHOLDER" src="https://plausible.io/js/script.js"></script>

<!-- After -->
<script defer data-domain="united-closing.com" src="https://plausible.io/js/script.js"></script>
```

### Step 4: Deploy and Verify

Deploy your application and visit your Plausible dashboard to see events flowing in.

---

## Development Mode

In development mode (`npm run dev`), analytics events are logged to the browser console instead of being sent to Plausible. This helps with debugging without polluting your analytics data.

**Console output format:**
```
[Analytics Event] click_primary_cta { location: "hero", label: "Jetzt kostenloses Erstgespräch sichern" }
[Analytics Event] form_submit_success { form_type: "erstgespraech_anfrage" }
```

---

## Verification in Browser Dev Tools

### Method 1: Console Logs (Development)

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Interact with CTAs and submit forms
4. Look for `[Analytics Event]` log messages

### Method 2: Network Tab

1. Open Developer Tools (F12)
2. Go to the **Network** tab
3. Filter by "plausible" or "api/event"
4. Click a CTA button or submit the form
5. Look for POST requests to `https://plausible.io/api/event`
6. Click the request to inspect:
   - **Request Payload:** Contains event name and properties
   - **Response:** Should return `200 OK`

### Method 3: Plausible Dashboard

1. Log into your Plausible account
2. Select your website
3. Go to **Settings** → **Goals**
4. Add custom goals:
   - `click_primary_cta`
   - `form_submit_success`
   - `outbound_whatsapp_click` (if needed)
5. Visit your live site and trigger events
6. Check the dashboard (may take a few minutes to appear)

---

## Event Tracking Code Example

```typescript
// Import the tracking function
import { trackCTAClick, trackFormSubmitSuccess } from "@/lib/analytics";

// Track a CTA click
trackCTAClick("hero", "Jetzt kostenloses Erstgespräch sichern");

// Track a successful form submission
trackFormSubmitSuccess("erstgespraech_anfrage");
```

---

## Files Changed

### New Files:
- `src/lib/analytics.ts` - Analytics utility functions

### Modified Files:
- `index.html` - Added Plausible script tags
- `.env` - Added VITE_PLAUSIBLE_DOMAIN placeholder
- `src/components/ui/get-started-button.tsx` - Added click tracking
- `src/components/ui/synthetic-hero.tsx` - Added trackingLocation prop
- `src/App.tsx` - Added form submit tracking and trackingLocation to all CTAs

---

## Privacy & GDPR Compliance

**Plausible Analytics is:**
- ✅ GDPR, CCPA, and PECR compliant
- ✅ No cookies used
- ✅ No personal data collected
- ✅ Lightweight (~1KB script)
- ✅ Open-source

**What's tracked:**
- Page views
- Custom events (CTA clicks, form submissions)
- Referrer sources
- Device types (desktop/mobile/tablet)
- Country (based on IP, but IP is not stored)

**What's NOT tracked:**
- IP addresses
- Personal identifiable information
- Cross-site tracking
- Cookies or local storage

---

## Testing Checklist

- [ ] Click hero CTA → Check console for `click_primary_cta` with `location: "hero"`
- [ ] Click header CTA → Check console for `click_primary_cta` with `location: "header"`
- [ ] Click mobile sticky CTA (on mobile) → Check console for `location: "mobile_sticky_cta"`
- [ ] Submit contact form → Check console for `form_submit_success` with `form_type: "erstgespraech_anfrage"`
- [ ] Verify events appear in Plausible dashboard (production only)
- [ ] Check Network tab for successful POST to `plausible.io/api/event`

---

## Troubleshooting

### Events not showing in console?
- Make sure you're running in development mode (`npm run dev`)
- Check that `src/lib/analytics.ts` is imported correctly

### Events not appearing in Plausible?
1. Verify the domain in `index.html` matches your Plausible account
2. Check browser's Network tab for blocked requests
3. Ensure ad blockers aren't blocking Plausible (some do)
4. Wait 5-10 minutes for events to appear in dashboard

### Network request blocked?
- Some ad blockers block Plausible (though it's privacy-friendly)
- Try disabling ad blocker temporarily to test
- Consider self-hosting Plausible for maximum reliability

---

## Future Enhancements

- Add scroll depth tracking
- Track video/media interactions
- Add A/B testing events
- Track time to first CTA click
- Add funnel visualization in Plausible dashboard

---

## Support

For Plausible-specific questions: [docs.plausible.io](https://plausible.io/docs)

For code-related questions: Check `src/lib/analytics.ts` for implementation details
