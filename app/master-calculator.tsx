import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const CHART_DATA = [
    { kw: "0.5 KW", amp: "2.3A", cable: "1.5 mm²", breaker: "6A" },
    { kw: "1 KW", amp: "4.5A", cable: "1.5 mm²", breaker: "10A" },
    { kw: "2 KW", amp: "9A", cable: "2.5 mm²", breaker: "16A" },
    { kw: "3 KW", amp: "13.6A", cable: "4 mm²", breaker: "20A" },
    { kw: "4 KW", amp: "18.2A", cable: "6 mm²", breaker: "25A" },
    { kw: "5 KW", amp: "22.7A", cable: "6 mm²", breaker: "32A" },
    { kw: "6 KW", amp: "27.3A", cable: "10 mm²", breaker: "40A" },
    { kw: "8 KW", amp: "36.4A", cable: "10 mm²", breaker: "50A" },
    { kw: "10 KW", amp: "45.5A", cable: "16 mm²", breaker: "63A" },
    { kw: "15 KW", amp: "68.2A", cable: "25 mm²", breaker: "80A" },
    { kw: "20 KW", amp: "90.9A", cable: "35 mm²", breaker: "100A" },
    { kw: "25 KW", amp: "113.6A", cable: "50 mm²", breaker: "125A" },
    { kw: "30 KW", amp: "136.4A", cable: "70 mm²", breaker: "160A" },
    { kw: "40 KW", amp: "181.8A", cable: "95 mm²", breaker: "200A" },
    { kw: "50 KW", amp: "227.3A", cable: "120 mm²", breaker: "250A" },
    { kw: "100 KW", amp: "454.5A", cable: "240 mm²", breaker: "500A" },
  ];
  export default function MasterCalculatorScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.formulaBox, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
            <Text style={[styles.formulaTitle, { color: colors.primary }]}>ব্যবহৃত সূত্র (3-Phase, 0.8 PF)</Text>
            <Text style={[styles.formula, { color: colors.foreground }]}>I = KW x 1000 / (1.732 x 415V x 0.8)</Text>
            <Text style={[styles.formulaSub, { color: colors.mutedForeground }]}>Cable ও Breaker: +25% safety margin সহ</Text>
          </View>
          <View style={[styles.tableCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.tableHeaderRow, { backgroundColor: colors.primary + "22", borderBottomColor: colors.border }]}>
              <Text style={[styles.th, { color: colors.primary, width: 60 }]}>KW</Text>
              <Text style={[styles.th, { color: colors.primary, width: 75 }]}>Ampere</Text>
              <Text style={[styles.th, { color: colors.primary, flex: 1 }]}>RM Cable</Text>
              <Text style={[styles.th, { color: colors.primary, width: 70 }]}>Breaker</Text>
            </View>
            {CHART_DATA.map((row, i) => (
              <View key={i} style={[styles.dataRow, { backgroundColor: i % 2 === 0 ? "transparent" : colors.primary + "08", borderTopColor: colors.border }]}>
                <Text style={[styles.td, { color: colors.foreground, fontWeight: "700", width: 60 }]}>{row.kw}</Text>
                <Text style={[styles.td, { color: "#10B981", width: 75 }]}>{row.amp}</Text>
                <Text style={[styles.td, { color: "#3B82F6", flex: 1 }]}>{row.cable}</Text>
                <Text style={[styles.td, { color: colors.accent, width: 70 }]}>{row.breaker}</Text>
              </View>
            ))}
          </View>
          <View style={[styles.noteBox, { backgroundColor: "#EF444415", borderColor: "#EF444440" }]}>
            <MaterialCommunityIcons name="alert-rhombus" size={14} color="#EF4444" />
            <Text style={[styles.noteText, { color: "#EF4444" }]}>সর্বদা লাইসেন্সপ্রাপ্ত ইলেকট্রিশিয়ান দিয়ে কাজ করান।</Text>
          </View>
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 12 },
    formulaBox: { padding: 14, borderRadius: 12, borderWidth: 1, gap: 6, marginBottom: 4 },
    formulaTitle: { fontSize: 12, fontWeight: "600", letterSpacing: 0.5 },
    formula: { fontSize: 15, fontWeight: "700" }, formulaSub: { fontSize: 12 },
    tableCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    tableHeaderRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1 },
    th: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
    dataRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 9, borderTopWidth: 1 },
    td: { fontSize: 13, fontWeight: "500" },
    noteBox: { flexDirection: "row", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 10, borderWidth: 1 },
    noteText: { fontSize: 12, flex: 1, lineHeight: 18 },
  });