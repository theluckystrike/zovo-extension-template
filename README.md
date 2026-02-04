# [EXTENSION_NAME]

> [Short description of your extension]

Part of the [Zovo](https://zovo.one) family of privacy-first Chrome extensions.

## Quick Start

```bash
# Clone this template
git clone https://github.com/zovo/extension-template.git my-extension
cd my-extension

# Run interactive setup
npm run setup

# Install dependencies
npm install

# Generate icons
npm run icons

# Start development
npm run dev

# Load in Chrome
# 1. Open chrome://extensions
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the dist/ folder
```

## Project Structure

```
/
├── src/
│   ├── background/          # Service worker
│   │   └── index.ts
│   ├── content/             # Content script
│   │   └── index.ts
│   ├── popup/               # Extension popup
│   │   ├── index.html
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── styles.css
│   │   └── components/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── options/             # Options page
│   │   ├── index.html
│   │   └── index.tsx
│   ├── lib/                 # Shared utilities
│   │   ├── storage.ts       # Chrome storage
│   │   ├── messaging.ts     # Message passing
│   │   ├── analytics.ts     # Local analytics
│   │   └── types.ts         # TypeScript types
│   └── onboarding/          # Welcome page
│       ├── welcome.html
│       └── welcome.js
├── public/
│   ├── manifest.json        # Extension manifest
│   └── icons/               # Extension icons
├── scripts/
│   ├── setup.js             # Interactive setup
│   ├── generate-icons.js    # Icon generator
│   └── create-package.sh    # Package creator
├── store/                   # Chrome Web Store assets
│   ├── STORE_LISTING_TEMPLATE.md
│   └── PRIVACY_POLICY_TEMPLATE.md
├── .github/
│   ├── workflows/           # CI/CD
│   └── ISSUE_TEMPLATE/
├── package.json
├── tsconfig.json
├── webpack.config.js
├── tailwind.config.js
└── jest.config.js
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Build in development mode with watch |
| `npm run build` | Build for production |
| `npm run package` | Create zip for Chrome Web Store |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run type-check` | TypeScript type checking |
| `npm test` | Run tests |
| `npm run icons` | Generate PNG icons from SVG |
| `npm run setup` | Run interactive setup |

## Adding Features

### Adding Permissions

1. Edit `public/manifest.json`
2. Add permission to the `permissions` array
3. Update your store listing's permission justifications

### Adding Content Scripts

```json
// In manifest.json
"content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "run_at": "document_idle"
  }
]
```

### Adding Keyboard Shortcuts

```json
// In manifest.json
"commands": {
  "action-name": {
    "suggested_key": {
      "default": "Ctrl+Shift+Y",
      "mac": "Command+Shift+Y"
    },
    "description": "Description of the action"
  }
}
```

## Deployment

### Chrome Web Store

1. Build production version: `npm run build`
2. Create package: `npm run package`
3. Upload `extension.zip` to Chrome Web Store Developer Dashboard
4. Fill in store listing using `store/STORE_LISTING_TEMPLATE.md`
5. Submit for review

### Versioning

Update version in:
- `package.json`
- `public/manifest.json`

## Privacy

This extension follows Zovo's privacy-first principles:

- No data collection
- No tracking or analytics
- No external network requests
- All data stays on device
- Minimal permissions

## Support

- Email: hello@zovo.one
- Website: https://zovo.one

## License

MIT - [Zovo](https://zovo.one)
