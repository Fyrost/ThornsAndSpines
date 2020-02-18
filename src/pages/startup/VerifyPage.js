import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

class VerifyPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Verify</Text>
        <Input
          label="Verification Token"
        />
        <Button
          title={"SignUp"}
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

export default VerifyPage;
