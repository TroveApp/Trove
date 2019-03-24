import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import self, { SelfAction } from "./reducers/Self";
import { Dispatch } from "react";
import { Operations } from "./operations";
import { default as thunk } from "redux-thunk";

const rootReducer = combineReducers({ self });

export type ReducerAction = SelfAction;

export type Action = Operations | SelfAction;

export default function configureStore() {
    return createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
}
export type Dispatcher = Dispatch<Action>;

export type Store = ReturnType<typeof configureStore>;
export type GetState = Store['getState'];
export type AppState = ReturnType<GetState>;

export const store = configureStore();
export const globalDispatch: Dispatcher = store.dispatch as Dispatcher;
