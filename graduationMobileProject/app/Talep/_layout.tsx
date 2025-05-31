import { Stack } from "expo-router";

export default function TalepLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Talep',
      }}
    />
  );
}