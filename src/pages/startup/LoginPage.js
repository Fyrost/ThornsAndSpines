import React, { Component } from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { Button, Input, Icon, Overlay } from "react-native-elements";
import Axios from "axios";
import { loginAccount, test, catchError } from "../../misc/api";
import KeyBoardShift from "../../component/KeyboardShift";
import { ImageBrowser } from "expo-image-picker-multiple";
class LoginPage extends Component {
  state = {
    loading: false,
    email: "rytesoro10@mail.com",
    password: "Pass123!",
    secureEntry: true,
    eyeIcon: "eye",
    error: "",
    layout: true,
    baseURL: "192.168.1.4",
    imageBrowserOpen: false,
    photos: []
  };

  componentDidUpdate() {
    const { params } = this.props.navigation.state;
    if (params) {
      const { photos } = params;
      if (photos) this.setState({ photos });
      delete params.photos;
    }
  }

  renderImage(item, i) {
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  }

  postLoginAccount = () => {
    const { email, password } = this.state;
    this.setState({ loading: true, error: "" });
    loginAccount({ email, password })
      .then(res => {
        this.setState({ loading: false });
        if (res.data.success) {
          global.api_token = res.data.api_token;
          // Axios.defaults.params = {
          //   api_token: res.data.api_token
          // };
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

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        console.log(photos);
        this.setState({
          imageBrowserOpen: false,
          photos
        });
      })
      .catch(e => console.log(e));
  };

  // overlay = () => {
  //   return (
  //     <Overlay
  //       isVisible={this.state.layout}
  //       height={"auto"}
  //       overlayContainerStyle={{ padding: 50 }}
  //       borderRadius={0}
  //       windowBackgroundColor={"rgba(0, 0, 0, .8)"}
  //     >
  //       <View>
  //         <Input
  //           label="Base URL:"
  //           value={this.state.baseURL}
  //           onChangeText={baseURL => this.setState({ baseURL })}
  //         />
  //         <Button
  //           title={"enter"}
  //           onPress={() => {
  //             Axios.defaults.baseURL = `http://${this.state.baseURL}/thornsandspine/public/`;
  //             Axios.defaults.headers.common["Accept"] = "application/json";
  //             this.setState({ layout: false });
  //           }}
  //         />
  //       </View>
  //     </Overlay>
  //   );
  // };

  render() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    if (this.state.imageBrowserOpen)
      return <ImageBrowser max={4} callback={this.imageBrowserCallback} />;
    return (
      <ImageBackground
        source={require("../../../assets/loginBG.jpg")}
        resizeMode={"cover"}
        style={styles.containerImage}
      >
        <KeyBoardShift>
          <View style={styles.container}>
            {/* {this.overlay()} */}
            <Button
              title="Choose Images"
              onPress={() => {
                navigate("BrowseImage");
              }}
            />
            <Button
              title="Upload"
              onPress={() => {
                const { params } = this.props.navigation.state;
                if (params) {
                  const { photos } = params;
                  if (photos) this.setState({ photos });
                  delete params.photos;
                }
                test({ img: this.state.photos })
                  .then(res => {
                    console.log(res.data.success);
                  })
                  .catch(err => {
                    console.log(catchError(err));
                  });
              }}
            />
            <ScrollView>
              {this.state.photos.map((item, i) => this.renderImage(item, i))}
            </ScrollView>
            <Text>Logo</Text>
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
