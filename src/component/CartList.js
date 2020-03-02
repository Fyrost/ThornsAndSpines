import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import CartEditOverlay from "./CartEditOverlay";

class CartList extends Component {
  state = {
    overlayVisible: false,
    quantity: 0,
    productName: "",
    potType: "",
    cartId: ""
  };
  keyExtractor = (item, index) => index.toString();
  renderSeparator = () => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "lightgray"
        }}
      />
    );
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            quantity: item.quantity,
            productName: item.name,
            potType: item.pot_type,
            overlayVisible: true,
            cartId: item.cart_id
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderBottomWidth: 0.5,
            borderBottomColor: "lightgray",
            padding: 10
          }}
          key={index}
          // onPress
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start"
              // alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: item.img
              }}
              style={{
                height: 90,
                width: 90,
                resizeMode: "cover",
                borderWidth: 0.5,
                borderColor: "lightgray"
              }}
            />
          </View>
          <View style={{ flex: 2 }}>
            <View
              style={{
                flex: 1
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={{ fontSize: 8, marginTop: -3, marginBottom: 2 }}>
                    Product Code: {item.code}
                  </Text>
                  <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                    Pot Type: {item.pot_type}
                  </Text>

                  <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                    Price: ₱ {item.price}.00/item
                  </Text>
                  <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <Text
                  style={{
                    flex: 1,
                    color: "#2d6a27",
                    fontWeight: "bold",
                    alignSelf: "flex-end",
                    textAlign: "right",
                    fontSize: 17
                  }}
                >
                  ₱ {item.sub_total}.00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      data,
      error,
      title,
      listEmptyComponent,
      listFooterComponent,
      onUpdatePress,
      ...props
    } = this.props;
    const { keyExtractor, renderItem } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View style={{ flex: 1 }}>
        <CartEditOverlay
          isVisible={this.state.overlayVisible}
          quantity={this.state.quantity}
          productName={this.state.productName}
          potType={this.state.potType}
          cartId={this.state.cartId}
          onChangeQuantity={quantity => this.setState({ quantity })}
          onBackdropPress={() => this.setState({ overlayVisible: false })}
          onUpdatePress={() => {
            this.setState({ overlayVisible: false });
            onUpdatePress();
          }}
        />
        <FlatList
          {...props}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={({ item, index }) => renderItem(item, index)}
        />
      </View>
    );
  }
}

export default CartList;

const defaultStyle = {
  emptyContainer: {
    alignItems: "center",
    marginTop: 30
  },
  emptyStyle: {
    fontSize: 18,
    fontWeight: "500"
  }
};
