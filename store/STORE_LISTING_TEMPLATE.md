# [EXTENSION_NAME] Chrome Web Store Listing

Use this template to prepare your Chrome Web Store submission.

---

## Title (Max 45 characters)

```
[EXTENSION_NAME]: [Primary Benefit] | Zovo
```

**Note:** Primary keyword MUST be in first 36 characters for SEO.

---

## Short Description (Max 132 characters)

```
[Problem statement]? [Solution with extension]. [Benefit]. Free & privacy-first.
```

Example:
```
Tired of cluttered tabs? Instantly organize and save memory with smart tab management. Free & privacy-first.
```

---

## Full Description

```markdown
**[HOOK - Address the pain point]**

Are you struggling with [problem]? [EXTENSION_NAME] helps you [benefit] by [how it works].

**FEATURES**
- [Feature 1] - [Benefit]
- [Feature 2] - [Benefit]
- [Feature 3] - [Benefit]
- [Feature 4] - [Benefit]

**WHY [EXTENSION_NAME]?**
- [Unique selling point 1]
- [Unique selling point 2]
- [Unique selling point 3]

**PRIVACY FIRST**
- No data collection
- No tracking
- No analytics
- All data stays on your device
- Works offline

**HOW TO USE**
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

Part of the Zovo extension family: simple tools that respect your privacy.
Built by a solo developer who listens. hello@zovo.one
```

---

## Category

Choose one:
- Productivity
- Developer Tools
- Search Tools
- Accessibility

---

## Single Purpose Description

```
This extension [single, clear action] when [trigger condition].
```

---

## Permission Justifications

### storage
```
Used to save user preferences and settings locally on the device. No data is transmitted externally.
```

### activeTab (if needed)
```
Required to interact with the currently active tab when the user clicks the extension icon. Only accesses the tab when explicitly triggered by the user.
```

### scripting (if needed)
```
Used to inject functionality into web pages when the user initiates an action. No background scanning or automatic execution.
```

### tabs (if needed)
```
Required to [specific functionality]. Tab information is processed locally and never transmitted externally.
```

### host_permissions (if needed)
```
Required to [specific functionality] on [specific sites/all sites]. Only activates when explicitly triggered by the user.
```

---

## Screenshots (5 required, 1280x800 PNG)

1. **Main Feature** - Show the primary functionality in action
2. **Key Benefit** - Demonstrate the main value proposition
3. **Settings/Options** - Show customization options
4. **Before/After** - Show the problem vs solution
5. **Privacy Badge** - Highlight privacy-first approach

### Screenshot Text Overlay Guidelines

- Use Zovo Violet (#7C3AED) for accent elements
- White or light gray background
- Large, readable text (24-32px minimum)
- Feature name + brief benefit
- Clean, minimal design

---

## Promotional Tiles

### Small Tile (440x280)
- Extension icon prominent
- Extension name
- One-line benefit

### Large Tile (920x680)
- Feature showcase
- Key benefits listed
- Call to action

### Marquee (1400x560) - CRITICAL for featuring
- Full feature demonstration
- Multiple benefits highlighted
- Professional design

---

## Privacy Policy URL

```
https://zovo.one/privacy/[extension-slug]
```

Or use the PRIVACY_POLICY_TEMPLATE.md to create a standalone page.

---

## Support URL

```
mailto:hello@zovo.one
```

---

## Pre-Publish Checklist

- [ ] Title has primary keyword in first 36 characters
- [ ] Description leads with problem/pain point
- [ ] Permissions are absolute minimum
- [ ] All 4 tile images uploaded (small, large, marquee, icon)
- [ ] 5 screenshots at 1280x800
- [ ] Manifest V3
- [ ] No unused permissions in manifest
- [ ] Single purpose description is clear and accurate
- [ ] Privacy policy URL is accessible
- [ ] Support email is correct
- [ ] Version number is correct
