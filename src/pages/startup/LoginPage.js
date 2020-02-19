import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Button, Input, Icon, Overlay } from "react-native-elements";
import Axios from "axios";
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
    layout: true,
    baseURL: "192.168.1.4"
  };

  postResend = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    loginAccount({ email, password })
      .then(res => {
        this.setState({ loading: false });
        if (res.data.success) {
          this.props.navigation.navigate("app");
        } else {
          this.state({ error: res.data.msg });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: catchError(err)
        });
      });
  };

  overlay = () => {
    return (
      <Overlay
        isVisible={this.state.layout}
        height={"auto"}
        overlayContainerStyle={{ padding: 50 }}
        borderRadius={0}
        windowBackgroundColor={"rgba(0, 0, 0, .8)"}
      >
        <View>
          <Input
            label="Base URL:"
            value={this.state.baseURL}
            onChangeText={baseURL => this.setState({ baseURL })}
          />
          <Button
            title={"enter"}
            onPress={() => {
              Axios.defaults.baseURL = `http://${this.state.baseURL}/thornsandspine/public/`;
              Axios.defaults.headers.common["Accept"] = "application/json";
              this.setState({ layout: false });
            }}
          />
        </View>
      </Overlay>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/loginBG.jpg")}
        resizeMode={"cover"}
        style={styles.containerImage}
      >
        <KeyBoardShift>
          <View style={styles.container}>
            {this.overlay()}
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
              onPress={() => this.props.navigation.navigate("app")}
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
