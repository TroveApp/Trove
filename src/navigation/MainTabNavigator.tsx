import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import AddExperienceScreen from "../screens/AddExperienceScreen";
import DebugScreen from "../screens/DebugScreen";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    AddExperience: AddExperienceScreen
  },
  { initialRouteName: "Profile" }
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios" ? `ios-information-circle${focused ? "" : "-outline"}` : "md-information-circle"
      }
    />
  )
};

const AddActivityStack = createStackNavigator({
  AddExperience: AddExperienceScreen
});

AddActivityStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({ focused }: { focused: boolean }) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-link" : "md-link"} />
  ),
  tabBarVisible: false
};

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen
});

DiscoverStack.navigationOptions = {
  tabBarLabel: "Discover",
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
  ProfileStack,
  AddActivityStack,
  DiscoverStack,
  DebugStack
});
