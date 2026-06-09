import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const SECTIONS = [
    { title: "ওহমের সূত্র (Ohm Law)", icon: "sine-wave", color: "#3B82F6", formulas: [
      { name: "ভোল্টেজ (V)", formula: "V = I x R", note: "V=ভোল্ট, I=অ্যাম্পিয়ার, R=ওহম" },
      { name: "কারেন্ট (I)", formula: "I = V / R", note: "ভোল্টেজকে রেজিস্ট্যান্স দিয়ে ভাগ" },
      { name: "রেজিস্ট্যান্স (R)", formula: "R = V / I", note: "ভোল্টেজকে কারেন্ট দিয়ে ভাগ" },
    ]},
    { title: "পাওয়ার সূত্র (Power Formula)", icon: "lightning-bolt", color: "#F59E0B", formulas: [
      { name: "পাওয়ার (P)", formula: "P = V x I", note: "ওয়াটে পাওয়ার = ভোল্ট x অ্যাম্প" },
      { name: "পাওয়ার (বিকল্প)", formula: "P = I2 x R", note: "কারেন্টের বর্গ x রেজিস্ট্যান্স" },
    ]},
    { title: "তিন ফেজ সূত্র (3-Phase)", icon: "current-ac", color: "#10B981", formulas: [
      { name: "কারেন্ট (3-Phase)", formula: "I = KW x 1000 / (1.732 x V x PF)", note: "V=415V, PF=0.8" },
      { name: "KVA থেকে KW", formula: "KW = KVA x PF", note: "Power Factor 0.7-0.95" },
      { name: "KW থেকে KVA", formula: "KVA = KW / PF", note: "লোড ক্যালকুলেশনে" },
    ]},
    { title: "সিঙ্গেল ফেজ (1-Phase)", icon: "lightning-bolt-circle", color: "#8B5CF6", formulas: [
      { name: "কারেন্ট (1-Phase)", formula: "I = W / (V x PF)", note: "V=220V, PF=0.8" },
      { name: "ইউনিট হিসাব", formula: "Unit = KW x Hour", note: "১ KW x ১ ঘণ্টা = ১ ইউনিট" },
    ]},
  ];
  export default function FormulasScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {SECTIONS.map((section, si) => (
            <View key={si} style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: section.color + "40" }]}>
              <View style={[styles.sectionTitle, { borderBottomColor: colors.border }]}>
                <View style={[styles.iconBg, { backgroundColor: section.color + "22" }]}>
                  <MaterialCommunityIcons name={section.icon as any} size={18} color={section.color} />
                </View>
                <Text style={[styles.sectionTitleText, { color: section.color }]}>{section.title}</Text>
              </View>
              {section.formulas.map((f, fi) => (
                <View key={fi} style={[styles.formulaRow, { borderTopColor: colors.border, backgroundColor: fi % 2 === 0 ? "transparent" : section.color + "06" }]}>
                  <Text style={[styles.formulaName, { color: colors.mutedForeground }]}>{f.name}</Text>
                  <View style={[styles.formulaBox, { backgroundColor: section.color + "15" }]}>
                    <Text style={[styles.formulaText, { color: colors.foreground }]}>{f.formula}</Text>
                  </View>
                  <Text style={[styles.formulaNote, { color: colors.mutedForeground }]}>{f.note}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 12 },
    sectionCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    sectionTitle: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderBottomWidth: 1 },
    iconBg: { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center" },
    sectionTitleText: { fontSize: 14, fontWeight: "700" },
    formulaRow: { padding: 12, borderTopWidth: 1, gap: 6 },
    formulaName: { fontSize: 12, fontWeight: "500" },
    formulaBox: { padding: 10, borderRadius: 8, alignItems: "center" },
    formulaText: { fontSize: 16, fontWeight: "700" },
    formulaNote: { fontSize: 11, fontStyle: "italic" },
  });