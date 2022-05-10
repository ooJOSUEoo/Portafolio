import { types } from "../types/types";

/*

    {
        abouth: {
            description: "",
            cv: "",
            photo: ""
        }
        abouthActive: {}
    }

*/


export const abouthReducer = (state = {}, action) => {
    switch (action.type) {
        case types.abouthSet:
            return {
                ...state,
                abouth: action.payload
            }

        case types.abouthSetActive:
            return {
                ...state,
                abouthActive: action.payload
            }
        default:
            return state
    }
}