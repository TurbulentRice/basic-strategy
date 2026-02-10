import { Stack } from 'expo-router';
import { PracticeProvider } from '@/contexts/PracticeContext';

export default function RootLayout() {
  return (
    <PracticeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PracticeProvider>
  );
}
