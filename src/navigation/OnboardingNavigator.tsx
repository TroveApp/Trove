import {createStackNavigator} from "react-navigation";

import SignUpScreen from "../screens/SignUpScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SelectInitialResourcesScreen from "../screens/SelectInitialResourcesScreen";

const OnboardingStack = createStackNavigator(
  {
    SignUp: SignUpScreen,
    Welcome: WelcomeScreen,
    SelectInitialResources: SelectInitialResourcesScreen,
  },
  // DON'T COMMIT
  {initialRouteName: "SelectInitialResources"},
);

export default OnboardingStack;
