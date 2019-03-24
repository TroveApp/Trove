import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import Colors from "../constants/Colors";

interface Bubble {
  text: string;
  id: string;
}

interface BubblePickerProps {
  bubbles: Array<Bubble>;
  selectedBubbles: Array<string>;
  onChangeSelectedBubbles: (selectedBubbles: Array<string>) => void;
}

export default function BubblePicker({bubbles, selectedBubbles, onChangeSelectedBubbles}: BubblePickerProps) {
  return (
    <View style={styles.bubblePickerContainer}>
      {bubbles.map(bubble => {
        const isFocused = selectedBubbles.includes(bubble.id);
        return (
          <TouchableWithoutFeedback
            key={bubble.id}
            onPress={() => {
              if (isFocused) {
                onChangeSelectedBubbles(selectedBubbles.filter(id => id !== bubble.id));
              } else {
                onChangeSelectedBubbles([...selectedBubbles, bubble.id]);
              }
            }}
          >
            <View style={isFocused ? styles.bubbleFocused : styles.bubbleUnfocused}>
              <Text style={isFocused ? styles.bubbleTextFocused : styles.bubbleTextUnfocused}>
                {bubble.text}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bubblePickerContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  bubbleFocused: {
    margin: 8,
    padding: 10,
    borderColor: Colors.red,
    backgroundColor: Colors.red,
    borderWidth: 1,
    borderRadius: 8,
  },
  bubbleUnfocused: {
    margin: 8,
    padding: 10,
    borderColor: Colors.mediumGray,
    borderWidth: 1,
    borderRadius: 8,
  },
  bubbleTextFocused: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    color: Colors.white,
  },
  bubbleTextUnfocused: {
    fontSize: 16,
    fontFamily: "montserrat-regular",
    color: Colors.nearBlack,
  },
});
