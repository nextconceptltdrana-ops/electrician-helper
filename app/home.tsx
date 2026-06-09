import React from "react";
  import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
  import { router } from "expo-router";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import Animated, { FadeInDown } from "react-native-reanimated";
  import ModuleCard from "@/components/ModuleCard";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";

  const MODULES = [
    { number: "01", title: "Safety Devices", subtitle: "MCB, MCCB, RCCB ও Relay কেন ট্রিপ করে — সমাধান গাইড", icon: "shield-alert", route: "/safety-devices" },
    { number: "02", title: "IPS Kilowatt Calculator", subtitle: "মোট লোড থেকে IPS ওয়াট ও ব্যাটারি অ্যাম্পিয়ার হিসাব", icon: "calculator", route: "/ips-calculator" },
    { number: "03", title: "Possible Load Chart", subtitle: "Plain, Overlock, AC, Fan-এর আনুমানিক ওয়াট তালিকা", icon: "format-list-bulleted", route: "/load-chart" },
    { number: "04", title: "Master Calculator Chart", subtitle: "KW → Ampere → RM Cable → Breaker রেডিমেড চার্ট", icon: "table", route: "/master-calculator" },
    { number: "05", title: "Instrument Guide", subtitle: "LT Panel, PFI Plant, Megger ও Clamp Meter ব্যবহার", icon: "meter-electric", route: "/instruments" },
    { number: "06", title: "Sewing Machine Errors", subtitle: "Hikari, Juki, Jack মেশিনের Error Code ও সমাধান", icon: "sewing-machine", route: "/sewing-errors" },
    { number: "07", title: "Cable & Ampere Load", subtitle: "কোন তারের কারেন্ট বহন ক্ষমতা কত — সম্পূর্ণ তালিকা", icon: "cable-data", route: "/cable-ampere" },
    { number: "08", title: "Electric Formulas", subtitle: "ওহমের সূত্র, পাওয়ার ফর্মুলা ও অন্যান্য আবশ্যিক সূত্র", icon: "function-variant", route: "/formulas" },
    { number: "09", title: "Generator & Transformer", subtitle: "KVA হিসাব, বেসিক মেইনটেন্যান্স ও সেফটি গাইড", icon: "engine", route: "/generator" },
  ];

  export default function HomeScreen() {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border, paddingTop: Platform.OS === "web" ? 67 : insets.top + 8 }]}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="lightning-bolt" size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Electrician Helper</Text>
          </View>
          <View style={[styles.versionBadge, { backgroundColor: colors.primary + "22" }]}>
            <Text style={[styles.versionText, { color: colors.primary }]}>v1.0</Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <View style={[styles.welcomeBanner, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
              <MaterialCommunityIcons name="wrench" size={18} color={colors.primary} />
              <Text style={[styles.welcomeText, { color: colors.accent }]}>গার্মেন্টস ইলেকট্রিশিয়ানদের জন্য সম্পূর্ণ গাইড</Text>
            </View>
          </Animated.View>
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>MASTER MENU — সমস্যা ও সমাধান</Text>
          {MODULES.map((module, index) => (
            <Animated.View key={module.number} entering={FadeInDown.delay(150 + index * 60).springify()}>
              <ModuleCard number={module.number} title={module.title} subtitle={module.subtitle} icon={module.icon as any} onPress={() => router.push(module.route as any)} />
            </Animated.View>
          ))}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
    headerTitle: { fontSize: 18, fontWeight: "700", letterSpacing: 0.5 },
    versionBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    versionText: { fontSize: 11, fontWeight: "600" },
    content: { padding: 16, gap: 0 },
    welcomeBanner: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 20 },
    welcomeText: { fontSize: 13, flex: 1 },
    sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 12 },
  });