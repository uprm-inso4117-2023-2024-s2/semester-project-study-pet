import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Shop = ({ navigation }) => {
  const [dummy] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });
  const [studyPoints, setStudyPoints] = useState(100);
  const [category, setCategory] = useState("All");
  const categories = ["All", "Category 1", "Category 2"];
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      category: "Category 1",
      cost: 10,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Item 2",
      category: "Category 1",
      cost: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Item 3",
      category: "Category 2",
      cost: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Item 4",
      category: "Category 2",
      cost: 30,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Item 5",
      category: "Category 2",
      cost: 40,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const buyItem = (item) => {
    if (studyPoints >= item.cost) {
      setStudyPoints(studyPoints - item.cost);
      // Perform the logic to give the user the item
      console.log(`You bought ${item.name}`);
    } else {
      console.log(`Not enough study points to buy ${item.name}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => buyItem(item)}>
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCost}>{item.cost}</Text>
        </View>
        <Ionicons
          name="logo-bitcoin"
          size={24}
          color="black"
          style={styles.itemIcon}
        />
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.category}>
      <TouchableOpacity onPress={() => setCategory(item)}>
        <Text style={styles.categoryText}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ justifyContent: "center", alignItems: "left" }}>
      <FlatList
        style={{
          alignSelf: "center",
          margin: 5,
          padding: 5,
          flexDirection: "row",
        }}
        data={categories}
        renderItem={renderCategory}
        horizontal={true}
      />
      <FlatList
        data={items.filter(
          (item) => item.category === category || category === "All"
        )}
        renderItem={renderItem}
      />
    </View>
  );
};

// Stylesheet for item, shows item, name, cost and category with picture of item
const styles = StyleSheet.create({
  item: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#98FB98",
    margin: 5,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 10,
  },
  itemCost: {
    fontSize: 16,
    alignSelf: "center",
  },
  itemIcon: {
    alignSelf: "center",
  },
  category: {
    padding: 5,
    backgroundColor: "#98FB98",
    margin: 5,
  },
  categoryText: {
    fontSize: 26,
    fontFamily: "Jua-Regular",
  },
});
export default Shop;
