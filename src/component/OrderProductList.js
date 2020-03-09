import React, { Component } from "react";
import { FlatList, View, Text, Image } from "react-native";
import { ListItem } from "react-native-elements";
class OrderProductList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem(item) {
    return (
      <View
        style={{
          flexDirection: "row",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: 10,
          margin: 5
        }}
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
              height: 80,
              width: 80,
              resizeMode: "cover",
              borderWidth: 0.5,
              borderColor: "lightgray"
            }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
              paddingLeft: 20
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
                <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                  Pot Type: {item.pot_name}
                </Text>

                <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                  Price: ₱ {item.price}.00
                </Text>
                <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                  Quantity: {item.quantity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const {
      data,
      listEmptyComponent,
      listFooterComponent,
      ...props
    } = this.props;
    const { keyExtractor, renderItem } = this;
    return (
      <FlatList
        {...props}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    );
  }
}

export default OrderProductList;

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
