import React, { useState } from "react";
  import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import Animated, { FadeInDown } from "react-native-reanimated";
  import BannerAd from "@/components/BannerAd";
  import { useColors } from "@/hooks/useColors";
  const INSTRUMENTS = [
    { name: "LT Panel", full: "Low Tension Distribution Panel", icon: "server" as const, color: "#3B82F6",
      description: "LT Panel হলো ফ্যাক্টরির মূল বিদ্যুৎ বিতরণ কেন্দ্র। ট্রান্সফর্মার থেকে আসা বিদ্যুৎকে বিভিন্ন সেকশনে বিতরণ করে।",
      usages: ["Main MCCB দিয়ে সম্পূর্ণ ফ্যাক্টরি বন্ধ/চালু করা যায়","প্রতিটি সেকশনের আলাদা MCB/MCCB থাকে","Current Transformer (CT) দিয়ে পাওয়ার মনিটরিং","Bus Bar-এ তিন ফেজ ও নিউট্রাল সংযুক্ত"],
      safety: ["কাজের আগে অবশ্যই মেইন সুইচ অফ করুন","Lockout/Tagout পদ্ধতি অনুসরণ করুন","লাইভ প্যানেলে কখনো খালি হাতে স্পর্শ করবেন না"],
    },
    { name: "PFI Plant", full: "Power Factor Improvement Plant", icon: "sine-wave" as const, color: "#8B5CF6",
      description: "PFI Plant বিদ্যুৎ সাশ্রয় করে। Low Power Factor মানে বেশি বিদ্যুৎ বিল। PFI Plant ক্যাপাসিটর ব্যাংক দিয়ে Power Factor উন্নত করে।",
      usages: ["Power Factor 0.7 থেকে 0.95+ এ উন্নীত করে","বিদ্যুৎ বিল ১৫-৩০% পর্যন্ত কমায়","KVAR Controller স্বয়ংক্রিয়ভাবে ক্যাপাসিটর নিয়ন্ত্রণ করে"],
      safety: ["ক্যাপাসিটরে চার্জ থাকে, কাজের আগে ডিসচার্জ করুন","বন্ধ করার ৫ মিনিট পরে স্পর্শ করুন","সঠিক KVAR Rating-এর ক্যাপাসিটর ব্যবহার করুন"],
    },
    { name: "Megger", full: "Insulation Resistance Tester", icon: "gauge" as const, color: "#10B981",
      description: "Megger Meter তারের ইন্সুলেশন পরীক্ষা করে। পুরনো বা ক্ষতিগ্রস্ত তার খুঁজে বের করতে ব্যবহার করা হয়।",
      usages: ["তারের ইন্সুলেশন রেজিস্ট্যান্স মাপা (MΩ তে)","মোটরের উইন্ডিং পরীক্ষা করা","আর্থ ফল্ট লোকেশন নির্ণয়"],
      readings: [{ range: "> 100 MΩ", status: "চমৎকার", color: "#10B981" },{ range: "10-100 MΩ", status: "ভালো", color: "#3B82F6" },{ range: "1-10 MΩ", status: "সন্তোষজনক", color: "#F59E0B" },{ range: "< 1 MΩ", status: "পরিবর্তন করুন", color: "#EF4444" }],
    },
    { name: "Clamp Meter", full: "Digital Clamp Ammeter", icon: "meter-electric-outline" as const, color: "#F59E0B",
      description: "Clamp Meter তার না কেটেই কারেন্ট মাপতে পারে। ক্ল্যাম্পটি তারের চারপাশে লাগিয়ে কারেন্ট পড়া যায়।",
      usages: ["লাইভ তারের কারেন্ট পরিমাপ (AC/DC)","ওভারলোড পরীক্ষা করা","তিন ফেজের ব্যালেন্স চেক করা","ভোল্টেজ, রেজিস্ট্যান্স মাপা"],
      safety: ["সর্বোচ্চ রেটিং-এর বেশি কারেন্ট মাপবেন না","ক্ল্যাম্পে একটাই তার রাখুন","ভেজা মিটার ব্যবহার করবেন না"],
    },
  ];
  export default function InstrumentsScreen() {
    const colors = useColors(); const insets = useSafeAreaInsets();
    const [selected, setSelected] = useState("LT Panel");
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.tabRow, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
          {INSTRUMENTS.map((inst) => (
            <Pressable key={inst.name} onPress={() => setSelected(inst.name)} style={[styles.tab, { borderBottomWidth: selected === inst.name ? 2 : 0, borderBottomColor: inst.color }]}>
              <Text style={[styles.tabText, { color: selected === inst.name ? inst.color : colors.mutedForeground, fontWeight: selected === inst.name ? "700" : "400" }]}>{inst.name}</Text>
            </Pressable>
          ))}
        </View>
        <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 16 }]} showsVerticalScrollIndicator={false}>
          {INSTRUMENTS.filter((i) => i.name === selected).map((inst) => (
            <Animated.View key={inst.name} entering={FadeInDown.springify()}>
              <View style={[styles.titleCard, { backgroundColor: inst.color + "18", borderColor: inst.color + "40" }]}>
                <MaterialCommunityIcons name={inst.icon} size={28} color={inst.color} />
                <View><Text style={[styles.instName, { color: inst.color }]}>{inst.name}</Text><Text style={[styles.instFull, { color: colors.mutedForeground }]}>{inst.full}</Text></View>
              </View>
              <Text style={[styles.desc, { color: colors.foreground }]}>{inst.description}</Text>
              <Text style={[styles.sectionHead, { color: colors.primary }]}>ব্যবহারবিধি</Text>
              {inst.usages.map((u, i) => (
                <View key={i} style={styles.listRow}><View style={[styles.bullet, { backgroundColor: inst.color }]} /><Text style={[styles.listText, { color: colors.foreground }]}>{u}</Text></View>
              ))}
              {"readings" in inst && inst.readings && (
                <>{<Text style={[styles.sectionHead, { color: colors.primary }]}>রিডিং মানে কী?</Text>}{inst.readings.map((r, i) => (
                  <View key={i} style={[styles.readingRow, { backgroundColor: r.color + "15", borderColor: r.color + "40" }]}>
                    <Text style={[styles.readingRange, { color: r.color }]}>{r.range}</Text>
                    <Text style={[styles.readingStatus, { color: r.color }]}>{r.status}</Text>
                  </View>
                ))}</>
              )}
              {"safety" in inst && inst.safety && (
                <>{<Text style={[styles.sectionHead, { color: "#EF4444" }]}>সেফটি সতর্কতা</Text>}{inst.safety.map((s, i) => (
                  <View key={i} style={styles.listRow}><MaterialCommunityIcons name="alert-circle" size={13} color="#EF4444" /><Text style={[styles.listText, { color: colors.foreground }]}>{s}</Text></View>
                ))}</>
              )}
            </Animated.View>
          ))}
        </ScrollView>
        <BannerAd />
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1 },
    tabRow: { flexDirection: "row", borderBottomWidth: 1, paddingHorizontal: 8 },
    tab: { flex: 1, alignItems: "center", paddingVertical: 12, paddingBottom: 10 },
    tabText: { fontSize: 12, textAlign: "center" },
    content: { padding: 16, gap: 10 },
    titleCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 12, borderWidth: 1, marginBottom: 6 },
    instName: { fontSize: 18, fontWeight: "700" }, instFull: { fontSize: 12, marginTop: 2 },
    desc: { fontSize: 14, lineHeight: 22, marginBottom: 4 },
    sectionHead: { fontSize: 13, fontWeight: "700", letterSpacing: 0.5, marginTop: 8, marginBottom: 6 },
    listRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 },
    bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
    listText: { fontSize: 13, lineHeight: 20, flex: 1 },
    readingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderRadius: 8, borderWidth: 1, marginBottom: 6 },
    readingRange: { fontSize: 13, fontWeight: "700" }, readingStatus: { fontSize: 13, fontWeight: "600" },
  });