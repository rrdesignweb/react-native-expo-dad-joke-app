//React Deps
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

//Components
import HeaderButton from "../components/HeaderButton";
import JokesList from "../components/JokesList";

//Misc
import Colors from "../constants/Colors";

//Store
import * as jokeAction from "../store/actions/jokes-action";

const HomeScreen = (props) => {
  const jokes = useSelector((state) => state.jokes.jokes);
  const [search, setIsSearch] = useState(""); //Search
  const [newSearch, setIsNewSearch] = useState([]); //New Search

  const [isFetching, setIsFetchingFav] = useState(false); //Fav
  const [isLoading, setIsLoading] = useState(); //Loading
  const [isRefreshing, setIsRefreshing] = useState(false); //Refreshing
  const [error, setError] = useState(""); //Errors

  const dispatch = useDispatch();

  //Load Jokes
  useEffect(() => {
    console.log("load jokes");
    setIsLoading(true);
    loadJokes().then(() => {
      setIsLoading(false);
      console.log("set is loading to false");
    });
  }, [dispatch, loadJokes]); //Deps

  //Loading All Jokes
  const loadJokes = useCallback(async () => {
    console.log("enter load jokes func");
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(jokeAction.fetchJokes());
    } catch (err) {
      setError(err.message);
      console.log("error");
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  //Update after render
  useEffect(() => {
    console.log("update after render");
    const willFocusSub = props.navigation.addListener("willFocus", loadJokes);
    return () => {
      console.log("cleanup update after render");
      willFocusSub.remove();
    };
  }, [loadJokes]);

  //Load Fav Jokes
  useEffect(() => {
    console.log("load fav jokes");
    fetchingFavJokes();
  }, [dispatch, fetchingFavJokes]);

  //Favs
  const fetchingFavJokes = useCallback(async () => {
    setError(null);
    try {
      await dispatch(jokeAction.loadFavJokes());
    } catch (err) {
      setError(err.message);
    }
    setIsFetchingFav(false);
  }, [dispatch, setIsFetchingFav, setError]);

  //Events
  const updateSearch = (text) => {
    setIsSearch(text.toUpperCase());
    const newData = jokes.filter((joke) => {
      /* When no search text present, do not apply filtering */
      if (!text) {
        return true;
      }
      return (
        typeof joke.title.toUpperCase() === "string" &&
        joke.title.toUpperCase().includes(text.toUpperCase())
      );
    });
    setIsNewSearch(newData);
  };

  //Loading Spinner
  if (isLoading) {
    return (
      <View style={{ ...styles.screen, ...styles.centered }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  //Error
  if (error) {
    return (
      <View style={{ ...styles.screen, ...styles.centered }}>
        <Text style={{ color: "white" }}>An Error Occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadJokes}
          color={Colors.accentColor}
        />
      </View>
    );
  }

  //Fall Back Text
  if (!isLoading && jokes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Jokes Found</Text>
      </View>
    );
  }

  return (
    //Logo
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <View style={styles.searchBar}>
        <SearchBar
          containerStyle={{
            backgroundColor: "white",
            borderTopColor: "white",
            borderBottomColor: "white",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
          inputContainerStyle={{ backgroundColor: "white", height: 40 }}
          inputStyle={{
            backgroundColor: "white",
            color: "#232323",
            fontSize: 16,
            fontFamily: "luckiest-guy",
          }}
          lightTheme
          leftIconContainerStyle={{ backgroundColor: "white" }}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => {
            updateSearch(text);
          }}
          onClear={(text) => setIsSearch("")}
          placeholder="Search keyword.."
          value={search}
        />
      </View>
      <JokesList
        listData={!search ? jokes : newSearch}
        onRefreshing={loadJokes}
        isRefreshing={isRefreshing}
        navigation={props.navigation}
      />
    </View>
  );
};

HomeScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Home" //key
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
        <Text
          style={{
            fontFamily: "luckiest-guy",
            color: "white",
          }}
        >
          Dad Jokes &amp; Puns!
        </Text>
      ) : (
        "Dad Jokes & Puns!"
      ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 200,
    height: 100,
    marginTop: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 18,
    marginTop: 5,
  },
});

export default HomeScreen;
