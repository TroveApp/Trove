import {Resource, coreAction} from "../reducers/Core";
import {ReducerAction, GetState} from "../Store";
import {Dispatch} from "react";
import {database} from "firebase";
import {LoginState} from "../reducers/Self";

export function saveTopResources(topResources: string[]) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const {self} = getState();

    if (self.loginState !== LoginState.LoggedIn) {
      console.log("Illegal action performed");
      return;
    }

    const {uid} = self;

    try {
      // Perform database action;
    } catch (err) {
      console.log(err);
    }

    // TODO
    dispatch(coreAction.setTopResources({uid, innerPayload: {}}));
  };
}
