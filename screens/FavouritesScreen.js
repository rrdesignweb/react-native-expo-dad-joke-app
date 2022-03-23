//React Deps
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

//Components
import HeaderButton from "../components/HeaderButton";
import JokesList from "../components/JokesList";

//Store
import * as jokeAction from "../store/actions/jokes-action";

//Misc
import Colors from "../constants/Colors";

const FavouritesScreen = props => {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const favJokes = useSelector(state => state.jokes.favouriteJokes);

  useEffect(() => {
    const fetchingJokes = async () => {
      setIsFetching(true);
      dispatch(jokeAction.loadFavJokes());
      setIsFetching(false);
    };
    fetchingJokes();
    return function cleanup() {
      setIsFetching(false);
    }
  }, [dispatch]);

  if (isFetching) {
    return (
      <View style={{...styles.screen, ...styles.centered}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (favJokes.length === 0 || !favJokes) {
    return (
      <View style={styles.screen}>
        <View style={styles.fallBackTextContainer}>
          <Text style={styles.fallBackText}>No Favourite Jokes Found.</Text>
          <Text style={styles.fallBackText}>
            Add favourite jokes to populate this list!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <JokesList listData={favJokes} navigation={props.navigation} />
    </View>
  );
};

FavouritesScreen.navigationOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favourite" //key
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
          Your Favourites
        </Text>
      ) : (
        "Your Favourites"
      )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  centered: {
    alignItems: "center",
    justifyContent: "center"
  },
  fallBackTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fallBackText: {
    color: "white"
  },
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
    right: 0,
    backgroundColor: Colors.negativeColor
  },
  favText: {
    marginTop: 2,
    color: "white",
    fontFamily: "luckiest-guy"
  }
});

export default FavouritesScreen;
