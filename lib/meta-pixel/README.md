# Meta Pixel Implementation

This directory contains the Meta (Facebook) Pixel implementation for tracking user interactions and conversions.

## Setup

1. **Environment Variables**
   Create a `.env.local` file in the root directory with:
   ```
   NEXT_PUBLIC_FB_PIXEL_ID=4943944062283476
   NEXT_PUBLIC_META_ACCESS_TOKEN=your-meta-access-token-here
   ```

2. **Meta Access Token**
   To get your Meta Access Token:
   - Go to Facebook Business Manager
   - Navigate to Events Manager
   - Select your pixel
   - Go to Settings > Conversions API
   - Generate an access token

## Usage

### Client-Side Tracking

The pixel is automatically initialized in the app. To track events:

```typescript
import * as fbq from '@/lib/meta-pixel/meta-pixel';

// Track a lead event
fbq.lead({
  content_name: 'Newsletter Signup',
  value: 10,
  currency: 'BRL'
});

// Track a contact event
fbq.contact({
  content_name: 'Contact Form',
  content_category: 'Support'
});
```

### Server-Side Tracking (Conversions API)

For better tracking accuracy, use both client and server-side tracking:

```typescript
// Send event to Meta Conversions API
const response = await fetch('/api/event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: window.location.href,
    user_data: {
      em: email,
      ph: phone,
      fn: firstName,
      ln: lastName,
      country: 'br'
    },
    custom_data: {
      value: 50,
      currency: 'BRL'
    },
    event_id: 'unique_event_id' // For deduplication
  })
});
```

## Available Events

- `pageview()` - Automatically tracked on route changes
- `lead(customData, userData)` - Track lead generation
- `contact(customData)` - Track contact form submissions
- `viewContent(customData)` - Track content views
- `search(customData)` - Track searches
- `schedule(customData)` - Track scheduling actions
- `completeRegistration(customData)` - Track registrations
- `purchase(customData)` - Track purchases

## Files

- `MetaPixel.tsx` - React component that loads the pixel
- `meta-pixel.ts` - Client-side tracking functions
- `meta-conversions-api.ts` - Server-side API integration
- `meta-utils.ts` - Utility functions
- `types.ts` - TypeScript type definitions

## Testing

To verify the pixel is working:
1. Install the Facebook Pixel Helper Chrome extension
2. Visit your website
3. Check the extension icon - it should show your pixel ID
4. Perform actions and verify events in Facebook Events Manager