import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import ProductNavigator from "./app/ProductStackNavigator";
import CartNavigator from "./app/CartStackNavigator";
import AccountNavigator from "./app/AccountStackNavigator";

export default createBottomTabNavigator(
  {
    product: {
      screen: ProductNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name={"home"} color={tintColor} />
        )
      }
    },
    cart: {
      screen: CartNavigator,
      navigationOptions: {
        tabBarLabel: "Cart",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name={"shopping-cart"} color={tintColor} />
        )
      }
    },
    account: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: "Account",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name={"user"} color={tintColor} />
        )
      }
    }
  },
  {
    unmountOnBlur: true,
    tabBarOptions: {
      activeBackgroundColor: "white",
      activeTintColor: "#0e250c",
      inactiveBackgroundColor: "#2d6a27",
      inactiveTintColor: "#0e250c"
    }
  }
);
