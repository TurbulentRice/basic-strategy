# Blackjack Basic Strategy

A mobile app for learning and practicing blackjack basic strategy for casino play.

## 🎯 Overview

Clean, simple, ad-free and free-to-use mobile application designed to help players learn and master basic strategy for casino blackjack. Built using React Native and Expo.

## ✨ Features

### 📊 Learn Mode - Interactive Strategy Chart
- **Complete Strategy Matrix**: All hard totals, soft totals, and pairs
- **Color-Coded Display**: Visual cues for each action type
- **Interactive Highlighting**: Tap cells to highlight row and column
- **Three Sections**: Easy tabs to switch between hand types
- **Mobile-Optimized**: Fits perfectly on iPhone and Android screens
- **Legend**: Quick reference for action colors

### 🎮 Practice Mode - Hands-On Learning
- **Random Hand Generation**: Realistic blackjack scenarios
- **Action Buttons**: Hit, Stand, Double, Split
- **Instant Feedback**: Immediate correct/incorrect indication
- **Detailed Explanations**: Learn why each decision is correct
- **Statistics Tracking**: Monitor accuracy and improvement
- **Streak Counter**: Stay motivated with fire streaks! 🔥
- **Continuous Practice**: Seamless hand-to-hand flow

### 📈 Progress Tracking
- Real-time accuracy percentage
- Correct vs. total decisions
- Current and best streaks
- Motivation through gamification

### 🎨 Beautiful Design
- Vegas-inspired green felt aesthetic
- Gold accent highlights with app logo
- Professional card display with suit colors (♥♦♣♠)
- Clean, intuitive interface
- Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`) for building

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd blackjack-basic-strategy

# Install dependencies
npm install

# Start the development server
npm start
```

### Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator (Mac only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test
```

## 📱 Building & Deployment

### Setup EAS (One-time)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure your project (already done)
# eas build:configure
```

### Build for Testing (Preview Builds)

**iOS Preview Build** (requires Apple Developer account - $99/year):
```bash
eas build --platform ios --profile preview
```
- Creates a TestFlight build automatically
- Share with up to 10,000 beta testers
- No need for physical device access

**Android Preview Build** (free):
```bash
eas build --platform android --profile preview
```
- Creates an APK you can install directly
- Share the download link with anyone
- No Google Play account needed

### Build for Production (App Stores)

**iOS Production Build**:
```bash
eas build --platform ios --profile production
eas submit --platform ios
```

**Android Production Build**:
```bash
eas build --platform android --profile production
eas submit --platform android
```

### Installation on Devices

**iOS (TestFlight)**:
1. Build completes → Apple automatically creates TestFlight build
2. Add testers via email in App Store Connect
3. Testers receive email with install link
4. Open on iPhone → Install via TestFlight app

**Android (APK)**:
1. Build completes → EAS provides download link
2. Share link with testers
3. Open link on Android device
4. Enable "Install from Unknown Sources" if prompted
5. Install APK

### Sharing with Friends

**For iOS Friends**:
- Add their email addresses to TestFlight (in App Store Connect)
- They'll receive an invitation email
- Limit: 10,000 external testers

**For Android Friends**:
- Share the APK download link from EAS dashboard
- They can install directly on their devices
- No limit on testers

## 📱 How to Use

### Learn Tab
1. View the complete basic strategy chart
2. Switch between Hard Totals, Soft Totals, and Pairs
3. Tap any cell to highlight that row and column
4. Use the legend to understand action colors
5. Study patterns and memorize decisions

### Practice Tab
1. A random hand is automatically dealt
2. View dealer's up card and your two cards
3. Select the correct action (Hit, Stand, Double, or Split)
4. Get instant feedback with explanation
5. Review statistics at the top
6. Continue practicing to improve your skills!

## 🎓 What You'll Learn

Following basic strategy reduces the house edge to approximately 0.5%, making blackjack one of the best casino games for the player.

- **Hard Totals**: Hands without an Ace, or where Ace counts as 1
- **Soft Totals**: Hands with an Ace counted as 11
- **Pairs**: When to split, when to hit or stand
- **Dealer Considerations**: How dealer's up card affects decisions

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 / React Native 0.81
- **Language**: TypeScript 5.3
- **Navigation**: Expo Router 6.0 (file-based routing)
- **State Management**: React Context
- **Testing**: Jest + React Native Testing Library
- **Build System**: EAS Build
- **Styling**: React Native StyleSheet with custom theme system

