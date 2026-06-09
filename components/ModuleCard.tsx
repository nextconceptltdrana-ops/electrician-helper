import React from "react";
  import { Pressable, StyleSheet, Text, View } from "react-native";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
  import { useColors } from "@/hooks/useColors";
  interface ModuleCardProps {
    number: string; title: string; subtitle: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    onPress: () => void;
  }
  export default function ModuleCard({ number, title, subtitle, icon, onPress }: ModuleCardProps) {
    const colors = useColors();
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
    return (
      <Animated.View style={animatedStyle}>
        <Pressable onPress={onPress} onPressIn={() => { scale.value = withSpring(0.96, { damping: 15 }); }} onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.numberBadge, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.number, { color: colors.primary }]}>{number}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>{title}</Text>
              <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={2}>{subtitle}</Text>
            </View>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + "15" }]}>
              <MaterialCommunityIcons name={icon} size={26} color={colors.primary} />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  }
  const styles = StyleSheet.create({
    card: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 12, borderWidth: 1, gap: 12, marginBottom: 10 },
    numberBadge: { width: 36, height: 36, borderRadius: 8, alignItems: "center", justifyContent: "center" },
    number: { fontSize: 13, fontWeight: "700" },
    textContainer: { flex: 1 },
    title: { fontSize: 15, fontWeight: "600", marginBottom: 2 },
    subtitle: { fontSize: 12, lineHeight: 17 },
    iconContainer: { width: 48, height: 48, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  });