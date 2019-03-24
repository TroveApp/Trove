// @ts-ignore: Expo types are old and don't have icon.
import {Ionicons} from "@expo/vector-icons";
// @ts-ignore: Expo types are old and don't have icon.
import {AppLoading, Asset, Font, Icon} from "expo";
import firebase from "firebase";
import React from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
import {Provider} from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import {Operations} from "./redux/operations";
import {selfAction} from "./redux/reducers/Self";
import {globalDispatch, store} from "./redux/Store";

const firebaseConfig = {
  apiKey: "AIzaSyCixuF9r0M04ExKHr7xV4lxyP1eqmPh83w",
  authDomain: "trove-backend.firebaseapp.com",
  databaseURL: "https://trove-backend.firebaseio.com/",
  storageBucket: "trove-backend.appspot.com",
};

declare global {
  interface ServiceWorkerRegistration {}
}

interface AppProps {
  skipLoadingScreen: boolean;
}

export default class App extends React.Component<AppProps> {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(async user => {
      // console.log('Auth state changed, user is:');
      // console.log(user);

      if (user === null) {
        globalDispatch(selfAction.logout());
        return;
      }

      globalDispatch(Operations.loginUser(user));
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async (): Promise<void> => {
    await Promise.all([
      Asset.loadAsync([
        require("../assets/images/robot-dev.png"),
        require("../assets/images/robot-prod.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "montserrat-regular": require("../assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        "montserrat-semibold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
      }),
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
