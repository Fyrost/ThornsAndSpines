import { createStackNavigator } from "react-navigation";
import CartPage from "../../pages/app/cart/CartPage";
import PaymentInfoPage from "../../pages/app/cart/PaymentInfoPage";
import ShippingInfoPage from "../../pages/app/cart/ShippingInfoPage";
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
    ShippingInfo: {
      screen: ShippingInfoPage,
      navigationOptions: {
        title: "Shipping Information"
      }
    },
    OrderSuccess: {
      screen: OrderSuccessPage,
      navigationOptions: {
        title: "Order Successful"
      }
    }
  },
);
