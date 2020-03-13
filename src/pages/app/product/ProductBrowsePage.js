import React, { Component } from "react";
import { View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { getBrowseProduct, catchError } from "../../../misc/api";
import BrowseList from "../../../component/BrowseList";
import _ from "lodash";
class ProductBrowsePage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params.seeAll == "newest"
        ? "Newest Products"
        : navigation.state.params.seeAll == "seller"
        ? "Most Popular Products"
        : "Products"
  });
  state = {
    products: [],
    search: ""
  };

  UNSAFE_componentWillMount() {
    this.getProduct();
  }

  getProduct = _.debounce(() => {
    this.setState({ loading: true });
    getBrowseProduct({
      type: this.props.navigation.state.params.seeAll,
      search: this.state.search
    })
      .then(res => {
        this.setState({ products: res.data.data });
      })
      .catch(err => {
        alert(catchError(err));
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }, 250);

  render() {
    return (
      <View
        style={[
          styles.container,
          this.props.navigation.state.params.seeAll == "search" && {
            paddingBottom: 50
          }
        ]}
      >
        {this.props.navigation.state.params.seeAll == "search" && (
          <SearchBar
            placeholder={"Search.."}
            value={this.state.search}
            lightTheme={true}
            // platform={"android"}
            onChangeText={search => {
              this.setState({ search }, () => this.getProduct());
            }}
          />
        )}
        <BrowseList data={this.state.products} loading={this.state.loading} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"

    // alignItems: "center",
    // justifyContent: "center"
  }
};

export default ProductBrowsePage;
