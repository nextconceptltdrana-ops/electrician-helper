import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const CABLE_DATA = [
    { size: "1.0 mm2", air: "13A", ground: "10A", use: "লাইট পয়েন্ট, সকেট" },
    { size: "1.5 mm2", air: "15A", ground: "13A", use: "লাইট সার্কিট, ছোট লোড" },
    { size: "2.5 mm2", air: "20A", ground: "17A", use: "সকেট, Plain মেশিন" },
    { size: "4 mm2", air: "26A", ground: "22A", use: "বড় মেশিন, AC 1 Ton" },
    { size: "6 mm2", air: "32A", ground: "27A", use: "AC 1.5T, মোটর সার্কিট" },
    { size: "10 mm2", air: "44A", ground: "36A", use: "AC 2T, Sub Panel ফিডার" },
    { size: "16 mm2", air: "57A", ground: "46A", use: "মেইন ফিডার ছোট" },
    { size: "25 mm2", air: "75A", ground: "61A", use: "মেইন ফিডার মাঝারি" },
    { size: "35 mm2", air: "92A", ground: "75A", use: "সেকশন মেইন ফিডার" },
    { size: "50 mm2", air: "114A", ground: "93A", use: "বড় মোটর, ট্রান্সফর্মার" },
    { size: "70 mm2", air: "143A", ground: "116A", use: "হেভি ফিডার" },
    { size: "95 mm2", air: "171A", ground: "139A", use: "মেইন ইনকামার" },
    { size: "120 mm2", air: "197A", ground: "160A", use: "বড় মেইন ইনকামার" },
    { size: "185 mm2", air: "257A", ground: "210A", use: "হেভি ডিউটি ফিডার" },
    { size: "240 mm2", air: "300A", ground: "245A", use: "বড় ট্রান্সফর্মার" },
  ];
  function getColor(amp: string) {
    const a = parseInt(amp); if (a <= 20) return "#10B981"; if (a <= 60) return "#3B82F6"; if (a <= 150) return "#F59E0B"; return "#EF4444";
  }
  export default function CableAmpereScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.tableCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.headerRow, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.th, { color: colors.primary, width: 70 }]}>RM Size</Text>
              <Text style={[styles.th, { color: colors.primary, width: 60 }]}>বাতাসে</Text>
              <Text style={[styles.th, { color: colors.primary, width: 65 }]}>মাটিতে</Text>
              <Text style={[styles.th, { color: colors.primary, flex: 1 }]}>ব্যবহার</Text>
            </View>
            {CABLE_DATA.map((row, i) => (
              <View key={i} style={[styles.dataRow, { backgroundColor: i % 2 === 0 ? "transparent" : colors.primary + "06", borderTopColor: colors.border }]}>
                <Text style={[styles.tdBold, { color: colors.foreground, width: 70 }]}>{row.size}</Text>
                <Text style={[styles.td, { color: getColor(row.air), width: 60 }]}>{row.air}</Text>
                <Text style={[styles.td, { color: getColor(row.ground), width: 65 }]}>{row.ground}</Text>
                <Text style={[styles.tdSmall, { color: colors.mutedForeground, flex: 1 }]}>{row.use}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.noteBox, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40" }]}>
            <Text style={[styles.noteTitle, { color: colors.primary }]}>গুরুত্বপূর্ণ নিয়ম</Text>
            <Text style={[styles.noteText, { color: colors.foreground }]}>{"• সর্বদা প্রয়োজনীয় কারেন্টের ১.২৫ গুণ ক্ষমতার ক্যাবল ব্যবহার করুন\n• PVC ইন্সুলেশনের তাপমাত্রা সীমা: ৭০°C\n• দীর্ঘ দূরত্বে ভোল্টেজ ড্রপের জন্য বড় সাইজের ক্যাবল নিন"}</Text>
          </View>
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 12 },
    tableCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    headerRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10 },
    th: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
    dataRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 1, alignItems: "center" },
    tdBold: { fontSize: 12, fontWeight: "700" }, td: { fontSize: 12, fontWeight: "600" }, tdSmall: { fontSize: 11 },
    noteBox: { padding: 14, borderRadius: 12, borderWidth: 1, gap: 8 },
    noteTitle: { fontSize: 13, fontWeight: "700" }, noteText: { fontSize: 13, lineHeight: 22 },
  });