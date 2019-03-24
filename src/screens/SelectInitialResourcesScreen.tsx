import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import {OnboardingState} from "../firebase/FirebaseUser";
import {Operations} from "../redux/operations";
import {Dispatcher, AppState} from "../redux/Store";
import {connect} from "react-redux";
import BubblePicker from "../components/BubblePicker";
import NextButton from "../components/NextButton";
import Colors from "../constants/Colors";
import { withLoggedInUser } from '../redux/reducers/Self';

export interface OwnProps extends NavigationScreenProps {}

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
export interface Props extends OwnProps, StateProps, DispatchProps {}

const mapStateToProps = (state: AppState) => ({
  topResources: withLoggedInUser(state.self, (self) => state.core.users[self.uid].topResources, () => { }),
});

function mapDispatchToProps(dispatch: Dispatcher, props: OwnProps) {
  return {
    continueOnboarding(resourceIds: string[]) {
      dispatch(Operations.saveTopResources(resourceIds));

      dispatch(Operations.updateOnboardingState(OnboardingState.Complete));

      props.navigation.navigate("Profile");
    },
    setTopResources(resourceIds: string[]) {
      dispatch(Operations.saveTopResources(resourceIds));
    }
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

  setTopResources = (resourceIds: string[]) => {
    this.setState({selectedResources: resourceIds})
    this.props.setTopResources(resourceIds);
  }

  continueOnboarding = () => {
    this.props.continueOnboarding(this.state.selectedResources);
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
                {text: "Therapy", id: "43107345-d3e3-43c5-8782-cbcb7cd6dc7d"},
                {text: "Meditation", id: "5073bee9-b689-41fe-9be1-e25b6eb2be79"},
                {text: "Journaling", id: "c6f30162-1651-4aff-8ec9-f36c3453705f"},
                {text: "Fitness", id: "eb46d033-e983-4226-bcde-e4783da21660"},
                {text: "Yoga", id: "cc571cc2-488c-419e-9e4d-b05237f2b308"},
                {text: "Acupuncture", id: "38bb19e1-0093-4156-9299-d3ae6cf6b90e"},
                {text: "Massage", id: "57cc11e5-2572-48aa-aee1-00fc41b42d38"},
                {text: "Medication", id: "3cba103d-3bf5-439a-b529-526479571b8a"},
                {text: "Reading", id: "d3614d4b-ac2a-47fe-87aa-b5a968149170"},
              ]}
              selectedBubbles={this.state.selectedResources}
              onChangeSelectedBubbles={this.setTopResources}
            />
            <NextButton onPress={this.continueOnboarding} />
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
  mapStateToProps,
  mapDispatchToProps,
)(SelectInitialResourcesScreen);
