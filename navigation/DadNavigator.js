//React Deps
import React from "react";
import { Platform, Text, View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"; //Android

//Components
import SoundButton from "../components/SoundButton";
import ShareButton from "../components/ShareButton";

//Misc
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

//Screens
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

//Default Nav
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTitleStyle: {
    fontFamily: "luckiest-guy"
  },
  headerTintColor: "white",
  headerRight: () => (
    <View style={{flexDirection:"row"}}>
      <ShareButton />
      <SoundButton />
    </View>
  )
};

//Jokes Stack
const DadNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);


//Fav Stack
const FavNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//About Stack
const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//Tab Config
const tabScreenConfig = {
  Jokes: {
    screen: DadNavigator, //Nesting MealsNavigator Stack
    navigationOptions: {
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "luckiest-guy" }}>Jokes</Text>
        ) : (
          "Jokes"
        ),
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-happy" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor //only shifting effect
    }
  },
  Favourites: {
    screen: FavNavigator, //Nesting FavNavigator Stack
    navigationOptions: {
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "luckiest-guy" }}>Favourties</Text>
        ) : (
          "Favourties"
        ),
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor //only shifting effect onPress
    }
  }
};

const TabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.accentColor,
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "luckiest-guy",
            fontSize: 15
          },
          activeTintColor: Colors.primaryColor
        }
      });

const MainNavigator = createDrawerNavigator(
  {
    Jokes: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: "Jokes & Puns",
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: "About",
        drawerIcon: drawerConfig => (
          <Ionicons
            name={
              Platform.OS === "android" ? "md-help-circle" : "ios-help-circle"
            }
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

export default createAppContainer(MainNavigator);
