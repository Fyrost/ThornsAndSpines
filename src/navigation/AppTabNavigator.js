import { createBottomTabNavigator } from "react-navigation";

import ProductNavigator from "./app/ProductStackNavigator";
import CartNavigator from "./app/CartStackNavigator";
import AccountNavigator from "./app/AccountStackNavigator";

export default createBottomTabNavigator(
  {
    product: {
      screen: ProductNavigator
    },
    cart: {
      screen: CartNavigator
    },
    account: {
      screen: AccountNavigator
    }
  },
  {
    unmountOnBlur: true
  }
);
