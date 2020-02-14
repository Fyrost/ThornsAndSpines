import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class OrderSuccessPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Order Success</Text>
        <Button
          title={"Pop"}
          onPress={() => this.props.navigation.popToTop()}
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

export default OrderSuccessPage;
