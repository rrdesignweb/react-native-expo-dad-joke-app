import Joke from "../../models/joke-model";
export const SET_JOKES = "SET_JOKES";
export const LOAD_FAVOURITE = "LOAD_FAVOURITE";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const DELETE_FAVOURITE = "DELETE_FAVOURITE";

//DB Calls
import {
  insertFavJokeDB,
  fetchFavJokesDB,
  deleteFavJokeDB,
} from "../../helpers/db";

//Fetch all jokes from server
export const fetchJokes = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://happie-dad.firebaseio.com/jokes.json"
    );
    const resData = await response.json();
    const loadedJokes = [];
    for (const key in resData) {
      loadedJokes.push(new Joke(key, resData[key].title));
    }
    loadedJokes.sort(function() {
      return .5 - Math.random();
    });
    dispatch({ type: SET_JOKES, jokes: loadedJokes });
  };
};

//Add Fav Joke
export const addFavJoke = (id, title) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertFavJokeDB(title);
      dispatch({
        type: ADD_FAVOURITE,
        favData: { id: dbResult.insertId, title: title },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

//Delete Fav Joke
export const deleteFavJoke = (id, title) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteFavJokeDB(id, title);
      dispatch({
        type: DELETE_FAVOURITE,
        favJokes: { id: id, title: title },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

//Load Favourite Jokes
export const loadFavJokes = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchFavJokesDB();
      dispatch({
        type: LOAD_FAVOURITE,
        favJokes: dbResult.rows._array,
      });
    } catch (err) {
      throw err;
    }
  };
};
