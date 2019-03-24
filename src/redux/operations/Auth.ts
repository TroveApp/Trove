import {database, User} from "firebase";
import {GetState, ReducerAction} from "../Store";
import {Dispatch} from "redux";
import {selfAction, LoginState} from "../reducers/Self";
import {FirebaseUser, OnboardingState} from "../../firebase/FirebaseUser";

export interface RegistrationAction {
  uid: string;
  user: User;
}

export function loginUser(user: User) {
  return async (dispatch: Dispatch<ReducerAction>) => {
    try {
      // Push an empty update to check the user is authorized.
      await database()
        .ref(`users/${user.uid}`)
        .transaction(
          (currentValue: Partial<FirebaseUser> | null): Partial<FirebaseUser> => {
            const {
              onboardingState = OnboardingState.AtWelcome,
              // TODO, SECURITY: validate on Firebase side that this email is okay,
              // this is untrusted client-side input.
              emailAddress = user.email || null,
            } = currentValue || {};

            return {
              onboardingState,
              emailAddress,
            };
          },
        );
    } catch (err) {
      console.log("ERROR! DANGER WILL ROBINSON");
      console.log(err);
      dispatch(selfAction.logout());
    }

    const firebaseUser: FirebaseUser = (await database()
      .ref(`users/${user.uid}`)
      .once("value")).val();

    dispatch(
      selfAction.login({
        uid: user.uid,
        ...firebaseUser,
      }),
    );
  };
}

export function updateOnboardingState(onboardingState: OnboardingState) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const {self} = getState();

    console.log('Attempting to update onboarding state, what is self?');
    console.log(self);

    if (self.loginState !== LoginState.LoggedIn) {
      return;
    }

    await database()
      .ref(`users/${self.uid}`)
      .update(<FirebaseUser>{
        onboardingState,
      });

    dispatch(selfAction.setOnboardingState(onboardingState));
  };
}
