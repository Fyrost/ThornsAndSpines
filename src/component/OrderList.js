import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { withNavigation } from "react-navigation";
class OrderList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem(item, navigation) {
    const { code, created_at } = item;
    return (
      <ListItem
        title={`Order #${code}`}
        subtitle={created_at}
        bottomDivider
        chevron
        onPress={() => navigation.navigate("OrderDetail", { code })}
      />
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
        renderItem={({ item }) => renderItem(item, this.props.navigation)}
      />
    );
  }
}

export default withNavigation(OrderList);

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
