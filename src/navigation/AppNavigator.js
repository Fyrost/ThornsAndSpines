import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/login/LoginScreen";

export default createAppContainer(
  createSwitchNavigator({
    login: LoginScreen
  })
);
