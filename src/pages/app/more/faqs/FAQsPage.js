import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationEvents } from "react-navigation";
import { getFAQs, catchError } from "../../../../misc/api";
import FAQList from "../../../../component/FAQList";
class FAQsPage extends Component {
  state = {
    faqs: []
  };

  UNSAFE_componentWillMount() {
    this.getFAQs();
  }

  getFAQs = () => {
    this.setState({ loading: true });
    getFAQs()
      .then(res => {
        this.setState({ faqs: res.data.data });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            this.getFAQs();
          }}
        />
        <FAQList data={this.state.faqs} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default FAQsPage;
