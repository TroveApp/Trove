import {database, User} from "firebase";
import {GetState, ReducerAction} from "../Store";
import {Dispatch} from "redux";
import {selfAction, withLoggedInUser} from "../reducers/Self";
import {FirebaseUser, OnboardingState} from "../../firebase/FirebaseUser";
import {FirebaseUserProfile} from "../../firebase/FirebaseUserProfile";
import {Experience} from "../reducers/Core";

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
              onboardingState = OnboardingState.AtSelectInitialResources,
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

      await database()
        .ref(`userProfiles/${user.uid}`)
        .transaction(
          (currentValue: Partial<FirebaseUserProfile> | null): Partial<FirebaseUserProfile> => {
            const {topResources = [], experiences = [], nickname = null} = currentValue || {};

            return {
              nickname,
              topResources,
              experiences,
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

    const {topResources, experiences: experienceIds = [], ...restProfile}: FirebaseUserProfile =
      (await database()
        .ref(`userProfiles/${user.uid}`)
        .once("value")).val() || {};

    console.log("Rest of profile is: ");
    console.log(restProfile);

    const experiences: Experience[] = [];
    try {
      await Promise.all(
        experienceIds.map(expid =>
          database()
            .ref(`userExperiences/entries/${expid}`)
            .once("value", snapshot => experiences.push(snapshot.val() as Experience)),
        ),
      );
    } catch (err) {
      console.log(err);
      return;
    }

    console.log("Experiences are:");
    console.log(experiences);
    dispatch(
      selfAction.login({
        uid: user.uid,
        ...firebaseUser,
        myProfile: {
          // TODO:
          ...restProfile,
          experiences,
          topResources: {},
        },
      }),
    );
  };
}

export function updateOnboardingState(onboardingState: OnboardingState) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const appState = getState();

    withLoggedInUser(appState.self, async self => {
      await database()
        .ref(`users/${self.uid}`)
        .update(<FirebaseUser>{
          onboardingState,
        });

      dispatch(selfAction.setOnboardingState(onboardingState));
    });
  };
}