## 📂 Project Structure

```
blackjack-basic-strategy/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── _layout.tsx    # Tab layout with logo header
│   │   ├── index.tsx      # Learn screen (strategy chart)
│   │   └── practice.tsx   # Practice screen (game)
│   └── _layout.tsx        # Root layout with providers
│
├── components/            # Reusable UI components
│   ├── AppLogo.tsx        # App logo component
│   ├── Card.tsx           # Playing card display
│   ├── Hand.tsx           # Multi-card hand
│   ├── ActionButton.tsx   # Action button with animations
│   ├── ActionButtons.tsx  # Button grid
│   ├── ChartCell.tsx      # Strategy chart cell
│   ├── ChartLegend.tsx    # Action legend
│   ├── ChartTabs.tsx      # Animated tab selector
│   ├── StrategyChart.tsx  # Strategy chart grid
│   ├── FeedbackMessage.tsx # Result feedback
│   ├── StatBar.tsx        # Statistics display
│   └── Screen.tsx         # Screen wrapper
│
├── constants/             # Constants and configuration
│   ├── basicStrategy.ts   # Complete strategy matrix
│   ├── gameRules.ts       # Game configuration
│   ├── colors.ts          # Color palette
│   └── theme.ts           # Design system (with web-compatible shadows)
│
├── contexts/              # React Context providers
│   └── PracticeContext.tsx # Practice game state
│
├── types/                 # TypeScript definitions
│   └── index.ts           # All type definitions
│
├── utils/                 # Utility functions
│   ├── cardUtils.ts       # Card & deck operations
│   ├── handUtils.ts       # Hand evaluation
│   ├── strategyUtils.ts   # Strategy lookups
│   ├── practiceGame.ts    # Practice logic
│   └── chartUtils.ts      # Chart data conversion
│
├── assets/                # App assets
│   ├── icon.png           # App icon (device)
│   ├── adaptive-icon.png  # Android adaptive icon
│   ├── logo.png           # In-app logo
│   ├── splash.png         # Splash screen
│   └── favicon.png        # Web favicon
│
├── __tests__/             # Test suites
│   ├── handUtils.test.ts
│   └── strategyUtils.test.ts
│
└── docs/                  # Documentation
    ├── README.md          # Documentation index
    ├── BASIC_STRATEGY_RULES.md
    ├── TECHNICAL.md
    ├── DESIGN_SPECS.md
    └── DEVELOPMENT_HISTORY.md
```

## 🧪 Testing

The app includes comprehensive unit tests for all game logic:

```bash
npm test
# ✅ 52/52 tests passing
```

Tests cover:
- Hand evaluation (all edge cases)
- Strategy lookups (all scenarios)
- Ace handling (soft/hard transitions)
- Pair detection
- Action validation

## 🎯 Strategy Rules

The app implements the mathematically optimal basic strategy for:
- **Multiple decks** (4-8 decks)
- **Dealer stands on soft 17** (S17)
- **Double after split allowed** (DAS)
- **Standard 3:2 blackjack payout**

These are the most common casino rules. Following this strategy gives you the best odds against the house.

## 💰 Cost Breakdown

- **Development**: FREE (open source tools)
- **Android Distribution**: FREE (can distribute APKs directly or use Google Play)
- **iOS Distribution**: $99/year (Apple Developer Program - required for TestFlight & App Store)
- **EAS Build Service**: FREE tier available, or $29/month for unlimited builds

## 🎨 Design Philosophy

**Vegas Elegance Meets Modern Simplicity**

- Clean, uncluttered interface
- Vegas-inspired color scheme
- Professional card aesthetics with custom logo
- Intuitive navigation
- Instant visual feedback
- Mobile-optimized for all screen sizes

## 📄 License

Private project - All rights reserved

## 🎰 Acknowledgments

Basic strategy charts based on mathematical analysis of blackjack probabilities by Edward Thorp, Julian Braun, and others. Verified by computer simulations.

## 📞 Support

For issues or questions, please refer to the documentation in the `/docs` folder.

---

**Start learning basic strategy today and improve your blackjack game!** 🃏♠️

Made with ❤️ for blackjack enthusiasts
