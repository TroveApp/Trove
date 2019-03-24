import {Google, LinearGradient} from "expo";
import React, {ReactNode} from "react";
import {View, Image} from "react-native";
import {NavigationScreenProps} from "react-navigation";
import * as firebase from "firebase";

import {Container, Text, Button, NativeBase} from "native-base";
import {AppState} from "../redux/Store";
import {connect} from "react-redux";
import {LoginState} from "../redux/reducers/Self";
import {OnboardingState} from "../firebase/FirebaseUser";

const androidClientId = "407092306106-it03cc7c4u171mn1v5vhld04d6j3nt2u.apps.googleusercontent.com";
const iosClientId = "407092306106-j9gisuljdh3jfj08ukno8k8igvblipvq.apps.googleusercontent.com";

const GrayText = ({style, children, ...props}: NativeBase.Text & {children?: ReactNode}) => (
  <Text style={[style, {color: "rgb(95, 93, 112)", fontFamily: "montserrat-regular"}]} {...props}>
    {children}
  </Text>
);

const GrayBoldText = ({style, children, ...props}: NativeBase.Text & {children?: ReactNode}) => (
  <Text style={[style, {color: "rgb(95, 93, 112)", fontFamily: "montserrat-semibold"}]} {...props}>
    {children}
  </Text>
);

export interface OwnProps extends NavigationScreenProps {}

type StateProps = ReturnType<typeof mapStateToProps>;

export interface Props extends OwnProps, StateProps {}

function mapStateToProps({self}: AppState) {
  return {
    self,
  };
}

export class SignUpScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  };

  state = {};

  componentDidMount() {
    this.renavigate();
  }

  componentDidUpdate() {
    this.renavigate();
  }

  renavigate() {
    const {self} = this.props;
    if (self.loginState === LoginState.LoggedIn) {
      switch (self.onboardingState) {
        case OnboardingState.AtWelcome:
          this.props.navigation.navigate("Welcome");
          break;
        case OnboardingState.AtSelectInitialResources:
          this.props.navigation.navigate("SelectInitialResources");
          break;
        case OnboardingState.Complete:
          this.props.navigation.navigate("Profile");
          break;
        default:
          console.log("Unknown login state");
          break;
      }
      if (self.onboardingState === OnboardingState.AtSelectInitialResources) {
      }
    }
  };

  handleLogin = async () => {
    const result = await Google.logInAsync({androidClientId, iosClientId, scopes: ["profile", "email"]});
    if (result.type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      // console.log(result.user);

      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(_error => {
          console.log("Experienced an auth error");
          // Handle Errors here.
        });
    }
  };

  renderLoginFlow() {
    return (
      <>
        <View style={{flex: 5, justifyItems: "center", alignItems: "center"}}>
          <Button
            full
            rounded
            bordered
            light
            style={{backgroundColor: "#FFF", color: "#444", marginLeft: 20, marginRight: 20}}
          >
            <Image style={{width: 16, height: 16}} source={require("../../assets/images/google-g.png")} />
            <GrayText style={{color: "#444"}} onPress={this.handleLogin}>
              Continue with Google
            </GrayText>
          </Button>
        </View>
        <View style={{flex: 12, alignItems: "center", justifyContent: "center", marginTop: 20}}>
          <GrayText>
            Trove is an anonymous community. We need login information to confirm you’re a real person.
            However, within the community you will not be identified by name or identifiable info.{" "}
          </GrayText>
        </View>
        <View style={{flex: 18, alignItems: "center", justifyContent: "center"}}>
          <GrayText style={{margin: 5}}>Not a member yet?</GrayText>
          <GrayBoldText style={{fontWeight: "900", margin: 5}} onPress={this.handleLogin}>
            Sign Up
          </GrayBoldText>
        </View>
      </>
    );
  }

  render() {
    const {self} = this.props;
    const {loginState} = self;
    const showLoginFlow = loginState === LoginState.LoggedOut;

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
            <Image
              style={{width: 104, height: 104}}
              source={require("../../assets/images/logo-trove-white-4x.png")}
            />
          </View>
          <View style={{flex: 35}}>{showLoginFlow && this.renderLoginFlow()}</View>
        </LinearGradient>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(SignUpScreen);
