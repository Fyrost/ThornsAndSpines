import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { getSummary, finalizeOrder, catchError } from "../../../misc/api";

class OrderSummaryPage extends Component {
  state = {
    loading: false,
    customer_details: {
      first_name: "",
      last_name: "",
      address: "",
      province: "",
      city: "",
      loyalty_points: "",
      contact_number: "",
      email: ""
    }
  };

  UNSAFE_componentWillMount() {
    const {
      recipient_first,
      recipient_last,
      recipient_address,
      recipient_email,
      recipient_contact_number,
      city_province_id,
      courier_id,
      use_loyalty_points,
      use_mine,
      delivery_date,
      remarks,
      payment_method,
      province,
      city,
      loyalty_points,
      agent
    } = this.props.navigation.state.params;

    this.setState({ loading: true });
    getSummary({
      city_province_id,
      courier_id,
      use_loyalty_points,
      delivery_date,
      use_mine
    })
      .then(res => {
        if (res.data.success) {
          const {
            customer_details,
            total_items,
            cart_total,
            shipping_fee,
            grand_total,
            discount,
            loyalty_points_left
          } = res.data.data;
          this.setState(
            use_mine
              ? { customer_details: customer_details }
              : {
                  customer_details: {
                    first_name: recipient_first,
                    last_name: recipient_last,
                    address: recipient_address,
                    province,
                    city,
                    loyalty_points,
                    contact_number: recipient_contact_number,
                    email: recipient_email
                  }
                }
          );
          this.setState({
            remarks,
            use_loyalty_points,
            payment_method,
            delivery_date,
            total_items,
            total_items,
            cart_total,
            shipping_fee,
            grand_total,
            discount,
            loyalty_points_left,
            loading: false,
            agent
          });
        } else {
          this.setState({ loading: false });
          this.props.navigation.goBack();
          alert(res.data.msg);
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }

  postFinalizeOrder = () => {
    const {
      remarks,
      city_province_id,
      payment_method,
      recipient_first,
      recipient_last,
      recipient_address,
      recipient_email,
      recipient_contact_number,
      delivery_date,
      courier_id,
      use_loyalty_points,
      use_mine
    } = this.props.navigation.state.params;
    const data = use_mine
      ? {
          remarks,
          payment_method,
          delivery_date,
          courier_id,
          use_loyalty_points
        }
      : {
          remarks,
          city_province_id,
          payment_method,
          recipient_first,
          recipient_last,
          recipient_address,
          recipient_email,
          recipient_contact_number,
          delivery_date,
          courier_id,
          use_loyalty_points,
          use_mine
        };
    this.setState({ loading: true });
    finalizeOrder(data)
      .then(res => {
        this.setState({ loading: false });
        let message = "";
        message = res.data.msg;
        if (res.data.success) {
          alert(message.replace(/\\n/g, "\n"));
          this.props.navigation.popToTop();
        } else {
          alert(res.data.msg);
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f5a210",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ color: "white", padding: 10 }}>
            Review Delivery Details
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Name
          </Text>
          <Text style={{ flex: 3 }}>
            {this.state.customer_details.first_name}{" "}
            {this.state.customer_details.last_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Email
          </Text>
          <Text style={{ flex: 3 }}>{this.state.customer_details.email}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Contact Number
          </Text>
          <Text style={{ flex: 3 }}>
            {this.state.customer_details.contact_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Address
          </Text>
          <Text style={{ flex: 3, marginRight: 10, textAlign: "justify" }}>
            {this.state.customer_details.address}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Location
          </Text>
          <Text style={{ flex: 3 }}>
            {this.state.customer_details.city},{" "}
            {this.state.customer_details.province}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Delivery Date
          </Text>
          <Text style={{ flex: 3 }}>{this.state.delivery_date}</Text>
        </View>
        <View
          style={{
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
              Shipping Agent
            </Text>
            <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
              Payment Method
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text style={{ flex: 1 }}>{this.state.agent}</Text>
            <Text style={{ flex: 1 }}>{this.state.payment_method}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "#eeeeee",
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingLeft: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%",
            display: this.state.remarks ? "flex" : "none"
          }}
        >
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
            Remarks
          </Text>
          <Text style={{ flex: 3, marginRight: 10, textAlign: "justify" }}>
            {this.state.remarks}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "white",
            paddingHorizontal: 10,
            backgroundColor: "#f9f9f9",
            paddingVertical: 5,
            width: "100%"
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text>{this.state.total_items} item/s</Text>
                <Text>Sub Total: ₱{this.state.cart_total}.00</Text>
                <Text>Shipping Fee: ₱{this.state.shipping_fee}.00</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  display: this.state.use_loyalty_points ? "flex" : "none"
                }}
              >
                <Text>
                  Loyalty pts. Used:{" "}
                  {parseInt(this.state.customer_details.loyalty_points) -
                    this.state.loyalty_points_left}
                </Text>
                <Text>Loyalty pts. Left: {this.state.loyalty_points_left}</Text>
                <Text>Discount: ₱{this.state.discount}.00</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{
                color: "#2d6a27",
                fontWeight: "bold",
                alignSelf: "center",
                fontSize: 17
              }}
            >
              Grand Total: ₱{this.state.grand_total}.00
            </Text>
          </View>
        </View>
        {/* <Text>Order Summary</Text>

        <Text>{this.state.customer_details.loyalty_points}</Text>

        <Text>{this.state.agent}</Text>
        <Text>{this.state.payment_method}</Text>
        <Text>{this.state.remarks}</Text>
        <Text>{this.state.delivery_date}</Text>
        <Button
          title={"Finalize"}
          // onPress={() => this.props.navigation.navigate("OrderSuccess")}
          onPress={() => console.log(this.state.customer_details)}
        /> */}
        <Button
          title={"Finalize"}
          buttonStyle={{ backgroundColor: "#f5a210", borderRadius: 10 }}
          containerStyle={{ width: "80%", bottom: 10, position: "absolute" }}
          onPress={() => this.postFinalizeOrder()}
          raised
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center"
  }
};

export default OrderSummaryPage;
