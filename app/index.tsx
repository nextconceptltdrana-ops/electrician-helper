import React, { useEffect } from "react";
  import { Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
  import { router } from "expo-router";
  import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useColors } from "@/hooks/useColors";
  const { width } = Dimensions.get("window");
  export default function SplashScreen() {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    useEffect(() => {
      const timer = setTimeout(() => { router.replace("/home"); }, 3000);
      return () => clearTimeout(timer);
    }, []);
    return (
      <View style={[styles.container, { backgroundColor: "#0A0A0A", paddingTop: Platform.OS === "web" ? 67 : insets.top, paddingBottom: Platform.OS === "web" ? 34 : insets.bottom }]}>
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.logoRow}>
          <MaterialCommunityIcons name="lightning-bolt" size={28} color="#F59E0B" />
          <Text style={styles.appName}>ELECTRICIAN HELPER</Text>
          <MaterialCommunityIcons name="lightning-bolt" size={28} color="#F59E0B" />
        </Animated.View>
        <Animated.View entering={FadeIn.delay(400)} style={styles.photoContainer}>
          <View style={styles.photoGlow}>
            <Image source={require("../assets/images/rana.jpg")} style={[styles.photo, { width: Math.min(width * 0.55, 220), height: Math.min(width * 0.55, 220) }]} resizeMode="cover" />
          </View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.creditContainer}>
          <Text style={styles.thinkingBy}>Thinking by:</Text>
          <Text style={styles.ranaName}>RANA</Text>
          <View style={styles.divider} />
          <Text style={styles.devBy}>Development by DevTeam Pro</Text>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(1200)} style={styles.dotsContainer}>
          {[0, 1, 2].map((i) => (
            <Animated.View key={i} entering={FadeIn.delay(1200 + i * 200)} style={styles.dot} />
          ))}
        </Animated.View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "space-around", paddingHorizontal: 32 },
    logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    appName: { color: "#F59E0B", fontSize: 16, fontWeight: "700", letterSpacing: 3 },
    photoContainer: { alignItems: "center" },
    photoGlow: { borderRadius: 120, borderWidth: 2, borderColor: "#F59E0B", shadowColor: "#F59E0B", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10, overflow: "hidden" },
    photo: { borderRadius: 120 },
    creditContainer: { alignItems: "center", gap: 6 },
    thinkingBy: { color: "#6B7280", fontSize: 14, letterSpacing: 1 },
    ranaName: { color: "#FFFFFF", fontSize: 32, fontWeight: "700", letterSpacing: 8 },
    divider: { width: 60, height: 1, backgroundColor: "#F59E0B", marginVertical: 4 },
    devBy: { color: "#6B7280", fontSize: 12, letterSpacing: 0.5 },
    dotsContainer: { flexDirection: "row", gap: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#F59E0B", opacity: 0.8 },
  });