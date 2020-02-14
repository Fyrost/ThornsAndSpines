import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class CartPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Cart</Text>
        <Button
          title={"Payment Info"}
          onPress={() => this.props.navigation.navigate("PaymentInfo")}
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

export default CartPage;
