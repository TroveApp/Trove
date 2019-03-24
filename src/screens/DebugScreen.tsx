import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";

import {loadUser} from "../../util/FirebaseClient";
import {SignupForm} from "../components/SignUp";
import {AppState} from "../redux/Store";
import {connect} from "react-redux";
import {LoginState} from "../redux/reducers/Self";

interface OwnState {
  nickname?: string;
  age?: number;
}

interface OwnProps {}

type StateProps = ReturnType<typeof mapStateToProps>;

interface Props extends OwnProps, StateProps {}

function mapStateToProps(state: AppState) {
  return {
    ...state,
  };
}

class DebugScreen extends React.Component<Props, OwnState> {
  static navigationOptions = {
    header: null,
  };

  state: OwnState = {};

  async componentDidMount() {
    const user = await loadUser("anon-1");
    console.log(user);
    this.setState({
      nickname: user.nickname,
      age: user.age,
    });
    console.log("Finished setting state");
  }

  render() {
    console.log("Called render!");
    console.log(this.state);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>{`Current log in state is: ${
            this.props.self.loginState === LoginState.LoggedIn ? "Logged In" : "Logged Out"
          }`}</Text>
          <View style={styles.welcomeContainer}>
            <View style={{backgroundColor: "#EEE", margin: 10, width: "100%"}}>
              <SignupForm />
            </View>
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

export default connect(mapStateToProps)(DebugScreen);
