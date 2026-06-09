import React from "react";
  import { Platform, StyleSheet, Text, View } from "react-native";
  import { useColors } from "@/hooks/useColors";

  export default function BannerAd() {
    const colors = useColors();
    return (
      <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
        <View style={[styles.topBorder, { backgroundColor: colors.primary }]} />
        <View style={[styles.adContainer, { backgroundColor: "#111111" }]}>
          <Text style={[styles.adLabel, { color: colors.mutedForeground }]}>AD</Text>
          <Text style={[styles.adText, { color: colors.mutedForeground }]}>Advertisement · Google AdMob</Text>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    wrapper: { width: "100%", ...(Platform.OS === "web" ? { paddingBottom: 34 } : {}) },
    topBorder: { height: 2, width: "100%", shadowColor: "#F59E0B", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 6, elevation: 6 },
    adContainer: { height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
    adLabel: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 1, opacity: 0.6 },
    adText: { fontSize: 13, fontFamily: "Inter_400Regular", opacity: 0.6 },
  });