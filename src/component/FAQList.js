import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { ListItem, colors } from "react-native-elements";
import { withNavigation } from "react-navigation";
import Accordion from "react-native-collapsible/Accordion";
class FAQList extends Component {
  state = {
    activeSections: []
  };

  renderHeader = (section, _, isActive) => {
    const { question } = section;
    return (
      <ListItem
        title={question}
        rightIcon={{
          type: "font-awesome",
          name: isActive ? "chevron-down" : "chevron-right",
          colors: "lightgray"
        }}
      />
    );
  };

  renderContent = section => {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: "#f5f5f5" }}>
        <Text style={{ textAlign: "justify" }}>
          {section.answer.replace(/\\n/g, "\n")}
        </Text>
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

    return (
      <Accordion
        {...props}
        sections={data}
        activeSections={this.state.activeSections}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        onChange={this.updateSections}
      />
    );
  }
}

export default withNavigation(FAQList);

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
