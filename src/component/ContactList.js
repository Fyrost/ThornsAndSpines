import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem, colors } from "react-native-elements";
import { withNavigation } from "react-navigation";
import Accordion from "react-native-collapsible/Accordion";
class ContactList extends Component {
  state = {
    activeSections: []
  };

  renderHeader = (section, _, isActive) => {
    const { title, icon } = section;
    return (
      <ListItem
        title={title}
        leftIcon={{
          type: "font-awesome",
          name: icon,
          color: title == "Account Number" ? "white" : "gray"
        }}
        rightIcon={{
          type: "font-awesome",
          name: isActive ? "chevron-down" : "chevron-right",
          color: "lightgray"
        }}
      />
    );
  };

  renderContent = section => {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
        <Text style={{ textAlign: "justify" }}>{section.value}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const {
      data,
      listEmptyComponent,
      listFooterComponent,
      ...props
    } = this.props;
    const newData = Object.entries(data).map(([key, value]) => {
      if (key == "contact_number")
        return { title: "Contact Number", value, icon: "phone" };
      else if (key == "email")
        return { title: "Email", value, icon: "envelope" };
      // else if (key == "bank_name")
      //   return { title: "Bank", value, icon: "university" };
      else if (key == "account_number")
        return {
          title: "Bank Account",
          value: `${data.bank_name}: ${value}`,
          icon: "university",
          color: "#ffffff"
        };
      else if (key == "gcash_number")
        return { title: "GCash", value, icon: "money" };
      else if (key == "address")
        return { title: "Address", value, icon: "map-marker" };
      else return null;
    });
    return (
      <Accordion
        {...props}
        sections={newData.filter(Boolean)}
        activeSections={this.state.activeSections}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        onChange={this.updateSections}
      />
    );
  }
}

export default withNavigation(ContactList);

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
