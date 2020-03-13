import React, { Component } from "react";
import { View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { getHome, catchError } from "../../../misc/api";
import HomeList from "../../../component/HomeList";

class HomePage extends Component {
  state = {
    data: {}
  };

  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    getHome()
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
    return (
      <View>
        <ScrollView>
          <View style={{ justifyContent: "center" }}>
            <Image
              source={require("../../../../assets/header.jpg")}
              style={{
                resizeMode: "cover"
              }}
              height={200}
            />
          </View>

          <HomeList
            title={"Browse Newest Product"}
            data={this.state.data.newest_products}
            seeAll={"newest"}
          />
          <HomeList
            title={"Browse Most Popular Product"}
            data={this.state.data.best_seller_products}
            seeAll={"seller"}
          />
        </ScrollView>
        <Button
          icon={{
            type: "font-awesome",
            name: "search",
            color: "white"
          }}
          raised
          containerStyle={{ bottom: 10, right: 10, position: "absolute" }}
          buttonStyle={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: "#2d6a27"
          }}
          onPress={() =>
            this.props.navigation.navigate("ProductBrowse", {
              seeAll: "search"
            })
          }
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
    // alignItems: "center",
    // justifyContent: "center"
  }
};

export default HomePage;
