import React from "react";
import {Image, Platform, Text} from "react-native";
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from "react-navigation";

import Colors from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import DebugScreen from "../screens/DebugScreen";
import AddExperienceResourceScreen from "../screens/AddExperienceResourceScreen";
import AddExperienceBenefitsScreen from "../screens/AddExperienceBenefitsScreen";
import AddExperienceHowEmpoweringScreen from "../screens/AddExperienceHowEmpoweringScreen";

const ProfileStack = createStackNavigator({Profile: ProfileScreen});

ProfileStack.navigationOptions = {
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <Text style={{color: focused ? Colors.green : Colors.gray, fontSize: 12}}>PROFILE</Text>
  ),
  tabBarIcon: ({focused}: {focused: boolean}) =>
    focused ? (
      <Image
        style={{marginTop: 4, width: 26, height: 26}}
        source={require("../../assets/images/Profile_Selected.png")}
      />
    ) : (
      <Image
        style={{marginTop: 4, width: 26, height: 26}}
        source={require("../../assets/images/Profile_Normal.png")}
      />
    ),
};

const AddActivityStack = createSwitchNavigator({
  AddExperienceResource: AddExperienceResourceScreen,
  AddExperienceBenefits: AddExperienceBenefitsScreen,
  AddExperienceHowEmpowering: AddExperienceHowEmpoweringScreen,
});

AddActivityStack.navigationOptions = {
  tabBarLabel: " ",
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <Image style={{marginTop: 12, width: 36, height: 36}} source={require("../../assets/images/Add.png")} />
  ),
  tabBarVisible: false,
};

const DiscoverStack = createStackNavigator({
  Discover: DiscoverScreen,
});

DiscoverStack.navigationOptions = {
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <Text style={{color: focused ? Colors.green : Colors.gray, fontSize: 12}}>DISCOVER</Text>
  ),
  tabBarIcon: ({focused}: {focused: boolean}) =>
    focused ? (
      <Image
        style={{marginTop: 4, width: 26, height: 26}}
        source={require("../../assets/images/Discover_Selected.png")}
      />
    ) : (
      <Image
        style={{marginTop: 4, width: 26, height: 26}}
        source={require("../../assets/images/Discover_Normal.png")}
      />
    ),
};

const DebugStack = createStackNavigator({
  Settings: DebugScreen,
});

DebugStack.navigationOptions = {
  tabBarLabel: "Debug",
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-bulb" : "md-bulb"} />
  ),
};

export default createBottomTabNavigator({
  ProfileStack,
  AddActivityStack,
  DiscoverStack,
  DebugStack,
});
