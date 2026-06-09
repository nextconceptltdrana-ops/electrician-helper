import React, { useState } from "react";
  import { ScrollView, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const DEFAULT_LOADS = [
    { name: "Plain Machine", watt: 250, qty: "0" },
    { name: "Overlock Machine", watt: 350, qty: "0" },
    { name: "AC (1 Ton)", watt: 1200, qty: "0" },
    { name: "Fan (Ceiling)", watt: 60, qty: "0" },
    { name: "Light (LED 18W)", watt: 18, qty: "0" },
    { name: "Computer/Monitor", watt: 150, qty: "0" },
  ];
  export default function IpsCalculatorScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    const [loads, setLoads] = useState(DEFAULT_LOADS);
    const [calculated, setCalculated] = useState(false);
    const updateQty = (index: number, value: string) => {
      const updated = [...loads]; updated[index] = { ...updated[index], qty: value.replace(/[^0-9]/g, "") };
      setLoads(updated); setCalculated(false);
    };
    const totalWatt = loads.reduce((sum, l) => sum + l.watt * (parseInt(l.qty) || 0), 0);
    const ipsWatt = Math.ceil((totalWatt * 1.25) / 100) * 100;
    const batteryAh = Math.ceil((totalWatt * 2) / 12 / 10) * 10;
    const batteryVoltage = totalWatt > 2000 ? 24 : 12;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.infoBox, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
            <MaterialCommunityIcons name="information" size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.accent }]}>প্রতিটি ডিভাইসের সংখ্যা লিখুন, তারপর Calculate বাটনে চাপুন</Text>
          </View>
          {loads.map((load, index) => (
            <View key={index} style={[styles.loadRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.loadName, { color: colors.foreground }]}>{load.name}</Text>
                <Text style={[styles.loadWatt, { color: colors.mutedForeground }]}>{load.watt}W প্রতিটি</Text>
              </View>
              <View style={[styles.inputContainer, { backgroundColor: colors.input, borderColor: colors.primary }]}>
                <TextInput value={load.qty} onChangeText={(v) => updateQty(index, v)} keyboardType="numeric" style={[styles.input, { color: colors.foreground }]} maxLength={3} />
              </View>
              <Text style={[styles.unitLabel, { color: colors.mutedForeground }]}>পিস</Text>
            </View>
          ))}
          <Pressable onPress={() => setCalculated(true)} style={[styles.calcButton, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="calculator" size={20} color="#000000" />
            <Text style={styles.calcButtonText}>Calculate করুন</Text>
          </Pressable>
          {calculated && totalWatt > 0 && (
            <View style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
              <Text style={[styles.resultTitle, { color: colors.primary }]}>হিসাবের ফলাফল</Text>
              <View style={styles.resultRow}><MaterialCommunityIcons name="lightning-bolt" size={18} color={colors.primary} /><Text style={[styles.resultLabel, { color: colors.mutedForeground }]}>মোট লোড:</Text><Text style={[styles.resultValue, { color: colors.foreground }]}>{totalWatt} Watt ({(totalWatt/1000).toFixed(2)} KW)</Text></View>
              <View style={styles.resultRow}><MaterialCommunityIcons name="battery-charging" size={18} color="#10B981" /><Text style={[styles.resultLabel, { color: colors.mutedForeground }]}>IPS ক্যাপাসিটি:</Text><Text style={[styles.resultValue, { color: "#10B981" }]}>কমপক্ষে {ipsWatt}W IPS</Text></View>
              <View style={styles.resultRow}><MaterialCommunityIcons name="battery" size={18} color="#3B82F6" /><Text style={[styles.resultLabel, { color: colors.mutedForeground }]}>ব্যাটারি:</Text><Text style={[styles.resultValue, { color: "#3B82F6" }]}>{batteryVoltage}V × {batteryAh}Ah ব্যাটারি</Text></View>
              <View style={[styles.noteBg, { backgroundColor: colors.primary + "15" }]}><Text style={[styles.noteText, { color: colors.accent }]}>* ব্যাটারি ব্যাকআপ ২ ঘণ্টার জন্য হিসাব করা হয়েছে।</Text></View>
            </View>
          )}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 10 },
    infoBox: { flexDirection: "row", alignItems: "center", gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 6 },
    infoText: { fontSize: 13, flex: 1, lineHeight: 18 },
    loadRow: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, borderWidth: 1, gap: 10, marginBottom: 6 },
    loadName: { fontSize: 14, fontWeight: "600" }, loadWatt: { fontSize: 12, marginTop: 2 },
    inputContainer: { width: 56, borderWidth: 1.5, borderRadius: 8, overflow: "hidden" },
    input: { fontSize: 16, fontWeight: "700", textAlign: "center", padding: 8 },
    unitLabel: { fontSize: 12, width: 28 },
    calcButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: 12, marginTop: 8 },
    calcButtonText: { fontSize: 16, fontWeight: "700", color: "#000000" },
    resultCard: { padding: 16, borderRadius: 14, borderWidth: 2, gap: 12, marginTop: 4 },
    resultTitle: { fontSize: 15, fontWeight: "700" },
    resultRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    resultLabel: { fontSize: 13, flex: 1 }, resultValue: { fontSize: 14, fontWeight: "700" },
    noteBg: { padding: 10, borderRadius: 8, marginTop: 4 }, noteText: { fontSize: 12, lineHeight: 18 },
  });