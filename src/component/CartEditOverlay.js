import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";
import { updateCart, deleteCart, catchError } from "../misc/api";

class CartEditOverlay extends Component {
  state = {
    loading: false,
    quantityError: ""
  };

  updateCart = ({ cartId, quantity, onUpdatePress }) => {
    this.setState({ loading: true });
    updateCart({ cartId, quantity })
      .then(res => {
        if (res.data.success) {
          alert(res.data.msg);
          onUpdatePress();
        } else {
          if (res.data.errors.quantity) {
            this.setState({ quantityError: res.data.errors.quantity[0] });
          } else {
            alert(res.data.errors.cart_id[0]);
          }
        }
        this.setState({ loading: false });
      })
      .catch(err => {
        alert(catchError(err));
        this.setState({ loading: false });
      });
  };

  deleteItem = ({ cartId, onUpdatePress }) => {
    this.setState({ loading: true });
    deleteCart({ cartId })
      .then(res => {
        if (res.data.success) {
          onUpdatePress();
        }
        alert(res.data.msg);
        this.setState({ loading: false });
      })
      .catch(err => {
        alert(catchError(err));
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      productName,
      quantity,
      onChangeQuantity,
      potType,
      cartId,
      onBackdropPress,
      onUpdatePress,
      ...props
    } = this.props;
    return (
      <Overlay
        width={"50%"}
        height={"auto"}
        borderRadius={0}
        overlayStyle={{ margin: 0, padding: 20, borderRadius: 10 }}
        windowBackgroundColor={"rgba(0, 0, 0, 0.7)"}
        onBackdropPress={onBackdropPress}
        {...props}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {productName}
          </Text>
          <Text style={{ fontSize: 12, marginTop: -3, marginBottom: 5 }}>
            ({potType} Pot)
          </Text>
          <Input
            label="Quantity"
            value={quantity}
            onChangeText={onChangeQuantity}
            errorMessage={this.state.quantityError}
            keyboardType={"number-pad"}
          />
          <Button
            title={"Update"}
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ backgroundColor: "#f5a210", borderRadius: 10 }}
            loading={this.state.loading}
            onPress={() => this.updateCart({ cartId, quantity, onUpdatePress })}
          />
          <Button
            title={"Delete"}
            containerStyle={{ marginTop: 10 }}
            buttonStyle={{ backgroundColor: "red", borderRadius: 10 }}
            loading={this.state.loading}
            onPress={() =>
              Alert.alert(
                "",
                "Delete item from cart?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {
                      return null;
                    }
                  },
                  {
                    text: "Confirm",
                    onPress: () => {
                      this.deleteItem({ cartId, onUpdatePress });
                    }
                  }
                ],
                { cancelable: false }
              )
            }
          />
        </View>
      </Overlay>
    );
  }
}

export default CartEditOverlay;
