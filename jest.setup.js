// Mock expo-modules-core to avoid import errors
jest.mock('expo-modules-core', () => ({
  requireNativeModule: jest.fn(),
  NativeModulesProxy: {},
  EventEmitter: jest.fn(),
  Subscription: jest.fn(),
  UnavailabilityError: class UnavailabilityError extends Error {},
}));

// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));
