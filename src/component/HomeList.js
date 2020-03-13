import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

class HomeList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderItem(item, navigation) {
    const width = Dimensions.get("screen").width / 4;
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
      ...props
    } = this.props;
    const { keyExtractor, renderItem } = this;
    if (error) return <Text>{error}</Text>;
    return (
      <View>
        <View
          style={{
            flex: 1,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ color: "#2d6a27" }}>{title}</Text>
          <Button
            title={"SEE ALL"}
            buttonStyle={{ height: 20, backgroundColor: "#2d6a27" }}
            titleStyle={{ fontSize: 8 }}
            onPress={() =>
              this.props.navigation.navigate("ProductBrowse", { seeAll })
            }
          />
        </View>

        <View style={{ backgroundColor: "#edeeef", padding: 5 }}>
          <FlatList
            {...props}
            keyExtractor={keyExtractor}
            numColumns={4}
            data={data}
            renderItem={({ item }) => renderItem(item, this.props.navigation)}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(HomeList);

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
