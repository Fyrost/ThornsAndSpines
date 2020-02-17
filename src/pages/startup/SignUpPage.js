import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

class SignUpPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Customer Information</Text>
        <Input
          label="First Name:*"
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          inputContainerStyle={styles.inputContainer}
        />
        {/* <Button
          title={"Login"}
          onPress={() => this.props.navigation.navigate("Login")}
        /> */}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    padding: 20
  },
  titleText: {
    color: "#2d6a27",
    fontSize: 20,
    marginBottom: 10
  },
  inputLabel: {
    color: "#2d6a27",
    fontWeight: "normal",
    fontSize: 13,
    marginBottom:3
  },
  inputText: {
    fontSize: 13
  },
  inputContainer: {
    borderColor: "#2d6a27",
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
    paddingHorizontal: 5
  }
};

export default SignUpPage;
