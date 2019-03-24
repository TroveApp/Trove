import {Resource, coreAction} from "../reducers/Core";
import {ReducerAction, GetState} from "../Store";
import {Dispatch} from "react";
import {database} from "firebase";
import {LoginState} from "../reducers/Self";

export function saveTopResources(topResources: Record<string, Resource>) {
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

    dispatch(coreAction.setTopResources({uid, innerPayload: topResources}));
  };
}
