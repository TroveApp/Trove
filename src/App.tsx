import React from "react";
import {Platform, StatusBar, StyleSheet, View} from "react-native";
// @ts-ignore: Expo types are old and don't have icon.
import {AppLoading, Asset, Font, Icon} from "expo";
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from "./navigation/AppNavigator";
import { store } from './redux/Store';
import { Provider } from 'react-redux';

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
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
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
