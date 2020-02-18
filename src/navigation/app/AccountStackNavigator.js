import { createStackNavigator } from "react-navigation";
import MyAccountPage from "../../pages/app/account/MyAccountPage";

export default createStackNavigator(
  {
    MyAccount: {
      screen: MyAccountPage,
      navigationOptions: {
        title: "My Account"
      }
    }
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2d6a27"
      },
      headerTintColor: "white"
    }
  }
);
