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
import { allShopItems, allShopCategories } from "../utils/shopAssets";

const Shop = ({ studyPoints, setStudyPoints }) => {
  const [dummy] = useFonts({
    // "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
  });
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(allShopItems);

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
    <TouchableOpacity id={`shop-item-${item.id}`} onPress={() => buyItem(item)}>
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text id={`shop-item-${item.id}-name`} style={styles.itemName}>{item.name}</Text>
          <Text id={`shop-item-${item.id}-cost`} style={styles.itemCost}>{item.cost}</Text>
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
        id={`shop-category-${item}`}
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
            id={`shop-study-points`}
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
          data={allShopCategories}
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
      <Pressable id={`shop-reset-points-button`} style={{ padding: 10 }} onPress={() => setStudyPoints(999)}>
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
