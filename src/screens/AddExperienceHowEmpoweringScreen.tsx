import React from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationScreenProps, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {AppState, Dispatcher} from "../redux/Store";
import {coreAction} from "../redux/reducers/Core";

interface State {
  howEmpowering: number;
}

function mapStateToProps(state: AppState) {
  return state.core;
}

const mapDispatchToProps = (dispatch: Dispatcher) => ({
  onAddExperience: (resourceId: string, benefits: Array<string>, howEmpowering: number) => {
    dispatch(coreAction.addExperience({resourceId, benefits, howEmpowering}));
  },
});

interface PreviousState {
  resourceId: string;
  benefits: Array<string>;
}

class AddExperienceResourceScreen extends React.Component<
  NavigationScreenProps<PreviousState> &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>,
  State
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    howEmpowering: 0.7,
  };

  handleDone = () => {
    this.props.onAddExperience(
      this.props.navigation.getParam("resourceId"),
      this.props.navigation.getParam("benefits"),
      this.state.howEmpowering,
    );
    this.props.navigation.navigate("AddExperienceResource");
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>How empowering</Text>
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
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExperienceResourceScreen);
