import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { authReducer } from "../reducers/authReducer";
// import { postReducer } from "../reducers/postsReducer";
// import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    // auth: authReducer,
    // ui: uiReducer,
    // proyet: proyectReducer,
    // language: languageReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);