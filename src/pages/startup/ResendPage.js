import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { resendCode, catchError } from "../../misc/api";
import KeyboardShift from "../../component/KeyboardShift";

class ResendPage extends Component {
  state = {
    loading: false,
    email: ""
  };

  postResend = () => {
    const { email } = this.state;
    this.setState({ loading: true });
    resendCode({ email })
      .then(res => {
        alert(`${res.data.msg}`);
        this.setState({ loading: false });
        if (res.data.success) {
          this.props.navigation.navigate("Verify");
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  };

  render() {
    const { email } = this.state;
    return (
      <KeyboardShift>
        <View style={styles.container}>
          <Text>Resend Email</Text>
          <Input
            label="Email"
            value={email}
            onChangeText={email => this.setState({ email })}
            containerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
            inputContainerStyle={{ paddingHorizontal: 20 }}
            editable={!this.state.loading}
          />
          <Button
            title={"Send"}
            containerStyle={{ marginBottom: 10 }}
            buttonStyle={{ paddingHorizontal: 30 }}
            onPress={() => {
              this.postResend();
            }}
            loading={this.state.loading}
          />
          <Button
            title={"Already have\nverification Code"}
            onPress={() => this.props.navigation.navigate("Verify")}
            disabled={this.state.loading}
          />
        </View>
      </KeyboardShift>
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
