import { Feather } from "@expo/vector-icons";
  import { reloadAppAsync } from "expo";
  import React from "react";
  import { Pressable, StyleSheet, Text, View } from "react-native";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { useColors } from "@/hooks/useColors";
  export type ErrorFallbackProps = { error: Error; resetError: () => void; };
  export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
    const colors = useColors(); const insets = useSafeAreaInsets();
    const handleRestart = async () => {
      try { await reloadAppAsync(); } catch { resetError(); }
    };
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.content}>
          <Feather name="alert-circle" size={48} color={colors.destructive} />
          <Text style={[styles.title, { color: colors.foreground }]}>Something went wrong</Text>
          <Text style={[styles.message, { color: colors.mutedForeground }]}>Please reload the app to continue.</Text>
          <Pressable onPress={handleRestart} style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={[styles.buttonText, { color: colors.primaryForeground }]}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    content: { alignItems: "center", gap: 16 },
    title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
    message: { fontSize: 16, textAlign: "center" },
    button: { paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10 },
    buttonText: { fontWeight: "700", fontSize: 16 },
  });