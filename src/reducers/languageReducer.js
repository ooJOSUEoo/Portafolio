import { types } from "../types/types";


const initialState = {
    languages: [],
    isNewLanguage: true,
    languageActive: {}
}

export const languageReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.languagesLoad:
            return {
                ...state,
                languages: action.payload
            }

        case types.lenguajeAdd:
            return {
                ...state,
                languages: [...state.languages, action.payload]
            }
        
        case types.lenguajeUpdate:
            return {
                ...state,
                languages: state.languages.map(
                    language => {
                        if (language.id === action.payload.id) {
                            return action.payload
                        } else {
                            return language
                        }
                    }
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
                languageActive: action.payload
            }

        case types.lenguajeChangeToNew:
            return {
                ...state,
                isNewLanguage: true,
                //eliminar el id de languageActive
                languageActive: {
                    ...state.languageActive,
                    id: null
                }
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