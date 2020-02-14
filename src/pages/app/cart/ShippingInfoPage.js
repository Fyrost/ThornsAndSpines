import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class ShippingInfoPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Shipping Information</Text>
        <Button
          title={"Order Success"}
          onPress={() => this.props.navigation.navigate("OrderSuccess")}
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

export default ShippingInfoPage;
