import {simpleAction, payloadAction, ActionUnion, actionFactory} from "reductser";
import {Action} from "redux";
import {produce} from "immer";

export interface Resource {
  name: string;
}

export interface Experience {
  resourceId: string;
  rating: string;
  notes: string;
}

export interface User {
  nickname: string;
  experiences: Array<Experience>;
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
      },
    },
    resources: {
      therapy: {
        name: "Therapy",
      },
      medication: {
        name: "Medication",
      },
      sleep: {
        name: "Sleep techniques",
      },
    },
  };
}

export const coreAction = actionFactory(
  {
    addExperience: payloadAction<Experience>(),
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
          case "addExperience":
            return {
              ...state,
              users: {
                ...state.users,
                [CURRENT_USER_ID]: {
                  ...state.users[CURRENT_USER_ID],
                  experiences: [...state.users[CURRENT_USER_ID].experiences, action.payload],
                },
              },
            };
          default:
            return;
        }
      }
    },
  );
