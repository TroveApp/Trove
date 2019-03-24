import {combineReducers, createStore, applyMiddleware, compose} from "redux";

import self, {SelfAction} from "./reducers/Self";
import core, {CoreAction} from "./reducers/Core";
import {Dispatch} from "react";
import {Operations} from "./operations";
import {default as thunk} from "redux-thunk";

const rootReducer = combineReducers({self, core});

export type ReducerAction = SelfAction | CoreAction;

export type Action = Operations | ReducerAction;

export default function configureStore() {
  return createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
}
export type Dispatcher = Dispatch<Action>;

export type Store = ReturnType<typeof configureStore>;
export type GetState = Store["getState"];
export type AppState = ReturnType<GetState>;
