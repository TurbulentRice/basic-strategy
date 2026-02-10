# Basic Strategy

A mobile app for learning and practicing blackjack basic strategy for casino play.

## 🎯 Overview

Basic Strategy is a clean, beautiful mobile application designed to help players learn and master basic strategy for casino blackjack. Perfect for anyone preparing for a trip to Las Vegas or wanting to improve their game.

**Status: Production-Ready! 🎊**

## ✨ Features

### 📊 Learn Mode - Interactive Strategy Chart
- **Complete Strategy Matrix**: All hard totals, soft totals, and pairs
- **Color-Coded Display**: Visual cues for each action type
- **Interactive Highlighting**: Tap cells to highlight row and column
- **Three Sections**: Easy tabs to switch between hand types
- **Scrollable Chart**: Full strategy viewable on mobile
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
- Gold accent highlights
- Professional card display with suit colors (♥♦♣♠)
- Clean, intuitive interface
- Smooth animations and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- iOS Simulator (for iOS development) or Android Studio (for Android)
- Expo Go app (optional, for testing on physical devices)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd basic-strategy

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator (Mac only)
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

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
6. Tap "Next Hand" to continue practicing
7. Watch your accuracy improve!

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
- **Styling**: React Native StyleSheet

## 📂 Project Structure

```
basic-strategy/
├── app/                    # Screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Learn screen (strategy chart)
│   │   └── practice.tsx   # Practice screen (game)
│   └── _layout.tsx        # Root layout with providers
│
├── components/            # Reusable UI components
│   ├── Card.tsx           # Playing card display
│   ├── Hand.tsx           # Multi-card hand
│   ├── ActionButton.tsx   # Action button
│   ├── ActionButtons.tsx  # Button grid
│   ├── ChartCell.tsx      # Strategy chart cell
│   ├── ChartLegend.tsx    # Action legend
│   ├── ChartTabs.tsx      # Tab selector
│   ├── StrategyChart.tsx  # Strategy chart grid
│   ├── FeedbackMessage.tsx # Result feedback
│   ├── StatBar.tsx        # Statistics bar
│   └── Screen.tsx         # Screen wrapper
│
├── constants/             # Constants and configuration
│   ├── basicStrategy.ts   # Complete strategy matrix
│   ├── gameRules.ts       # Game configuration
│   ├── colors.ts          # Color palette
│   └── theme.ts           # Design system
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
├── __tests__/             # Test suites
│   ├── handUtils.test.ts
│   └── strategyUtils.test.ts
│
└── docs/                  # Documentation
    ├── HIGH_LEVEL_PLAN.md
    ├── CURRENT_SPRINT.md
    ├── PHASE_2_SUMMARY.md
    ├── PHASE_3_SUMMARY.md
    ├── PHASE_4_SUMMARY.md
    └── ...
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

## 📊 Phase Completion

- ✅ **Phase 1**: Foundation & Setup
- ✅ **Phase 2**: Game Logic & Strategy Engine
- ✅ **Phase 3**: UI Components & Practice Mode
- ✅ **Phase 4**: Strategy Chart & Learn Mode

**App Status**: Production-ready for deployment! 🚀

## 🎨 Design Philosophy

**Vegas Elegance Meets Modern Simplicity**

- Clean, uncluttered interface
- Vegas-inspired color scheme
- Professional card aesthetics
- Intuitive navigation
- Instant visual feedback
- Mobile-optimized layout

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

## 📄 License

Private project - All rights reserved

## 🎰 Acknowledgments

Basic strategy charts based on mathematical analysis of blackjack probabilities by Edward Thorp, Julian Braun, and others. Verified by computer simulations.

## 📞 Support

For issues or questions, please refer to the documentation in the `/docs` folder.

## 🎉 Try It Now!

```bash
npm start
# Press 'i' for iOS simulator
# Or scan QR code with Expo Go on your phone
```

**Start learning basic strategy today and improve your blackjack game!** 🃏♠️

---

Made with ❤️ for blackjack enthusiasts
