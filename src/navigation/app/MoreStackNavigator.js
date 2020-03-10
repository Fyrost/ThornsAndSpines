import { createStackNavigator } from "react-navigation";
import MorePage from "../../pages/app/more/MorePage";
import MyAccountPage from "../../pages/app/more/account/MyAccountPage";

export default createStackNavigator(
  {
    MorePage: {
      screen: MorePage,
      navigationOptions: {
        title: "More"
      }
    },
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
