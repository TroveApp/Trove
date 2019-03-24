import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

import {AppState, Dispatcher} from "../redux/Store";
import {connect} from "react-redux";
import {LoginState} from "../redux/reducers/Self";
import {Operations} from "../redux/operations";

interface OwnState {
  nickname?: string;
  age?: number;
}

interface OwnProps {}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface Props extends OwnProps, StateProps, DispatchProps {}

function mapStateToProps(state: AppState) {
  return {
    loggedIn: state.self.loginState === LoginState.LoggedIn,
  };
}

function mapDispatchToProps(dispatch: Dispatcher) {
  return {
    onMount() {
      dispatch(
        Operations.addExperience({
          benefits: ["foo", "bar"],
          howEmpowering: 5,
          resourceId: "42",
        }),
      );
    },
  };
}

class DebugScreen extends React.Component<Props, OwnState> {
  static navigationOptions = {
    header: null,
  };

  state: OwnState = {};

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>{`Current log in state is: ${this.props.loggedIn ? "Logged In" : "Logged Out"}`}</Text>
          <View style={styles.welcomeContainer}>
            <View style={{backgroundColor: "#EEE", margin: 10, width: "100%"}} />
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
  DebugScreenFilename: {
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

export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen);
