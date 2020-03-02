import { createStackNavigator } from "react-navigation";
import CartPage from "../../pages/app/cart/CartPage";
import PaymentInfoPage from "../../pages/app/cart/PaymentInfoPage";
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
    PaymentInfo: {
      screen: PaymentInfoPage,
      navigationOptions: {
        title: "Payment Information"
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
