import React, { Component } from "react";
import { View } from "react-native";
import OrderList from "../../../component/OrderList";
import { getOrders, catchError } from "../../../misc/api";
class OrdersPage extends Component {
  state = {
    loading: false,
    orders: []
  };
  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    getOrders()
      .then(res => {
        this.setState({ loading: false, orders: res.data.data });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }
  render() {
    <View>
      <OrderList data={this.state.orders} />
    </View>;
  }
}

export default OrdersPage;
