import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Picker,
  ActivityIndicator
} from "react-native";
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
    province_id: "",
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
    this.setState({ loading: true });
    getProvince()
      .then(res => {
        const data = res.data.data;
        this.setState(
          { province: data, province_id: Object.keys(data).toString() },
          this.getCityPicker
        );
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getCityPicker = () => {
    this.setState({ cityLoading: true });
    getCity(this.state.province_id)
      .then(res => {
        const data = res.data.data;
        this.setState({
          city: data,
          city_province_id: Object.keys(data).toString()
        });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ cityLoading: false });
      });
  };

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
    this.setState({ btnLoading: true });
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
        } else {
          this.setState({
            error: res.data.errors
          });
        }
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ btnLoading: false });
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
      province_id,
      city,
      city_province_id,
      contact_number,
      error,
      loading,
      cityLoading,
      btnLoading
    } = this.state;
    if (loading)
      return (
        <ActivityIndicator
          size={"large"}
          style={{ justifyContent: "center", marginTop: 20 }}
        />
      );
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
                  selectedValue={province_id}
                  mode={"dialog"}
                  onValueChange={province_id =>
                    this.setState({ province_id }, this.getCityPicker)
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
                {cityLoading ? (
                  <ActivityIndicator style={{ flex: 1, alignSelf: "center" }} />
                ) : (
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
                )}
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
              loading={btnLoading}
            />
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
