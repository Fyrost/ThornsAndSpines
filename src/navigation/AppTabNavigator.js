import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import ProductNavigator from "./app/ProductStackNavigator";
import CartNavigator from "./app/CartStackNavigator";
import OrderNavigator from "./app/OrdersStackNavigator";
import MoreNavigator from "./app/MoreStackNavigator";

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
    order: {
      screen: OrderNavigator,
      navigationOptions: {
        tabBarLabel: "Orders",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name={"list-ol"} color={tintColor} />
        )
      }
    },
    more: {
      screen: MoreNavigator,
      navigationOptions: {
        tabBarLabel: "More",
        tabBarIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name={"ellipsis-h"} color={tintColor} />
        )
      }
    }
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.popToTop();
        defaultHandler();
      }
    },
    tabBarOptions: {
      activeBackgroundColor: "white",
      activeTintColor: "#0e250c",
      inactiveBackgroundColor: "#2d6a27",
      inactiveTintColor: "#0e250c"
    }
  }
);
