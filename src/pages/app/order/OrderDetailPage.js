import React, { Component } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { showOrder, catchError } from "../../../misc/api";
import OrderProductList from "../../../component/OrderProductList";
import { NavigationEvents } from "react-navigation";

const statusLabel = num => {
  switch (parseInt(num)) {
    case 1:
      return "Processing";
    case 2:
      return "Delivered";
    case 3:
      return "Cancelled";
    case 5:
      return "Expired";
    case 0:
      return "Pending";
  }
};
class OrderDetailPage extends Component {
  state = {
    loading: false,
    recipient: {},
    products: []
  };
  UNSAFE_componentWillMount() {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.setState({ loading: true });
    showOrder(this.props.navigation.state.params.code)
      .then(res => {
        const data = res.data.data;
        this.setState(data);
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    const {
      code,
      remarks,
      total,
      loyalty_points,
      status,
      payment_method,
      delivery_date,
      comment,
      products,
      shipping_agent,
      shipping_fee,
      recipient,
      grand_total
    } = this.state;
    if (this.state.loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
    return (
      <View>
        <NavigationEvents onWillFocus={() => this.getOrderDetail()} />
        <ScrollView style={styles.container}>
          <View
            style={{ padding: 10, backgroundColor: "white", marginBottom: 5 }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flex: 1.2 }}>
                <Text style={{ fontSize: 18 }}>Order #{code}</Text>
                <Text style={{ color: "#a1a1a1" }}>
                  <Text>Ship via </Text>
                  <Text style={{ fontWeight: "bold" }}>{shipping_agent}</Text>
                </Text>
                <Text style={{ color: "#a1a1a1" }}>
                  <Text>Payment via </Text>
                  <Text style={{ fontWeight: "bold" }}>{payment_method}</Text>
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flex: 1 }}>
                <Text style={{ fontStyle: "italic", color: "orange" }}>
                  {statusLabel(status)}
                </Text>
                <Text style={{ color: "red", textAlign: "right" }}>
                  {comment}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ padding: 10, backgroundColor: "white", marginBottom: 5 }}
          >
            <Text style={{ color: "#a1a1a1", marginBottom: 5 }}>Ship to</Text>
            <Text
              style={{ fontSize: 18 }}
            >{`${recipient.first_name} ${recipient.last_name}`}</Text>
            <Text style={{ fontSize: 18 }}>{recipient.contact_number}</Text>
            <Text style={{ color: "#a1a1a1" }}>{recipient.address}</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingTop: 10,
              marginBottom: 5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10
              }}
            >
              <Text style={{ fontSize: 18 }}>Ordered Products</Text>
              <Text style={{ color: "#a1a1a1", fontStyle: "italic" }}>
                {products.length} item/s
              </Text>
            </View>
            <OrderProductList data={products} horizontal />
          </View>
          <View
            style={[
              {
                backgroundColor: "white",
                padding: 10
              },
              status == 0 && { paddingBottom: 50 }
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomColor: "#a1a1a1",
                borderBottomWidth: 0.5
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 17, color: "#a1a1a1", marginBottom: 10 }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{ fontSize: 17, color: "#a1a1a1", marginBottom: 10 }}
                >
                  Shipping Fee
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: "#a1a1a1",
                    marginBottom: 10,
                    display: loyalty_points == 0 ? "none" : "flex"
                  }}
                >
                  Loyalty Points Used
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 17, textAlign: "right", marginBottom: 10 }}
                >
                  ₱{total}.00
                </Text>
                <Text
                  style={{ fontSize: 17, textAlign: "right", marginBottom: 10 }}
                >
                  ₱{shipping_fee}.00
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    textAlign: "right",
                    marginBottom: 10,
                    display: loyalty_points == 0 ? "none" : "flex"
                  }}
                >
                  {loyalty_points}
                </Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 17, paddingVertical: 10, textAlign: "right" }}
            >
              <Text>Total: </Text>
              <Text style={{ color: "#ff330c" }}>₱{grand_total}.00</Text>
            </Text>
          </View>
        </ScrollView>
        <Button
          title={"Upload Reciept"}
          buttonStyle={{
            backgroundColor: "#f5a210",
            borderRadius: 10,
            display: status == 0 ? "flex" : "none"
          }}
          containerStyle={{
            width: "80%",
            bottom: 10,
            position: "absolute",
            alignSelf: "center"
          }}
          onPress={() => {
            this.setState({ comment: "" });
            this.props.navigation.navigate("BrowseImage", { code: code });
          }}
          raised
        />
      </View>
    );
  }
}

const styles = {
  container: {
    // flex: 1,
    backgroundColor: "#edeeef"
  }
};

export default OrderDetailPage;
