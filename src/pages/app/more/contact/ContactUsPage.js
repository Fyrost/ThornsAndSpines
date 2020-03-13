import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationEvents } from "react-navigation";
import { getContacts, catchError } from "../../../../misc/api";
import ContactList from "../../../../component/ContactList";

class ContactUsPage extends Component {
  state = {
    contacts: []
  };

  UNSAFE_componentWillMount() {
    this.getContacts();
  }

  getContacts = () => {
    this.setState({ loading: true });
    getContacts()
      .then(res => {
        this.setState({ contacts: res.data.data });
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
            this.getContacts();
          }}
        />
        <ContactList data={this.state.contacts} />
      </View>
    );
  }
}

export default ContactUsPage;
