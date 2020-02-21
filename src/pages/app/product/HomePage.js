import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button, Divider } from "react-native-elements";
import { getHome, catchError } from "../../../misc/api";
import HomeList from "../../../component/HomeList";

class HomePage extends Component {
  state = {
    data: {}
  };

  UNSAFE_componentWillMount() {
    getHome()
      .then(res => {
        this.setState({ data: res.data.data });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }

  // renderItem(item) {
  //   const width = Dimensions.get("screen").width / 4;
  //   return (
  //     <TouchableOpacity>
  //       <View
  //         style={{
  //           width: width,
  //           height: width,
  //           justifyContent: "center"
  //         }}
  //       >
  //         <Image
  //           style={{
  //             width: "90%",
  //             height: "90%",
  //             alignSelf: "center",
  //             borderRadius: 5
  //           }}
  //           resizeMode="contain"
  //           source={{ uri: item.img }}
  //         />
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  render() {
    return (
      <ScrollView style={styles.container}>
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
          // onThumbnailPress={item =>
          //   this.props.navigation.push("ProductDescription", item)
          // }
        />
        <HomeList
          title={"Browse Most Popular Product"}
          data={this.state.data.best_seller_products}
        />

        {/* <Button
          title={"Signup"}
          onPress={() => this.props.navigation.navigate("SignUp")}
        /> */}
      </ScrollView>
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
