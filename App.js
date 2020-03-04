import React, { Component } from "react";
import { YellowBox } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";
import Axios from "axios";

YellowBox.ignoreWarnings(["componentWillReceiveProps", "VirtualizedLists"]);

export default class App extends Component {
  render() {
    Axios.defaults.baseURL = `http://www.blacklistgraphics.com/`;
    Axios.defaults.headers.common["Accept"] = "application/json";
    return <MainNavigator />;
  }
}
