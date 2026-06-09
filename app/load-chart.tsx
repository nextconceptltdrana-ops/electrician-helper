import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const LOAD_DATA = [
    { category: "সুইং মেশিন", items: [
      { name: "Plain Machine (Juki/Brother)", watt: "200–250W" },
      { name: "Overlock Machine (5-Thread)", watt: "300–400W" },
      { name: "Kansai Machine", watt: "400–500W" },
      { name: "Button Hole Machine", watt: "350–450W" },
      { name: "Bartack Machine", watt: "300–400W" },
      { name: "Flatlock Machine", watt: "400–550W" },
    ]},
    { category: "এয়ার কন্ডিশনার", items: [
      { name: "AC 1 Ton (Window/Split)", watt: "1000–1200W" },
      { name: "AC 1.5 Ton", watt: "1500–1800W" },
      { name: "AC 2 Ton", watt: "2000–2400W" },
      { name: "AC 2.5 Ton", watt: "2500–3000W" },
    ]},
    { category: "ফ্যান ও লাইট", items: [
      { name: "Ceiling Fan (Standard)", watt: "50–75W" },
      { name: "Exhaust Fan (Small)", watt: "30–50W" },
      { name: "Industrial Fan (Large)", watt: "150–250W" },
      { name: "LED Light (18W Tube)", watt: "18W" },
      { name: "Fluorescent Tube (40W)", watt: "40W" },
    ]},
    { category: "অফিস সরঞ্জাম", items: [
      { name: "Computer + Monitor", watt: "150–200W" },
      { name: "Printer (Laser)", watt: "400–600W" },
      { name: "Water Pump (0.5HP)", watt: "370W" },
      { name: "Water Pump (1HP)", watt: "750W" },
    ]},
  ];
  export default function LoadChartScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {LOAD_DATA.map((section, si) => (
            <View key={si} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.sectionTitle, { borderBottomColor: colors.border }]}>
                <MaterialCommunityIcons name="tag" size={14} color={colors.primary} />
                <Text style={[styles.sectionTitleText, { color: colors.primary }]}>{section.category}</Text>
              </View>
              <View style={styles.tableHeader}>
                <Text style={[styles.colHeader, { color: colors.mutedForeground, flex: 1 }]}>ডিভাইসের নাম</Text>
                <Text style={[styles.colHeader, { color: colors.mutedForeground, width: 110 }]}>আনুমানিক ওয়াট</Text>
              </View>
              {section.items.map((item, ii) => (
                <View key={ii} style={[styles.tableRow, { backgroundColor: ii % 2 === 0 ? "transparent" : colors.primary + "08", borderTopColor: colors.border }]}>
                  <Text style={[styles.rowName, { color: colors.foreground, flex: 1 }]}>{item.name}</Text>
                  <Text style={[styles.rowWatt, { color: colors.accent, width: 110 }]}>{item.watt}</Text>
                </View>
              ))}
            </View>
          ))}
          <View style={[styles.noteBox, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40" }]}>
            <MaterialCommunityIcons name="alert" size={14} color={colors.primary} />
            <Text style={[styles.noteText, { color: colors.accent }]}>উপরের ওয়াট আনুমানিক। প্রকৃত ওয়াট ডিভাইসের নেমপ্লেট বা মিটার দিয়ে মাপুন।</Text>
          </View>
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 12 },
    sectionCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    sectionTitle: { flexDirection: "row", alignItems: "center", gap: 6, padding: 12, borderBottomWidth: 1 },
    sectionTitleText: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5 },
    tableHeader: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 6 },
    colHeader: { fontSize: 11, fontWeight: "600", letterSpacing: 0.5 },
    tableRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1 },
    rowName: { fontSize: 13 }, rowWatt: { fontSize: 13, fontWeight: "700", textAlign: "right" },
    noteBox: { flexDirection: "row", alignItems: "flex-start", gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginTop: 4 },
    noteText: { fontSize: 12, flex: 1, lineHeight: 18 },
  });