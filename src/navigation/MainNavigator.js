import { createAppContainer, createSwitchNavigator } from "react-navigation";
import StartUpNavigator from "./StartUpStackNavigator";
import AppNavigator from "./AppTabNavigator";
export default createAppContainer(
  createSwitchNavigator({
    startUp: StartUpNavigator,
    appli: AppNavigator
  })
);
