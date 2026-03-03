# [EXTENSION_NAME]

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/zovo-extension-template/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/zovo-extension-template/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/zovo-extension-template?style=social)](https://github.com/theluckystrike/zovo-extension-template)

> [Short description of your extension]

Part of the [Zovo](https://zovo.one) family of privacy-first Chrome extensions.

## 🔗 Links

- **Website:** [zovo.one](https://zovo.one)
- **Template Documentation:** [docs.zovo.one](https://docs.zovo.one)

## Quick Start

```bash
# Clone this template
git clone https://github.com/theluckystrike/zovo-extension-template.git my-extension
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

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/theluckystrike/zovo-extension-template.git
cd zovo-extension-template

# Install dependencies
npm install

# Generate icons
npm run icons

# Start development server
npm run dev
```

### Load into Chrome

1. Open `chrome://extensions`
2. Enable **Developer Mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `dist/` folder

## Usage

After loading the extension, you can:

- Interact with the popup by clicking the extension icon
- Access the options page via right-click → Options
- Use keyboard shortcuts defined in `manifest.json`

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

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and test locally with `npm run dev`
4. Run linting and tests: `npm run lint && npm test`
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature/my-feature`
7. Submit a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier)
- Write tests for new features
- Update documentation for any changes

## See Also

### Related Zovo Repositories

- [zovo-types-webext](https://github.com/theluckystrike/zovo-types-webext) - Comprehensive TypeScript type definitions for browser extensions
- [zovo-chrome-extensions](https://github.com/theluckystrike/zovo-chrome-extensions) - Collection of Zovo Chrome extensions
- [webext-bridge](https://github.com/theluckystrike/webext-bridge) - Cross-context messaging for WebExtensions
- [webext-options-page](https://github.com/theluckystrike/webext-options-page) - Pre-built options page framework

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage your tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions and stay focused
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades
- [Zovo Cookie Manager](https://chrome.google.com/webstore) - Advanced cookie management

Visit [zovo.one](https://zovo.one) for more information about Zovo products.

## License

MIT - [Zovo](https://zovo.one)
