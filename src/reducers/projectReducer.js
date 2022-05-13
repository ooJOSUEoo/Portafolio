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
    isNewProject: true,
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
                    proyect => {
                        if (proyect.id === action.payload.id) {
                            return action.payload;
                        } else {
                            return proyect;
                        }
                    }
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
                isNewProject: true,
                proyectActive: {
                    ...state.proyectActive,
                    id: null
                }
            }

        case types.projectChangeToEdit:
            return {
                ...state,
                isNewProject: false
            }
        
        default:
            return state
    }
}