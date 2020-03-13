import { createStackNavigator } from "react-navigation";
import MorePage from "../../pages/app/more/MorePage";
import MyAccountPage from "../../pages/app/more/account/MyAccountPage";
import EditAccountPage from "../../pages/app/more/account/EditAccountPage";
import FAQsPage from "../../pages/app/more/faqs/FAQsPage";
import ContactUsPage from "../../pages/app/more/contact/ContactUsPage";

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
    },
    EditAccount: {
      screen: EditAccountPage,
      navigationOptions: {
        title: "Edit Account Info"
      }
    },
    FAQ: {
      screen: FAQsPage,
      navigationOptions: {
        title: "FAQs"
      }
    },
    ContactUs: {
      screen: ContactUsPage,
      navigationOptions: {
        title: "Contact Us"
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
