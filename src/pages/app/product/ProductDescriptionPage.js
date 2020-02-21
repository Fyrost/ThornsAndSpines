import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

class ProductDescriptionPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.code}`,
     
    });
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.navigation.state.params.code}</Text>
        <Button
          title={"Signup"}
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

export default ProductDescriptionPage;
