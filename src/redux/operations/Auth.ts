import {database} from "firebase";
import {Action, GetState, ReducerAction} from "../Store";
import {Dispatch} from "redux";
import {selfAction, LoggedInSelf} from "../reducers/Self";

export interface RegistrationAction {
  userId: string;
  emailAddress: string;
  nickname: string;
}

export function registerUser({userId, ...rest}: RegistrationAction) {
  return async (dispatch: Dispatch<ReducerAction>, _getState: GetState) => {
    console.log({userId, ...rest});

    await database()
      .ref(`users/${userId}`)
      .set({
        ...rest,
      });

    const user: LoggedInSelf = (await database()
      .ref(`users/${userId}`)
      .once("value")).val();

    dispatch(
      selfAction.login({
        ...user,
      }),
    );
  };
}
