import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class ProductDescriptionPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Product Description</Text>
        <Button
          title={"Signup"}
          onPress={() => this.props.navigation.navigate("SignUp")}
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

export default ProductDescriptionPage;
