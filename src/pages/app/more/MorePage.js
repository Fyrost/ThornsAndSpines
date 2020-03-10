import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class MorePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>More</Text>
        <Button
          title={"SignUp"}
          onPress={() => this.props.navigation.navigate("SignUp")}
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

export default MorePage;
