import React, { useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

function FeatureRow({ name, value }) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureName} numberOfLines={1}>
        {name}
      </Text>
      <View style={styles.featureRight}>
        <Text style={styles.featureValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function DetailScreen({ route }) {
  const { item } = route.params;

  const featureKeys = useMemo(
    () => Object.keys(item).filter((k) => k !== "breed"),
    [item]
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.breedCard}>
          <Text style={styles.breedTitle}>{item.breed}</Text>

          {featureKeys.length === 0 ? (
            <Text style={styles.noFeatures}>No features listed.</Text>
          ) : (
            featureKeys.map((key) => (
              <FeatureRow key={key} name={key} value={item[key]} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 12,
  },
  breedCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 12,
  },
  breedTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  noFeatures: {
    fontSize: 14,
    color: "#666",
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
  },
  featureName: {
    flex: 1,
    fontSize: 16,
    paddingRight: 10,
  },
  featureRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureValue: {
    width: 18,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "700",
  },
});