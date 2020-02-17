import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button, Input, Icon } from "react-native-elements";

class LoginPage extends Component {
  state = {
    secureEntry: true,
    eyeIcon: "eye",
    error:""
  };
  pressEye() {
    this.setState(!this.state.secureEntry);
  }
  render() {
    return (
      <ImageBackground
        source={require("../../../assets/loginBG.jpg")}
        resizeMode={"cover"}
        style={styles.containerImage}
      >
        <View style={styles.container}>
          <Text>Logo</Text>
          <Input
            placeholder="sample@email.com"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white"
            }}
            label="Email"
            placeholderTextColor="white"
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputText}
            containerStyle={styles.inputContainer}
            leftIconContainerStyle={styles.inputLeftIcon}
            placeholderTextColor="gray"
          />
          <Input
            placeholder="Password123!"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white"
            }}
            label="Password"
            placeholderTextColor="white"
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputText}
            containerStyle={styles.inputContainer}
            leftIconContainerStyle={styles.inputLeftIcon}
            placeholderTextColor="gray"
            rightIcon={
              <Icon
                type="font-awesome"
                name={this.state.eyeIcon}
                color="white"
                underlayColor="transparent"
                onPress={() =>
                  this.setState({
                    secureEntry: !this.state.secureEntry,
                    eyeIcon: this.state.secureEntry ? "eye-slash" : "eye"
                  })
                }
              />
            }
            errorMessage={this.state.error}
            secureTextEntry={this.state.secureEntry}
          />
          <View style={styles.textContainer}>
            <Text
              style={styles.textLink}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              Create Account
            </Text>
          </View>
          <Button
            title={"login"}
            type={"outline"}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("app")}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  containerImage: { width: "100%", height: "100%" },
  inputText: { color: "#f9f9f9" },
  inputLabel: { color: "white" },
  inputLeftIcon: { paddingRight: 10 },
  inputContainer: { borderBottomColor: "white", opacity: 0.8,paddingBottom:20 },
  textContainer: { flexDirection: "row",paddingBottom:20 },
  textLink: {
    textDecorationLine: "underline",
    flex: 1,
    color: "lightblue",
    textAlign: "right",
    paddingRight: 20
  },
  buttonContainer: { borderColor: "white" },
  buttonTitle: { color: "white", paddingHorizontal: 10 }
};

export default LoginPage;
