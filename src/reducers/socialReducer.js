import { types } from "../types/types";

/*

    {
        socials: [],
        isNewSocial: false,
        socialActive: {}
    }

*/


export const socialReducer = (state = {}, action) => {
    switch (action.type) {

        case types.socialLoad:
            return {
                ...state,
                socials: action.payload
            }

        case types.socialAdd:
            return {
                ...state,
                socials: [...state.socials, action.payload]
            }
        
        case types.socialUpdate:
            return {
                ...state,
                socials: state.socials.map(
                    social => social.id === action.payload.id ? action.payload.social : social
                )

            }

        case types.socialDelete:
            return {
                ...state,
                socials: state.socials.filter(social => social.id !== action.payload)
            }

        case types.socialSetActive:
            return {
                ...state,
                socialActive: action.payload
            }

        case types.socialChangeToNew:
            return {
                ...state,
                isNewSocial: true
            }

        case types.socialChangeToEdit:
            return {
                ...state,
                isNewSocial: false
            }
        
        default:
            return state
    }
}