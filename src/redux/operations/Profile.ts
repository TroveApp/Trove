import {Resource, coreAction, Experience} from "../reducers/Core";
import {ReducerAction, GetState} from "../Store";
import {Dispatch} from "react";
import {database} from "firebase";
import {withLoggedInUser, selfAction} from "../reducers/Self";
import {FirebaseResource} from "../../firebase/FirebaseResource";

export function addExperience(experience: Experience) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const appState = getState();

    await withLoggedInUser(appState.self, async ({uid}) => {
      await database()
        .ref(`userExperiences/entries`)
        .push(<Experience>{
          uid,
          ...experience,
        });

      dispatch(coreAction.addExperience({uid, innerPayload: experience}));
      dispatch(selfAction.addExperienceToProfile(experience));
    });
  };
}

export function saveTopResources(resourceIds: string[]) {
  return async (dispatch: Dispatch<ReducerAction>, getState: GetState) => {
    const appState = getState();

    await withLoggedInUser(appState.self, async ({uid}) => {
      const resourceMap: Record<string, Resource> = {};
      try {
        await Promise.all(
          resourceIds.map(rid =>
            database()
              .ref(`resources/${rid}`)
              .once("value", snapshot => {
                const {name} = snapshot.val() as FirebaseResource;
                resourceMap[rid] = {
                  name,
                  imageURL: null,
                };
              }),
          ),
        );

        database()
          .ref(`userProfiles/${uid}/topResources`)
          .set(resourceIds);
      } catch (err) {
        console.log(err);
        return;
      }

      dispatch(coreAction.setTopResources({uid, innerPayload: resourceMap}));
    });
  };
}
