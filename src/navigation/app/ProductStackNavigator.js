import { createStackNavigator } from "react-navigation";
import HomePage from "../../pages/app/product/HomePage";
import ProductDescriptionPage from "../../pages/app/product/ProductDescriptionPage";

export default createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: "Thorns & Vines"
      }
    },
    ProductDescription: {
      screen: ProductDescriptionPage,
      navigationOptions: {
        title: "Product Description"
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
