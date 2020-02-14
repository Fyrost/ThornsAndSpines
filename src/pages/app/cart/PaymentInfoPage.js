import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class PaymentInfoPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Payment Information</Text>
        <Button
          title={"Shipping Info"}
          onPress={() => this.props.navigation.navigate("ShippingInfo")}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default PaymentInfoPage;
