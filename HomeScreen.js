import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { cats, dogs } from "./breeds";

export default function HomeScreen({ navigation }) {
  const [show, setShow] = useState("dogs");
  const [searchQuery, setSearchQuery] = useState("");
  const data = show === "dogs" ? dogs : cats;
  const filteredData = data.filter((item) =>
    item.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBreedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.breedCard}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      <Text style={styles.breedTitle}>{item.breed}</Text>
      <Text style={styles.tapHint}>Tap to view details</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.toggle}>
          <Pressable
            style={[styles.toggleBtn, show === "dogs" && styles.toggleBtnActive]}
            onPress={() => setShow("dogs")}
          >
            <Text style={styles.toggleText}>Dogs</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleBtn, show === "cats" && styles.toggleBtnActive]}
            onPress={() => setShow("cats")}
          >
            <Text style={styles.toggleText}>Cats</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search breeds"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={filteredData}
        keyExtractor={(item) => item.breed}
        renderItem={renderBreedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  toggle: {
    flexDirection: "row",
    gap: 8,
  },
  toggleBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  toggleBtnActive: {
    borderColor: "#999",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 12,
    gap: 12,
  },
  breedCard: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 16,
    backgroundColor: "#fff",
  },
  breedTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 14,
    color: "#999",
  },
});