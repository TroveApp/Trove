import React from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {connect} from "react-redux";
import {AppState} from "../redux/Store";

interface State {
  benefits: Array<string>;
}

function mapStateToProps(state: AppState) {
  return state.core;
}

interface PreviousState {
  resourceId: string;
}

class AddExperienceBenefitsScreen extends React.Component<
  NavigationScreenProps<PreviousState> & ReturnType<typeof mapStateToProps>,
  State
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    benefits: [],
  };

  handleDone = () => {
    this.props.navigation.navigate("AddExperienceHowEmpowering", {
      resourceId: this.props.navigation.getParam("resourceId"),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>What were the benefits?</Text>
            <Button title="Done" onPress={this.handleDone} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default connect(mapStateToProps)(AddExperienceBenefitsScreen);
