import React, { Component } from "react";
import { View, ScrollView, Text, Picker, Image } from "react-native";
import { getProduct, addToCart, catchError } from "../../../misc/api";
import { Button } from "react-native-elements";

class ProductDescriptionPage extends Component {
  state = {
    loading: false,
    productDetails: {},
    pots: {},
    pot: ""
  };
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title || "Loading"
  });

  UNSAFE_componentWillMount() {
    this.setState({ loading: true });
    getProduct(this.props.navigation.state.params.code)
      .then(res => {
        this.setState({
          productDetails: res.data.data.product_details,
          pots: res.data.data.pots,
          loading: false
        });
        this.props.navigation.setParams({
          title: res.data.data.product_details.name
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }

  postCart = () => {
    const { pot } = this.state;
    const { id } = this.state.productDetails;
    this.setState({ loading: true });
    addToCart({
      product_id:id,
      pot_id: pot
    })
      .then(res => {
        alert(res.data.msg);

        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: catchError(err)
        });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, position: "relative" }}>
        <View style={{ justifyContent: "center" }}>
          <Image
            source={{ uri: this.state.productDetails.img }}
            style={{
              resizeMode: "cover",
              backgroundColor: "lightgray"
            }}
            height={200}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: -3, fontSize: 15 }}>
            {this.state.productDetails.name}
          </Text>
          <Text style={{ fontSize: 10 }}>One Plant Only</Text>
          <Text
            style={{ color: "#2d6a27", fontWeight: "bold", fontSize: 17 }}
          >{`PHP ${this.state.productDetails.price}.00`}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 0,
            borderColor: "#2d6a27",
            borderWidth: 1,
            height: 30,
            paddingHorizontal: 5,
            marginVertical: 10,
            marginHorizontal: 30
          }}
        >
          <Picker
            style={[{ flex: 1, height: 30 }]}
            selectedValue={this.state.pot}
            mode={"dialog"}
            onValueChange={pot => this.setState({ pot })}
            enabled={!this.state.loading}
          >
            {Object.keys(this.state.pots).map((key, index) => {
              const potName = this.state.pots[key];
              return <Picker.Item label={potName} value={key} key={index} />;
            })}
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: "#edeeef",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text>Additional Information</Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={{ padding: 10, paddingBottom: 50 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Product Details
            </Text>
            <Text
              style={{ paddingBottom: 10, fontSize: 8 }}
            >{`Product Code: ${this.state.productDetails.code}`}</Text>
            <Text>{this.state.productDetails.description}</Text>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            title={"Add to Cart"}
            rounded
            buttonStyle={{ backgroundColor: "#ac612e" }}
            containerStyle={{ width: "80%" }}
            onPress={() => this.postCart()}
            raised
          />
        </View>
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

export default ProductDescriptionPage;
