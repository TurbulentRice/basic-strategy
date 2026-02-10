# Quick Start Guide

## Project Overview

**Basic Strategy** is a mobile app for learning blackjack basic strategy. Built with Expo/React Native and TypeScript.

## Getting Started

### Run the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator (Mac only)
npm run ios

# Run on Android emulator
npm run android

# Scan QR code with Expo Go app on physical device
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

## Project Structure

```
basic-strategy/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Learn screen (strategy chart)
│   │   └── practice.tsx     # Practice mode screen
│   └── _layout.tsx          # Root layout
│
├── components/              # Reusable React components
│   └── (empty - to be created)
│
├── constants/               # App constants
│   └── (to be created: basicStrategy.ts, gameRules.ts)
│
├── types/                   # TypeScript types
│   └── (to be created: index.ts)
│
├── utils/                   # Utility functions
│   └── (to be created: cardUtils, handUtils, strategyUtils)
│
├── assets/                  # Images, icons
│   └── (placeholder assets)
│
├── docs/                    # Documentation
│   ├── HIGH_LEVEL_PLAN.md         # Overall implementation plan
│   ├── BASIC_STRATEGY_RULES.md    # Blackjack strategy reference
│   ├── DATA_STRUCTURES.md         # Core data models
│   ├── DESIGN_SPECS.md            # UI/UX specifications
│   ├── CURRENT_SPRINT.md          # Current work focus
│   └── QUICK_START.md             # This file
│
├── __tests__/               # Test files (to be created)
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── app.json                 # Expo configuration
└── README.md                # Main readme
```

## Current Status

### ✅ Completed (Phase 1)
- Project foundation initialized
- Navigation structure set up
- Documentation written
- Dependencies installed

### 🔄 Next Up (Phase 2)
- Create core data types (`types/index.ts`)
- Implement basic strategy matrix (`constants/basicStrategy.ts`)
- Build utility functions for cards and hands
- Write unit tests

### 📋 Future Phases
- Phase 3: UI components (cards, buttons)
- Phase 4: Strategy chart view
- Phase 5: Practice mode implementation
- Phase 6: Polish and animations

## Key Files to Know

- **`app/(tabs)/index.tsx`** - Learn screen (strategy chart view)
- **`app/(tabs)/practice.tsx`** - Practice mode (game interface)
- **`docs/HIGH_LEVEL_PLAN.md`** - Full implementation roadmap
- **`docs/CURRENT_SPRINT.md`** - Current work and next steps
- **`docs/DESIGN_SPECS.md`** - Visual design guidelines

## Development Workflow

1. Check `docs/CURRENT_SPRINT.md` for current priorities
2. Create feature branch (optional, no git yet)
3. Write tests first for new utilities
4. Implement functionality
5. Run type-check and lint
6. Test manually in simulator/device

## Design Principles

- **Simplicity first**: Focus on core learning experience
- **Clean UI**: Vegas aesthetic but modern and minimal
- **Fast iteration**: Get it working, then make it beautiful
- **Mobile-first**: iOS optimized, but works on Android

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- Blackjack Strategy: See `docs/BASIC_STRATEGY_RULES.md`

## Troubleshooting

### Port already in use
```bash
# Kill the process on port 8081
npx kill-port 8081
npm start
```

### Clear cache
```bash
npm start -- --clear
```

### Reset Expo
```bash
rm -rf .expo node_modules
npm install
```

## Next Session Plan

1. Create `types/index.ts` with all core type definitions
2. Implement `constants/basicStrategy.ts` with complete strategy matrix
3. Build `utils/handUtils.ts` for hand evaluation
4. Write tests for hand evaluation
5. Create practice game logic

Refer to `docs/CURRENT_SPRINT.md` for detailed breakdown.

---

**Ready to code!** Start with Phase 2 priorities.
