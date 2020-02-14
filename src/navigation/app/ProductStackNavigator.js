import { createStackNavigator } from "react-navigation";
import HomePage from "../../pages/app/product/HomePage";
import ProductDescriptionPage from "../../pages/app/product/ProductDescriptionPage";

export default createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  ProductDescription: {
    screen: ProductDescriptionPage,
    navigationOptions: {
      title: "Product Description"
    }
  }
});
