import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

class ResendPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Resend Email</Text>
        <Input label="Email" />
        <Button
          title={"Send"}
          onPress={() => this.props.navigation.navigate("Verify")}
        />
        <Button
          title={"Already have verification Code"}
          onPress={() => this.props.navigation.navigate("Verify")}
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

export default ResendPage;
