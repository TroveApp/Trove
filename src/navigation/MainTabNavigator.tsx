import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AddExperienceScreen from "../screens/AddExperienceScreen";
import DebugScreen from "../screens/DebugScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    AddExperience: AddExperienceScreen
  },
  { initialRouteName: "Home" }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-information-circle${focused ? "" : "-outline"}` : "md-information-circle"
      }
    />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-link" : "md-link"} />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-options" : "md-options"} />
  )
};

const DebugStack = createStackNavigator({
  Settings: DebugScreen
});

DebugStack.navigationOptions = {
  tabBarLabel: "Debug",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-bulb" : "md-bulb"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  DebugStack
});
