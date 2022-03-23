//React Deps
import React from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";

//Components
import JokeItem from "./JokeItem";
import FavIcon from "./FavIcon";

//Store
import * as jokeAction from "../store/actions/jokes-action";

//Misc
import Colors from "../constants/Colors";

const JokesList = props => {
  const dispatch = useDispatch();

  const favouriteJokes = useSelector(state => state.jokes.favouriteJokes);

  const toggleFav = (id, title) => {
    const matchFav = favouriteJokes.some(item => item.title === title);
    if (!matchFav && props.navigation.state.routeName === "Home") {
      dispatch(jokeAction.addFavJoke(id, title));
    } else if (props.navigation.state.routeName === "Favourites") {
      dispatch(jokeAction.deleteFavJoke(id));
    } else {
      Alert.alert(
        "Joke already saved to favourites",
        "Please navigate to the favourites screen to remove",
        [{ text: "Okay" }]
      );
    }
  };

  const renderJokeItem = itemData => {
    return <JokeItem title={itemData.item.title} />;
  };

  const renderHiddenFavIcon = itemData => {
    const isFavourite = favouriteJokes.some(
      fav => fav.title === itemData.item.title
    );

    let favBgColor,
      iconStyle,
      favText = "";

    if (props.navigation.state.routeName === "Home") {
      favBgColor = Colors.positiveColor;
      iconStyle = isFavourite ? "ios-star" : "ios-star-outline";
      favText = "Favourite";
    } else {
      favBgColor = Colors.negativeColor;
      iconStyle = "ios-remove-circle";
      favText = "Remove";
    }

    return (
      <FavIcon
        onSwipeJoke={() => {
          toggleFav(itemData.item.id, itemData.item.title);
        }}
        isFav={iconStyle}
        favBgColor={{ backgroundColor: favBgColor }}
        favText={favText}
      />
    );
  };

  return (
    <SwipeListView
      onRefresh={props.onRefreshing}
      refreshing={props.isRefreshing}
      data={props.listData}
      keyExtractor={item => item.id}
      renderItem={renderJokeItem}
      renderHiddenItem={renderHiddenFavIcon}
      rightOpenValue={-75}
    />
  );
};

export default JokesList;
