import { database } from "firebase";
import { Action, GetState, ReducerAction } from "../Store";
import { Dispatch } from "redux";
import { selfAction, LoggedInSelf } from "../reducers/Self";

export interface RegistrationAction {
  uid: string;
  emailAddress: string | null;
  nickname: string | null;
}

export function loginUser({ uid, ...rest }: RegistrationAction) {
  return async (dispatch: Dispatch<ReducerAction>, _getState: GetState) => {
    console.log({ userId: uid, ...rest });

    try {
      await database()
        .ref(`users/${uid}`)
        .set({
          ...rest
        });

    } catch (err) {
      console.log(err);
    }

    const user: LoggedInSelf = (await database()
      .ref(`users/${uid}`)
      .once("value")).val();

    dispatch(
      selfAction.login({
        ...user
      })
    );
  };
}
