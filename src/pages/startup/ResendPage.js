import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { resendCode, catchError } from "../../misc/api";

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
        if (res.data.success) {
          alert(`${res.data.msg}`);
          this.setState({ loading: false });
          this.props.navigation.navigate("Verify");
        } else {
          alert(`${res.data.msg}`);
          this.setState({ loading: false });
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
