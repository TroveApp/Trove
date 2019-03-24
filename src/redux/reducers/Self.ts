import {simpleAction, payloadAction, ActionUnion, actionFactory} from "reductser";
import {Action} from "redux";
import {produce} from "immer";

export enum LoginState {
  LoggedOut,
  LoggedIn,
}

export interface LoggedInSelf {
  loginState: LoginState.LoggedIn;
  userId: string;
  emailAddress: string;
  nickname: string;
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
    login: payloadAction<LoggedInSelf>(),
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
          case "login":
            return {
              ...action.payload,
            };
          default:
            return;
        }
      }
    },
  );
