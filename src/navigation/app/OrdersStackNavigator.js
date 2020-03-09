import { createStackNavigator } from "react-navigation";
import OrdersPage from "../../pages/app/order/OrdersPage";
import OrderDetail from "../../pages/app/order/OrderDetailPage";
import BrowseImagePage from "../../pages/app/order/BrowseImagePage";
export default createStackNavigator(
  {
    Orders: {
      screen: OrdersPage,
      navigationOptions: {
        title: "Orders"
      }
    },
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: {
        title: "Order Detail"
      }
    },
    BrowseImage: {
      screen: BrowseImagePage,
      navigationOptions: () => {
        return {
          title: "Selected 0 files"
        };
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
