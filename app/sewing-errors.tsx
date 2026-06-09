import React, { useState } from "react";
  import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const MACHINE_DATA = {
    Hikari: [
      { code: "E-1", cause: "সুতা ছিঁড়ে গেছে", fix: "সুতা পুনরায় থ্রেড করুন, টেনশন চেক করুন" },
      { code: "E-3", cause: "নিডেল পজিশন এরর", fix: "নিডেল সঠিক অবস্থানে আছে কিনা দেখুন" },
      { code: "E-7", cause: "মোটর ওভারলোড", fix: "মেশিন পরিষ্কার করুন, লুব্রিকেশন দিন" },
      { code: "E-9", cause: "এনকোডার সিগন্যাল নেই", fix: "মোটর এনকোডার কানেকশন চেক করুন" },
      { code: "E-11", cause: "পেডাল পজিশন এরর", fix: "পেডাল কানেকশন ও সেন্সর চেক করুন" },
      { code: "E-13", cause: "কাপড় ফিড সমস্যা", fix: "ফিড ডগ পরিষ্কার করুন, সেটিং ঠিক করুন" },
    ],
    Juki: [
      { code: "E-01", cause: "সুতা ব্রেক সেন্সর", fix: "সুতা সঠিকভাবে থ্রেড করুন, সেন্সর পরিষ্কার করুন" },
      { code: "E-02", cause: "স্টেপ মোটর এরর", fix: "স্টেপ মোটর কানেকশন চেক করুন, রিস্টার্ট করুন" },
      { code: "E-04", cause: "মেমোরি এরর", fix: "কন্ট্রোলার পাওয়ার অফ করে রিস্টার্ট দিন" },
      { code: "E-06", cause: "সেফটি সুইচ অ্যাক্টিভ", fix: "মেশিন কভার সঠিকভাবে বন্ধ করুন" },
      { code: "E-07", cause: "নিডেল ব্রেক সেন্সর", fix: "নিডেল পরিবর্তন করুন, সেন্সর চেক করুন" },
      { code: "E-18", cause: "কমিউনিকেশন এরর", fix: "কন্ট্রোলার-মোটর কেবল চেক করুন" },
      { code: "E-30", cause: "ওভার টেম্পারেচার", fix: "মেশিন ঠান্ডা হতে দিন, ভেন্টিলেশন নিশ্চিত করুন" },
    ],
    Jack: [
      { code: "E1", cause: "থ্রেড ব্রেক ডিটেক্ট", fix: "সুতা পুনরায় থ্রেড করুন" },
      { code: "E2", cause: "নিডেল পজিশন এরর", fix: "নিডেল সেটিং চেক করুন, ম্যানুয়ালি রিসেট করুন" },
      { code: "E3", cause: "মোটর ওভারহিট", fix: "মেশিন বন্ধ রাখুন, ঠান্ডা হলে চালু করুন" },
      { code: "E4", cause: "কন্ট্রোল বোর্ড এরর", fix: "পাওয়ার অফ-অন করুন, সমস্যা থাকলে বোর্ড চেক করুন" },
      { code: "E5", cause: "পেডাল সিগন্যাল এরর", fix: "পেডাল কানেক্টর খুলে পুনরায় লাগান" },
      { code: "E6", cause: "ববিন কাউন্টার রিচড", fix: "ববিন পূর্ণ হয়েছে, নতুন ববিন লাগান" },
      { code: "E8", cause: "মেইন সার্কিট এরর", fix: "পাওয়ার সাপ্লাই ও বোর্ড কানেকশন চেক করুন" },
    ],
  } as const;
  export default function SewingErrorsScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    const [selectedMachine, setSelectedMachine] = useState<keyof typeof MACHINE_DATA>("Hikari");
    const [search, setSearch] = useState("");
    const filtered = MACHINE_DATA[selectedMachine].filter((e) => e.code.toLowerCase().includes(search.toLowerCase()) || e.cause.includes(search));
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.topBar, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <View style={styles.machineRow}>
            {(Object.keys(MACHINE_DATA) as Array<keyof typeof MACHINE_DATA>).map((m) => (
              <Pressable key={m} onPress={() => { setSelectedMachine(m); setSearch(""); }} style={[styles.machineTab, { backgroundColor: selectedMachine === m ? colors.primary : colors.card, borderColor: selectedMachine === m ? colors.primary : colors.border }]}>
                <Text style={[styles.machineTabText, { color: selectedMachine === m ? "#000000" : colors.mutedForeground }]}>{m}</Text>
              </Pressable>
            ))}
          </View>
          <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialCommunityIcons name="magnify" size={16} color={colors.mutedForeground} />
            <TextInput value={search} onChangeText={setSearch} placeholder="Error Code বা কারণ লিখুন..." placeholderTextColor={colors.mutedForeground} style={[styles.searchInput, { color: colors.foreground }]} />
          </View>
        </View>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {filtered.map((err) => (
            <View key={err.code} style={[styles.errorCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.codeTag, { backgroundColor: colors.primary }]}><Text style={styles.codeText}>{err.code}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.causeText, { color: colors.foreground }]}>{err.cause}</Text>
                <View style={styles.fixRow}>
                  <MaterialCommunityIcons name="tools" size={12} color={colors.primary} />
                  <Text style={[styles.fixText, { color: colors.mutedForeground }]}>{err.fix}</Text>
                </View>
              </View>
            </View>
          ))}
          {filtered.length === 0 && <View style={styles.empty}><MaterialCommunityIcons name="magnify-close" size={32} color={colors.mutedForeground} /><Text style={[styles.emptyText, { color: colors.mutedForeground }]}>কোনো ফলাফল পাওয়া যায়নি</Text></View>}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 }, topBar: { padding: 12, borderBottomWidth: 1, gap: 10 },
    machineRow: { flexDirection: "row", gap: 8 },
    machineTab: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
    machineTabText: { fontSize: 13, fontWeight: "700" },
    searchBox: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
    searchInput: { flex: 1, fontSize: 13 },
    content: { padding: 16, gap: 8 },
    errorCard: { flexDirection: "row", alignItems: "flex-start", padding: 12, borderRadius: 10, borderWidth: 1, gap: 12 },
    codeTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, minWidth: 46, alignItems: "center" },
    codeText: { fontSize: 13, fontWeight: "700", color: "#000000" },
    causeText: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
    fixRow: { flexDirection: "row", alignItems: "flex-start", gap: 4 },
    fixText: { fontSize: 12, lineHeight: 18, flex: 1 },
    empty: { alignItems: "center", paddingTop: 40, gap: 8 },
    emptyText: { fontSize: 14, fontWeight: "500" },
  });