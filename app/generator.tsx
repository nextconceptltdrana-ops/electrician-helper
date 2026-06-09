import React from "react";
  import { ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const KVA_DATA = [
    { kva: "20 KVA", kw: "16 KW", amp: "27.8A", use: "ছোট কারখানা" },
    { kva: "50 KVA", kw: "40 KW", amp: "69.4A", use: "মাঝারি কারখানা" },
    { kva: "100 KVA", kw: "80 KW", amp: "139A", use: "বড় ফ্লোর বা সেকশন" },
    { kva: "160 KVA", kw: "128 KW", amp: "222A", use: "মাঝারি গার্মেন্টস" },
    { kva: "200 KVA", kw: "160 KW", amp: "278A", use: "বড় গার্মেন্টস ফ্যাক্টরি" },
    { kva: "315 KVA", kw: "252 KW", amp: "437A", use: "বৃহৎ শিল্পপ্রতিষ্ঠান" },
  ];
  const MAINT = [
    { icon: "oil", color: "#F59E0B", title: "ইঞ্জিন অয়েল চেক", detail: "প্রতি ২৫০ ঘণ্টা বা ৩ মাস পর পরিবর্তন করুন" },
    { icon: "water", color: "#3B82F6", title: "কুলেন্ট লেভেল", detail: "প্রতিদিন চালানোর আগে রেডিয়েটর ওয়াটার চেক করুন" },
    { icon: "battery-charging", color: "#10B981", title: "স্টার্টার ব্যাটারি", detail: "প্রতি মাসে ব্যাটারি ভোল্টেজ চেক করুন (১২.৪V+)" },
    { icon: "air-filter", color: "#8B5CF6", title: "এয়ার ফিল্টার", detail: "প্রতি ৫০০ ঘণ্টায় পরিষ্কার বা পরিবর্তন করুন" },
    { icon: "fuel", color: "#EF4444", title: "ফুয়েল ফিল্টার", detail: "প্রতি ৫০০ ঘণ্টায় পরিবর্তন করুন" },
  ];
  const SAFETY = [
    "জেনারেটর কখনো বদ্ধ ঘরে চালাবেন না",
    "ATS সুইচ ছাড়া মেইন লাইনে সংযুক্ত করবেন না",
    "চলমান জেনারেটরে কখনো রিফুয়েলিং করবেন না",
    "আর্থিং (Earthing) সঠিকভাবে করতে হবে",
    "মোট লোডের ৮০% পর্যন্ত ব্যবহার করুন",
  ];
  export default function GeneratorScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          <View style={[styles.formulaBox, { backgroundColor: colors.primary + "18", borderColor: colors.primary + "40" }]}>
            <Text style={[styles.formulaTitle, { color: colors.primary }]}>KVA থেকে KW সূত্র</Text>
            <Text style={[styles.formula, { color: colors.foreground }]}>KW = KVA x PF (0.8)</Text>
          </View>
          <View style={[styles.tableCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.headerRow, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.th, { color: colors.primary, width: 70 }]}>KVA</Text>
              <Text style={[styles.th, { color: colors.primary, width: 65 }]}>KW</Text>
              <Text style={[styles.th, { color: colors.primary, width: 55 }]}>Amp</Text>
              <Text style={[styles.th, { color: colors.primary, flex: 1 }]}>উপযুক্ত</Text>
            </View>
            {KVA_DATA.map((row, i) => (
              <View key={i} style={[styles.dataRow, { backgroundColor: i % 2 === 0 ? "transparent" : colors.primary + "08", borderTopColor: colors.border }]}>
                <Text style={[styles.tdBold, { color: colors.primary, width: 70 }]}>{row.kva}</Text>
                <Text style={[styles.td, { color: colors.foreground, width: 65 }]}>{row.kw}</Text>
                <Text style={[styles.td, { color: "#10B981", width: 55 }]}>{row.amp}</Text>
                <Text style={[styles.tdSmall, { color: colors.mutedForeground, flex: 1 }]}>{row.use}</Text>
              </View>
            ))}
          </View>
          {MAINT.map((item, i) => (
            <View key={i} style={[styles.maintCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.maintIcon, { backgroundColor: item.color + "20" }]}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.maintTitle, { color: colors.foreground }]}>{item.title}</Text>
                <Text style={[styles.maintDetail, { color: colors.mutedForeground }]}>{item.detail}</Text>
              </View>
            </View>
          ))}
          <View style={[styles.safetyCard, { backgroundColor: "#EF444415", borderColor: "#EF444440" }]}>
            <View style={styles.safetyTitleRow}><MaterialCommunityIcons name="shield-alert" size={18} color="#EF4444" /><Text style={[styles.safetyTitleText, { color: "#EF4444" }]}>সেফটি সতর্কতা</Text></View>
            {SAFETY.map((tip, i) => (
              <View key={i} style={styles.tipRow}><View style={[styles.tipBullet, { backgroundColor: "#EF4444" }]} /><Text style={[styles.tipText, { color: colors.foreground }]}>{tip}</Text></View>
            ))}
          </View>
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, content: { padding: 16, gap: 12 },
    formulaBox: { padding: 14, borderRadius: 12, borderWidth: 1, gap: 4 },
    formulaTitle: { fontSize: 12, fontWeight: "600" }, formula: { fontSize: 16, fontWeight: "700" },
    tableCard: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    headerRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 10 },
    th: { fontSize: 11, fontWeight: "700" },
    dataRow: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 8, borderTopWidth: 1, alignItems: "center" },
    tdBold: { fontSize: 12, fontWeight: "700" }, td: { fontSize: 12, fontWeight: "500" }, tdSmall: { fontSize: 10 },
    maintCard: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 10, borderWidth: 1, gap: 12 },
    maintIcon: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    maintTitle: { fontSize: 14, fontWeight: "600", marginBottom: 2 }, maintDetail: { fontSize: 12, lineHeight: 18 },
    safetyCard: { padding: 14, borderRadius: 12, borderWidth: 1, gap: 10 },
    safetyTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    safetyTitleText: { fontSize: 14, fontWeight: "700" },
    tipRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
    tipBullet: { width: 5, height: 5, borderRadius: 3, marginTop: 7 },
    tipText: { fontSize: 13, flex: 1, lineHeight: 20 },
  });