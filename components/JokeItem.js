//React Deps
import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";

const JokeItem = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.jokeItem}>
        <Text style={styles.title}>
          {props.title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jokeItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: "auto",
    minHeight: 55,
    padding: 15,
    paddingTop: Platform.OS === "ios" ? 17 : 15,
    marginBottom: 7,
    marginHorizontal: 7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    fontFamily: "luckiest-guy"
  }
});

export default JokeItem;
