import { useEffect } from "react";
import { SCREEN_WIDTH } from "../constants/constants";
import { BackHandler } from "react-native";

//more balanced cross-platform approach → Use 390px
const baseWidth = 390;

export const scaleFont = (fontSize) => (SCREEN_WIDTH / baseWidth) ** (2 / 3) * fontSize

export const useDisableBackButton = () => {
    useEffect(() => {
      const handleBackButton = () => {
        return true; // Returning true prevents default behavior (going back)
      };
  
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
  
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      };
    }, []);
  };