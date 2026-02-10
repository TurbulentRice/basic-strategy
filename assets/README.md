# Assets

App icons and images for the Basic Strategy app.

## Current Files

### Device Icons
- **`icon.png`** - App icon for iOS/Android (1024x1024px)
  - Used for app icon on device home screens
  - Configured in `app.json`

- **`adaptive-icon.png`** - Android adaptive icon (1024x1024px)
  - Used for Android adaptive icon system
  - Supports different device shapes

- **`splash.png`** - Splash screen (2048x2048px)
  - Displayed when app is loading
  - Vegas green felt background

### In-App Assets
- **`logo.png`** - In-app logo (used in headers and UI)
  - Displayed in tab headers
  - Accessed via `AppLogo` component

### Web Assets
- **`favicon.png`** - Web favicon (48x48px)
  - Used for browser tab icon
  - Configured in `app.json`

### Card Assets
- **`svg-cards/`** - Directory containing playing card SVGs
  - Used by `Card.tsx` component
  - Includes all 52 cards with proper suits

## Design Theme

All icons feature the Vegas aesthetic:
- Green felt background (#1a472a)
- Gold accent colors (#FFD700)
- Professional blackjack theme
- Clean, recognizable design

## Usage in Code

```typescript
// In-app logo
import { AppLogo } from '@/components/AppLogo';
<AppLogo size={32} />

// Device icons - configured in app.json
{
  "icon": "./assets/icon.png",
  "adaptiveIcon": {
    "foregroundImage": "./assets/adaptive-icon.png",
    "backgroundColor": "#1a472a"
  }
}
```

## Asset Configuration

All assets are properly configured in:
- `app.json` - App icon, splash, favicon
- `eas.json` - Build configuration
- Components - In-app logo usage
