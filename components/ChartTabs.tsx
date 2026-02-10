import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  Platform
} from 'react-native';
import { HandType } from '@/utils/chartUtils';
import { COLORS, THEME } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ChartTabsProps {
  selected: HandType;
  onSelect: (handType: HandType) => void;
  style?: ViewStyle;
}

const TABS: { value: HandType; label: string }[] = [
  { value: 'hard', label: 'Hard Totals' },
  { value: 'soft', label: 'Soft Totals' },
  { value: 'pair', label: 'Pairs' },
];

export function ChartTabs({ selected, onSelect, style }: ChartTabsProps) {
  const selectedIndex = TABS.findIndex(tab => tab.value === selected);
  const slideAnim = useRef(new Animated.Value(selectedIndex)).current;
  const [tabWidth, setTabWidth] = React.useState(0);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: selectedIndex,
      useNativeDriver: Platform.OS !== 'web',
      tension: 80,
      friction: 10,
    }).start();
  }, [selectedIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        slideAnim.setOffset(selectedIndex);
        slideAnim.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        const delta = gestureState.dx / tabWidth;
        slideAnim.setValue(delta);
      },
      onPanResponderRelease: (_, gestureState) => {
        slideAnim.flattenOffset();
        const delta = gestureState.dx / tabWidth;
        const velocity = gestureState.vx;

        let newIndex = selectedIndex;
        if (Math.abs(delta) > 0.3 || Math.abs(velocity) > 0.5) {
          if (delta > 0 || velocity > 0) {
            newIndex = Math.max(0, selectedIndex - 1);
          } else {
            newIndex = Math.min(TABS.length - 1, selectedIndex + 1);
          }
        }

        if (newIndex !== selectedIndex) {
          onSelect(TABS[newIndex].value);
        } else {
          Animated.spring(slideAnim, {
            toValue: selectedIndex,
            useNativeDriver: Platform.OS !== 'web',
            tension: 80,
            friction: 10,
          }).start();
        }
      },
    })
  ).current;

  const handleTabLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setTabWidth(width);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, TABS.length - 1],
    outputRange: [0, tabWidth * (TABS.length - 1)],
  });

  return (
    <View style={[styles.container, style]}>
      {/* Animated sliding selector */}
      <Animated.View
        style={[
          styles.slidingSelector,
          {
            width: tabWidth,
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={[COLORS.gold.primary, COLORS.gold.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientSelector}
        />
      </Animated.View>

      {/* Tab buttons */}
      {TABS.map((tab, index) => {
        const isSelected = selected === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={styles.tabWrapper}
            onPress={() => onSelect(tab.value)}
            onLayout={index === 0 ? handleTabLayout : undefined}
            activeOpacity={0.8}
          >
            <View style={styles.tab}>
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.glass.greenStrong,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xs,
    ...THEME.shadows.md,
    borderWidth: 1,
    borderColor: COLORS.glass.whiteStrong,
    position: 'relative',
  },
  slidingSelector: {
    position: 'absolute',
    left: THEME.spacing.xs,
    top: THEME.spacing.xs,
    bottom: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.md,
    ...THEME.shadows.md,
  },
  gradientSelector: {
    flex: 1,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  tabWrapper: {
    flex: 1,
  },
  tab: {
    paddingVertical: THEME.spacing.sm + 2,
    paddingHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    zIndex: 1,
  },
  tabText: {
    fontSize: THEME.typography.fontSize.sm,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: COLORS.ui.lightGray,
  },
  tabTextSelected: {
    color: COLORS.feltGreen.darkest,
    fontWeight: THEME.typography.fontWeight.bold,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
