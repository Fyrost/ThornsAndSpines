import React, { Component } from "react";
import { View, Text, ScrollView, Picker } from "react-native";
import { Button, Input } from "react-native-elements";
import KeyboardShift from "../../component/KeyboardShift";
import {
  getProvince,
  getCity,
  createAccount,
  catchError
} from "../../misc/api";

class SignUpPage extends Component {
  state = {
    loading: false,
    email: "",
    password: "",
    password1: "",
    first_name: "",
    last_name: "",
    address: "",
    province: {},
    provinceId: "",
    city: {},
    city_province_id: "",
    contact_number: "",
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

  UNSAFE_componentWillMount() {
    getProvince()
      .then(res => {
        const data = res.data.data;
        this.setState({ province: data });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }

  postRegister = () => {
    const {
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      city_province_id,
      contact_number
    } = this.state;
    this.setState({ loading: true });
    createAccount({
      email,
      password,
      password1,
      first_name,
      last_name,
      address,
      city_province_id,
      contact_number
    })
      .then(res => {
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
      province,
      provinceId,
      city,
      city_province_id,
      contact_number,
      error
    } = this.state;
    return (
      <ScrollView>
        <KeyboardShift>
          <View style={styles.container}>
            <Text style={styles.titleText}>Customer Information</Text>
            <Input
              label="First Name:*"
              value={first_name}
              onChangeText={first_name => this.setState({ first_name })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              autoCapitalize={"words"}
              errorMessage={error.first_name}
            />
            <Input
              label="Last Name:*"
              value={last_name}
              onChangeText={last_name => this.setState({ last_name })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              autoCapitalize={"words"}
              errorMessage={error.last_name}
            />
            <Input
              label="Address:*"
              value={address}
              onChangeText={address => this.setState({ address })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              autoCapitalize={"words"}
              errorMessage={error.address}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 10
              }}
            >
              <Text style={styles.inputLabel}>Province:*</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    flexDirection: "row",
                    paddingHorizontal: 0,
                    backgroundColor: "#eeeeee"
                  }
                ]}
              >
                <Picker
                  style={[{ flex: 1, height: 30 }]}
                  selectedValue={provinceId}
                  mode={"dialog"}
                  onValueChange={provinceId =>
                    this.setState({ provinceId }, () => {
                      getCity(provinceId)
                        .then(res => {
                          const data = res.data.data;
                          this.setState({ city: data });
                        })
                        .catch(err => {
                          this.setState({ loading: false });
                          alert(catchError(err));
                        });
                    })
                  }
                  enabled={!this.state.loading}
                >
                  {Object.keys(province).map((key, index) => {
                    const provinceLabel = province[key];
                    return (
                      <Picker.Item
                        label={provinceLabel}
                        value={key}
                        key={index}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 10
              }}
            >
              <Text style={styles.inputLabel}>City:*</Text>
              <View
                style={[
                  styles.inputContainer,
                  {
                    flexDirection: "row",
                    paddingHorizontal: 0,
                    backgroundColor: "#eeeeee"
                  }
                ]}
              >
                <Picker
                  style={[{ flex: 1, height: 30 }]}
                  selectedValue={city_province_id}
                  mode={"dialog"}
                  onValueChange={city_province_id =>
                    this.setState({ city_province_id })
                  }
                  enabled={!this.state.loading}
                >
                  {Object.keys(city).map((key, index) => {
                    const cityName = city[key];
                    return (
                      <Picker.Item label={cityName} value={key} key={index} />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <Input
              label="Contact Number:*"
              value={contact_number}
              onChangeText={contact_number => this.setState({ contact_number })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              keyboardType={"number-pad"}
              errorMessage={error.contact_number}
            />
            <Input
              label="Email:*"
              value={email}
              onChangeText={email => this.setState({ email })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              errorMessage={error.email}
            />
            <Input
              label="Password:*"
              value={password}
              onChangeText={password => this.setState({ password })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              secureTextEntry
              autoCapitalize={"none"}
              errorMessage={error.password}
            />
            <Input
              label="Confirm Password:*"
              value={password1}
              onChangeText={password1 => this.setState({ password1 })}
              labelStyle={styles.inputLabel}
              inputStyle={styles.inputText}
              inputContainerStyle={styles.inputContainer}
              secureTextEntry
              autoCapitalize={"none"}
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
