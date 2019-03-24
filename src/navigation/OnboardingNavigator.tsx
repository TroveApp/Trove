import {createStackNavigator} from "react-navigation";

import SignUpScreen from "../screens/SignUpScreen";
import SelectInitialResourcesScreen from "../screens/SelectInitialResourcesScreen";

const OnboardingStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
    SelectInitialResources: SelectInitialResourcesScreen,
  },
  {initialRouteName: "SignUp"},
);

export default OnboardingStack;
