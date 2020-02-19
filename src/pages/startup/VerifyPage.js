import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { verifyCode, catchError } from "../../misc/api";
import KeyboardShift from "../../component/KeyboardShift";

class VerifyPage extends Component {
  state = {
    loading: false,
    token: ""
  };

  postVerify = () => {
    const { token } = this.state;
    this.setState({ loading: true });
    verifyCode({ token })
      .then(res => {
        alert(`${res.data.msg}`);
        this.setState({ loading: false });
        if (res.data.success) {
          this.props.navigation.popToTop();
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  };

  render() {
    const { token } = this.state;
    return (
      <KeyboardShift>
        <View style={styles.container}>
          <Text>Verify</Text>
          <Input
            label="Verification Code"
            value={token}
            onChangeText={token => this.setState({ token })}
            containerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
            inputContainerStyle={{ paddingHorizontal: 20 }}
            editable={!this.state.loading}
          />
          <Button
            title={"Verify"}
            containerStyle={{ marginBottom: 10 }}
            buttonStyle={{ paddingHorizontal: 30 }}
            onPress={() => {
              this.postVerify();
            }}
            loading={this.state.loading}
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

export default VerifyPage;
