import {simpleAction, payloadAction, ActionUnion, actionFactory} from "reductser";
import {produce} from "immer";
import {FirebaseUser, OnboardingState} from "../../firebase/FirebaseUser";
import {User, Experience} from "./Core";

export enum LoginState {
  Unknown,
  LoggedOut,
  LoggedIn,
}

export interface LoggedInSelf extends FirebaseUser {
  loginState: LoginState.LoggedIn;
  myProfile: User;
}

export type LoggedOutSelf = {
  loginState: LoginState.LoggedOut;
};

export type UnknownLoginState = {
  loginState: LoginState.Unknown;
};

export type Self = UnknownLoginState | LoggedInSelf | LoggedOutSelf;

function getInitialState(): Self {
  return {
    loginState: LoginState.Unknown,
  };
}

export type LoginProps = Pick<LoggedInSelf, Exclude<keyof LoggedInSelf, "loginState">>;

export const selfAction = actionFactory(
  {
    logout: simpleAction(),
    login: payloadAction<LoginProps>(),
    setOnboardingState: payloadAction<OnboardingState>(),
    addExperienceToProfile: payloadAction<Experience>(),
  },
  "self",
);

export type SelfAction = ActionUnion<typeof selfAction>;

export default (state = getInitialState(), action: SelfAction): Self =>
  produce(
    state,
    (draft): Self | undefined => {
      if (action.reducer === "self") {
        switch (action.type) {
          case "logout":
            return {
              loginState: LoginState.LoggedOut,
            };
          case "login":
            return {
              loginState: LoginState.LoggedIn,
              ...action.payload,
            };
          case "addExperienceToProfile": {
            if (draft.loginState !== LoginState.LoggedIn) {
              break;
            }
            draft.myProfile.experiences.push(action.payload);
            break;
          }
          case "setOnboardingState":
            if (draft.loginState !== LoginState.LoggedIn) {
              break;
            }
            draft.onboardingState = action.payload;
            break;
        }
      }
    },
  );

export const withLoggedInUser = <T>(
  self: Self,
  then: (loggedInSelf: LoggedInSelf) => T,
  onFailure?: () => T,
): T | undefined => {
  if (self.loginState !== LoginState.LoggedIn) {
    console.log("Required UID for action, did not find");
    return onFailure && onFailure();
  }
  try {
    return then(self);
  } catch {
    return onFailure && onFailure();
  }
};
