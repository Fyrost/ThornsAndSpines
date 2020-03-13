import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getUserInfo, catchError } from "../../../../misc/api";
import AccountList from "../../../../component/AccountList";
class MyAccountPage extends Component {
  state = {
    loading: false,
    user: {}
  };
  UNSAFE_componentWillMount() {
    this.getUserInfo();
  }
  getUserInfo = () => {
    this.setState({ loading: true });
    getUserInfo()
      .then(res => {
        this.setState({ user: res.data.data });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={this.getUserInfo} />
        <AccountList data={this.state.user} />
        <Button
          title={"Edit Account"}
          buttonStyle={{ backgroundColor: "#f5a210", borderRadius: 10 }}
          containerStyle={{
            width: "80%",
            bottom: 10,
            position: "absolute",
            alignSelf: "center"
          }}
          onPress={() => this.props.navigation.navigate("EditAccount")}
          loading={this.state.buttonLoading}
          raised
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

export default MyAccountPage;
