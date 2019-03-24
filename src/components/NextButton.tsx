import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Colors from "../constants/Colors";

export default function NextButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: Colors.blue,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: "montserrat-semibold",
  },
});
