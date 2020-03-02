import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements";
import CartList from "../../../component/CartList";
import { getCart, catchError } from "../../../misc/api";
import { NavigationEvents } from "react-navigation";

class CartPage extends Component {
  state = {
    loading: false,
    products: [],
    total: ""
  };

  componentDidMount() {
    this.getCart();
  }

  getCart = () => {
    this.setState({ loading: true });
    getCart()
      .then(res => {
        this.setState({
          products: res.data.data.products,
          total: res.data.data.total,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.setState({ loading: true });
            getCart()
              .then(res => {
                this.setState({
                  products: res.data.data.products,
                  total: res.data.data.total,
                  loading: false
                });
              })
              .catch(err => {
                this.setState({ loading: false });
                alert(catchError(err));
              });
          }}
        />
        <View style={{ flex: 6 }}>
          <CartList data={this.state.products} onUpdatePress={this.getCart} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "space-between",
            padding: 10
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>SUB TOTAL ({this.state.products.length} ITEM/S)</Text>
            <Text>₱ {this.state.total}.00</Text>
          </View>
          <Button
            title={"Checkout"}
            containerStyle={{ marginHorizontal: 10 }}
            buttonStyle={{ backgroundColor: "#f5a210", borderRadius: 10 }}
            onPress={()=>this.props.navigation.navigate("RecipientInfo")}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#edeeef"
    // alignItems: "center",
    // justifyContent: "center"
  }
};

export default CartPage;
