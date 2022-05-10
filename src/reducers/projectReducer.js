import { types } from "../types/types";

/*

    {
        projects: [],
        isNewProyect: false,
        proyectActive: {}
    }

*/
const initialState = {
    projects: [],
    isNewProyect: false,
    proyectActive: {},
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.projectsLoad:
            return{
                ...state,
                projects: action.payload
            }

        case types.projectAdd:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        
        case types.projectUpdate:
            return {
                ...state,
                projects: state.projects.map(
                    proyect => proyect.id === action.payload.id ? action.payload.proyect : proyect
                )
            }

        case types.projectDelete:
            return {
                ...state,
                projects: state.projects.filter(proyect => proyect.id !== action.payload)
            }

        case types.projectSetActive:
            return {
                ...state,
                projectActive: action.payload
            }

        case types.projectChangeToNew:
            return {
                ...state,
                isNewProyect: true
            }

        case types.projectChangeToEdit:
            return {
                ...state,
                isNewProyect: false
            }
        
        default:
            return state
    }
}