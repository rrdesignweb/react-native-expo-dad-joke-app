//React Deps
import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

//Store
import jokesReducer from "./store/reducers/jokes-reducer";
import soundReducer from "./store/reducers/sound-reducer";

//Navigation
import DadNavigator from "./navigation/DadNavigator";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("initialized db");
  })
  .catch(err => {
    console.log(err);
  });

const rootReducer = combineReducers({
  jokes: jokesReducer,
  sound: soundReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "luckiest-guy": require("./assets/fonts/LuckiestGuy.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <DadNavigator />
    </Provider>
  );
}
