import React, { Component } from "react";
import { View, Text, TextInput, Picker, Switch } from "react-native";
import { Button, ButtonGroup, Icon } from "react-native-elements";
import { getRecipient, getCity, catchError } from "../../../misc/api";
import DatePicker from "react-native-datepicker";

const dateNow = new Date();
const formattedDate = `${dateNow.getMonth() +
  1}-${dateNow.getDate()}-${dateNow.getFullYear()}`;

class ShippingInfoPage extends Component {
  state = {
    loading: false,
    recipientSwitch: false,
    provinceId: "",
    remarks: "",
    city_province_id: "",
    payment_method: "Bank Transfer",
    recipient_first: "",
    recipient_last: "",
    recipient_address: "",
    recipient_email: "",
    recipient_contact_number: "",
    delivery_date: formattedDate,
    courier_id: "",
    use_loyalty_points: false,
    loyaltyPoints: "0",
    province: {},
    city: {},
    shipping: [],
    paymentIndex: 0,
    agentIndex: 0
  };

  UNSAFE_componentWillMount() {
    getRecipient()
      .then(res => {
        const data = res.data.data;
        const shipArr = Object.entries(data.shipping_agents).map(
          ([key, value]) => {
            return { [key]: value };
          }
        );
        this.setState({
          province: data.provinces,
          shipping: shipArr,
          courier_id: Object.keys(shipArr[this.state.agentIndex]).toString(),
          loyaltyPoints: data.loyalty_points
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        alert(catchError(err));
      });
  }

  render() {
    const {
      recipient_first,
      recipient_last,
      recipient_address,
      recipient_email,
      recipient_contact_number,
      remarks,
      delivery_date,
      city_province_id,
      courier_id,
      use_loyalty_points,
      loyaltyPoints,
      payment_method
    } = this.state;
    const paymentButtons = ["Bank Transfer", "GCash"];
    const agentButtons = this.state.shipping.map(obj => {
      return Object.values(obj).toString();
    });

    let passParam = this.state.recipientSwitch
      ? {
          city_province_id,
          courier_id,
          use_loyalty_points,
          use_mine: this.state.recipientSwitch,
          delivery_date,
          payment_method,
          agent: agentButtons[this.state.agentIndex],
          remarks
        }
      : {
          recipient_first,
          recipient_last,
          recipient_address,
          recipient_email,
          recipient_contact_number,
          remarks,
          delivery_date,
          city_province_id,
          courier_id,
          payment_method,
          agent: agentButtons[this.state.agentIndex],
          use_loyalty_points,
          loyalty_points: loyaltyPoints,
          use_mine: this.state.recipientSwitch,
          province: this.state.province[this.state.provinceId],
          city: this.state.city[this.state.city_province_id]
        };

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#f5a210",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ color: "white", padding: 10 }}>
            Add your recipient information
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Use mine</Text>
            <Switch
              value={this.state.recipientSwitch}
              onValueChange={recipientSwitch =>
                this.setState({ recipientSwitch })
              }
            />
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={this.state.recipientSwitch && { display: "none" }}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder={"First Name"}
                value={recipient_first}
                onChangeText={recipient_first =>
                  this.setState({ recipient_first })
                }
                style={{
                  flex: 1,
                  borderColor: "#eeeeee",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  backgroundColor: "#f9f9f9",
                  paddingVertical: 5
                }}
                autoCapitalize={"words"}
              />
              <TextInput
                placeholder={"Last Name"}
                value={recipient_last}
                onChangeText={recipient_last =>
                  this.setState({ recipient_last })
                }
                style={{
                  flex: 1,
                  borderColor: "#eeeeee",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  backgroundColor: "#f9f9f9",
                  paddingVertical: 5
                }}
                autoCapitalize={"words"}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder={"Email"}
                value={recipient_email}
                onChangeText={recipient_email =>
                  this.setState({ recipient_email })
                }
                style={{
                  flex: 1,
                  borderColor: "#eeeeee",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  paddingLeft: 10,
                  backgroundColor: "#f9f9f9",
                  paddingVertical: 5
                }}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
              />
              <TextInput
                placeholder={"Contact Number"}
                value={recipient_contact_number}
                onChangeText={recipient_contact_number =>
                  this.setState({ recipient_contact_number })
                }
                style={{
                  flex: 1,
                  borderColor: "#eeeeee",
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: "white",
                  paddingLeft: 10,
                  backgroundColor: "#f9f9f9",
                  paddingVertical: 5
                }}
                keyboardType={"number-pad"}
              />
            </View>
            <TextInput
              placeholder={"Address"}
              value={recipient_address}
              onChangeText={recipient_address =>
                this.setState({ recipient_address })
              }
              style={{
                borderColor: "#eeeeee",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderTopColor: "white",
                paddingHorizontal: 10,
                backgroundColor: "#f9f9f9",
                paddingVertical: 5,
                maxHeight: 48,
                textAlignVertical: "top",
                textAlign: "justify"
              }}
              autoCapitalize={"words"}
              numberOfLines={2}
              multiline
            />
            <View
              style={{
                flexDirection: "row",
                borderColor: "#eeeeee",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderTopColor: "white",
                paddingLeft: 10,
                backgroundColor: "#f9f9f9",
                paddingVertical: 5
              }}
            >
              <Picker
                style={[
                  { flex: 1, height: 30 },
                  this.state.provinceId == ""
                    ? {
                        color: "lightgray"
                      }
                    : {
                        color: "black"
                      }
                ]}
                selectedValue={this.state.provinceId}
                mode={"dialog"}
                onValueChange={provinceId =>
                  provinceId !== "0" &&
                  this.setState({ provinceId }, () => {
                    getCity(provinceId)
                      .then(res => {
                        const data = res.data.data;
                        this.setState({
                          loading: false,
                          city: data,
                          city_province_id: ""
                        });
                      })
                      .catch(err => {
                        this.setState({ loading: false });
                        alert(catchError(err));
                      });
                  })
                }
                enabled={!this.state.loading}
              >
                <Picker.Item label={"Province"} value={"0"} style />
                {Object.keys(this.state.province).map((key, index) => {
                  const provinceLabel = this.state.province[key];
                  return (
                    <Picker.Item
                      label={provinceLabel}
                      value={key}
                      key={index}
                    />
                  );
                })}
              </Picker>
              <Picker
                style={[
                  { flex: 1, height: 30 },
                  this.state.city_province_id == ""
                    ? {
                        color: "lightgray"
                      }
                    : {
                        color: "black"
                      }
                ]}
                selectedValue={this.state.city_province_id}
                mode={"dialog"}
                onValueChange={city_province_id =>
                  city_province_id !== "0" &&
                  this.setState({ city_province_id })
                }
                enabled={!this.state.loading}
              >
                <Picker.Item label={"City"} value={"0"} style />
                {Object.keys(this.state.city).map((key, index) => {
                  const cityName = this.state.city[key];
                  return (
                    <Picker.Item label={cityName} value={key} key={index} />
                  );
                })}
              </Picker>
            </View>
          </View>
          <TextInput
            placeholder={"Remarks"}
            value={remarks}
            onChangeText={remarks => this.setState({ remarks })}
            style={{
              borderColor: "#eeeeee",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "white",
              paddingHorizontal: 10,
              backgroundColor: "#f9f9f9",
              paddingVertical: 5,
              maxHeight: 48,
              textAlignVertical: "top",
              textAlign: "justify"
            }}
            numberOfLines={2}
            multiline
          />
          <View
            style={{
              flexDirection: "row",
              borderColor: "#eeeeee",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "white",
              paddingHorizontal: 10,
              backgroundColor: "#f9f9f9",
              paddingVertical: 5
            }}
          >
            <DatePicker
              date={delivery_date}
              onDateChange={delivery_date => {
                this.setState({ delivery_date });
              }}
              minDate={new Date()}
              format={"MM-DD-YYYY"}
              iconComponent={
                <Icon
                  type={"font-awesome"}
                  name={"calendar"}
                  color={"#4f9deb"}
                />
              }
              containerStyle={{ flex: 1 }}
              customStyles={{ dateInput: { borderWidth: 0 } }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 30
              }}
            >
              <View style={{ alignItems: "flex-end" }}>
                <Text>Loyalty Pts:</Text>
                <Text style={{ marginRight: 5 }}>
                  {this.state.loyaltyPoints}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Use</Text>
                <Switch
                  value={this.state.use_loyalty_points}
                  onValueChange={use_loyalty_points =>
                    this.setState({ use_loyalty_points })
                  }
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderColor: "#eeeeee",
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: "white",
              paddingHorizontal: 10,
              backgroundColor: "#f9f9f9",
              paddingVertical: 5
            }}
          >
            <Text>Shipping Agent:</Text>
            <ButtonGroup
              onPress={agentIndex => {
                this.setState({
                  agentIndex,
                  courier_id: Object.keys(
                    this.state.shipping[agentIndex]
                  ).toString()
                });
              }}
              selectedIndex={this.state.agentIndex}
              buttons={agentButtons}
              containerStyle={{ height: 30 }}
            />
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "white",
              paddingHorizontal: 10,
              backgroundColor: "#f9f9f9",
              paddingVertical: 5
            }}
          >
            <Text>Payment Method:</Text>
            <ButtonGroup
              onPress={paymentIndex => {
                this.setState({
                  paymentIndex,
                  payment_method: paymentButtons[paymentIndex]
                });
              }}
              selectedIndex={this.state.paymentIndex}
              buttons={paymentButtons}
              containerStyle={{ height: 30 }}
            />
          </View>
        </View>
        <Button
          title={"Continue"}
          buttonStyle={{ backgroundColor: "#f5a210", borderRadius: 10 }}
          containerStyle={{ width: "80%", bottom: 10, position: "absolute" }}
          onPress={() =>
            this.props.navigation.navigate("OrderSummary", passParam)
          }
          raised
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center"
  }
};

export default ShippingInfoPage;
