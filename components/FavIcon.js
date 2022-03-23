import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FavIcon = props => {
  return (
    <TouchableOpacity style={styles.rowBack} onPress={props.onSwipeJoke}>
      <View style={{ ...styles.favContainer, ...props.favBgColor }}>
        <Ionicons name={props.isFav} size={25} color="white" />
        <Text style={styles.favText}>{props.favText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
    marginHorizontal: 7
  },
  favContainer: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    right: 0
  },
  favText: {
    marginTop: 2,
    color: "white",
    fontFamily: "luckiest-guy",
    fontSize: 12
  }
});
export default FavIcon;
