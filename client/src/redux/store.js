import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as AppReducer } from "./appReducer/reducer";
import { reducer as AuthReducer } from "./authReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ AppReducer, AuthReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export { store };
