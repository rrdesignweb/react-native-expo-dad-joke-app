import Joke from "../../models/joke-model";
import {
  SET_JOKES,
  ADD_FAVOURITE,
  LOAD_FAVOURITE,
  DELETE_FAVOURITE
} from "../actions/jokes-action";

const initialState = {
  jokes: [],
  favouriteJokes: []
};

const jokesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOKES:
      return {
        ...state,
        jokes: action.jokes
      };
    case ADD_FAVOURITE:
      const newFavJoke = new Joke(
        action.favData.id.toString(),
        action.favData.title
      );
      return {
        ...state,
        favouriteJokes: state.favouriteJokes.concat(newFavJoke)
      };
    case DELETE_FAVOURITE:
      const existingIndex = state.favouriteJokes.findIndex(
        favJoke => favJoke.id === action.favJokes.id,
      );
      //Remove Joke
      const updatedFavJokes = [...state.favouriteJokes];
      updatedFavJokes.splice(existingIndex, 1);
      return { ...state, favouriteJokes: updatedFavJokes };

    case LOAD_FAVOURITE:
      return {
        ...state,
        favouriteJokes: action.favJokes.map(
          fav => new Joke(fav.id.toString(), fav.title)
        )
      };
    default:
      return state;
  }
};

export default jokesReducer;
