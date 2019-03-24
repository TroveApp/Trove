import {Resource, coreAction} from "../reducers/Core";
import {ReducerAction, GetState} from "../Store";
import {Dispatch} from "react";
import {database} from "firebase";
import {LoginState} from "../reducers/Self";
import {FirebaseResource} from "../../firebase/FirebaseResource";

export function saveTopResources(topResources: string[]) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const {self} = getState();

    if (self.loginState !== LoginState.LoggedIn) {
      console.log("Illegal action performed");
      return;
    }

    const {uid} = self;

    const resourceMap: Record<string, Resource> = {};
    try {
      await Promise.all(
        topResources.map(rid =>
          database()
            .ref(`resources/${rid}`)
            .once("value", snapshot => {
              const {name} = snapshot.val();
              resourceMap[rid] = {
                name,
                imageURL: null,
              };
            }),
        ),
      );

      database()
        .ref(`userProfiles/${uid}/topResources`)
        .set(topResources);
    } catch (err) {
      console.log(err);
      return;
    }

    dispatch(coreAction.setTopResources({uid, innerPayload: resourceMap}));
  };
}
