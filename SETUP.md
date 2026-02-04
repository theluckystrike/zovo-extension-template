# [EXTENSION_NAME] Setup Guide

This guide explains how to customize the Zovo Extension Template for your specific extension.

## Quick Setup

Run the interactive setup script:

```bash
npm run setup
```

This will prompt you for:
- Extension name
- Slug (used in package.json)
- Primary benefit (for store title)
- Short description
- Category

## Manual Setup

If you prefer manual setup:

### 1. Update Extension Identity

**package.json:**
```json
{
  "name": "zovo-your-extension",
  "description": "Your extension description"
}
```

**public/manifest.json:**
```json
{
  "name": "Your Extension: Primary Benefit | Zovo",
  "description": "Short description (max 132 chars)"
}
```

### 2. Replace Placeholders

Search and replace `[EXTENSION_NAME]` in all files:
- `src/popup/index.html`
- `src/popup/App.tsx`
- `src/options/index.html`
- `src/options/index.tsx`
- `src/background/index.ts`
- `src/content/index.ts`
- `src/onboarding/welcome.html`
- `README.md`
- `store/STORE_LISTING_TEMPLATE.md`
- `store/PRIVACY_POLICY_TEMPLATE.md`

### 3. Customize Icons

The template includes Zovo-branded placeholder icons. To create custom icons:

1. Design your icon at 128x128 pixels
2. Save as `public/icons/icon-128.svg`
3. Run `npm run icons` to generate PNG versions

### 4. Update Components

**Header (src/popup/components/Header.tsx):**
- Replace the logo SVG with your extension's icon
- Update the title

**Footer (src/popup/components/Footer.tsx):**
- Optional: Add version number
- Links to Zovo are pre-configured

**App (src/popup/App.tsx):**
- Replace placeholder content with your extension's UI
- Add your main functionality

## Adding Permissions

### Common Permissions

| Permission | Use Case | Manifest Entry |
|------------|----------|----------------|
| storage | Save user settings | `"permissions": ["storage"]` |
| activeTab | Access current tab on click | `"permissions": ["activeTab"]` |
| scripting | Inject scripts | `"permissions": ["scripting"]` |
| tabs | Tab management | `"permissions": ["tabs"]` |
| alarms | Background timers | `"permissions": ["alarms"]` |
| notifications | Show notifications | `"permissions": ["notifications"]` |

### Host Permissions

For accessing specific sites:
```json
"host_permissions": [
  "https://example.com/*"
]
```

For all sites (use sparingly):
```json
"host_permissions": [
  "<all_urls>"
]
```

**Important:** Every permission affects trust. Only request what you need.

## Adding Content Scripts

### Static Content Script

In `manifest.json`:
```json
"content_scripts": [
  {
    "matches": ["https://example.com/*"],
    "js": ["content.js"],
    "css": ["content.css"],
    "run_at": "document_idle"
  }
]
```

### Programmatic Injection

From background script:
```typescript
await chrome.scripting.executeScript({
  target: { tabId },
  files: ['content.js']
});
```

## Adding Options

### Simple Settings

Use the existing options page and add fields:

```tsx
// In src/options/index.tsx
<div>
  <label>Your Setting</label>
  <input
    type="text"
    value={settings?.yourSetting || ''}
    onChange={(e) => updateSetting('yourSetting', e.target.value)}
  />
</div>
```

### New Settings Types

1. Add to `src/lib/types.ts`:
```typescript
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  yourSetting: string;
}
```

2. Add default in same file:
```typescript
export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  yourSetting: 'default value',
};
```

## Adding Background Tasks

### Alarms

```typescript
// Create alarm
chrome.alarms.create('myAlarm', {
  periodInMinutes: 60 // Run every hour
});

// Handle alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'myAlarm') {
    // Do something
  }
});
```

### On-Install Actions

```typescript
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // First install
  } else if (details.reason === 'update') {
    // Extension updated
  }
});
```

## Store Submission

### Prepare Assets

1. **Icons:** 128x128 PNG (use `npm run icons`)
2. **Screenshots:** 5x 1280x800 PNG
3. **Small Tile:** 440x280 PNG
4. **Large Tile:** 920x680 PNG
5. **Marquee:** 1400x560 PNG

### Write Listing

Use `store/STORE_LISTING_TEMPLATE.md` as a guide:
- Title with keyword in first 36 chars
- Description leads with problem/pain point
- Permission justifications are accurate

### Privacy Policy

Use `store/PRIVACY_POLICY_TEMPLATE.md`:
- Replace all placeholders
- Host at accessible URL or include in extension

### Submit

1. Build: `npm run build`
2. Package: `npm run package`
3. Upload to Chrome Web Store Developer Dashboard
4. Submit for review

## Testing

### Unit Tests

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # With coverage
```

### Manual Testing

1. Build: `npm run dev`
2. Load in Chrome: chrome://extensions
3. Enable Developer Mode
4. Load unpacked -> select `dist/`
5. Test all features
6. Check console for errors

### Pre-Release Checklist

- [ ] All features work as expected
- [ ] No console errors
- [ ] Permissions are minimal
- [ ] Works in incognito (if applicable)
- [ ] Works after Chrome restart
- [ ] Options page saves correctly
- [ ] Version numbers match

## Getting Help

- Email: hello@zovo.one
- Website: https://zovo.one
