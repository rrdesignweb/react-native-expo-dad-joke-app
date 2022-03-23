//React Deps
import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//Components
import HeaderButton from "../components/HeaderButton";

//Misc
import Colors from "../constants/Colors";

const AboutScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.instructions}>
        Swipe left on any joke then press the green star button to add your
        favourite
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/about-app.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

AboutScreen.navigationOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="About" //key
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          color="white"
        />
      </HeaderButtons>
    ),
    headerTitle: () =>
      Platform.OS === "android" ? (
        <Text style={{ fontFamily: "luckiest-guy", color: "white" }}>
          Instructions
        </Text>
      ) : (
        " Instructions"
      )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor
  },
  imageContainer: {
    width: 375,
    height: 150,
    marginTop: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  },
  image: {
    width: "100%",
    resizeMode: "contain"
  },
  instructions: {
    paddingHorizontal: 22,
    fontFamily: "luckiest-guy",
    fontSize: 22,
    color: "white",
    textAlign: "center"
  }
});

export default AboutScreen;