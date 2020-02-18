import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import KeyboardShift from "../../component/KeyboardShift";
import { createAccount, catchError } from "../../misc/api";

class SignUpPage extends Component {
  state = {
    loading: false,
    email: "@gmail.com",
    password: "Pass123!",
    password1: "Pass123!",
    first_name: "Francis",
    last_name: "Antonio",
    address: "asdfga",
    city: "antios",
    contact_number: "9548757",
    error: {
      email: "",
      password: "",
      password1: "",
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      contact_number: ""
    }
  };

  postRegister = () => {
    const {
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      city,
      contact_number
    } = this.state;
    createAccount({
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      city,
      contact_number
    })
      .then(res => {
        this.setState({ loading: true });
        if (res.data.success) {
          alert(`${res.data.msg}`);
          this.props.navigation.popToTop();
          this.props.navigation.navigate("Verify");
          this.setState({ loading: false });
        } else {
          this.setState({
            error: res.data.errors,
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  };

  render() {
    const {
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      city,
      contact_number,
      error
    } = this.state;
    return (
      <ScrollView>
        <KeyboardShift style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Customer Information</Text>
            <Input
              label="First Name:*"
              value={first_name}
              onChangeText={first_name => this.setState({ first_name })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.first_name}
            />
            <Input
              label="Last Name:*"
              value={last_name}
              onChangeText={last_name => this.setState({ last_name })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.last_name}
            />
            <Input
              label="Address:*"
              value={address}
              onChangeText={address => this.setState({ address })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.address}
            />
            <Input
              label="City:*"
              value={city}
              onChangeText={city => this.setState({ city })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.city}
            />
            <Input
              label="Contact Number:*"
              value={contact_number}
              onChangeText={contact_number => this.setState({ contact_number })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.contact_number}
            />
            <Input
              label="Email:*"
              value={email}
              onChangeText={email => this.setState({ email })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.email}
            />
            <Input
              label="Password:*"
              value={password}
              onChangeText={password => this.setState({ password })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.password}
            />
            <Input
              label="Confirm Password:*"
              value={password1}
              onChangeText={password1 => this.setState({ password1 })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              errorMessage={error.password1}
            />
            <Button
              title={"Register"}
              onPress={() => {
                this.postRegister();
              }}
              loading={this.state.loading}
            />

            {/* <Text style={styles.titleText}>Shipping Information</Text>
            <Input
              label="Shipping Address:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="City:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            />
            <Input
              label="Region:*"
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
            /> */}

            {/* <Button
          title={"Login"}
          onPress={() => this.props.navigation.navigate("Login")}
        /> */}
          </View>
        </KeyboardShift>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    padding: 20
  },
  titleText: {
    color: "#2d6a27",
    fontSize: 20,
    marginBottom: 10
  },
  inputLabel: {
    color: "#2d6a27",
    fontWeight: "normal",
    fontSize: 13,
    marginBottom: 3
  },
  inputText: {
    fontSize: 13
  },
  inputContainer: {
    borderColor: "#2d6a27",
    borderWidth: 1,
    borderRadius: 7,
    height: 30,
    paddingHorizontal: 5,
    marginBottom: 3
  }
};

export default SignUpPage;
