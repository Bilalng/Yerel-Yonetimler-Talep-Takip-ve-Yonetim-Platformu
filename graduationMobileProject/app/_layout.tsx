import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AlertNotificationRoot } from "react-native-alert-notification";
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from "react-native-paper";
import "react-native-reanimated";
import { Colors } from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";

const customDarkTheme = {...MD3DarkTheme, colors: Colors.dark};
const customLightTheme ={...MD3LightTheme, colors: Colors.light};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme,customLightTheme);
const CombinedDarkTheme = merge(DarkTheme,customDarkTheme);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expose a method to hide the splash screen
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary} />
      </View>
    );
  }

  const paperTheme =
    colorScheme === "dark"
      ? CombinedDarkTheme
      : CombinedDefaultTheme;

  return (
    <AlertNotificationRoot>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value= {paperTheme}>
          <Stack
          screenOptions={{
            headerShown:false
          }}
          >
            {isAuthenticated ? (
              <Stack.Screen name="(tabs)" />
            ) : (
              <Stack.Screen name="/login" />
            )}
          </Stack>
          <StatusBar style="auto" />
          </ThemeProvider>
      </PaperProvider>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
