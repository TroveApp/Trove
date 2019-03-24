import {Google, LinearGradient} from "expo";
import React, {ReactNode} from "react";
import {StyleSheet, View, Image} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import * as firebase from "firebase";

import {Container, Text, Button, Icon, NativeBase} from "native-base";

const androidClientId = "407092306106-it03cc7c4u171mn1v5vhld04d6j3nt2u.apps.googleusercontent.com";
const iosClientId = "407092306106-j9gisuljdh3jfj08ukno8k8igvblipvq.apps.googleusercontent.com";

const GrayText = ({style, children, ...props}: NativeBase.Text & {children?: ReactNode}) => (
  <Text style={[style, { color: "rgb(95, 93, 112)"}]} {...props}>
    {children}
  </Text>
);

export default class SignUpScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = {
    header: null,
  };

  state = {};

  handleLogin = async () => {
    const result = await Google.logInAsync({androidClientId, iosClientId, scopes: ["profile", "email"]});
    if (result.type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(result.user);

      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          console.log("Experienced an auth error");
          // Handle Errors here.
        });
    }
  };

  render() {
    return (
      <Container>
        <LinearGradient
          colors={["rgb(242,163,102)", "rgb(251,214,186)"]}
          style={{flex: 1, width: "100%", height: "100%", flexDirection: "column", padding: 20}}
        >
          <View style={{flex: 5, alignItems: "center", justifyContent: "center"}}>
            <GrayText>&nbsp;</GrayText>
          </View>
          <View style={{flex: 30, alignItems: "center", justifyContent: "center"}}>
            <Image style={{width: 104, height: 104}} source={require("../../assets/images/Trove-tan.png")} />
          </View>
          <View style={{flex: 5, justifyItems: "center", alignItems: "center"}}>
            <Button
              full
              rounded
              bordered
              light
              style={{backgroundColor: "#FFF", color: "#444", marginLeft: 20, marginRight: 20}}
            >
              <Image style={{width: 16, height: 16}} source={require("../../assets/images/google-g.png")} />
              <GrayText style={{color: "#444"}} onPress={this.handleLogin}>Continue with Google</GrayText>
            </Button>
          </View>
          <View style={{flex: 12, alignItems: "center", justifyContent: "center"}}>
            <GrayText>
              Trove is an anonymous community. We need login information to confirm you’re a real person.
              However, within the community you will not be identified by name or identifiable info.{" "}
            </GrayText>
          </View>
          <View style={{flex: 18, alignItems: "center", justifyContent: "center"}}>
            <GrayText style={{ margin: 5 }}>Not a member yet?</GrayText>
            <GrayText style={{ fontWeight: '900', margin: 5 }} onPress={this.handleLogin}>Sign Up</GrayText>
          </View>
        </LinearGradient>
      </Container>
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
