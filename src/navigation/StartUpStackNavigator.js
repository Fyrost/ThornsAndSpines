import { createStackNavigator } from "react-navigation";
import LoginPage from "../pages/startup/LoginPage";
import SignUpPage from "../pages/startup/SignUpPage";
import ResendPage from "../pages/startup/ResendPage";
import VerifyPage from "../pages/startup/VerifyPage";
export default createStackNavigator(
  {
    Login: {
      screen: LoginPage,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpPage,
      navigationOptions: {
        title: "Create Account"
      }
    },
    Resend: {
      screen: ResendPage,
      navigationOptions: {
        title: "Resend Verification Code"
      }
    },
    Verify: {
      screen: VerifyPage,
      navigationOptions: {
        title: "Verify"
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
