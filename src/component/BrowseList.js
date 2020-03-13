import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { withNavigation } from "react-navigation";

class BrowseList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem(item, navigation) {
    const width = Dimensions.get("screen").width / 3;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDescription", { code: item.code });
        }}
      >
        <View
          style={{
            width: width,
            height: width,
            justifyContent: "center"
          }}
        >
          <Image
            style={{
              width: "90%",
              height: "90%",
              alignSelf: "center",
              borderRadius: 5
            }}
            resizeMode="contain"
            source={{ uri: item.img }}
          />
        </View>
        <View
          style={{
            width: width,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 5,
            marginBottom: 10
          }}
        >
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      data,
      error,
      title,
      listEmptyComponent,
      listFooterComponent,
      onPress,
      seeAll,
      loading,
      ...props
    } = this.props;
    const { keyExtractor, renderItem, renderEmpty } = this;
    if (loading)
      return <ActivityIndicator size={"large"} style={{ padding: 20 }} />;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <FlatList
          {...props}
          keyExtractor={keyExtractor}
          numColumns={3}
          data={data}
          renderItem={({ item }) => renderItem(item, this.props.navigation)}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 10
              }}
            >
              <Text>No Product Found...</Text>
            </View>
          }
        />
      </View>
    );
  }
}

export default withNavigation(BrowseList);

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
