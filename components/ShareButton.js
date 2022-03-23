//React Deps
import React from "react";
import { Share, View, TouchableOpacity } from "react-native";

//Misc
import { Ionicons } from "@expo/vector-icons";

const ShareButton = props => {
  const shareButton = async () => {
    try {
      const result = await Share.share({
        message:
          "http://happiedad.com Happie Dad Jokes & Puns | Stuck for a dad joke? You have come to the right place!",
        url: "https://happiedad.com"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableOpacity onPress={shareButton}>
      <View style={{ paddingRight: 25 }}>
        <Ionicons name="md-share" size={22} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default ShareButton;
