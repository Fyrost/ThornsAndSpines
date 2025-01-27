import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { loginAccount, catchError } from "../../misc/api";
import KeyBoardShift from "../../component/KeyboardShift";
class LoginPage extends Component {
  state = {
    loading: false,
    email: "",
    password: "",
    secureEntry: true,
    eyeIcon: "eye",
    error: "",
    layout: true
  };

  postLoginAccount = () => {
    const { email, password } = this.state;
    this.setState({ loading: true, error: "" });
    loginAccount({ email, password })
      .then(res => {
        this.setState({ loading: false });
        if (res.data.success) {
          global.api_token = res.data.api_token;
          this.props.navigation.navigate("app");
        } else {
          this.setState({ error: res.data.msg });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: catchError(err)
        });
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <ImageBackground
        source={require("../../../assets/loginBG.jpg")}
        resizeMode={"cover"}
        style={styles.containerImage}
      >
        <KeyBoardShift>
          <View style={styles.container}>
            <Input
              placeholder="sample@email.com"
              value={email}
              onChangeText={email => this.setState({ email })}
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
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              editable={!this.state.loading}
            />
            <Input
              placeholder="Password123!"
              value={password}
              onChangeText={password => this.setState({ password })}
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
              editable={!this.state.loading}
            />
            <View style={styles.textContainer}>
              <Text
                style={styles.textLink}
                onPress={() => this.props.navigation.navigate("Resend")}
              >
                Verify Account
              </Text>
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
              onPress={() => this.postLoginAccount()}
              loading={this.state.loading}
            />
          </View>
        </KeyBoardShift>
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
  inputContainer: {
    borderBottomColor: "white",
    opacity: 0.8,
    paddingBottom: 20
  },
  textContainer: {
    flexDirection: "row",
    paddingBottom: 20
  },
  textLink: {
    textDecorationLine: "underline",
    flex: 1,
    color: "lightblue",
    textAlign: "center"
  },
  buttonContainer: { borderColor: "white" },
  buttonTitle: { color: "white", paddingHorizontal: 10 }
};

export default LoginPage;
