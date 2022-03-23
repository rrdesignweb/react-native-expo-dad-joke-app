//Store
import { TOGGLE_SOUND } from "../actions/sound-action";

//Misc
import { Audio } from "expo-av";

const initialState = {
  soundState: "nosound"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SOUND:
      if (state.soundState === "nosound") {
        (async () => {
          const { sound } = await Audio.Sound.createAsync(
            require("../../assets/bglaughs.mp3"),
            {
              shouldPlay: true,
              volume: 0.25,
              isLooping: true
            }
          );
          this.sound = sound;
        })();
        return {
          ...state,
          soundState: "playing"
        };
      } else if (state.soundState === "playing") {
        (async () => {
          if (this.sound !== null) {
            await this.sound.pauseAsync();
          }
        })();
        return { ...state, soundState: "donepause" };
      } else if (state.soundState === "donepause") {
        (async () => {
          await this.sound.playAsync();
        })();
        return { soundState: "playing" };
      }
  }
  return state;
};