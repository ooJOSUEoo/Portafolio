import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { abouthReducer } from "../reducers/abouthReducer";
import { authReducer } from "../reducers/authReducer";
import { languageReducer } from "../reducers/languageReducer";
import { projectReducer } from "../reducers/projectReducer";
import { socialReducer } from "../reducers/socialReducer";
import { uiReducer } from "../reducers/uiReducer";


const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    abouth: abouthReducer,
    projects: projectReducer,
    languages: languageReducer,
    socials: socialReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);