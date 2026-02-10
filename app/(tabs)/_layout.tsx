import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

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
          headerTitle: 'Basic Strategy',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          headerTitle: 'Practice Mode',
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
});
