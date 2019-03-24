import React from "react";
import {Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {OnboardingState} from "../firebase/FirebaseUser";
import {Operations} from "../redux/operations";
import {Dispatcher} from "../redux/Store";
import {connect} from "react-redux";
import BubblePicker from "../components/BubblePicker";
import NextButton from "../components/NextButton";
import Colors from "../constants/Colors";

export interface OwnProps extends NavigationScreenProps {}

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export interface Props extends OwnProps, DispatchProps {}

function mapDispatchToProps(dispatch: Dispatcher, props: OwnProps) {
  return {
    continueOnboarding() {
      dispatch(Operations.updateOnboardingState(OnboardingState.Complete));

      props.navigation.navigate("Profile");
    },
  };
}

interface State {
  selectedResources: Array<string>;
}

export class SelectInitialResourcesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };

  state: State = {
    selectedResources: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Image style={styles.journeyImage} source={require("../../assets/images/CreateJourney-3.png")} />
          <View style={styles.selectInitialResourcesContainer}>
            <Text style={styles.titleText}>Have any of the following helped you in your journey?</Text>
            <Text style={styles.subtitleText}>Select all that apply</Text>
            <BubblePicker
              bubbles={[
                {text: "Therapy", id: "therapy"},
                {text: "Meditation", id: "meditation"},
                {text: "Journaling", id: "journaling"},
                {text: "Fitness", id: "fitness"},
                {text: "Yoga", id: "yoga"},
                {text: "Acupuncture", id: "acupuncture"},
                {text: "Massage", id: "massage"},
                {text: "Medication", id: "medication"},
                {text: "Reading", id: "reading"},
              ]}
              selectedBubbles={this.state.selectedResources}
              onChangeSelectedBubbles={selectedBubbles => this.setState({selectedResources: selectedBubbles})}
            />
            <NextButton onPress={this.props.continueOnboarding} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  journeyImage: {
    height: 180,
    width: "100%",
    resizeMode: "contain",
  },
  contentContainer: {
    paddingTop: 30,
  },
  selectInitialResourcesContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: "montserrat-medium",
    color: Colors.nearBlack,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  subtitleText: {
    margin: 8,
    marginLeft: 20,
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: "montserrat-regular",
    color: Colors.gray,
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(SelectInitialResourcesScreen);
