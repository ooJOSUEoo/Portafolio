import { types } from "../types/types";

/*

    {
        languages: [],
        isNewLanguage: false,
        languageActive: {}
    }

*/


export const languageReducer = (state = {}, action) => {
    switch (action.type) {
        case types.lenguajeAdd:
            return {
                ...state,
                languages: [...state.languages, action.payload]
            }
        
        case types.lenguajeUpdate:
            return {
                ...state,
                languages: state.languages.map(
                    language => language.id === action.payload.id ? action.payload.language : language
                )
            }

        case types.lenguajeDelete:
            return {
                ...state,
                languages: state.languages.filter(language => language.id !== action.payload)
            }

        case types.lenguajeSetActive:
            return {
                ...state,
                languageActive: state.languages.find(language => language.id === action.payload)
            }

        case types.lenguajeChangeToNew:
            return {
                ...state,
                isNewLanguage: true
            }

        case types.lenguajeChangeToEdit:
            return {
                ...state,
                isNewLanguage: false
            }
        
        default:
            return state
    }
}