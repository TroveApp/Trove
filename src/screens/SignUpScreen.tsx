import { Google } from "expo";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import * as firebase from 'firebase';

const androidClientId = "407092306106-it03cc7c4u171mn1v5vhld04d6j3nt2u.apps.googleusercontent.com";
const iosClientId = "407092306106-j9gisuljdh3jfj08ukno8k8igvblipvq.apps.googleusercontent.com";

export default class SignUpScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    header: null
  };

  state = {};

  handleLogin = async () => {
    const result = await Google.logInAsync({ androidClientId, iosClientId, scopes: ["profile", "email"] });
    if (result.type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(result.user);
      
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log('Experienced an auth error');
        // Handle Errors here.
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Sign up</Text>
            <Button title="Log in" onPress={this.handleLogin} />
            <Button title="Next" onPress={() => this.props.navigation.navigate("Welcome")} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
