//React Deps
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

//Store
import * as soundActions from "../store/actions/sound-action";

//Misc
import { Ionicons } from "@expo/vector-icons";

const SoundButton = props => {
  const sound = useSelector(state => state.sound.soundState);

  const dispatch = useDispatch();

  const soundButton = () => {
    dispatch(soundActions.toggleSound(sound));
  };

  return (
    <TouchableOpacity onPress={soundButton}>
      <View style={{paddingRight:20}}>
        <Ionicons
          name={sound === "playing" ? "ios-volume-high" : "ios-volume-off"}
          size={24} color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SoundButton;
