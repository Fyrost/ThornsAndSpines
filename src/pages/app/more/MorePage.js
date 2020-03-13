import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";

const topList = [
  {
    name: "FAQs",
    icon: "question",
    nav: "FAQ"
  },
  {
    name: "Contact Us",
    icon: "phone",
    nav: "ContactUs"
  },
  {
    name: "My Account",
    icon: "user",
    nav: "MyAccount"
  }
];

class MorePage extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#edeeef",
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <View>
          {topList.map((item, index) => (
            <ListItem
              key={index}
              title={item.name}
              leftIcon={{
                type: "font-awesome",
                name: item.icon
              }}
              onPress={() => {
                this.props.navigation.navigate(item.nav);
              }}
              bottomDivider
              chevron
            />
          ))}
        </View>
        <View>
          <ListItem
            title={"Logout"}
            leftIcon={{
              type: "font-awesome",
              name: "sign-out"
            }}
            onPress={() => {
              Alert.alert(
                "",
                "Logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {
                      return null;
                    }
                  },
                  {
                    text: "Logout",
                    onPress: () => {
                      this.props.navigation.navigate("Login");
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
            topDivider
            chevron
          />
        </View>
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

export default MorePage;
