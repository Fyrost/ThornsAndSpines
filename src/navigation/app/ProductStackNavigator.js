import { createStackNavigator } from "react-navigation";
import HomePage from "../../pages/app/product/HomePage";
import ProductDescriptionPage from "../../pages/app/product/ProductDescriptionPage";
import ProductBrowsePage from "../../pages/app/product/ProductBrowsePage";

export default createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: "Thorns & Vines"
      }
    },
    ProductDescription: {
      screen: ProductDescriptionPage
    },
    ProductBrowse: {
      screen: ProductBrowsePage
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
