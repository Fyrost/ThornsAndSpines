import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import OrderList from "../../../component/OrderList";
import { getOrders, catchError } from "../../../misc/api";
import { NavigationEvents } from "react-navigation";

class OrdersPage extends Component {
  state = {
    loading: false,
    orders: []
  };
  UNSAFE_componentWillMount() {
    this.getOrders();
  }
  getOrders() {
    this.setState({ loading: true });
    getOrders()
      .then(res => {
        this.setState({ orders: res.data.data });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    if (this.state.loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
    return (
      <View>
        <NavigationEvents onWillFocus={() => this.getOrders()} />
        <OrderList data={this.state.orders} />
      </View>
    );
  }
}

export default OrdersPage;
