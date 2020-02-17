import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import KeyboardShift from "../../component/KeyboardShift";

class SignUpPage extends Component {
  render() {
    return (
      <ScrollView>
        <KeyboardShift style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Customer Information</Text>
            <Input
              label="First Name:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Last Name:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Address:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="City:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Email:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Password:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Text style={styles.titleText}>Shipping Information</Text>
            <Input
              label="Shipping Address:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="City:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Region:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />

            {/* <Button
          title={"Login"}
          onPress={() => this.props.navigation.navigate("Login")}
        /> */}
          </View>
        </KeyboardShift>
      </ScrollView>
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
    marginBottom: 3
  },
  inputText: {
    fontSize: 13
  },
  inputContainer: {
    borderColor: "#2d6a27",
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 3
  }
};

export default SignUpPage;
