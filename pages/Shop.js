import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Shop = ({ studyPoints, setStudyPoints }) => {
  const [dummy] = useFonts({
    "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });
  const [category, setCategory] = useState("All");
  const categories = ["All", "Food", "Toys", "Clothes", "Other"];
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Orange Juice",
      category: "Food",
      cost: 10,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Apple Juice",
      category: "Food",
      cost: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Banana Juice",
      category: "Food",
      cost: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Ball",
      category: "Toys",
      cost: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      name: "Los Diablos Ski Mask",
      category: "Clothes",
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
      <TouchableOpacity
        onPress={() => setCategory(item)}
        styles={styles.category}
      >
        <Text style={styles.categoryText}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.shopContainer}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 60,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Jua-Regular",
              alignSelf: "center",
            }}
          >
            {studyPoints}
          </Text>
          <Ionicons
            name="logo-bitcoin"
            size={24}
            color="black"
            style={{ alignSelf: "center" }}
          />
        </View>
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
      </View>
      <FlatList
        data={items.filter(
          (item) => item.category === category || category === "All"
        )}
        renderItem={renderItem}
      />
      <Pressable style={{ padding: 10 }} onPress={() => setStudyPoints(999)}>
        <Text style={{ fontSize: 26, fontFamily: "Jua-Regular" }}>
          Reset points
        </Text>
      </Pressable>
    </View>
  );
};

// Stylesheet for item, shows item, name, cost and category with picture of item
const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    backgroundColor: "#89CFF0",
    paddingBottom: 25,
  },
  item: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 5,
    borderRadius: 10,
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
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 26,
    fontFamily: "Jua-Regular",
  },
});
export default Shop;
