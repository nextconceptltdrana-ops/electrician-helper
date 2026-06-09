import React, { useState } from "react";
  import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const DEVICES = [
    { id: "mcb", name: "MCB", full: "Miniature Circuit Breaker", icon: "electric-switch", color: "#3B82F6", reasons: [
      { cause: "ওভারলোড (Overload)", fix: "সার্কিটের লোড কমান, অতিরিক্ত ডিভাইস সরিয়ে নিন" },
      { cause: "শর্ট সার্কিট (Short Circuit)", fix: "তার পরীক্ষা করুন, ফল্ট লোকেশন খুঁজে মেরামত করুন" },
      { cause: "আর্থ ফল্ট (Earth Fault)", fix: "ইন্সুলেশন টেস্ট করুন, ক্ষতিগ্রস্ত তার বদলান" },
      { cause: "ত্রুটিপূর্ণ MCB", fix: "নতুন MCB দিয়ে প্রতিস্থাপন করুন" },
    ]},
    { id: "mccb", name: "MCCB", full: "Molded Case Circuit Breaker", icon: "electric-switch-closed", color: "#8B5CF6", reasons: [
      { cause: "ওভারলোড", fix: "লোড ব্যালেন্স করুন, নিউট্রাল কারেন্ট চেক করুন" },
      { cause: "শর্ট সার্কিট", fix: "বাসবার ও কানেকশন পয়েন্ট পরীক্ষা করুন" },
      { cause: "আর্থ ফল্ট / আর্থ লিকেজ", fix: "মেগার টেস্ট করুন, ইন্সুলেশন রেজিস্ট্যান্স মাপুন" },
      { cause: "ফেজ ইমব্যালেন্স", fix: "তিন ফেজের লোড সমানভাবে ভাগ করুন" },
    ]},
    { id: "rccb", name: "RCCB", full: "Residual Current Circuit Breaker", icon: "current-ac", color: "#10B981", reasons: [
      { cause: "আর্থ লিকেজ কারেন্ট", fix: "প্রতিটি সার্কিট আলাদা করে লিকেজ খুঁজুন" },
      { cause: "মেশিন বডিতে লিকেজ", fix: "মেশিনের আর্থিং চেক করুন, মোটর ইন্সুলেশন টেস্ট করুন" },
      { cause: "ভেজা পরিবেশ / আর্দ্রতা", fix: "তার ও কানেকশনের ইন্সুলেশন ঠিক করুন" },
      { cause: "দুর্বল বা ত্রুটিপূর্ণ RCCB", fix: "Test বাটন দিয়ে পরীক্ষা করুন, প্রয়োজনে বদলান" },
    ]},
    { id: "relay", name: "Relay", full: "Protection Relay", icon: "chip", color: "#F59E0B", reasons: [
      { cause: "ওভারলোড রিলে ট্রিপ", fix: "মোটর কারেন্ট মাপুন, রিলে সেটিং কারেন্ট অনুযায়ী ঠিক করুন" },
      { cause: "ফেজ ফেইলার", fix: "তিন ফেজের ভোল্টেজ মাপুন, ফিউজ বা MCB চেক করুন" },
      { cause: "আন্ডার ভোল্টেজ", fix: "সাপ্লাই ভোল্টেজ চেক করুন, ট্রান্সফর্মার ট্যাপ ঠিক করুন" },
      { cause: "সেটিং সমস্যা", fix: "রিলের কারেন্ট ও টাইম সেটিং রিসেট করুন" },
    ]},
  ];
  export default function SafetyDevicesScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    const [expanded, setExpanded] = useState("mcb");
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {DEVICES.map((device) => (
            <View key={device.id}>
              <Pressable onPress={() => setExpanded(expanded === device.id ? "" : device.id)}>
                <View style={[styles.deviceHeader, { backgroundColor: colors.card, borderColor: expanded === device.id ? device.color : colors.border, borderWidth: expanded === device.id ? 1.5 : 1 }]}>
                  <View style={[styles.deviceIcon, { backgroundColor: device.color + "22" }]}>
                    <MaterialCommunityIcons name={device.icon as any} size={22} color={device.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.deviceName, { color: colors.foreground }]}>{device.name}</Text>
                    <Text style={[styles.deviceFull, { color: colors.mutedForeground }]}>{device.full}</Text>
                  </View>
                  <MaterialCommunityIcons name={expanded === device.id ? "chevron-up" : "chevron-down"} size={20} color={colors.mutedForeground} />
                </View>
              </Pressable>
              {expanded === device.id && (
                <View style={[styles.reasonsContainer, { backgroundColor: colors.card + "88", borderColor: device.color + "33" }]}>
                  <Text style={[styles.reasonsTitle, { color: device.color }]}>কেন ট্রিপ করে - কারণ ও সমাধান</Text>
                  {device.reasons.map((item, i) => (
                    <View key={i} style={styles.reasonRow}>
                      <View style={[styles.reasonBullet, { backgroundColor: device.color }]} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.reasonCause, { color: colors.foreground }]}>{item.cause}</Text>
                        <View style={styles.fixRow}>
                          <MaterialCommunityIcons name="wrench" size={11} color={colors.primary} />
                          <Text style={[styles.reasonFix, { color: colors.mutedForeground }]}>{item.fix}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 10 },
    deviceHeader: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, gap: 12 },
    deviceIcon: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    deviceName: { fontSize: 16, fontWeight: "700" }, deviceFull: { fontSize: 12, marginTop: 2 },
    reasonsContainer: { padding: 14, borderRadius: 12, borderWidth: 1, marginTop: -4, marginBottom: 4, gap: 10 },
    reasonsTitle: { fontSize: 12, fontWeight: "700", letterSpacing: 0.5, marginBottom: 4 },
    reasonRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
    reasonBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
    reasonCause: { fontSize: 14, fontWeight: "600", marginBottom: 3 },
    fixRow: { flexDirection: "row", alignItems: "flex-start", gap: 4 },
    reasonFix: { fontSize: 12, lineHeight: 18, flex: 1 },
  });