import {payloadAction, ActionUnion, actionFactory} from "reductser";
import {produce} from "immer";
import {ImageRequireSource} from "react-native";
import { useCallback } from 'react';

export interface Resource {
  name: string;
  imageURL: ImageRequireSource | null;
}

export interface Experience {
  resourceId: string;
  benefits: Array<string>;
  howEmpowering: number;
}

export interface User {
  nickname: string;
  experiences: Array<Experience>;
  topResources: {
    [resourceId: string]: Resource;
  };
}

export interface Resource {
  name: string;
}

export type CoreState = {
  users: {
    [userId: string]: User;
  };
  resources: {
    [resourceId: string]: Resource;
  };
};

// Hack until we store the current user in a better way.
export const CURRENT_USER_ID = "currentUser";

function getInitialState(): CoreState {
  return {
    users: {
      currentUser: {
        nickname: "",
        experiences: [{resourceId: "therapy", rating: "Medium-effective", notes: ""}],
        topResources: {},
      },
    },
    resources: {
      therapy: {
        name: "Therapy",
        imageURL: require("../../../assets/images/Therapy.png"),
      },
      meditation: {
        name: "Meditation",
        imageURL: require("../../../assets/images/Meditation.png"),
      },
      sleep: {
        name: "Sleep techniques",
        imageURL: null,
      },
      yoga: {
        name: "Yoga",
        imageURL: null,
      },
      painting: {
        name: "Painting",
        imageURL: null,
      },
    },
  };
}

export interface WithUid<T> {
  uid: string;
  innerPayload: T;
}

export const coreAction = actionFactory(
  {
    addExperience: payloadAction<WithUid<Experience>>(),
    setTopResources: payloadAction<WithUid<Record<string, Resource>>>(),
  },
  "users",
);

export type CoreAction = ActionUnion<typeof coreAction>;

export default (state = getInitialState(), action: CoreAction): CoreState =>
  produce(
    state,
    (draft): CoreState | undefined => {
      if (action.reducer === "users") {
        switch (action.type) {
          case "addExperience": {
            const { innerPayload: experience, uid } = action.payload;
            draft.users[uid].experiences.push(experience);
            break;
          }
          case "setTopResources":{
            const { innerPayload: topResources, uid } = action.payload;
            draft.users[uid].topResources = topResources;
            break;
          }
          default:
            return;
        }
      }
    },
  );
