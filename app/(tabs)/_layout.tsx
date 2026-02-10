import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { LearnIcon } from '@/components/icons/LearnIcon';
import { PracticeIcon } from '@/components/icons/PracticeIcon';
import { AppLogo } from '@/components/AppLogo';
import { THEME } from '@/constants/theme';

function HeaderTitle({ title }: { title: string }) {
  return (
    <View style={styles.headerTitleContainer}>
      <AppLogo size={28} style={styles.headerLogo} />
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd700',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          headerTitle: () => <HeaderTitle title="Basic Strategy" />,
          tabBarIcon: ({ color, size }) => <LearnIcon size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          headerTitle: () => <HeaderTitle title="Practice Mode" />,
          tabBarIcon: ({ color, size }) => <PracticeIcon size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a472a',
    borderTopColor: '#2d5a3d',
  },
  header: {
    backgroundColor: '#1a472a',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  headerLogo: {
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerTitleText: {
    fontSize: THEME.typography.fontSize.lg,
    fontWeight: THEME.typography.fontWeight.bold,
    color: '#fff',
  },
});
