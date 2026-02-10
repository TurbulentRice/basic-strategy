# Basic Strategy

A mobile app for learning and practicing blackjack basic strategy for casino play.

## Overview

Basic Strategy is a clean, beautiful mobile application designed to help players learn and master basic strategy for casino blackjack. Perfect for anyone preparing for a trip to Las Vegas or wanting to improve their game.

## Features

- **Learn Mode**: Interactive basic strategy chart with color-coded recommendations
- **Practice Mode**: Random hand generation with real-time feedback
- **Clean Design**: Vegas-inspired aesthetic with focus on usability
- **Cross-Platform**: Works on iOS and Android (iOS-optimized)

## Tech Stack

- **Framework**: Expo / React Native
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Testing**: Jest + React Native Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- iOS Simulator (for iOS development) or Android Studio (for Android)
- Expo Go app (optional, for testing on physical devices)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test
```

## Project Structure

```
basic-strategy/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Learn screen
│   │   └── practice.tsx   # Practice screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable React components
├── constants/             # App constants and configuration
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions and helpers
├── assets/                # Images, fonts, and other assets
└── docs/                  # Documentation and planning
```

## Documentation

- [High-Level Plan](./docs/HIGH_LEVEL_PLAN.md) - Implementation roadmap
- [Basic Strategy Rules](./docs/BASIC_STRATEGY_RULES.md) - Blackjack strategy reference
- [Design Specifications](./docs/DESIGN_SPECS.md) - UI/UX guidelines
- [Data Structures](./docs/DATA_STRUCTURES.md) - Core data models

## License

Private project - All rights reserved

## Acknowledgments

Basic strategy charts based on mathematical analysis of blackjack probabilities.
