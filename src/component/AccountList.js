import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem, Overlay, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";

class AccountList extends Component {
  state = {
    nameEditVisible: false
  };
  

  render() {
    const {
      data,
      listEmptyComponent,
      listFooterComponent,
      ...props
    } = this.props;
    const {
      email,
      first_name,
      last_name,
      contact_number,
      address,
      province,
      city,
      loyalty_points
    } = data;
    return (
      <View>
        <ListItem
          title={"Loyalty Points"}
          rightTitle={loyalty_points}
          rightTitleStyle={{
            width: "200%",
            textAlign: "right",
            marginRight: 30
          }}
          bottomDivider
        />
        <ListItem
          title={"Email"}
          rightTitle={email}
          rightTitleStyle={{
            width: "200%",
            textAlign: "right",
            marginRight: 30
          }}
          bottomDivider
        />
        <ListItem
          title={"Name"}
          rightTitle={`${first_name} ${last_name}`}
          rightTitleStyle={{
            width: "150%",
            textAlign: "right"
          }}
          bottomDivider
          onPress={() => {
            this.setState({ nameEditVisible: true });
          }}
          chevron
        />
        <ListItem
          title={"Contact Number"}
          rightTitle={contact_number}
          rightTitleStyle={{
            width: "150%",
            textAlign: "right"
          }}
          bottomDivider
          chevron
        />
        <ListItem
          title={"Address"}
          rightTitle={`${address}, ${city}, ${province}`}
          rightTitleStyle={{
            width: "150%",
            textAlign: "right"
          }}
          bottomDivider
          chevron
        />
      </View>
    );
  }
}

export default withNavigation(AccountList);

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
