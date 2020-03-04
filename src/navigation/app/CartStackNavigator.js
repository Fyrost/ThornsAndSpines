import { createStackNavigator } from "react-navigation";
import CartPage from "../../pages/app/cart/CartPage";
import OrderSummaryPage from "../../pages/app/cart/OrderSummaryPage";
import RecipientInfoPage from "../../pages/app/cart/RecipientInfoPage";
import OrderSuccessPage from "../../pages/app/cart/OrderSuccessPage";

export default createStackNavigator(
  {
    Cart: {
      screen: CartPage,
      navigationOptions: {
        title: "Cart"
      }
    },
    OrderSummary: {
      screen: OrderSummaryPage,
      navigationOptions: {
        title: "Order Summary"
      }
    },
    RecipientInfo: {
      screen: RecipientInfoPage,
      navigationOptions: {
        title: "Recipient"
      }
    },
    OrderSuccess: {
      screen: OrderSuccessPage,
      navigationOptions: {
        title: "Order Successful"
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
