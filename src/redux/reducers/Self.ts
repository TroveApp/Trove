import {simpleAction, payloadAction, ActionUnion, actionFactory} from "reductser";
import {Action} from "redux";
import {produce} from "immer";

export enum LoginState {
  LoggedOut,
  LoggedIn,
}

export interface LoggedInSelf {
  loginState: LoginState.LoggedIn;
  uid: string;
  emailAddress: string | null;
  nickname: string | null;
}

export type LoggedOutSelf = {
  loginState: LoginState.LoggedOut;
};

export type Self = LoggedInSelf | LoggedOutSelf;

function getInitialState(): Self {
  return {
    loginState: LoginState.LoggedOut,
  };
}

export const selfAction = actionFactory(
  {
    logout: simpleAction(),
    login: payloadAction<{ uid: string, emailAddress: string | null, nickname: string | null }>()
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
              loginState: LoginState.LoggedOut
            };
          case "login":
            return {
              loginState: LoginState.LoggedIn,
              ...action.payload
            };
          default:
            return;
        }
      }
    },
  );
