import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class OrderSummaryPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Order Summary</Text>
        <Text>{this.props.navigation.state.params.city_province_id}</Text>
        <Text>
          {this.props.navigation.state.params.recipient_first}
        </Text>
        <Button
          title={"Finalize"}
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

export default OrderSummaryPage;
