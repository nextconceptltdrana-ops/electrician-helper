import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { Stack } from "expo-router";
  import * as SplashScreen from "expo-splash-screen";
  import React, { useEffect } from "react";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import { SafeAreaProvider } from "react-native-safe-area-context";
  import { useColors } from "@/hooks/useColors";

  SplashScreen.preventAutoHideAsync();
  const queryClient = new QueryClient();

  function RootLayoutNav() {
    const colors = useColors();
    return (
      <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground, headerTitleStyle: { fontFamily: "Inter_700Bold", fontSize: 16 }, headerShadowVisible: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="safety-devices" options={{ title: "No-01: Safety Devices" }} />
        <Stack.Screen name="ips-calculator" options={{ title: "No-02: IPS Calculator" }} />
        <Stack.Screen name="load-chart" options={{ title: "No-03: Load Chart" }} />
        <Stack.Screen name="master-calculator" options={{ title: "No-04: Master Calculator" }} />
        <Stack.Screen name="instruments" options={{ title: "No-05: Instruments" }} />
        <Stack.Screen name="sewing-errors" options={{ title: "No-06: Sewing Error Codes" }} />
        <Stack.Screen name="cable-ampere" options={{ title: "No-07: Cable & Ampere" }} />
        <Stack.Screen name="formulas" options={{ title: "No-08: Electric Formulas" }} />
        <Stack.Screen name="generator" options={{ title: "No-09: Generator & Transformer" }} />
      </Stack>
    );
  }

  export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
    useEffect(() => { if (fontsLoaded || fontError) { SplashScreen.hideAsync(); } }, [fontsLoaded, fontError]);
    if (!fontsLoaded && !fontError) return null;
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }