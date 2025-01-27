import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  UIManager
} from "react-native";

const { State: TextInputState } = TextInput;

export default class KeyboardShift extends Component {
  state = {
    shift: new Animated.Value(0)
  };

  UNSAFE_componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { shift } = this.state;
    return (
      <Animated.View
        style={[
          this.props.style,
          { flex: 1, transform: [{ translateY: shift }] }
        ]}
      >
        {renderProp}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap =
          windowHeight - keyboardHeight - (fieldTop + fieldHeight + 20);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 140,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true
    }).start();
  };
}
