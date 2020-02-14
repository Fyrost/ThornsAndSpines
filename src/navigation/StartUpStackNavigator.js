import { createStackNavigator } from "react-navigation";
import LoginPage from "../pages/startup/LoginPage";
import SignUpPage from "../pages/startup/SignUpPage";

export default createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpPage,
    navigationOptions: {
      title: "Create Account",
    }
  }
},{
  headerLayoutPreset:"center",
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor:"#2d6a27"
    },
    headerTintColor: "white"
  }
});
