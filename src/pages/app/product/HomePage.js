import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { getHome, getHeaderHome, catchError } from "../../../misc/api";
import HomeList from "../../../component/HomeList";
import Carousel from "react-native-looped-carousel";

const { width } = Dimensions.get("window");
const defaultImages = [
  require("../../../../assets/header1.jpg"),
  require("../../../../assets/header2.jpg"),
  require("../../../../assets/header.jpg")
];

class HomePage extends Component {
  state = {
    data: {},
    size: { width, height: 200 },
    headerImages: [],
    useDefaultHeader: true
  };

  UNSAFE_componentWillMount() {
    const promises = [getHome(), getHeaderHome()];
    this.setState({ loading: true });
    Promise.all(promises)
      .then(res => {
        this.setState({
          data: res[0].data.data,
          headerImages:
            res[1].data.data.length != 0 ? res[1].data.data : defaultImages,
          useDefaultHeader: res[1].data.data.length == 0
        });
        console.log(this.state.headerImages);
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: 200 } });
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
        <ScrollView>
          <View
            style={{ justifyContent: "center" }}
            onLayout={this._onLayoutDidChange}
          >
            <Carousel
              style={this.state.size}
              autoplay
              bullets={this.state.headerImages.length > 1}
            >
              {this.state.headerImages.map((uri, index) => {
                return (
                  <View style={this.state.size} key={index}>
                    <Image
                      source={this.state.useDefaultHeader ? uri : { uri }}
                      style={{
                        resizeMode: "cover", 
                        width: "100%"
                      }}
                      height={200}
                    />
                  </View>
                );
              })}
            </Carousel>
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
