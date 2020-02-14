import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button
          title={"Signup"}
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
        <Button
          title={"App"}
          onPress={() => this.props.navigation.navigate("appli")}
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

export default LoginPage;
