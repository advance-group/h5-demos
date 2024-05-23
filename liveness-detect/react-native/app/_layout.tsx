import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="success-page" />
      <Stack.Screen name="fail-page" />
      <Stack.Screen name="webview/liveness-detect" />
    </Stack>
  );
}
